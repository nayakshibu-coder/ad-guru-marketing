import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  ShieldCheck,
  Building,
  User,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  FileText
} from 'lucide-react';
import {
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  CATEGORY_OPTIONS,
  AGENCY_INFO
} from '../data/agencyData';
import { getWhatsAppUrl, formatFullLeadMessage } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface EnquiryFormSectionProps {
  onLeadSubmitted?: () => void;
}

export const EnquiryFormSection: React.FC<EnquiryFormSectionProps> = ({ onLeadSubmitted }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [interestedServices, setInterestedServices] = useState<string[]>(['Lead Generation']);
  const [adBudget, setAdBudget] = useState('₹10,000–₹25,000');
  const [requirements, setRequirements] = useState('');
  const [consent, setConsent] = useState(false);

  // Submission & Modal States
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedLeadResult, setSubmittedLeadResult] = useState<{
    leadId: string;
    whatsappDeliveryStatus: string;
    whatsappDeliveryDetails: string;
    directWhatsAppUrl: string;
    formattedMessage: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Toggle service selection
  const handleToggleService = (service: string) => {
    if (interestedServices.includes(service)) {
      setInterestedServices(interestedServices.filter((s) => s !== service));
    } else {
      setInterestedServices([...interestedServices, service]);
    }
  };

  // Browser Validation
  const validateForm = (): boolean => {
    setValidationError(null);
    if (!fullName.trim()) {
      setValidationError('Please enter your Full Name.');
      return false;
    }
    if (!businessName.trim()) {
      setValidationError('Please enter your Business Name.');
      return false;
    }
    const cleanPhone = contactNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setValidationError('Please enter a valid Contact Number (at least 8-10 digits).');
      return false;
    }
    if (!businessLocation.trim()) {
      setValidationError('Please enter your Business Location (City, Area, or Town).');
      return false;
    }
    if (!businessCategory) {
      setValidationError('Please select a Business Category from the dropdown.');
      return false;
    }
    if (!consent) {
      setValidationError('Please agree to the privacy consent to submit an enquiry.');
      return false;
    }
    return true;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          businessName,
          contactNumber,
          businessLocation,
          businessCategory,
          interestedServices,
          adBudget,
          requirements,
          consent: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSubmittedLeadResult({
        leadId: data.leadId,
        whatsappDeliveryStatus: data.whatsappDeliveryStatus,
        whatsappDeliveryDetails: data.whatsappDeliveryDetails || '',
        directWhatsAppUrl: data.directWhatsAppUrl,
        formattedMessage: data.formattedMessage,
      });

      if (onLeadSubmitted) {
        onLeadSubmitted();
      }

      // Automatically launch WhatsApp with the formatted lead
      if (data.directWhatsAppUrl) {
        window.open(data.directWhatsAppUrl, '_blank');
      }
    } catch (err: unknown) {
      const errorString = err instanceof Error ? err.message : String(err);
      setValidationError(errorString || 'Could not connect to the server. Launching WhatsApp directly...');
      // Fallback: open WhatsApp directly with entered details
      handleDirectWhatsAppClick();
    } finally {
      setLoading(false);
    }
  };

  // Continue on WhatsApp without submitting form
  const handleDirectWhatsAppClick = () => {
    const tempLead = {
      id: `WEB-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      fullName: fullName.trim() || 'Visitor',
      businessName: businessName.trim() || 'Business Enquiry',
      contactNumber: contactNumber.trim() || 'Provided on WhatsApp',
      businessLocation: businessLocation.trim() || 'India',
      businessCategory: businessCategory || 'General Marketing',
      interestedServices: interestedServices.length > 0 ? interestedServices : ['General Marketing Consultation'],
      adBudget: adBudget,
      requirements: requirements,
    };
    const message = formatFullLeadMessage(tempLead);
    window.open(getWhatsAppUrl(message), '_blank');
  };

  const handleCopyMessage = () => {
    if (submittedLeadResult?.formattedMessage) {
      navigator.clipboard.writeText(submittedLeadResult.formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const resetForm = () => {
    setFullName('');
    setBusinessName('');
    setContactNumber('');
    setBusinessLocation('');
    setBusinessCategory('');
    setInterestedServices(['Lead Generation']);
    setAdBudget('₹10,000–₹25,000');
    setRequirements('');
    setConsent(false);
    setSubmittedLeadResult(null);
    setValidationError(null);
  };

  return (
    <section id="enquiry-form" className="py-24 bg-[#0B1020] relative">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#FF6B2C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let's Grow Your Business Together
          </h2>
          <p className="text-sm sm:text-base text-[#A7ADBA]">
            Share a few details and tell us what you need. Our team will help you explore the right digital marketing solution.
          </p>
        </div>

        {/* Lead Form Card */}
        <div className="bg-[#101522] border border-[#1F2942] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Top Trust Notice */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#1F2942] text-xs text-[#A7ADBA]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" />
              <span>Direct WhatsApp Integration to Founder <strong>{AGENCY_INFO.founder}</strong></span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-gray-400">
              Response within 2 hours
            </span>
          </div>

          {validationError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Full Name & Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Full Name <span className="text-[#FF6B2C]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Sahoo"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B1020] border border-[#1F2942] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] text-sm text-white placeholder-gray-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Business Name <span className="text-[#FF6B2C]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Sahoo Dental Clinic"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B1020] border border-[#1F2942] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] text-sm text-white placeholder-gray-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Contact Number & Business Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Contact Number (WhatsApp) <span className="text-[#FF6B2C]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B1020] border border-[#1F2942] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] text-sm text-white placeholder-gray-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Business Location <span className="text-[#FF6B2C]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={businessLocation}
                    onChange={(e) => setBusinessLocation(e.target.value)}
                    placeholder="e.g. Berhampur, Odisha"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B1020] border border-[#1F2942] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] text-sm text-white placeholder-gray-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Business Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Business Category <span className="text-[#FF6B2C]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <select
                  required
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B1020] border border-[#1F2942] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>-- Select Your Industry / Category --</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0B1020] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Interested Services (Multiple Selection Chips) */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Interested Services (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = interestedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => handleToggleService(srv)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF6B2C] text-white shadow-md shadow-[#FF6B2C]/20 border border-[#FF6B2C]'
                          : 'bg-[#0B1020] text-[#A7ADBA] hover:text-white border border-[#1F2942]'
                      }`}
                    >
                      {isSelected ? <Check className="w-3 h-3" /> : null}
                      <span>{srv}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 5: Monthly Advertising Budget (Optional) */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Monthly Advertising Budget (Estimated)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {BUDGET_OPTIONS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setAdBudget(b)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium text-center transition-all cursor-pointer ${
                      adBudget === b
                        ? 'bg-[#FFB14A] text-black font-bold shadow-md'
                        : 'bg-[#0B1020] text-gray-300 border border-[#1F2942] hover:border-gray-500'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 6: Business Requirements (Optional) */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Business Requirements & Specific Goals (Optional)
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Tell us what you want to achieve, your primary audience, target areas, or current marketing challenges..."
                  className="w-full p-3.5 rounded-xl bg-[#0B1020] border border-[#1F2942] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] text-sm text-white placeholder-gray-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="consent-check"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#1F2942] text-[#FF6B2C] focus:ring-[#FF6B2C] cursor-pointer"
              />
              <label htmlFor="consent-check" className="text-xs text-[#A7ADBA] cursor-pointer leading-relaxed">
                I agree to allow AdGuru Digital Marketing Agency to contact me via phone or WhatsApp regarding this marketing consultation. We respect your privacy and never spam.
              </label>
            </div>

            {/* Action Button: Continue on WhatsApp */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>RECORDING & OPENING WHATSAPP...</span>
                  </>
                ) : (
                  <>
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>CONTINUE ON WHATSAPP</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Truthful Confirmation Dialog / Modal upon Submission */}
        {submittedLeadResult && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1020] border border-[#1F2942] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-left">
              
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-1">
                Enquiry Recorded Successfully!
              </h3>
              
              <div className="text-xs text-[#A7ADBA] mb-4">
                Your lead ID is <span className="font-mono font-bold text-[#FF6B2C] bg-[#171F38] px-2 py-0.5 rounded border border-[#1F2942]">{submittedLeadResult.leadId}</span>. It has been safely stored in the AdGuru agency database.
              </div>

              {/* Direct WhatsApp Delivery Status Display */}
              <div className="p-4 rounded-xl bg-[#101522] border border-[#1F2942] space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    WhatsApp Delivery:
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Direct Delivery Ready
                  </span>
                </div>

                <p className="text-xs text-[#A7ADBA] leading-relaxed">
                  Your enquiry is safely saved. WhatsApp will open with your prefilled details directly sent to AdGuru (+91 8917545134). If it did not open automatically, click below.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={submittedLeadResult.directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Deliver Lead to AdGuru WhatsApp</span>
                </a>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyMessage}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-[#1F2942] hover:bg-[#171F38] text-xs text-gray-300 font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Lead Details'}</span>
                  </button>

                  <button
                    onClick={resetForm}
                    className="py-2.5 px-4 rounded-xl bg-[#171F38] hover:bg-[#1F2942] text-xs text-white font-semibold transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
