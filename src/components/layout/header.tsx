"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe2, Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { useLocale } from "@/components/shared/locale-provider";
import { BrandMark } from "@/components/shared/brand-mark";

export const paths = ["/", "/about", "/services", "/industries", "/countries", "/employers", "/process", "/contact"];
export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useLocale();
  return <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label={`${site.legalName} — ${t("Home", "होम")}`}><BrandMark /><span><strong>{site.name}<span className="brand-dot">.</span></strong><small>{site.descriptor}</small></span></Link>;
}
export function Header() {
  const { d, language, setLanguage, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey); }, [open]);
  return <>
    <a className="skip-link" href="#main">{t("Skip to content", "मुख्य सामग्री पर जाएँ")}</a>
    <div className="utility-bar"><div className="container"><span>{d.eyebrow}</span><span className="utility-right">{t("Based in India. Looking beyond borders.", "भारत से। सीमाओं के पार संभावनाओं की ओर।")}</span></div></div>
    <header className="site-header"><div className="container header-inner"><Logo /><nav aria-label={t("Main navigation", "मुख्य नेविगेशन")} className="desktop-nav">{paths.slice(0, 7).map((href, i) => <Link key={href} href={href} className={pathname.replace(/\/$/, "") === href.replace(/\/$/, "") ? "active" : ""} aria-current={pathname.replace(/\/$/, "") === href.replace(/\/$/, "") ? "page" : undefined}>{d.nav[i]}</Link>)}</nav><div className="header-actions"><button className="language-switch" onClick={() => setLanguage(language === "en" ? "hi" : "en")} aria-label={language === "en" ? "हिंदी में पढ़ें" : "Read in English"}><Globe2 size={15} /><span>{language === "en" ? "हिंदी" : "English"}</span></button><Link href="/contact" className="button button-navy header-cta">{d.nav[7]}<ArrowUpRight size={16} /></Link><button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={t(open ? "Close menu" : "Open menu", open ? "मेन्यू बंद करें" : "मेन्यू खोलें")}>{open ? <X /> : <Menu />}</button></div></div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={t("Mobile navigation", "मोबाइल नेविगेशन")}><div className="container">{paths.map((href, i) => <Link href={href} key={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined}><span>{d.nav[i]}</span><ArrowUpRight size={17} /></Link>)}<p>{site.tagline}</p></div></nav>}</header>
  </>;
}
