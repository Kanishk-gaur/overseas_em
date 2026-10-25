"use client";
import { ArrowUpRight } from "lucide-react";
import { photography } from "@/data/photography";
import { services, serviceAliases } from "@/data/services";
import { useLocale } from "@/components/shared/locale-provider";
import { PageHero, Photo, Reveal, TextLink } from "@/components/shared/ui";
import { ContactCTA } from "@/components/shared/contact-cta";

export function ServicesPage() {
  const { t, d, local } = useLocale();
  return <><PageHero eyebrow={d.nav[2]} title={d.servicesTitle} description={t("Sourcing, assessment, documentation and arrival coordination for Indian workers and international employers. Explore the support available at each stage.", "भारतीय कामगारों और विदेशी नियोक्ताओं के लिए खोज, मूल्यांकन, दस्तावेज़ और आगमन का समन्वय। हर चरण का सहयोग जानें।")} image={photography.screening} imageAlt={t("A modern industrial production facility", "एक आधुनिक औद्योगिक उत्पादन संयंत्र")} /><div className="directory-jump"><div className="container">{services.map((s,i) => <a href={`#${s.slug}`} key={s.slug}><span>{String(i+1).padStart(2,"0")}</span>{local(s.title)}<ArrowUpRight size={14} /></a>)}</div></div><section className="section"><div className="container service-detail-list">{services.map((s,i) => <Reveal key={s.slug} className={`service-detail ${i%2 ? "reverse" : ""}`}><div id={s.slug} className="anchor-target" />{Object.entries(serviceAliases).filter(([, target]) => target === s.slug).map(([alias]) => <div id={alias} className="anchor-target" key={alias} />)}<Photo src={s.image} alt={local(s.title)} /><div className="service-detail-copy"><span className="detail-number">{String(i+1).padStart(2,"0")} /</span><h2>{local(s.title)}</h2><p>{local(s.description)}</p><div className="roles-label">{t("WHERE WE CAN HELP", "हम कहाँ मदद कर सकते हैं")}</div><p className="roles-copy">{local(s.examples)}</p><TextLink href={i === 3 ? "/contact?type=employer" : "/contact"}>{d.enquire}</TextLink></div></Reveal>)}</div></section><ContactCTA /></>;
}

export { IndustriesPage, CountriesPage } from "./catalog-pages";
