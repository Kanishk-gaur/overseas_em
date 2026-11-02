import type { Locale, Messages } from "./config";
import workforceEnglish from "./workforce/en.json";
const workforceLoaders = {
  hi: () => import("./workforce/hi.json"), ar: () => import("./workforce/ar.json"),
  he: () => import("./workforce/he.json"), ru: () => import("./workforce/ru.json"),
  pt: () => import("./workforce/pt.json"), cs: () => import("./workforce/cs.json"),
  de: () => import("./workforce/de.json"), ja: () => import("./workforce/ja.json"),
  pl: () => import("./workforce/pl.json"), ro: () => import("./workforce/ro.json"),
};
const loaders = {
  hi: () => import("./messages/hi.json"), ar: () => import("./messages/ar.json"),
  he: () => import("./messages/he.json"), ru: () => import("./messages/ru.json"),
  pt: () => import("./messages/pt.json"), cs: () => import("./messages/cs.json"),
  de: () => import("./messages/de.json"), ja: () => import("./messages/ja.json"),
  pl: () => import("./messages/pl.json"), ro: () => import("./messages/ro.json"),
};
const cache = new Map<Locale, Promise<Messages>>();
export function loadMessages(locale: Locale): Promise<Messages> {
  if (locale === "en") return Promise.resolve({});
  const cached = cache.get(locale);
  if (cached) return cached;
  const pending = Promise.all([loaders[locale](), workforceLoaders[locale]()]).then(([base, workforce]) => ({
    ...base.default,
    ...Object.fromEntries(Object.entries(workforceEnglish).map(([key, english]) => [english, workforce.default[key as keyof typeof workforceEnglish]])),
  } as Messages)).catch(error => { cache.delete(locale); throw error; });
  cache.set(locale, pending);
  return pending;
}
