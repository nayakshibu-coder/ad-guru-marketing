import React from 'react';
import { Search, Compass, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';

export const ProcessSection: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Search className="w-5 h-5 text-[#FF6B2C]" />;
      case 1:
        return <Compass className="w-5 h-5 text-[#FFB14A]" />;
      case 2:
        return <Rocket className="w-5 h-5 text-emerald-400" />;
      case 3:
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
      default:
        return <Search className="w-5 h-5 text-[#FF6B2C]" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-[#0B1020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our 4-Step Systematic Growth Process
          </h2>
          <p className="text-base sm:text-lg text-[#A7ADBA]">
            We follow an organized, transparent execution methodology so you always know what is being worked on and what comes next.
          </p>
        </div>

        {/* Desktop Timeline Flow (lg:grid-cols-4) */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6B2C] via-[#FFB14A] to-blue-500 -translate-y-8 z-0 opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#101522] border border-[#1F2942] hover:border-[#FF6B2C]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Step indicator & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black font-mono text-[#FF6B2C]/30 group-hover:text-[#FF6B2C] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#171F38] border border-[#1F2942] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#FF6B2C] transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs text-[#FFB14A] font-semibold mb-3">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#A7ADBA] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="pt-3 border-t border-[#1F2942]/60 space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Key Deliverables:
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
