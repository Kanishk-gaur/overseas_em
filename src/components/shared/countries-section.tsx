"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { countries } from "@/data/countries";
import { useLocale } from "./locale-provider";
import { Button, Eyebrow, Photo, TextLink } from "./ui";
import { isRTL } from "@/locales/config";
import styles from "./countries-section.module.css";

export function CountriesSection() {
  const { t, local, language } = useLocale();
  const rtl = isRTL(language);
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 1, previous: false, next: false });
  const regions = [
    { id: "europe", label: t("Europe & CIS", "यूरोप और CIS") },
    { id: "middle-east", label: t("Middle East", "मध्य पूर्व") },
    { id: "asia", label: t("Asia Pacific", "एशिया प्रशांत") },
  ];
  const found = useMemo(() => countries.filter(item => {
    const inRegion = region === "all" || (region === "europe" ? item.region.en.includes("EUROPE") : region === "middle-east" ? item.region.en === "MIDDLE EAST" : item.region.en === "ASIA PACIFIC");
    return inRegion && `${item.name.en} ${item.name.hi} ${item.description.en} ${item.description.hi} ${local(item.name)} ${local(item.description)}`.toLowerCase().includes(query.trim().toLowerCase());
  }), [query, region, local]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    element.scrollTo({ left: 0, behavior: "instant" });
    let frame = 0;
    const measure = () => {
      const cards = Array.from(element.children);
      const bounds = element.getBoundingClientRect();
      const visible = cards.flatMap((card, index) => {
        const rect = card.getBoundingClientRect();
        return rect.right > bounds.left + 8 && rect.left < bounds.right - 8 ? [index + 1] : [];
      });
      const next = {
        first: visible[0] || 0,
        last: visible.at(-1) || 0,
        previous: Math.abs(element.scrollLeft) > 2,
        next: Math.abs(element.scrollLeft) + element.clientWidth < element.scrollWidth - 2,
      };
      setPosition(current => Object.keys(next).every(key => current[key as keyof typeof next] === next[key as keyof typeof next]) ? current : next);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    element.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); element.removeEventListener("scroll", schedule); };
  }, [found, language]);

  const scroll = (direction: "previous" | "next" | "first" | "last") => {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild;
    const step = (card?.getBoundingClientRect().width || element.clientWidth) + parseFloat(getComputedStyle(element).columnGap || "0");
    const left = direction === "first" ? 0 : direction === "last" ? element.scrollWidth * (rtl ? -1 : 1) : element.scrollLeft + (direction === "next" ? step : -step) * (rtl ? -1 : 1);
    element.scrollTo({ left, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return <section id="countries" className={`section ${styles.section}`} aria-labelledby="countries-title">
    <div className="container">
      <div className={styles.heading}>
        <div><Eyebrow>{t("RESEARCH YOUR DESTINATION", "गंतव्य के बारे में जानें")}</Eyebrow><h2 id="countries-title">{t("Get to know the country\nbefore making plans.", "योजना बनाने से पहले\nदेश को जानें।")}</h2></div>
        <p>{t("Browse local working conditions, preparation advice and official sources for each destination.", "हर देश की काम की स्थितियाँ, तैयारी संबंधी सलाह और आधिकारिक स्रोत देखें।")}</p>
      </div>
      <div className={styles.toolbar}>
        <div className="guide-filter-pills" role="group" aria-label={t("Destination region", "गंतव्य का क्षेत्र")}>
          <button type="button" aria-pressed={region === "all"} onClick={() => setRegion("all")}>{t("All destinations", "सभी गंतव्य")}</button>
          {regions.map(item => <button type="button" key={item.id} aria-pressed={region === item.id} onClick={() => setRegion(item.id)}>{item.label}</button>)}
        </div>
        <label className="guide-search"><Search size={18} aria-hidden="true" /><span className="sr-only">{t("Search destinations", "गंतव्य खोजें")}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Search a country or sector", "देश या क्षेत्र खोजें")} /></label>
      </div>
      <div className={styles.browseBar}>
        <p role="status">{t("{count} of {total} destination guides", "{total} में से {count} गंतव्य मार्गदर्शिकाएँ", { count: found.length, total: countries.length })}</p>
        <div className={styles.controls}>
          {found.length > 0 && <span className={styles.range}>{position.first}–{position.last} <span>/ {found.length}</span></span>}
          <button type="button" aria-label={t("Previous countries", "पिछले देश")} aria-controls="country-carousel" disabled={!found.length || !position.previous} onClick={() => scroll("previous")}><ArrowLeft size={19} aria-hidden="true" /></button>
          <button type="button" aria-label={t("Next countries", "अगले देश")} aria-controls="country-carousel" disabled={!found.length || !position.next} onClick={() => scroll("next")}><ArrowRight size={19} aria-hidden="true" /></button>
        </div>
      </div>
      <p id="countries-scroll-hint" className="sr-only">{t("Swipe or scroll to browse. When this carousel is focused, use the left and right arrow keys, or Home and End. Each card links to a full guide.", "देखने के लिए स्वाइप या स्क्रॉल करें। कैरोसेल पर फ़ोकस होने पर बाएँ-दाएँ तीर या Home और End दबाएँ। हर कार्ड में पूरी मार्गदर्शिका का लिंक है।")}</p>
      <div ref={track} id="country-carousel" className={styles.track} role="region" aria-roledescription={t("carousel", "कैरोसेल")} aria-label={t("Destination guides", "गंतव्य मार्गदर्शिकाएँ")} aria-describedby="countries-scroll-hint" tabIndex={found.length ? 0 : -1} onKeyDown={event => {
        if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
        const direction = ({ ArrowLeft: rtl ? "next" : "previous", ArrowRight: rtl ? "previous" : "next", Home: "first", End: "last" } as const)[event.key as "ArrowLeft" | "ArrowRight" | "Home" | "End"];
        if (direction) { event.preventDefault(); scroll(direction); }
      }}>
        {found.map(item => <article className={styles.card} key={item.slug} id={item.slug} aria-labelledby={`country-${item.slug}-title`}>
          <Link href={`/countries/${item.slug}`} className={styles.imageLink} aria-label={local(item.name)}><Photo src={item.image} alt={local(item.name)} sizes="(max-width: 650px) 85vw, 390px" /><span>{local(item.region)}</span></Link>
          <div className={styles.copy}><h3 id={`country-${item.slug}-title`}><Link href={`/countries/${item.slug}`}>{local(item.name)}</Link></h3><p>{local(item.description)}</p><div className={styles.preparation}><span>{t("BEFORE YOU PROCEED", "आगे बढ़ने से पहले")}</span><p>{local(item.caveat)}</p></div><TextLink href={`/countries/${item.slug}`}>{t("Read the destination guide", "गंतव्य मार्गदर्शिका पढ़ें")}</TextLink></div>
        </article>)}
      </div>
      {!found.length && <div className={styles.empty}><h3>{t("No destinations found", "कोई गंतव्य नहीं मिला")}</h3><p>{t("Try another country name or reset the filters.", "दूसरा देश खोजें या फ़िल्टर हटाएँ।")}</p><button type="button" className="button button-navy" onClick={() => { setRegion("all"); setQuery(""); }}>{t("Reset filters", "फ़िल्टर हटाएँ")}</button></div>}
      <p className={styles.note}>{t("These guides cover potential destinations, not current vacancies, offices or partnerships. Sector examples are general; permission to work and eligibility need individual checks.", "ये संभावित देशों की जानकारी है, मौजूदा रिक्तियों, कार्यालयों या साझेदारी का दावा नहीं। क्षेत्र के उदाहरण सामान्य हैं; कार्य अनुमति और पात्रता अलग से जाँचें।")}</p>
      <div className={styles.closing}><div><h3>{t("Which experience will you bring?", "आप कौन-सा अनुभव लेकर आएँगे?")}</h3><p>{t("Organise your experience and questions before discussing a destination.", "देश पर चर्चा करने से पहले अपना अनुभव और सवाल व्यवस्थित करें।")}</p></div><Button href="/find-a-job" variant="navy">{t("Prepare for your enquiry", "पूछताछ की तैयारी करें")}</Button></div>
    </div>
  </section>;
}
