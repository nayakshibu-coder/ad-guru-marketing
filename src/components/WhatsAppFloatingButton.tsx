import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { AGENCY_INFO } from '../data/agencyData';
import { getWhatsAppUrl, getFloatingButtonMessage } from '../utils/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      
      {/* Floating Prompt Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0B1020] border border-[#25D366]/40 text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl shadow-black/50 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="font-semibold text-gray-200">Chat with AdGuru on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss tooltip"
            className="text-gray-400 hover:text-white ml-1 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Floating Button */}
      <a
        href={getWhatsAppUrl(getFloatingButtonMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AdGuru on WhatsApp (+91 8917545134)"
        title="Chat with AdGuru on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Animated Ripple Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:opacity-0" />
        
        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-7 h-7 text-white relative z-10" />

        {/* Small Online Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#101522] z-20" />
      </a>
    </div>
  );
};
