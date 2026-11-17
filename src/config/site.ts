import { photography } from "@/data/photography";

/**
 * Canonical site address. Every absolute URL (canonical links, Open Graph,
 * JSON-LD, sitemap.xml and robots.txt) is built from this one value.
 * Override it per environment with NEXT_PUBLIC_SITE_URL (see .env.example).
 * aarohamoverseas.in redirects to this domain at the host; never use it here.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.aarohamoverseas.com").replace(/\/+$/, "");

export const site = {
  /** Wordmark shown in the header and footer logo: "Aaroham. OVERSEAS". */
  name: "Aaroham",
  descriptor: "OVERSEAS",
  /** Brand name for page titles, Open Graph and general copy. */
  brandName: "Aaroham Overseas",
  /** Registered company name. Use only for the copyright line, legal pages, contact page and structured data. */
  legalName: "AAROHAM OVERSEAS PRIVATE LIMITED",
  tagline: "Indian Talent. Global Opportunities.",
  taglineHi: "भारतीय प्रतिभा। दुनिया भर में अवसर।",
  url: SITE_URL,
  /** Company registration details. Each one is displayed only once filled in. */
  company: {
    registeredOffice: "", // TODO(owner): registered office address, as on the certificate of incorporation.
    cin: "", // TODO(owner): Corporate Identification Number (CIN).
    raLicence: "", // TODO(owner): MEA Recruiting Agent (RA) licence number.
  },
  contact: {
    phone: "", // TODO(owner): verified phone number, e.g. "+91 …".
    whatsapp: "", // TODO(owner): verified WhatsApp number in international format.
    email: "", // TODO(owner): confirm the mailbox, e.g. "contact@aarohamoverseas.com", before adding it.
    address: "", // TODO(owner): office address shown on the contact page.
    officeHours: "",
    mapUrl: "",
  },
  social: { linkedin: "", facebook: "", instagram: "" },
};

export const images = {
  hero: "/images/hero-workshop.webp",
  portrait: "/images/worker-portrait.webp",
  about: photography.welder,
  construction: photography.construction,
  manufacturing: photography.manufacturing,
  technical: photography.engineering,
  logistics: photography.warehouse,
  hospitality: photography.chef,
  healthcare: photography.nurse,
  agriculture: photography.agriculture,
  energy: "/images/energy.webp",
  professional: photography.software,
  dubai: "/images/dubai.webp",
  saudi: "/images/saudi.webp",
  qatar: "/images/qatar.webp",
  germany: "/images/germany.webp",
  japan: "/images/japan.webp",
  europe: "/images/europe.webp",
  oman: "/images/oman.webp",
  kuwait: "/images/kuwait.webp",
  bahrain: "/images/bahrain.webp",
  poland: "/images/poland.webp",
  romania: "/images/romania.webp",
  uk: "/images/uk.webp",
};
