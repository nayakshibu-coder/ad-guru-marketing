import React from 'react';
import { MapPin, Phone, Mail, Send, Clock, UserCheck } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ContactSection: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rawPhone = AGENCY_INFO.phone.replace(/\s+/g, '');

  return (
    <section id="contact" className="py-24 bg-[#101522] relative border-t border-[#1F2942]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            CONTACT ADGURU
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Direct & Transparent Communication
          </h2>
          <p className="text-sm sm:text-base text-[#A7ADBA]">
            Reach out via phone, email, or instant WhatsApp. We are here to help you navigate your digital transformation.
          </p>
        </div>

        {/* 3 Core Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* Card 1: Phone / WhatsApp */}
          <div className="p-6 rounded-2xl bg-[#0B1020] border border-[#1F2942] hover:border-[#25D366]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Phone & WhatsApp</h3>
              <p className="text-xs text-[#A7ADBA] mb-3">Direct line to agency leadership</p>
              <div className="font-mono text-sm font-bold text-white">{AGENCY_INFO.phone}</div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F2942] flex gap-2">
              <a
                href={`tel:${rawPhone}`}
                className="flex-1 py-2 px-3 rounded-lg bg-[#171F38] hover:bg-[#1F2942] text-xs text-white font-bold text-center transition-all"
              >
                Call Now
              </a>
              <a
                href={getWhatsAppUrl(`Hello ${AGENCY_INFO.brandName}, I am contacting you directly from your contact section.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-xs text-white font-bold text-center flex items-center justify-center gap-1.5 transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="p-6 rounded-2xl bg-[#0B1020] border border-[#1F2942] hover:border-[#FF6B2C]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 flex items-center justify-center text-[#FF6B2C] mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Official Email</h3>
              <p className="text-xs text-[#A7ADBA] mb-3">Formal proposals & written inquiries</p>
              <div className="text-xs font-mono font-bold text-white break-all">{AGENCY_INFO.email}</div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F2942]">
              <a
                href={`mailto:${AGENCY_INFO.email}?subject=Digital Marketing Consultation Inquiry`}
                className="w-full py-2 px-3 rounded-lg bg-[#171F38] hover:bg-[#FF6B2C]/20 border border-[#1F2942] hover:border-[#FF6B2C] text-xs text-white font-bold text-center block transition-all"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="p-6 rounded-2xl bg-[#0B1020] border border-[#1F2942] hover:border-[#FFB14A]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FFB14A]/10 border border-[#FFB14A]/30 flex items-center justify-center text-[#FFB14A] mb-4 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Agency Headquarters</h3>
              <p className="text-xs text-[#A7ADBA] mb-3">Operating from Odisha, serving clients pan-India</p>
              <div className="text-xs font-medium text-white">{AGENCY_INFO.location}</div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F2942]">
              <button
                onClick={scrollToForm}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#FF6B2C] to-[#FF8945] text-xs text-white font-bold text-center block transition-all cursor-pointer shadow-md shadow-[#FF6B2C]/20"
              >
                Send Enquiry Form
              </button>
            </div>
          </div>

        </div>

        {/* Business Details Summary Box */}
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-[#0B1020] border border-[#1F2942] flex flex-wrap items-center justify-between gap-4 text-xs text-[#A7ADBA]">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#FF6B2C]" />
            <span>Agency Founder: <strong className="text-white">{AGENCY_INFO.founder}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FFB14A]" />
            <span>Consultation Hours: <strong className="text-white">Monday – Saturday (9:00 AM – 8:00 PM IST)</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};
