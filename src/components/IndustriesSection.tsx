import React from 'react';
import {
  Stethoscope,
  Building2,
  ShoppingBag,
  UtensilsCrossed,
  Layers,
  GraduationCap,
  Briefcase,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { INDUSTRIES_LIST } from '../data/agencyData';
import { getWhatsAppUrl, getIndustryEnquiryMessage } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const IndustriesSection: React.FC = () => {
  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-cyan-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#FFB14A]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-rose-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      default:
        return <Building2 className="w-5 h-5 text-[#FF6B2C]" />;
    }
  };

  return (
    <section id="industries" className="py-24 bg-[#0B1020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            TARGETED INDUSTRY SOLUTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tailored Marketing for Your Specific Industry
          </h2>
          <p className="text-base sm:text-lg text-[#A7ADBA]">
            A dental clinic does not market the same way as a real estate developer. We adapt channels, messaging, and lead funnels to your specific market dynamics.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_LIST.map((ind) => (
            <div
              key={ind.id}
              className="p-6 rounded-2xl bg-[#101522] border border-[#1F2942] hover:border-[#FF6B2C]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 flex flex-col justify-between group"
            >
              <div>
                {/* Industry Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#171F38] border border-[#1F2942] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIndustryIcon(ind.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF6B2C] transition-colors">
                      {ind.name}
                    </h3>
                    <span className="text-[11px] text-[#FFB14A] font-medium block">
                      {ind.headline}
                    </span>
                  </div>
                </div>

                {/* Marketing Approach */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Marketing Approach
                  </span>
                  <p className="text-xs text-[#A7ADBA] leading-relaxed">
                    {ind.marketingApproach}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#1F2942]">
                  {ind.keyBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(getIndustryEnquiryMessage(ind.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl border border-[#1F2942] group-hover:border-[#25D366]/60 bg-[#171F38] group-hover:bg-[#25D366]/10 text-white group-hover:text-[#25D366] text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Enquire on WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
