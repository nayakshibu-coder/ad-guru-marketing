import React, { useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  BarChart2,
  Users,
  CheckCircle2,
  Zap,
  ShieldCheck,
  MousePointerClick
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { getWhatsAppUrl, getHeroConsultationMessage, getHeroChatMessage } from '../utils/whatsapp';

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'funnel' | 'channels' | 'leads'>('funnel');

  const scrollToForm = () => {
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden bg-[#101522] grid-bg-pattern">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FF6B2C]/15 to-[#FFB14A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#0B1020] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-ping" />
                YOUR DIGITAL GROWTH PARTNER
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171F38] border border-[#1F2942] text-[#FFB14A] text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB14A]" />
                {AGENCY_INFO.hindiTagline}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Turn Your Business Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#FF8945] to-[#FFB14A]">
                Digital Growth Machine.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#A7ADBA] max-w-2xl leading-relaxed">
              Grow your online presence with strategic advertising, creative campaigns, high-converting websites and lead generation solutions built around your business goals.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={scrollToForm}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B2C] to-[#FF8945] hover:from-[#FF7A40] hover:to-[#FF6B2C] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF6B2C]/25 hover:shadow-[#FF6B2C]/40 transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>GET FREE CONSULTATION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={getWhatsAppUrl(getHeroChatMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <span>CHAT WITH ADGURU ON WHATSAPP</span>
              </a>
            </div>

            {/* Trust Line */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#A7ADBA]">
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2C]" />
                Smart Strategy
              </span>
              <span className="text-[#1F2942]">•</span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2C]" />
                Creative Execution
              </span>
              <span className="text-[#1F2942]">•</span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2C]" />
                Data-Driven Optimization
              </span>
            </div>

            {/* Verified Agency Location & Founder micro-badge */}
            <div className="flex items-center gap-3 text-xs text-[#A7ADBA]/80 pt-1">
              <span>📍 {AGENCY_INFO.location}</span>
              <span>•</span>
              <span>Founder: {AGENCY_INFO.founder}</span>
              <span>•</span>
              <span className="text-[#25D366] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                WhatsApp Direct Active
              </span>
            </div>
          </div>

          {/* Right Column: Premium Illustrative Dashboard Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#0B1020]/90 border border-[#1F2942] p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-all">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1F2942]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300 ml-2">Growth Dashboard Model</span>
                </div>
                <span className="text-[10px] text-[#A7ADBA] bg-[#101522] px-2 py-0.5 rounded border border-[#1F2942]">
                  Illustrative Framework
                </span>
              </div>

              {/* Sub-Tabs */}
              <div className="flex gap-1.5 mt-4 p-1 bg-[#101522] rounded-lg border border-[#1F2942]/60">
                <button
                  onClick={() => setActiveTab('funnel')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    activeTab === 'funnel' ? 'bg-[#FF6B2C] text-white shadow' : 'text-[#A7ADBA] hover:text-white'
                  }`}
                >
                  Funnel Model
                </button>
                <button
                  onClick={() => setActiveTab('channels')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    activeTab === 'channels' ? 'bg-[#FF6B2C] text-white shadow' : 'text-[#A7ADBA] hover:text-white'
                  }`}
                >
                  Media Mix
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    activeTab === 'leads' ? 'bg-[#FF6B2C] text-white shadow' : 'text-[#A7ADBA] hover:text-white'
                  }`}
                >
                  Lead Stream
                </button>
              </div>

              {/* Content Panel 1: Funnel Model */}
              {activeTab === 'funnel' && (
                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-lg bg-[#101522]/80 border border-[#1F2942] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-[#FF6B2C]/20 flex items-center justify-center text-[#FF6B2C]">
                        <MousePointerClick className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Targeted Traffic</div>
                        <div className="text-[11px] text-[#A7ADBA]">Meta + Google Ad Inflow</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#FFB14A] font-bold">Step 1</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#101522]/80 border border-[#1F2942] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">High-Converting Landing Page</div>
                        <div className="text-[11px] text-[#A7ADBA]">Intent Capture & Offer Match</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-blue-400 font-bold">Step 2</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#101522]/80 border border-[#1F2942] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">WhatsApp Lead Notification</div>
                        <div className="text-[11px] text-[#A7ADBA]">Instant Direct Delivery to Owner</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#25D366] font-bold">Step 3</span>
                  </div>
                </div>
              )}

              {/* Content Panel 2: Media Mix */}
              {activeTab === 'channels' && (
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-gray-300">Meta Ads (FB & Instagram)</span>
                      <span className="text-[#FF6B2C] font-bold">45% Focus</span>
                    </div>
                    <div className="w-full bg-[#101522] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF6B2C] h-full rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-gray-300">Google Ads (Search & Maps)</span>
                      <span className="text-[#FFB14A] font-bold">35% Focus</span>
                    </div>
                    <div className="w-full bg-[#101522] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FFB14A] h-full rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-gray-300">Website & Local SEO Conversion</span>
                      <span className="text-emerald-400 font-bold">20% Focus</span>
                    </div>
                    <div className="w-full bg-[#101522] h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>

                  <p className="text-[11px] text-[#A7ADBA] italic pt-1">
                    *Allocations are customized per business category and target customer.
                  </p>
                </div>
              )}

              {/* Content Panel 3: Lead Stream */}
              {activeTab === 'leads' && (
                <div className="mt-4 space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-[#101522] border border-[#1F2942] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Healthcare Clinic Enquiry</div>
                      <div className="text-[10px] text-[#A7ADBA]">Google Ads • Instant WhatsApp Alert</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#25D366]/20 text-[#25D366] font-semibold">
                      Delivered
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#101522] border border-[#1F2942] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Real Estate Project Brochure</div>
                      <div className="text-[10px] text-[#A7ADBA]">Meta Ads • Lead Form Completed</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#25D366]/20 text-[#25D366] font-semibold">
                      Delivered
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#101522] border border-[#1F2942] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Local Showroom Footfall Offer</div>
                      <div className="text-[10px] text-[#A7ADBA]">Instagram Reel Promo • Direct Chat</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#25D366]/20 text-[#25D366] font-semibold">
                      Delivered
                    </span>
                  </div>
                </div>
              )}

              {/* Floating Bottom Card: WhatsApp Lead Delivery Guarantee */}
              <div className="mt-4 pt-3 border-t border-[#1F2942] flex items-center justify-between bg-gradient-to-r from-[#25D366]/10 to-transparent p-3 rounded-xl border-l-4 border-l-[#25D366]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold">
                    <MessageCircle className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">100% Leads Routed To WhatsApp</div>
                    <div className="text-[10px] text-[#A7ADBA]">Direct to +91 8917545134</div>
                  </div>
                </div>
                <a
                  href={getWhatsAppUrl(`Hello AdGuru, I am checking out the growth dashboard on your website.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold transition-colors"
                >
                  Test Link
                </a>
              </div>

              {/* Clear Disclaimer as mandated by instruction */}
              <div className="mt-3 text-center">
                <span className="text-[10px] text-[#A7ADBA]/70">
                  Illustrative dashboard visualization. AdGuru builds customized setups tailored to your real market.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
