"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import en from "@/locales/en";
import { defaultLocale, isLocale, isRTL, languageStorageKey, legacyLanguageStorageKey, type Locale, type Messages } from "@/locales/config";
import { loadMessages } from "@/locales/loader";
import { translateMessage, type MessageValues } from "@/locales/translate";
import readyLanguages from "@/locales/generated/ready.json";

export type Localized = { en: string; hi: string };
export const l = (en: string, hi: string): Localized => ({ en, hi });
type Translator = (english: string, hindi?: string, values?: MessageValues) => string;
type LocaleContextType = { language: Locale; setLanguage: (language: Locale) => Promise<boolean>; pendingLanguage: Locale | null; languageError: boolean; d: typeof en; t: Translator; local: (value: Localized) => string };
const LocaleContext = createContext<LocaleContextType | null>(null);
type Snapshot = { language: Locale; messages: Messages; pending: Locale | null; error: boolean };
const serverSnapshot: Snapshot = { language: defaultLocale, messages: {}, pending: null, error: false };
let snapshot = serverSnapshot;
let request = 0;
const listeners = new Set<() => void>();
const notify = (next: Snapshot) => { snapshot = next; listeners.forEach(listener => listener()); };
const getSnapshot = () => snapshot;
const getServerSnapshot = () => serverSnapshot;

// Development aid: a string without a translation still renders in English,
// and is reported once per language so it can be added to the dictionaries.
const reportedMissing = new Set<string>();
function reportMissing(language: Locale, messages: Messages, english: string) {
  if (process.env.NODE_ENV !== "development" || language === "en" || !/\p{L}/u.test(english) || messages[english]?.trim()) return;
  const id = `${language}\n${english}`;
  if (reportedMissing.has(id)) return;
  reportedMissing.add(id);
  console.warn(`[i18n] No "${language}" translation, showing English: ${JSON.stringify(english)}. Run "npm run check:i18n".`);
}

async function changeLanguage(language: Locale, persist = true): Promise<boolean> {
  if (!isLocale(language) || !readyLanguages.includes(language)) return false;
  const currentRequest = ++request;
  notify({ ...snapshot, pending: language, error: false });
  try {
    const messages = await loadMessages(language);
    if (request !== currentRequest) return false;
    if (persist) { try { localStorage.setItem(languageStorageKey, language); } catch { /* Keep the in-memory preference for client navigation. */ } }
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL(language) ? "rtl" : "ltr";
    notify({ language, messages, pending: null, error: false });
    return true;
  } catch {
    if (request === currentRequest) notify({ ...snapshot, pending: null, error: true });
    return false;
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === languageStorageKey || event.key === null) void changeLanguage(isLocale(event.newValue) ? event.newValue : defaultLocale, false);
  };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}

// One-time move of the saved language from the pre-rebrand storage key.
// A value already stored under the new key wins; the old key is always removed.
function migrateLanguagePreference() {
  try {
    const legacy = localStorage.getItem(legacyLanguageStorageKey);
    if (legacy === null) return;
    if (localStorage.getItem(languageStorageKey) === null && isLocale(legacy)) localStorage.setItem(languageStorageKey, legacy);
    localStorage.removeItem(legacyLanguageStorageKey);
  } catch { /* Storage may be blocked; the default language applies. */ }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    let preferred = snapshot.language;
    migrateLanguagePreference();
    try { const saved = localStorage.getItem(languageStorageKey); if (isLocale(saved)) preferred = saved; } catch { /* Storage may be blocked; manual selection remains available. */ }
    if (preferred !== snapshot.language) void changeLanguage(preferred, false);
  }, []);
  const t = useCallback<Translator>((english, hindi, values) => { reportMissing(current.language, current.messages, english); return translateMessage(current.language, current.messages, english, hindi, values); }, [current.language, current.messages]);
  const d = useMemo(() => Object.fromEntries(Object.entries(en).map(([key, value]) => [key, Array.isArray(value) ? value.map(item => t(item)) : t(value)])) as typeof en, [t]);
  const local = useCallback((value: Localized) => t(value.en, value.hi), [t]);
  const context = useMemo(() => ({ language: current.language, pendingLanguage: current.pending, languageError: current.error, setLanguage: changeLanguage, t, local, d }), [current, t, local, d]);
  return <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>;
}
export function useLocale() { const context = useContext(LocaleContext); if (!context) throw new Error("LocaleProvider required"); return context; }
