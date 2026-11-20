import { LeadRecord, LeadSubmission } from '../types';
import { formatFullLeadMessage, getWhatsAppUrl } from './whatsapp';

const LOCAL_STORAGE_KEY = 'adguru_saved_leads_v1';

function readLocalLeads(): LeadRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalLeads(leads: LeadRecord[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch {
    // Ignore storage quota errors
  }
}

function generateLeadId(): string {
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  return `ADG-${dateCode}-${randomHex}`;
}

export async function fetchAllLeads(): Promise<LeadRecord[]> {
  try {
    const res = await fetch('/api/leads');
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data.leads)) {
        return data.leads;
      }
    }
  } catch {
    // Static hosting (e.g. Cloudflare Pages) — fall back to localStorage
  }
  return readLocalLeads();
}

export async function saveLeadEnquiry(payload: LeadSubmission): Promise<{
  lead: LeadRecord;
  leadId: string;
  whatsappDeliveryStatus: string;
  whatsappDeliveryDetails: string;
  directWhatsAppUrl: string;
  formattedMessage: string;
}> {
  // Attempt server API first (works in full-stack runtime)
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok && data.leadId) {
        return {
          lead: data.lead,
          leadId: data.leadId,
          whatsappDeliveryStatus: data.whatsappDeliveryStatus || 'DIRECT_WHATSAPP',
          whatsappDeliveryDetails: data.whatsappDeliveryDetails || '',
          directWhatsAppUrl: data.directWhatsAppUrl,
          formattedMessage: data.formattedMessage,
        };
      }
      if (response.status === 400) {
        throw new Error(data.error || 'Please fill in all required fields.');
      }
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes('required')) {
      throw err;
    }
    // Fall back to static/localStorage mode on Cloudflare Pages
  }

  // Static deployment fallback (Cloudflare Pages)
  const leadId = generateLeadId();
  const submittedAt = new Date().toISOString();
  const newLead: LeadRecord = {
    ...payload,
    id: leadId,
    submittedAt,
    whatsappDeliveryStatus: 'DIRECT_WHATSAPP',
    whatsappDeliveryDetails: 'Saved locally & prepared for direct WhatsApp dispatch.',
  };

  const existing = readLocalLeads();
  writeLocalLeads([newLead, ...existing]);

  const formattedMessage = formatFullLeadMessage(newLead);
  const directWhatsAppUrl = getWhatsAppUrl(formattedMessage);

  return {
    lead: newLead,
    leadId,
    whatsappDeliveryStatus: newLead.whatsappDeliveryStatus,
    whatsappDeliveryDetails: newLead.whatsappDeliveryDetails || '',
    directWhatsAppUrl,
    formattedMessage,
  };
}
