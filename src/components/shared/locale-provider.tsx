"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import en from "@/locales/en";
import { defaultLocale, isLocale, isRTL, languageStorageKey, type Locale, type Messages } from "@/locales/config";
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

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    let preferred = snapshot.language;
    try { const saved = localStorage.getItem(languageStorageKey); if (isLocale(saved)) preferred = saved; } catch { /* Storage may be blocked; manual selection remains available. */ }
    if (preferred !== snapshot.language) void changeLanguage(preferred, false);
  }, []);
  const t = useCallback<Translator>((english, hindi, values) => translateMessage(current.language, current.messages, english, hindi, values), [current.language, current.messages]);
  const d = useMemo(() => Object.fromEntries(Object.entries(en).map(([key, value]) => [key, Array.isArray(value) ? value.map(item => t(item)) : t(value)])) as typeof en, [t]);
  const local = useCallback((value: Localized) => t(value.en, value.hi), [t]);
  const context = useMemo(() => ({ language: current.language, pendingLanguage: current.pending, languageError: current.error, setLanguage: changeLanguage, t, local, d }), [current, t, local, d]);
  return <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>;
}
export function useLocale() { const context = useContext(LocaleContext); if (!context) throw new Error("LocaleProvider required"); return context; }
