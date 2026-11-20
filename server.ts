import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const AGENCY_WHATSAPP = '918917545134';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data directory for secure persistent lead storage
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Lead {
  id: string;
  fullName: string;
  businessName: string;
  contactNumber: string;
  businessLocation: string;
  businessCategory: string;
  interestedServices: string[];
  adBudget: string;
  requirements: string;
  consent: boolean;
  submittedAt: string;
  whatsappDeliveryStatus: 'DIRECT_WHATSAPP' | 'SAVED' | 'DISPATCHED';
  whatsappDeliveryDetails?: string;
  providerResponse?: unknown;
}

function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading leads:', err);
    return [];
  }
}

function saveLeads(leads: Lead[]): void {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving leads:', err);
  }
}

// Generate Section 13 Lead Message Format
function formatLeadMessage(lead: Lead): string {
  const servicesStr = lead.interestedServices.length > 0 ? lead.interestedServices.join(', ') : 'Not specified';
  const budgetStr = lead.adBudget || 'Not specified';
  const reqStr = lead.requirements ? lead.requirements : 'None provided';
  const timestampStr = new Date(lead.submittedAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `🚀 NEW WEBSITE LEAD — ADGURU

Lead ID: ${lead.id}

👤 Name: ${lead.fullName}
🏢 Business: ${lead.businessName}
📞 Contact: ${lead.contactNumber}
📍 Location: ${lead.businessLocation}
🏷️ Category: ${lead.businessCategory}
🎯 Services: ${servicesStr}
💰 Ad Budget: ${budgetStr}
📝 Requirements: ${reqStr}

Source: AdGuru Website
Submitted At: ${timestampStr}

Follow-up: Contact the lead to discuss their requirements.`;
}

// Generate direct WhatsApp click-to-chat URL (No API Token Required)
function getDirectWhatsAppUrl(lead: Lead): string {
  const message = formatLeadMessage(lead);
  return `https://wa.me/${AGENCY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

// --- API ROUTES ---

// 1. Submit Enquiry Form
app.post('/api/leads', async (req, res) => {
  try {
    const {
      fullName,
      businessName,
      contactNumber,
      businessLocation,
      businessCategory,
      interestedServices = [],
      adBudget = 'Not Decided',
      requirements = '',
      consent,
    } = req.body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full Name is required.' });
    }
    if (!businessName || typeof businessName !== 'string' || !businessName.trim()) {
      return res.status(400).json({ error: 'Business Name is required.' });
    }
    if (!contactNumber || typeof contactNumber !== 'string' || contactNumber.trim().length < 8) {
      return res.status(400).json({ error: 'A valid Contact Number is required.' });
    }
    if (!businessLocation || typeof businessLocation !== 'string' || !businessLocation.trim()) {
      return res.status(400).json({ error: 'Business Location is required.' });
    }
    if (!businessCategory || typeof businessCategory !== 'string' || !businessCategory.trim()) {
      return res.status(400).json({ error: 'Business Category is required.' });
    }
    if (consent !== true && consent !== 'true') {
      return res.status(400).json({ error: 'You must accept the privacy consent to submit an enquiry.' });
    }

    // Unique Lead ID
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const leadId = `ADG-${dateCode}-${randomHex}`;

    const newLead: Lead = {
      id: leadId,
      fullName: fullName.trim(),
      businessName: businessName.trim(),
      contactNumber: contactNumber.trim(),
      businessLocation: businessLocation.trim(),
      businessCategory: businessCategory.trim(),
      interestedServices: Array.isArray(interestedServices) ? interestedServices : [interestedServices],
      adBudget: String(adBudget).trim(),
      requirements: String(requirements).trim(),
      consent: true,
      submittedAt: new Date().toISOString(),
      whatsappDeliveryStatus: 'DIRECT_WHATSAPP',
      whatsappDeliveryDetails: `Direct WhatsApp Lead Link generated for +${AGENCY_WHATSAPP}. Ready for immediate dispatch.`,
    };

    // Save permanently in database
    const leads = readLeads();
    leads.unshift(newLead);
    saveLeads(leads);

    const directUrl = getDirectWhatsAppUrl(newLead);
    const formattedMessage = formatLeadMessage(newLead);

    return res.status(201).json({
      success: true,
      lead: newLead,
      leadId: newLead.id,
      whatsappDeliveryStatus: newLead.whatsappDeliveryStatus,
      whatsappDeliveryDetails: newLead.whatsappDeliveryDetails,
      directWhatsAppUrl: directUrl,
      formattedMessage,
      message: 'Enquiry saved in database and ready for WhatsApp delivery.',
    });
  } catch (err: unknown) {
    const errorString = err instanceof Error ? err.message : String(err);
    console.error('Server error handling lead submission:', err);
    return res.status(500).json({ error: 'Internal server error processing enquiry.', details: errorString });
  }
});

// 2. Fetch Leads (Admin Portal / Lead Management)
app.get('/api/leads', (_req, res) => {
  try {
    const leads = readLeads();
    res.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (err: unknown) {
    const errorString = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: 'Failed to read leads.', details: errorString });
  }
});

// 3. WhatsApp Status (Zero-Token Direct WhatsApp Architecture)
app.get('/api/whatsapp-status', (_req, res) => {
  res.json({
    mode: 'DIRECT_WHATSAPP',
    isReady: true,
    agencyPhone: '+91 8917545134',
    configuredRecipient: '+918917545134',
    hasToken: false,
    directChatUrl: `https://wa.me/${AGENCY_WHATSAPP}?text=${encodeURIComponent('Hello AdGuru, I am contacting you from the website.')}`,
    agencyEmail: 'nayakshibu578@gmail.com',
    instructions: 'Direct WhatsApp integration is active! Zero Meta API tokens or credentials required. Every lead connects directly to +91 8917545134 while securely saving in database.',
  });
});

// Configure Vite middleware in development or static serve in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AdGuru server listening on http://0.0.0.0:${PORT} (Direct WhatsApp Mode)`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
