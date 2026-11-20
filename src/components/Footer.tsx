import React from 'react';
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Globe
} from 'lucide-react';
import { AGENCY_INFO, SERVICES_LIST } from '../data/agencyData';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mainServices = SERVICES_LIST.slice(0, 6);

  return (
    <footer className="bg-[#0B1020] border-t border-[#1F2942] pt-16 pb-12 text-[#A7ADBA] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1F2942]">
          
          {/* Brand Column (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-md shadow-blue-500/20 overflow-hidden flex items-center justify-center shrink-0 border border-white/20">
                <img
                  src="/assets/aistudio/ChatGPT_Image_Aug_15__2026__07_07_01_PM_afd114e2.png"
                  alt="AdGuru Digital Marketing Agency"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="font-extrabold tracking-tight text-xl text-white">
                AdGuru
              </span>
            </div>

            <p className="text-xs text-[#A7ADBA] leading-relaxed max-w-sm">
              Premium digital marketing agency helping businesses scale through strategic Meta & Google Ads, high-converting websites, and automated WhatsApp lead generation systems.
            </p>

            <div className="pt-1">
              <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">
                Founder & Lead Strategist:
              </div>
              <div className="text-gray-200 font-semibold">{AGENCY_INFO.founder}</div>
            </div>

            {/* Social Media Links (Editable) */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-[#171F38] border border-[#1F2942] flex items-center justify-center text-gray-300 hover:text-[#FF6B2C] hover:border-[#FF6B2C] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-[#171F38] border border-[#1F2942] flex items-center justify-center text-gray-300 hover:text-[#FF6B2C] hover:border-[#FF6B2C] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-[#171F38] border border-[#1F2942] flex items-center justify-center text-gray-300 hover:text-[#FF6B2C] hover:border-[#FF6B2C] transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#171F38] border border-[#1F2942] flex items-center justify-center text-gray-300 hover:text-[#FF6B2C] hover:border-[#FF6B2C] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why AdGuru</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Industries</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Founder Bio</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Core Services (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Key Services
            </h4>
            <ul className="space-y-2">
              {mainServices.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-[#FF6B2C] transition-colors block truncate">
                    {s.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" className="text-[#FF6B2C] font-semibold hover:underline block pt-1">
                  View All 10 Services →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Agency Contact
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFB14A] shrink-0 mt-0.5" />
                <span className="text-gray-300">{AGENCY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={`tel:${AGENCY_INFO.phone.replace(/\s+/g, '')}`} className="text-white hover:underline font-mono">
                  {AGENCY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                <a href={`mailto:${AGENCY_INFO.email}`} className="text-gray-300 hover:text-white truncate">
                  {AGENCY_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl(`Hello Shibu & AdGuru team, I'm reaching out from the website footer.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366] text-[#25D366] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Tagline & Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-extrabold tracking-wider text-white text-xs uppercase">
              {AGENCY_INFO.primaryTagline}
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="text-[11px] text-[#A7ADBA]">
              © {AGENCY_INFO.copyrightYear} {AGENCY_INFO.brandName}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenPrivacy}
              className="text-[#A7ADBA] hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={onOpenTerms}
              className="text-[#A7ADBA] hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={onOpenAdmin}
              className="text-[#FF6B2C] hover:underline font-semibold cursor-pointer"
            >
              Agency Leads Portal
            </button>
            <button
              onClick={scrollToTop}
              title="Scroll to Top"
              className="w-7 h-7 rounded-lg bg-[#171F38] border border-[#1F2942] hover:bg-[#1F2942] flex items-center justify-center text-gray-300 hover:text-white ml-2 transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
