"use client";
import { ArrowUpRight } from "lucide-react";
import { ContactAction } from "./contact-action";
import { useLocale } from "./locale-provider";
import { Eyebrow, Reveal } from "./ui";

export function ContactCTA() {
  const { d } = useLocale();
  return <section className="contact-cta"><div className="container"><Reveal className="contact-cta-inner"><div><Eyebrow>{d.contactEyebrow}</Eyebrow><h2>{d.contactTitle}</h2><p>{d.contactBody}</p></div><div className="contact-cta-actions"><span className="cta-orbit" aria-hidden="true"><ArrowUpRight strokeWidth={1} /></span><div className="button-row"><ContactAction variant="navy" /><ContactAction method="phone" variant="white" /></div></div></Reveal></div></section>;
}
