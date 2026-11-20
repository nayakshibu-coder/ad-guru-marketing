import React from 'react';
import { Award, CheckCircle, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FounderSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#101522] relative border-t border-[#1F2942]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-5xl mx-auto bg-[#0B1020] border border-[#1F2942] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle gradient background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B2C]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Founder Executive Portrait Illustration */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#FF6B2C] to-[#FFB14A] opacity-30 blur group-hover:opacity-60 transition duration-500" />
                
                {/* Brand Illustration Frame */}
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#171F38] to-[#101522] border-2 border-[#1F2942] flex flex-col items-center justify-center p-6 shadow-2xl">
                  {/* Official Agency Brand Emblem */}
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl shadow-blue-500/20 mb-4 overflow-hidden border-2 border-white/30 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/ChatGPT_Image_Aug_15__2026__07_07_01_PM_afd114e2.png"
                      alt="AdGuru Digital Marketing Agency"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  
                  <div className="font-extrabold text-white text-base">
                    {AGENCY_INFO.founder}
                  </div>
                  <div className="text-[11px] text-[#FF6B2C] font-semibold mt-0.5">
                    Agency Founder & Strategist
                  </div>
                  <div className="text-[10px] text-[#A7ADBA] flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3 text-[#FFB14A]" />
                    <span>Buguda, Ganjam, Odisha</span>
                  </div>
                </div>
              </div>

              {/* Verified badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101522] border border-[#1F2942] text-[11px] text-gray-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Verified Agency Leadership</span>
              </div>
            </div>

            {/* Right: Founder Message & Vision */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
                MEET THE FOUNDER
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Driving Growth for Local & Regional Businesses
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                "{AGENCY_INFO.brandName} helps businesses strengthen their digital presence through strategic advertising, creative communication, professional websites and performance-focused marketing solutions."
              </p>

              <p className="text-xs sm:text-sm text-[#A7ADBA] leading-relaxed">
                Every business owner needs clear, accountable digital growth without being overwhelmed by technical jargon. My commitment is simple: smart strategy, continuous testing, and direct communication every step of the way.
              </p>

              {/* Founder Principles Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                  <span>Direct founder involvement</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                  <span>100% Media spend transparency</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                  <span>Fast WhatsApp communication</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                  <span>Conversion-first methodology</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-3">
                <a
                  href={getWhatsAppUrl(`Hello Shibu Kumar Nayak, I would like to discuss my business growth goals directly with you.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B2C] to-[#FF8945] hover:from-[#FF7A40] hover:to-[#FF6B2C] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF6B2C]/25 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Discuss Your Business Goals</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
