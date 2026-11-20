import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Download,
  CheckCircle2,
  Phone,
  User,
  Building,
  Calendar,
  ExternalLink,
  Settings,
  Zap
} from 'lucide-react';
import { LeadRecord } from '../types';
import { formatFullLeadMessage, getWhatsAppUrl, AGENCY_PHONE_DISPLAY } from '../utils/whatsapp';
import { fetchAllLeads } from '../utils/leadStorage';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AdminLeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadsUpdated?: () => void;
}

export const AdminLeadsDrawer: React.FC<AdminLeadsDrawerProps> = ({
  isOpen,
  onClose,
  onLeadsUpdated,
}) => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'config'>('leads');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  const handleCopy = (lead: LeadRecord) => {
    const msg = formatFullLeadMessage(lead);
    navigator.clipboard.writeText(msg);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Lead ID', 'Full Name', 'Business', 'Contact', 'Location', 'Category', 'Services', 'Budget', 'Requirements', 'Delivery Status', 'Submitted At'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.fullName}"`,
      `"${l.businessName}"`,
      `"${l.contactNumber}"`,
      `"${l.businessLocation}"`,
      `"${l.businessCategory}"`,
      `"${(l.interestedServices || []).join(', ')}"`,
      `"${l.adBudget || ''}"`,
      `"${(l.requirements || '').replace(/"/g, '""')}"`,
      `"${l.whatsappDeliveryStatus || 'DIRECT_WHATSAPP'}"`,
      `"${l.submittedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adguru_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-[#0B1020] border-l border-[#1F2942] h-full flex flex-col shadow-2xl animate-fadeIn">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1F2942] flex items-center justify-between bg-[#101522]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold">
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Agency Leads Hub</h2>
              <div className="text-[11px] text-[#A7ADBA]">
                AdGuru Direct WhatsApp Lead System • {AGENCY_PHONE_DISPLAY}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              disabled={loading}
              title="Refresh Leads"
              className="p-2 rounded-lg bg-[#171F38] text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#25D366]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#171F38] text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Drawer */}
        <div className="flex border-b border-[#1F2942] bg-[#0B1020] px-5 pt-3 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'border-[#25D366] text-[#25D366]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>Saved Enquiries</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#171F38] text-gray-200">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'config'
                ? 'border-[#25D366] text-[#25D366]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>WhatsApp System Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* TAB 1: Leads List */}
          {activeTab === 'leads' && (
            <>
              {/* Top Controls: Export CSV */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A7ADBA]">
                  Total Enquiries Recorded: <strong className="text-white">{leads.length}</strong>
                </span>
                {leads.length > 0 && (
                  <button
                    onClick={exportCSV}
                    className="px-3 py-1.5 rounded-lg bg-[#171F38] hover:bg-[#1F2942] border border-[#1F2942] text-xs font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>

              {leads.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#171F38] text-gray-400 flex items-center justify-center mx-auto">
                    <User className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">No Enquiries Captured Yet</h4>
                  <p className="text-xs text-[#A7ADBA] max-w-sm mx-auto">
                    When visitors submit the enquiry form or test the lead generation funnel, every lead is automatically saved here and can be opened in WhatsApp with 1-click.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => {
                    const leadWhatsAppUrl = getWhatsAppUrl(formatFullLeadMessage(lead));

                    return (
                      <div
                        key={lead.id}
                        className="p-4 rounded-xl bg-[#101522] border border-[#1F2942] hover:border-gray-600 transition-all space-y-3"
                      >
                        {/* Header: Lead ID & Delivery Badge */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#FF6B2C] bg-[#171F38] px-2 py-0.5 rounded border border-[#1F2942]">
                              {lead.id}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {new Date(lead.submittedAt).toLocaleString('en-IN', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                              })}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Direct WhatsApp
                          </span>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Name</span>
                            <span className="text-white font-semibold">{lead.fullName}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Business</span>
                            <span className="text-white font-semibold">{lead.businessName}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Contact</span>
                            <a
                              href={`tel:${lead.contactNumber.replace(/\D/g, '')}`}
                              className="text-[#FF6B2C] hover:underline font-mono"
                            >
                              {lead.contactNumber}
                            </a>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Location</span>
                            <span className="text-gray-200">{lead.businessLocation}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Category</span>
                            <span className="text-gray-200">{lead.businessCategory}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Budget</span>
                            <span className="text-[#FFB14A] font-semibold">{lead.adBudget || 'Not specified'}</span>
                          </div>
                        </div>

                        {/* Services */}
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase mb-1">Services Needed</span>
                          <div className="flex flex-wrap gap-1">
                            {(lead.interestedServices || []).map((srv, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-[#171F38] text-gray-300 px-2 py-0.5 rounded border border-[#1F2942]"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Requirements */}
                        {lead.requirements && (
                          <div className="p-2.5 rounded-lg bg-[#0B1020] border border-[#1F2942] text-[11px] text-gray-300 italic">
                            "{lead.requirements}"
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-2 border-t border-[#1F2942] flex items-center gap-2">
                          <a
                            href={leadWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                            <span>Chat on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => handleCopy(lead)}
                            className="py-2 px-3 rounded-lg bg-[#171F38] hover:bg-[#1F2942] text-xs text-gray-200 font-semibold flex items-center gap-1 transition-all cursor-pointer"
                            title="Copy Section 13 Lead Template Message"
                          >
                            {copiedId === lead.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">{copiedId === lead.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* TAB 2: WhatsApp System Status (Zero API Setup) */}
          {activeTab === 'config' && (
            <div className="space-y-4 text-xs">
              
              {/* Status Banner */}
              <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white mb-0.5">
                    Direct WhatsApp System Active (100% Token-Free)
                  </div>
                  <div className="text-[11px] leading-relaxed text-gray-300">
                    No WhatsApp Cloud API tokens, phone number IDs, or Meta developer configurations required! All website enquiries deliver directly to your WhatsApp at <strong>{AGENCY_PHONE_DISPLAY}</strong> while simultaneously saving in the agency database.
                  </div>
                </div>
              </div>

              {/* Verified Parameters */}
              <div className="p-4 rounded-xl bg-[#101522] border border-[#1F2942] space-y-2.5">
                <span className="font-bold text-gray-300 uppercase tracking-wider block text-[10px]">
                  System Parameters:
                </span>
                <div className="flex justify-between py-1 border-b border-[#1F2942]">
                  <span className="text-gray-400">Recipient WhatsApp:</span>
                  <span className="font-mono text-white font-bold">{AGENCY_PHONE_DISPLAY}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F2942]">
                  <span className="text-gray-400">Agency Founder:</span>
                  <span className="text-white font-medium">Shibu Kumar Nayak</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F2942]">
                  <span className="text-gray-400">Database Storage:</span>
                  <span className="text-emerald-400 font-mono">data/leads.json (Permanent)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F2942]">
                  <span className="text-gray-400">API Tokens Needed:</span>
                  <span className="text-emerald-400 font-semibold">None (Zero Setup Required)</span>
                </div>
              </div>

              {/* Why Direct WhatsApp is superior */}
              <div className="p-4 rounded-xl bg-[#101522] border border-[#1F2942] space-y-2 text-[#A7ADBA]">
                <span className="font-bold text-white block text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#FFB14A]" />
                  Why Zero-Token Direct WhatsApp is Best:
                </span>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300 pt-1">
                  <li><strong>Zero Meta Monthly Charges</strong> — No pay-per-conversation Meta billing.</li>
                  <li><strong>No Expiring Access Tokens</strong> — Never breaks due to 24-hour or 60-day token expiry.</li>
                  <li><strong>Instant 2-Way Chat</strong> — When the lead contacts you, you can chat with them immediately on normal WhatsApp or WhatsApp Business app.</li>
                  <li><strong>Permanent Audit Log</strong> — Even if a client doesn't press send, the lead is already captured and stored here in your database.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
