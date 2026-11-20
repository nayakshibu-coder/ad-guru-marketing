import React, { useState } from 'react';
import {
  FolderKanban,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle,
  HelpCircle,
  Tag
} from 'lucide-react';
import { PORTFOLIO_LIST } from '../data/agencyData';
import { getWhatsAppUrl, getPortfolioEnquiryMessage } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All',
    'Lead Generation',
    'Healthcare',
    'Construction & Real Estate',
    'E-Commerce',
    'Social Media & Branding',
    'Website Design'
  ];

  const filteredItems = filter === 'All'
    ? PORTFOLIO_LIST
    : PORTFOLIO_LIST.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-[#101522] relative border-t border-[#1F2942]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            CAMPAIGN FRAMEWORKS & CASE CONCEPTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Creative Campaigns. Strategic Execution.
          </h2>
          <p className="text-base sm:text-lg text-[#A7ADBA]">
            Explore our foundational campaign blueprints, conversion funnel frameworks, and creative design concepts.
          </p>

          {/* Honest Demo Notice */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0B1020] border border-[#1F2942] text-xs text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB14A]" />
            <span>Sample Project Architectures • Actual client assets updated upon launch</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-[#FF6B2C] text-white shadow-md shadow-[#FF6B2C]/20'
                  : 'bg-[#0B1020] text-[#A7ADBA] hover:text-white border border-[#1F2942]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#0B1020] border border-[#1F2942] hover:border-[#FF6B2C]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div>
                {/* Visual Banner Placeholder with High-End Styling */}
                <div className={`h-44 w-full bg-gradient-to-br ${item.imageGradient} p-5 flex flex-col justify-between relative overflow-hidden border-b border-[#1F2942]`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm border border-white/10">
                      {item.industry}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FF6B2C]/80 text-white">
                      Demo Blueprint
                    </span>
                  </div>

                  <div className="z-10">
                    <h3 className="text-lg font-bold text-white drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>

                  {/* Decorative mesh */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Delivered Services Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.servicesDelivered.map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium text-gray-300 bg-[#171F38] px-2 py-0.5 rounded border border-[#1F2942]"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#A7ADBA] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Sample Highlights */}
                  <div className="space-y-1.5 pt-3 border-t border-[#1F2942]/60 mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Execution Highlights:
                    </span>
                    {item.sampleHighlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: WhatsApp */}
              <div className="p-6 pt-0">
                <a
                  href={getWhatsAppUrl(getPortfolioEnquiryMessage(item.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl border border-[#1F2942] group-hover:border-[#25D366]/60 bg-[#101522] group-hover:bg-[#25D366]/10 text-white group-hover:text-[#25D366] text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Discuss Similar Project on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
