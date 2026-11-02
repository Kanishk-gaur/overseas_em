"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Globe2, LoaderCircle, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { languages } from "@/locales/config";
import workforceCopy from "@/locales/workforce/en.json";
import readyLanguages from "@/locales/generated/ready.json";
import { useLocale } from "./locale-provider";
import styles from "./language-switcher.module.css";

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage, pendingLanguage, languageError, t } = useLocale();
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const selected = languages.find(item => item.code === language)!;
  const close = () => { setOpen(false); trigger.current?.focus(); };
  useEffect(() => {
    if (!open) return;
    root.current?.querySelector<HTMLButtonElement>(`[data-locale="${language}"]`)?.focus();
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, language]);
  return <div ref={root} className={`language-picker ${styles.root} ${mobile ? styles.mobile : styles.header}`} onBlur={event => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => {
    if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); close(); }
    if (!open || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation();
    const options = Array.from(root.current?.querySelectorAll<HTMLButtonElement>("[data-locale]") || []);
    const index = options.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
    options[next]?.focus();
  }}>
    <button ref={trigger} type="button" className={`language-switch ${styles.trigger}`} aria-haspopup="dialog" aria-controls={id} aria-expanded={open} aria-label={`${t("Choose language", "भाषा चुनें")}: ${selected.nativeName}`} onClick={() => setOpen(!open)}>
      <Globe2 size={17} strokeWidth={1.5} aria-hidden="true" /><span className={styles.native} lang={selected.code}>{selected.nativeName}</span><span className={styles.code}>{selected.code.toUpperCase()}</span><ChevronDown size={13} className={open ? styles.expanded : ""} aria-hidden="true" />
    </button>
    <AnimatePresence>{open && <motion.div id={id} className={styles.panel} role="dialog" aria-label={t("Choose language", "भाषा चुनें")} aria-busy={pendingLanguage !== null} initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -5 }} transition={{ duration: reducedMotion ? 0 : .14 }}>
      <div className={styles.panelHeading}><div><strong>{t("Choose language", "भाषा चुनें")}</strong><p>{t("Explore in your language.", "अपनी भाषा में जानकारी पाएँ।")}</p></div><button type="button" onClick={close} aria-label={t("Close language menu", "भाषा मेन्यू बंद करें")}><X size={18} aria-hidden="true" /></button></div>
      <div className={styles.options}>{languages.filter(item => readyLanguages.includes(item.code)).map(item => <button type="button" key={item.code} data-locale={item.code} aria-pressed={language === item.code} onClick={async () => { if (await setLanguage(item.code)) { if (root.current?.contains(document.activeElement)) close(); else setOpen(false); } }}>
        <span><strong lang={item.code} dir={item.direction}>{item.nativeName}</strong><small lang="en" dir="ltr">{item.name}</small></span>{pendingLanguage === item.code ? <LoaderCircle className={styles.spinner} size={17} aria-hidden="true" /> : language === item.code ? <Check size={18} aria-hidden="true" /> : null}
      </button>)}</div>
      <div className={styles.feedback} role="status">{languageError ? t("Could not load this language. Please try again.", "यह भाषा लोड नहीं हुई। फिर कोशिश करें।") : pendingLanguage ? t("Switching language…", "भाषा बदली जा रही है…") : t(workforceCopy.languageMenuNote)}</div>
    </motion.div>}</AnimatePresence>
  </div>;
}
