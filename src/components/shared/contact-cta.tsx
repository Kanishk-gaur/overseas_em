"use client";
import { ContactAction } from "./contact-action";
import { useLocale } from "./locale-provider";
import { Eyebrow, Reveal } from "./ui";

export function ContactCTA() {
  const { d, t } = useLocale();
  return <section className="contact-cta"><div className="container"><Reveal className="contact-cta-inner"><div><Eyebrow>{d.contactEyebrow}</Eyebrow><h2>{d.contactTitle}</h2></div><div className="contact-cta-actions"><p>{d.contactBody}</p><div className="button-row"><ContactAction variant="navy" /><ContactAction method="phone" variant="white" /></div><span className="contact-cta-note">{t("For candidates and international employers.", "उम्मीदवारों और विदेशी नियोक्ताओं के लिए।")}</span></div></Reveal></div></section>;
}
