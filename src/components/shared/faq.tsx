"use client";
import { Plus } from "lucide-react";
import { faqs as recruitmentFaqs } from "@/data/faq";
const faqs = [0, 1, 4, 9, 10, 13].map(index => recruitmentFaqs[index]);
import { useLocale } from "./locale-provider";
import { Eyebrow, TextLink } from "./ui";

export function FAQ() {
  const { d, local, t } = useLocale();
  return <section className="section faq-section"><div className="container faq-layout"><div><Eyebrow>{d.faq}</Eyebrow><h2>{d.faqTitle}</h2><p className="body-copy">{d.faqBody}</p><TextLink href="/employers#employer-faq-heading">{t("Employer recruitment FAQs", "नियोक्ता भर्ती के सामान्य सवाल")}</TextLink></div><div className="faq-list">{faqs.map((faq, i) => <details key={i}><summary><span className="faq-number" aria-hidden="true">{String(i+1).padStart(2,"0")}</span><span>{local(faq.question)}</span><Plus size={19} aria-hidden="true" /></summary><p>{local(faq.answer)}</p></details>)}</div></div></section>;
}
