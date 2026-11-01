import type { Locale, Messages } from "./config";
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
  const pending = loaders[locale]().then(module => module.default as Messages).catch(error => { cache.delete(locale); throw error; });
  cache.set(locale, pending);
  return pending;
}
