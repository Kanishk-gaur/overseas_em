import { site } from "@/config/site";

export type EnquiryType = "candidate" | "employer";
export function contactHref(method: "whatsapp" | "phone" | "email", type: EnquiryType = "candidate") {
  const c = site.contact;
  const message = type === "candidate"
    ? "Hello, I am interested in learning about overseas employment opportunities. Please guide me."
    : "Hello, I would like to discuss manpower recruitment requirements for my company.";
  if (method === "whatsapp" && c.whatsapp) return `https://wa.me/${c.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  if (method === "phone" && c.phone) return `tel:${c.phone.replace(/[^+\d]/g, "")}`;
  if (method === "email" && c.email) return `mailto:${c.email}?subject=${encodeURIComponent(type === "employer" ? "Employer workforce enquiry" : "Overseas employment enquiry")}&body=${encodeURIComponent(message)}`;
  return null;
}
