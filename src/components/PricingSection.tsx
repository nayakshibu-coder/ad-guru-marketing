import React from 'react';
import { Check, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/agencyData';
import { getWhatsAppUrl, getPricingPackageMessage } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-[#101522] relative border-t border-[#1F2942]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            GROWTH PACKAGES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Choose the Right Digital Growth Plan
          </h2>
          <p className="text-base sm:text-lg text-[#A7ADBA]">
            Transparent service packages tailored to your business stage. Every plan is customized based on your category and growth targets.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-[#0B1020] border-2 border-[#FF6B2C] shadow-2xl shadow-[#FF6B2C]/10 -translate-y-2'
                  : 'bg-[#0B1020] border border-[#1F2942] hover:border-[#FF6B2C]/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8945] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-[#A7ADBA]">{plan.tagline}</p>
                </div>

                {/* Scope Note instead of fake prices */}
                <div className="p-3.5 rounded-xl bg-[#171F38] border border-[#1F2942] mb-6">
                  <div className="text-[11px] uppercase font-bold text-[#FFB14A] tracking-wider mb-0.5">
                    Custom Quoted For Your Business
                  </div>
                  <div className="text-xs text-gray-300">
                    Ideal for: <span className="text-white font-medium">{plan.idealFor}</span>
                  </div>
                </div>

                {/* Inclusions List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    What is Included:
                  </span>
                  {plan.inclusions.map((inc, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2.5 text-xs text-gray-200">
                      <div className="w-4 h-4 rounded-full bg-[#FF6B2C]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#FF6B2C]" />
                      </div>
                      <span className="leading-tight">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: WhatsApp */}
              <div>
                <a
                  href={getWhatsAppUrl(getPricingPackageMessage(plan.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#FF6B2C] to-[#FF8945] hover:from-[#FF7A40] hover:to-[#FF6B2C] text-white shadow-lg shadow-[#FF6B2C]/20'
                      : 'bg-[#171F38] hover:bg-[#25D366]/20 border border-[#1F2942] hover:border-[#25D366] text-white hover:text-[#25D366]'
                  }`}
                >
                  <WhatsAppIcon className={plan.popular ? 'w-4 h-4 text-white' : 'w-4 h-4 text-[#25D366]'} />
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Media Spend Policy Notice */}
        <div className="mt-12 p-5 rounded-xl bg-[#0B1020] border border-[#1F2942] flex items-start gap-3.5 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-[#FF6B2C] shrink-0 mt-0.5" />
          <div className="text-xs text-[#A7ADBA] leading-relaxed">
            <span className="font-bold text-white block mb-0.5">Important Advertising Budget Notice:</span>
            Advertising spend on Meta (Facebook & Instagram) and Google is paid directly to the ad platforms through the client’s own payment method. AdGuru charges a management and strategy retainer. Media ad spend is separate unless a specialized all-inclusive package is explicitly contracted.
          </div>
        </div>

      </div>
    </section>
  );
};
