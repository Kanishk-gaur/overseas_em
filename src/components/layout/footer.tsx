"use client";
import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, Phone, Linkedin, Instagram, Facebook } from "lucide-react";
import { Logo, paths } from "./header";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { useLocale } from "@/components/shared/locale-provider";
import { ContactAction } from "@/components/shared/contact-action";

export function Footer() {
  const { d, local, t } = useLocale();
  return <><footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Logo light /><p>{d.footerBody}</p><div className="footer-tagline">{d.eyebrow}</div><div className="social-links">{Object.entries(site.social).filter(([, url]) => !!url).map(([name, url]) => { const Icon = name === "linkedin" ? Linkedin : name === "facebook" ? Facebook : Instagram; return <a href={url} key={name} aria-label={name} target="_blank" rel="noopener noreferrer"><Icon size={19} /></a>; })}</div></div><div><h3>{d.footerNavigate}</h3><ul>{paths.slice(1).map((path, i) => <li key={path}><Link href={path}>{d.nav[i + 1]}</Link></li>)}</ul></div><div><h3>{d.footerServices}</h3><ul>{services.slice(0,4).map(service => <li key={service.slug}><Link href={`/services#${service.slug}`}>{local(service.title)}</Link></li>)}<li><Link href="/industries">{d.allIndustries}</Link></li></ul></div><div className="footer-contact"><h3>{d.footerContact}</h3><p><MapPin size={17} /><span>{site.contact.address || d.footerLocation}</span></p>{site.contact.phone && <a href={`tel:${site.contact.phone}`}><Phone size={16} />{site.contact.phone}</a>}{site.contact.email && <a href={`mailto:${site.contact.email}`}><Mail size={16} />{site.contact.email}</a>}<Link href="/contact" className="footer-contact-link">{t("Start a conversation", "बातचीत शुरू करें")}<ArrowUpRight size={16} /></Link>{site.registration && <p>{site.registration}</p>}</div></div><div className="footer-disclaimer">{d.footerNote}</div><div className="footer-bottom"><p>© {new Date().getFullYear()} {site.legalName}. {d.rights}</p><div><Link href="/privacy-policy">{d.privacy}</Link><Link href="/terms">{d.terms}</Link></div><a href="#top" className="back-top">{t("Back to top", "ऊपर जाएँ")} ↑</a></div></div></footer><div className="mobile-contact-bar"><ContactAction compact /><ContactAction method="phone" variant="navy" compact /></div></>;
}
