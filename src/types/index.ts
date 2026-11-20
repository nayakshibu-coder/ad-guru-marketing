export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  badge?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  headline: string;
  marketingApproach: string;
  keyBenefits: string[];
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  industry: string;
  servicesDelivered: string[];
  description: string;
  isDemo: boolean;
  sampleHighlights: string[];
  imageGradient: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  idealFor: string;
  inclusions: string[];
  ctaLabel: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface LeadSubmission {
  fullName: string;
  businessName: string;
  contactNumber: string;
  businessLocation: string;
  businessCategory: string;
  interestedServices: string[];
  adBudget: string;
  requirements: string;
  consent: boolean;
}

export interface LeadRecord extends LeadSubmission {
  id: string;
  submittedAt: string;
  whatsappDeliveryStatus: 'DIRECT_WHATSAPP' | 'DELIVERED' | 'SAVED' | 'NOT_CONFIGURED' | 'FAILED' | 'PENDING' | string;
  whatsappDeliveryDetails?: string;
  providerResponse?: unknown;
}
