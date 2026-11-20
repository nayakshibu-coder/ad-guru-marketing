import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { AGENCY_INFO } from '../data/agencyData';
import { getWhatsAppUrl, getHeroConsultationMessage } from '../utils/whatsapp';

interface NavbarProps {
  onOpenAdmin: () => void;
  leadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, leadCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Industries', href: '#industries' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleConsultationClick = () => {
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(getWhatsAppUrl(getHeroConsultationMessage()), '_blank');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1020]/95 backdrop-blur-md border-b border-[#1F2942] py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-white p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center shrink-0 border border-white/20">
              <img
                src="/assets/aistudio/ChatGPT_Image_Aug_15__2026__07_07_01_PM_afd114e2.png"
                alt="AdGuru Digital Marketing Agency Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-lg text-white group-hover:text-[#FF6B2C] transition-colors leading-tight">
                AdGuru
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#A7ADBA] font-medium">
                Digital Marketing
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#A7ADBA] hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#FF6B2C] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Admin Lead Access */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Agency Portal / Lead Hub Button */}
            <button
              onClick={onOpenAdmin}
              title="Agency Lead Dashboard & WhatsApp Status"
              className="px-2.5 py-1.5 rounded-lg border border-[#1F2942] hover:border-[#FF6B2C]/50 bg-[#101522]/80 hover:bg-[#171F38] text-xs text-[#A7ADBA] hover:text-white flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B2C]" />
              <span className="font-medium">Agency Leads</span>
              {leadCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-[#FF6B2C] text-white rounded-full font-bold">
                  {leadCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={getWhatsAppUrl(`Hello ${AGENCY_INFO.brandName}, I would like to chat about digital marketing for my business.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#25D366] to-[#20ba59] hover:from-[#20ba59] hover:to-[#25D366] text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-[#25D366]/25 hover:shadow-[#25D366]/40 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              aria-label="Agency leads"
              className="p-2 rounded-lg bg-[#101522] border border-[#1F2942] text-[#A7ADBA]"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF6B2C]" />
            </button>

            <a
              href={`tel:${AGENCY_INFO.phone.replace(/\s+/g, '')}`}
              className="p-2 rounded-lg bg-[#101522] border border-[#1F2942] text-[#FF6B2C]"
              aria-label="Call AdGuru"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#171F38] text-white border border-[#1F2942] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1020] border-b border-[#1F2942] px-4 pt-3 pb-6 animate-fadeIn shadow-2xl">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-200 hover:text-[#FF6B2C] py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={getWhatsAppUrl(`Hello AdGuru, I am contacting you from the mobile website navigation.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp (+91 8917545134)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
