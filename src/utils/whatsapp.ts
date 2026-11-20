export const AGENCY_PHONE_DISPLAY = '+91 8917545134';
export const AGENCY_PHONE_RAW = '918917545134';
export const AGENCY_EMAIL = 'nayakshibu578@gmail.com';
export const AGENCY_LOCATION = 'Buguda, Ganjam, Odisha, India';
export const FOUNDER_NAME = 'Shibu Kumar Nayak';

/**
 * Builds a universal WhatsApp link for mobile and web
 */
export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${AGENCY_PHONE_RAW}?text=${encoded}`;
}

export function getHeroConsultationMessage(): string {
  return `Hello Shibu & AdGuru Team,

I visited your website and would like to claim a FREE Digital Growth Consultation for my business.

Could you please connect with me to discuss our marketing strategy?

Thank you!`;
}

export function getAuditConsultationMessage(): string {
  return getHeroConsultationMessage();
}

export function getHeroChatMessage(): string {
  return `Hello AdGuru Team! 👋

I'm exploring your digital marketing services on your website and would love to chat about growing my business online.`;
}

export function getServiceEnquiryMessage(serviceName: string): string {
  return `Hello AdGuru Team,

I am interested in your "${serviceName}" service for my business. 

Please share details about your approach, execution process, and how we can get started.`;
}

export function getIndustryEnquiryMessage(industryName: string): string {
  return `Hello AdGuru Team,

I run a business in the "${industryName}" industry and saw your specialized marketing approach on the website.

I would like to discuss a customized growth strategy for my brand.`;
}

export function getPortfolioEnquiryMessage(projectTitle: string): string {
  return `Hello AdGuru Team,

I reviewed your case study / sample project "${projectTitle}". 

We have similar requirements and would like to explore running a similar campaign for our business.`;
}

export function getPricingPackageMessage(packageName: string): string {
  return `Hello AdGuru Team,

I am interested in the "${packageName}" package on your website. 

Could you please share full scope details, onboarding requirements, and discuss tailored pricing for our business?`;
}

export function getFloatingButtonMessage(): string {
  return `Hello AdGuru Digital Marketing Agency,

I have a quick enquiry regarding your marketing and growth services. Could you please assist me?`;
}

export function formatFullLeadMessage(lead: {
  id: string;
  fullName: string;
  businessName: string;
  contactNumber: string;
  businessLocation: string;
  businessCategory: string;
  interestedServices: string[];
  adBudget?: string;
  requirements?: string;
  submittedAt?: string;
}): string {
  const servicesStr = lead.interestedServices && lead.interestedServices.length > 0 ? lead.interestedServices.join(', ') : 'Not specified';
  const budgetStr = lead.adBudget || 'Not Decided';
  const reqStr = lead.requirements?.trim() ? lead.requirements.trim() : 'None provided';
  const timestampStr = lead.submittedAt
    ? new Date(lead.submittedAt).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

  return `🚀 NEW WEBSITE LEAD — ADGURU

Lead ID: ${lead.id}

👤 Name: ${lead.fullName}
🏢 Business: ${lead.businessName}
📞 Contact: ${lead.contactNumber}
📍 Location: ${lead.businessLocation}
🏷️ Category: ${lead.businessCategory}
🎯 Services: ${servicesStr}
💰 Ad Budget: ${budgetStr}
📝 Requirements: ${reqStr}

Source: AdGuru Website
Submitted At: ${timestampStr}

Follow-up: Contact the lead to discuss their requirements.`;
}

export function formatAuditLeadMessage(lead: {
  id: string;
  fullName: string;
  businessName: string;
  whatsappNumber: string;
  businessCategory: string;
  websiteOrSocial?: string;
  city: string;
  monthlyBudget?: string;
  marketingGoal?: string;
  submittedAt?: string;
}): string {
  return formatFullLeadMessage({
    id: lead.id,
    fullName: lead.fullName,
    businessName: lead.businessName,
    contactNumber: lead.whatsappNumber,
    businessLocation: lead.city,
    businessCategory: lead.businessCategory,
    interestedServices: lead.marketingGoal ? [lead.marketingGoal] : [],
    adBudget: lead.monthlyBudget,
    requirements: lead.websiteOrSocial,
    submittedAt: lead.submittedAt,
  });
}
