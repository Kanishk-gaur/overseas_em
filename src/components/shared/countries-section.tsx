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
        <div><Eyebrow>{t("LOOKING AHEAD", "भविष्य की ओर")}</Eyebrow><h2 id="countries-title">{t("Our Vision for\nGlobal Expansion", "वैश्विक विस्तार के लिए\nहमारा विज़न")}</h2></div>
        <p>{t("We aim to expand our international recruitment network into new markets, connecting overseas employers with skilled, semi-skilled and general workforce talent from India. The countries below reflect our future ambitions as we develop our international presence.", "हम नए बाज़ारों में अपने अंतरराष्ट्रीय भर्ती नेटवर्क का विस्तार करना चाहते हैं, ताकि विदेशी नियोक्ताओं को भारत के कुशल, अर्ध-कुशल और सामान्य कामगारों से जोड़ सकें। नीचे दिए गए देश हमारी भविष्य की आकांक्षाओं को दर्शाते हैं, जिनकी दिशा में हम अपनी अंतरराष्ट्रीय मौजूदगी विकसित करना चाहते हैं।")}</p>
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
          <div className={styles.copy}><h3 id={`country-${item.slug}-title`}><Link href={`/countries/${item.slug}`}>{local(item.name)}</Link></h3><p>{item.slug === "other-destinations" ? t("Other markets we may explore as our international recruitment network develops.", "हमारे अंतरराष्ट्रीय भर्ती नेटवर्क के विकास के साथ अन्य बाज़ारों में संभावनाएँ तलाशने की योजना।") : local(item.description)}</p><div className={styles.preparation}><span>{t("POTENTIAL FUTURE MARKET", "भविष्य का संभावित बाज़ार")}</span><p>{local(item.caveat)}</p></div><TextLink href={`/countries/${item.slug}`}>{t("Read the destination guide", "गंतव्य मार्गदर्शिका पढ़ें")}</TextLink></div>
        </article>)}
      </div>
      {!found.length && <div className={styles.empty}><h3>{t("No destinations found", "कोई गंतव्य नहीं मिला")}</h3><p>{t("Try another country name or reset the filters.", "दूसरा देश खोजें या फ़िल्टर हटाएँ।")}</p><button type="button" className="button button-navy" onClick={() => { setRegion("all"); setQuery(""); }}>{t("Reset filters", "फ़िल्टर हटाएँ")}</button></div>}
      <p className={styles.note}>{t("These are potential future markets, not confirmed service locations. Inclusion does not imply current operations, offices, partnerships, licences or guaranteed recruitment availability. Any future services will depend on applicable requirements and our readiness to serve each market.", "ये भविष्य के संभावित बाज़ार हैं, सेवा उपलब्ध होने की पुष्टि नहीं। सूची में शामिल होने का अर्थ मौजूदा संचालन, कार्यालय, साझेदारी, लाइसेंस या भर्ती सेवा की गारंटी नहीं है। भविष्य में सेवाएँ लागू शर्तों और हर बाज़ार में सेवा देने की हमारी तैयारी पर निर्भर करेंगी।")}</p>
      <div className={styles.closing}><div><h3>{t("Planning to hire from India?", "भारत से भर्ती की योजना है?")}</h3><p>{t("Discuss roles, headcount, work locations and your recruitment plans.", "पद, संख्या, काम के स्थान और भर्ती योजना पर बात करें।")}</p></div><Button href="/request-workforce" variant="navy">{t("Discuss your workforce needs", "कामगारों की ज़रूरत बताएँ")}</Button></div>
    </div>
  </section>;
}
