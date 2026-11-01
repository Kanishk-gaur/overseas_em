import type { Locale, Messages } from "./config";
export type MessageValues = Record<string, string | number>;
export function translateMessage(locale: Locale, messages: Messages, english: string, hindi?: string, values?: MessageValues): string {
  const translated = locale === "en" ? english : messages[english]?.trim() ? messages[english] : locale === "hi" && hindi ? hindi : english;
  return values ? translated.replace(/\{(\w+)\}/g, (match, key) => values[key] === undefined ? match : String(values[key])) : translated;
}
