import { images } from "@/config/site";
import countryData from "./recruitment/countries.json";
import industryData from "./recruitment/industries.json";

export const countryAliases: Record<string, string> = { uk: "united-kingdom" };
export const industryAliases: Record<string, string> = {
  "logistics-warehousing": "logistics",
  "facilities-management": "facilities",
  "it-engineering": "it-professional",
};

export function countryInformation(slug: string) {
  return countryData.countries.find(country => (countryAliases[country.slug] || country.slug) === (countryAliases[slug] || slug));
}

export function industryInformation(slug: string) {
  return industryData.industries.find(industry => (industryAliases[industry.slug] || industry.slug) === (industryAliases[slug] || slug));
}

export const industryImages: Record<string, string> = {
  Construction: images.construction,
  Manufacturing: images.manufacturing,
  Healthcare: images.healthcare,
  Hospitality: images.hospitality,
  "IT & Engineering": images.professional,
  "Facilities Management": images.technical,
  "Logistics & Warehousing": images.logistics,
  Agriculture: images.agriculture,
};

export const blogImages: Record<string, string> = {
  "japan-ssw-employer-sponsorship-2026": "japan-ssw",
  "germany-work-visa-sponsorship-guide": "germany-visa",
  "documents-checklist-hiring-workers-russia": "russia-documents",
  "bulk-workforce-orders-what-employers-should-know": "bulk-orders",
  "common-mistakes-employers-overseas-hiring": "common-mistakes",
  "uae-employment-visa-labor-card-guide": "uae-visa",
  "poland-type-d-visa-eu-work-permit": "poland-visa",
  "israel-b1-work-visa-guide": "israel-b1",
  "technical-vs-non-technical-hiring-guide": "technical-vs-non-technical",
};

export const caseImages: Record<string, string> = {
  "healthcare-group-japan-caregivers": "japan-caregivers",
  "engineering-firm-germany-technicians": "germany-technicians",
  "construction-firm-russia-bulk-order": "russia-construction",
  "it-services-germany-developers": "germany-developers",
  "facilities-management-uae-bulk-order": "uae-facilities",
  "construction-saudi-arabia-engineers": "saudi-engineers",
  "logistics-poland-warehouse-workers": "poland-warehouse",
  "hospitality-qatar-staff": "qatar-hospitality",
  "care-services-israel-caregivers": "israel-caregivers",
};

export const resourceLinks = [
  { href: "/workforce", en: "Workforce directory", hi: "कामगार निर्देशिका" },
  { href: "/find-a-job", en: "Find a job", hi: "नौकरी खोजें" },
  { href: "/request-workforce", en: "Request workforce", hi: "कामगारों की ज़रूरत बताएँ" },
  { href: "/team", en: "Our team", hi: "हमारी टीम" },
  { href: "/how-we-work", en: "How we work", hi: "हम कैसे काम करते हैं" },
  { href: "/blog", en: "Insights & guides", hi: "लेख और मार्गदर्शन" },
  { href: "/case-studies", en: "Hiring scenarios", hi: "भर्ती के उदाहरण" },
  { href: "/compliance", en: "Recruitment standards", hi: "भर्ती के मानक" },
  { href: "/glossary", en: "Visa & recruitment glossary", hi: "वीज़ा और भर्ती शब्दावली" },
];
