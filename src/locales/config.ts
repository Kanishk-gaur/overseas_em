export const languages = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
  { code: "he", name: "Hebrew", nativeName: "עברית", direction: "rtl" },
  { code: "ru", name: "Russian", nativeName: "Русский", direction: "ltr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", direction: "ltr" },
  { code: "cs", name: "Czech", nativeName: "Čeština", direction: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "日本語", direction: "ltr" },
  { code: "pl", name: "Polish", nativeName: "Polski", direction: "ltr" },
  { code: "ro", name: "Romanian", nativeName: "Română", direction: "ltr" },
] as const;
export type Locale = typeof languages[number]["code"];
export type Messages = Record<string, string>;
export const defaultLocale: Locale = "en";
export const languageStorageKey = "globalpath-language";
export const isLocale = (value: unknown): value is Locale => languages.some(language => language.code === value);
export const isRTL = (locale: Locale) => locale === "ar" || locale === "he";
// Shared languages appear once. Hindi remains available for the Indian audience.
export const destinationLanguages = {
  russia: "ru", portugal: "pt", "czech-republic": "cs", israel: "he", uae: "ar",
  "saudi-arabia": "ar", qatar: "ar", oman: "ar", kuwait: "ar", bahrain: "ar",
  germany: "de", japan: "ja", poland: "pl", romania: "ro", "united-kingdom": "en",
} satisfies Record<string, Locale>;
