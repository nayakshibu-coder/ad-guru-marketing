import React from 'react';
import {
  Compass,
  Palette,
  Crosshair,
  MessageSquare,
  BarChart3,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/agencyData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#FF6B2C]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#FFB14A]" />;
      case 'Crosshair':
        return <Crosshair className="w-6 h-6 text-emerald-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-blue-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-purple-400" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-[#FF6B2C]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#FF6B2C]" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#101522] relative border-t border-[#1F2942]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            WHY PARTNER WITH ADGURU
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Your Business Deserves More Than Random Marketing.
          </h2>
          <p className="text-base sm:text-lg text-[#A7ADBA]">
            Real growth requires clear strategic thinking, tailored creative work, and honest execution. Here is our commitment to every business owner we collaborate with.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={item.title}
              className="p-7 rounded-2xl bg-[#0B1020] border border-[#1F2942] hover:border-[#FF6B2C]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#171F38] border border-[#1F2942] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF6B2C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A7ADBA] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1F2942]/50 flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" />
                <span>AdGuru Core Practice #{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Business Transparency Disclaimer */}
        <div className="mt-12 p-5 rounded-xl bg-[#0B1020]/80 border border-[#1F2942] flex items-start gap-3.5 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-[#FFB14A] shrink-0 mt-0.5" />
          <div className="text-xs text-[#A7ADBA] leading-relaxed">
            <span className="font-bold text-white block mb-0.5">Our Transparency & Integrity Promise:</span>
            We believe in honest long-term client relationships. We do not make misleading guarantees of fixed numbers of leads, viral sales, or artificial ROAS multipliers. Market conditions, competitive bids, product pricing, and sales follow-ups all influence final outcomes. Our responsibility is to maximize campaign efficiency, test rigorously, and build high-converting assets.
          </div>
        </div>

      </div>
    </section>
  );
};
