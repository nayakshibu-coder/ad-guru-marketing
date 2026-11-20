import React from 'react';
import {
  Share2,
  Search,
  Instagram,
  Youtube,
  TrendingUp,
  Users,
  Globe,
  Target,
  Sparkles,
  MapPin,
  MessageCircle,
  ArrowRight,
  Check
} from 'lucide-react';
import { SERVICES_LIST } from '../data/agencyData';
import { getWhatsAppUrl, getServiceEnquiryMessage } from '../utils/whatsapp';

export const ServicesSection: React.FC = () => {
  // Mapping of string icon names to Lucide icon components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#FF6B2C]" />;
      case 'Search':
        return <Search className="w-5 h-5 text-[#FFB14A]" />;
      case 'Instagram':
        return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-[#FF6B2C]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#FFB14A]" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-red-400" />;
      default:
        return <Target className="w-5 h-5 text-[#FF6B2C]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0B1020] relative">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#FF6B2C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            END-TO-END DIGITAL SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Grow Your Business Online
          </h2>
          <p className="text-base sm:text-lg text-[#A7ADBA]">
            From high-intent paid advertising to search optimization, conversion websites, and automated WhatsApp lead capture.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, idx) => (
            <div
              key={service.id}
              className={`rounded-2xl bg-[#101522] border border-[#1F2942] hover:border-[#FF6B2C]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF6B2C]/10 group ${
                service.badge ? 'relative' : ''
              }`}
            >
              <div>
                {/* Top Bar with Icon & Optional Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#171F38] border border-[#1F2942] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {renderIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 text-[#FF6B2C]">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Name */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B2C] transition-colors mb-2">
                  {service.name}
                </h3>

                {/* Short Benefit-Focused Description */}
                <p className="text-sm text-[#A7ADBA] leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Feature Checklist */}
                <ul className="space-y-2 mb-6 pt-2 border-t border-[#1F2942]">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-gray-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Contextual WhatsApp */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(getServiceEnquiryMessage(service.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-[#1F2942] group-hover:border-[#25D366]/60 bg-[#171F38] group-hover:bg-[#25D366]/10 text-white group-hover:text-[#25D366] text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/20" />
                  <span>Get Details on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner to Custom Bundle */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171F38] to-[#101522] border border-[#1F2942] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">Need a Customized Multi-Channel Strategy?</h4>
            <p className="text-sm text-[#A7ADBA]">
              We bundle advertising, landing pages, and automated WhatsApp routing specifically for your business.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(`Hello Shibu & AdGuru Team, I would like to discuss a custom multi-channel service bundle for my business.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#25D366]/20 flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Discuss Custom Plan on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
