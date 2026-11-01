"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import metadata from "@/locales/generated/metadata.json";
import { useLocale } from "./locale-provider";

// Static English metadata and canonicals remain available without JavaScript.
// Client language preferences do not create alternate, indexable locale URLs.
export function LocaleMetadata() {
  const pathname = usePathname();
  const { t, language } = useLocale();
  useEffect(() => {
    const route = pathname.replace(/\/$/, "") || "/";
    const entry = (metadata as Record<string, { title: string; description: string }>)[route];
    if (!entry) return;
    const title = route === "/" ? `${site.legalName} | ${t(entry.title)}` : `${t(entry.title)} | ${site.legalName}`;
    const ogLocale = { en: "en_IN", hi: "hi_IN", ar: "ar_SA", he: "he_IL", ru: "ru_RU", pt: "pt_PT", cs: "cs_CZ", de: "de_DE", ja: "ja_JP", pl: "pl_PL", ro: "ro_RO" }[language];
    const values = { 'meta[name="description"]': t(entry.description), 'meta[property="og:title"]': title, 'meta[property="og:description"]': t(entry.description), 'meta[property="og:locale"]': ogLocale };
    const apply = () => {
      if (document.title !== title) document.title = title;
      for (const [selector, content] of Object.entries(values)) {
        const element = document.querySelector<HTMLMetaElement>(selector);
        if (element && element.content !== content) element.content = content;
      }
    };
    // Next can restore static head tags after hydration or client navigation.
    // Reapply only changed values, without creating duplicate metadata tags.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["content"] });
    apply();
    return () => observer.disconnect();
  }, [pathname, t, language]);
  return null;
}
