/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { IndustriesSection } from './components/IndustriesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { EnquiryFormSection } from './components/EnquiryFormSection';
import { FounderSection } from './components/FounderSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdminLeadsDrawer } from './components/AdminLeadsDrawer';
import { PrivacyPolicyModal, TermsModal } from './components/LegalModals';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [leadCount, setLeadCount] = useState<number>(0);

  const fetchLeadCount = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        if (typeof data.count === 'number') {
          setLeadCount(data.count);
        }
      }
    } catch {
      // Ignore initial offline/static render
    }
  };

  useEffect(() => {
    fetchLeadCount();
  }, []);

  return (
    <div className="min-h-screen bg-[#101522] text-white flex flex-col selection:bg-[#FF6B2C] selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        leadCount={leadCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive Dashboard Visual */}
        <HeroSection />

        {/* 2. 10 Core Services with Contextual WhatsApp Action */}
        <ServicesSection />

        {/* 3. Why Choose AdGuru (6 Honest Benefit Cards) */}
        <WhyChooseUs />

        {/* 4. Industries We Serve (7 Industries) */}
        <IndustriesSection />

        {/* 5. Portfolio and Case Concepts */}
        <PortfolioSection />

        {/* 6. How It Works (4-Step Process Timeline) */}
        <ProcessSection />

        {/* 7. Pricing and Growth Packages */}
        <PricingSection />

        {/* 8. Full Conversion Lead Enquiry Form */}
        <EnquiryFormSection onLeadSubmitted={fetchLeadCount} />

        {/* 9. Meet the Founder (Shibu Kumar Nayak) */}
        <FounderSection />

        {/* 10. Frequently Asked Questions (8 Accordions) */}
        <FAQSection />

        {/* 11. Verified Contact Section */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Fixed WhatsApp Floating CTA Button */}
      <WhatsAppFloatingButton />

      {/* Agency Lead Management Drawer / Audit Trail */}
      <AdminLeadsDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onLeadsUpdated={fetchLeadCount}
      />

      {/* Legal Modals */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </div>
  );
}
