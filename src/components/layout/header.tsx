"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { resourceLinks } from "@/data/recruitment";
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
  const currentPath = pathname.replace(/\/$/, "") || "/";
  const desktopNav = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !desktopNav.current?.contains(event.target)) {
        desktopNav.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(item => { item.open = false; });
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab") {
        const links = Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") || []);
        const first = toggle.current, last = links.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1200) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);
  return <>
    <a className="skip-link" href="#main">{t("Skip to content", "मुख्य सामग्री पर जाएँ")}</a>
    <div className="utility-bar"><div className="container"><span>{d.eyebrow}</span><span className="utility-right">{t("Based in India. Looking beyond borders.", "भारत से। सीमाओं के पार संभावनाओं की ओर।")}</span></div></div>
    <header className="site-header"><div className="container header-inner"><Logo /><nav ref={desktopNav} aria-label={t("Main navigation", "मुख्य नेविगेशन")} className="desktop-nav">{paths.slice(0, 7).map((href, i) => {
      const links = i === 1 ? [{ href: "/about", en: d.nav[1], hi: d.nav[1] }, ...resourceLinks.filter(link => ["/team", "/how-we-work", "/blog", "/case-studies", "/compliance", "/glossary"].includes(link.href))] : i === 3 ? [{ href: "/industries", en: d.nav[3], hi: d.nav[3] }, ...resourceLinks.filter(link => ["/workforce", "/find-a-job", "/request-workforce"].includes(link.href))] : i === 6 ? [
        { href: "/find-a-job", en: "Worker preparation guide", hi: "कामगार तैयारी मार्गदर्शिका" },
        { href: "/process", en: "The recruitment journey", hi: "भर्ती का सफर" },
        { href: "/find-a-job#documents", en: "Document checklist", hi: "दस्तावेज़ सूची" },
        { href: "/find-a-job#safe-recruitment", en: "Safe recruitment", hi: "सुरक्षित भर्ती" },
        { href: "/find-a-job#candidate-faq", en: "20 practical FAQs", hi: "20 उपयोगी सवाल" },
      ] : null;
      const label = i === 6 ? t("For Workers", "कामगारों के लिए") : d.nav[i];
      const current = currentPath;
      if (links) return <div className="nav-group" key={href + pathname}><details onToggle={event => { if (event.currentTarget.open) desktopNav.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(item => { if (item !== event.currentTarget) item.open = false; }); }} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}><summary className={links.some(link => current === link.href || current.startsWith(link.href + "/")) ? "active" : ""}>{label}<ChevronDown size={11} /></summary><div className="nav-dropdown">{links.map(link => <Link href={link.href} key={link.href} aria-current={current === link.href ? "page" : undefined} onClick={event => event.currentTarget.closest("details")?.removeAttribute("open")}>{t(link.en, link.hi)}<ArrowUpRight size={14} /></Link>)}</div></details></div>;
      return <Link key={href} href={href} className={current === href ? "active" : ""} aria-current={current === href ? "page" : undefined}>{d.nav[i]}</Link>;
    })}</nav><div className="header-actions"><button className="language-switch" onClick={() => setLanguage(language === "en" ? "hi" : "en")} aria-label={language === "en" ? "हिंदी में पढ़ें" : "Read in English"}><Globe2 size={15} /><span>{language === "en" ? "हिंदी" : "English"}</span></button><Link href="/contact" className="button button-navy header-cta">{d.nav[7]}<ArrowUpRight size={16} /></Link><button ref={toggle} className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={t(open ? "Close menu" : "Open menu", open ? "मेन्यू बंद करें" : "मेन्यू खोलें")}>{open ? <X /> : <Menu />}</button></div></div>
    {open && <nav ref={menu} id="mobile-navigation" className="mobile-nav" aria-label={t("Mobile navigation", "मोबाइल नेविगेशन")}><div className="container">{paths.map((href, i) => <Link href={href} key={href} onClick={() => setOpen(false)} aria-current={currentPath === href ? "page" : undefined}><span>{d.nav[i]}</span><ArrowUpRight size={17} /></Link>)}<p className="mobile-resources-title">{t("WORKFORCE & RESOURCES", "कामगार और जानकारी")}</p>{resourceLinks.map(link => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}><span>{t(link.en, link.hi)}</span><ArrowUpRight size={17} /></Link>)}<p>{site.tagline}</p></div></nav>}</header>
  </>;
}
