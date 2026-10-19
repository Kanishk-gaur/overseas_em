"use client";
import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import en from "@/locales/en";
import hi from "@/locales/hi";

export type Localized = { en: string; hi: string };
export const l = (en: string, hi: string): Localized => ({ en, hi });
type Lang = "en" | "hi";
type LocaleContextType = { language: Lang; setLanguage: (language: Lang) => void; d: typeof en; t: (en: string, hi: string) => string; local: (value: Localized) => string };
const LocaleContext = createContext<LocaleContextType | null>(null);
let memoryLanguage: Lang = "en";
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("globalpath-language-change", onChange);
  return () => { window.removeEventListener("storage", onChange); window.removeEventListener("globalpath-language-change", onChange); };
}
function readLanguage(): Lang {
  try { return localStorage.getItem("globalpath-language") === "hi" ? "hi" : memoryLanguage; } catch { return memoryLanguage; }
}
const serverLanguage = (): Lang => "en";
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, readLanguage, serverLanguage);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const setLanguage = (lang: Lang) => { memoryLanguage = lang; try { localStorage.setItem("globalpath-language", lang); } catch { /* The session preference still works when storage is unavailable. */ } document.documentElement.lang = lang; window.dispatchEvent(new Event("globalpath-language-change")); };
  return <LocaleContext.Provider value={{ language, setLanguage, d: language === "en" ? en : hi, t: (e, h) => language === "en" ? e : h, local: v => v[language] }}>{children}</LocaleContext.Provider>;
}
export function useLocale() { const context = useContext(LocaleContext); if (!context) throw new Error("LocaleProvider required"); return context; }
