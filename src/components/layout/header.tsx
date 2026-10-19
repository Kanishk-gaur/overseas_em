"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe2, Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { useLocale } from "@/components/shared/locale-provider";

export const paths = ["/", "/about", "/services", "/industries", "/countries", "/employers", "/process", "/contact"];
export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useLocale();
  return <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label={`${site.legalName} — ${t("Home", "होम")}`}><svg width="43" height="43" viewBox="0 0 44 44" fill="none" aria-hidden="true"><circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="1.5" /><ellipse cx="22" cy="22" rx="9" ry="18" stroke="currentColor" strokeWidth="1.2" transform="rotate(32 22 22)" /><path d="M6 14.5C15 20 26 23 40 23M5 27C18 25 31 29 37 33" stroke="currentColor" strokeWidth="1.2" /><path d="M12 31L31 12M22 12H31V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span><strong>{site.name}<span className="brand-dot">.</span></strong><small>{site.descriptor}</small></span></Link>;
}
export function Header() {
  const { d, language, setLanguage, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey); }, [open]);
  return <>
    <a className="skip-link" href="#main">{t("Skip to content", "मुख्य सामग्री पर जाएँ")}</a>
    <div className="utility-bar"><div className="container"><span>{d.eyebrow}</span><span className="utility-right"><span>{t("A world of opportunity starts with a conversation.", "नई संभावनाओं की शुरुआत एक बातचीत से।")}</span><span className="utility-divider" /><Globe2 size={13} /><span>{t("India to the world", "भारत से दुनिया तक")}</span></span></div></div>
    <header className="site-header"><div className="container header-inner"><Logo /><nav aria-label={t("Main navigation", "मुख्य नेविगेशन")} className="desktop-nav">{paths.slice(0, 7).map((href, i) => <Link key={href} href={href} className={pathname === href ? "active" : ""} aria-current={pathname === href ? "page" : undefined}>{d.nav[i]}</Link>)}</nav><div className="header-actions"><button className="language-switch" onClick={() => setLanguage(language === "en" ? "hi" : "en")} aria-label={language === "en" ? "हिंदी में पढ़ें" : "Read in English"}><Globe2 size={15} /><span>{language === "en" ? "हिंदी" : "English"}</span></button><Link href="/contact" className="button button-navy header-cta">{d.talk}<ArrowUpRight size={16} /></Link><button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={t(open ? "Close menu" : "Open menu", open ? "मेन्यू बंद करें" : "मेन्यू खोलें")}>{open ? <X /> : <Menu />}</button></div></div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={t("Mobile navigation", "मोबाइल नेविगेशन")}><div className="container">{paths.map((href, i) => <Link href={href} key={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined}><span>{d.nav[i]}</span><ArrowUpRight size={17} /></Link>)}<p>{site.tagline}</p></div></nav>}</header>
  </>;
}
