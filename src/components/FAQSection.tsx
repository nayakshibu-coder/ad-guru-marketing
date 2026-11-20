import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS_LIST } from '../data/agencyData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0B1020] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold tracking-wider uppercase">
            COMMON QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#A7ADBA]">
            Transparent answers on our services, ad budgets, and how our WhatsApp lead generation system works.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3.5">
          {FAQS_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#101522] border border-[#1F2942] transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#171F38]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-[#0B1020] border border-[#1F2942] flex items-center justify-center text-[#FF6B2C] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#FF6B2C]/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A7ADBA] leading-relaxed border-t border-[#1F2942]/60 bg-[#0B1020]/30 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Enquiry Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#101522] border border-[#1F2942] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">Still have questions?</h4>
            <p className="text-xs text-[#A7ADBA]">
              Connect directly with our team on WhatsApp for prompt clarification.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(`Hello AdGuru, I have a question that is not covered in your FAQ.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-2 transition-all shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
