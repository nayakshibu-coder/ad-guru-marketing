import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1020] border border-[#1F2942] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-left max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-[#1F2942]">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FF6B2C]" />
            <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#171F38] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 space-y-4 text-xs text-[#A7ADBA] leading-relaxed pr-2">
          <p>
            Welcome to <strong>{AGENCY_INFO.brandName}</strong> ("AdGuru", "we", "our"). We respect your privacy and are committed to safeguarding personal information collected through our website and WhatsApp communication channels.
          </p>

          <h4 className="text-sm font-bold text-white">1. Information We Collect</h4>
          <p>
            When you submit an enquiry through our website or contact us via WhatsApp, we collect information including your Full Name, Business Name, Contact Number (WhatsApp/Phone), Business Location, Category, Interested Services, and project notes.
          </p>

          <h4 className="text-sm font-bold text-white">2. How We Use Your Information</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>To review your digital marketing requirements and prepare customized strategies.</li>
            <li>To contact you directly via Phone or WhatsApp to discuss consultations.</li>
            <li>To maintain internal lead records and monitor service delivery.</li>
          </ul>

          <h4 className="text-sm font-bold text-white">3. Data Protection & Non-Disclosure</h4>
          <p>
            We do not sell, rent, or trade your personal or business data to any third-party marketing companies. Data is exclusively used for AdGuru client communications.
          </p>

          <h4 className="text-sm font-bold text-white">4. Contact Information</h4>
          <p>
            If you have questions regarding this Privacy Policy, you may contact founder <strong>{AGENCY_INFO.founder}</strong> at <a href={`mailto:${AGENCY_INFO.email}`} className="text-[#FF6B2C] hover:underline">{AGENCY_INFO.email}</a> or phone {AGENCY_INFO.phone}.
          </p>
        </div>

        <div className="pt-4 border-t border-[#1F2942] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#171F38] hover:bg-[#1F2942] text-xs font-bold text-white transition-all"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1020] border border-[#1F2942] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-left max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-[#1F2942]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FFB14A]" />
            <h3 className="text-lg font-bold text-white">Terms & Conditions</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#171F38] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 space-y-4 text-xs text-[#A7ADBA] leading-relaxed pr-2">
          <p>
            These Terms govern your use of the website and marketing consultation services provided by <strong>{AGENCY_INFO.brandName}</strong>.
          </p>

          <h4 className="text-sm font-bold text-white">1. Scope of Consultations</h4>
          <p>
            Initial consultations provided through the website or WhatsApp are strategic recommendations to evaluate suitability. Formal engagements are governed by separate service agreements detailing deliverables, timelines, and fees.
          </p>

          <h4 className="text-sm font-bold text-white">2. Advertising Spend Policy</h4>
          <p>
            Media advertising charges on Meta Ads, Google Ads, or YouTube are billed directly by the platform to the client's ad accounts. AdGuru provides management, creative strategy, and campaign optimization services.
          </p>

          <h4 className="text-sm font-bold text-white">3. Honest Marketing Expectations</h4>
          <p>
            Marketing performance depends on market dynamics, product/service competitiveness, pricing, seasonality, and client sales responsiveness. We do not provide false guarantees of fixed lead numbers or sales quotas.
          </p>

          <h4 className="text-sm font-bold text-white">4. Governing Law</h4>
          <p>
            These terms are governed by the laws of Odisha, India.
          </p>
        </div>

        <div className="pt-4 border-t border-[#1F2942] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#171F38] hover:bg-[#1F2942] text-xs font-bold text-white transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
