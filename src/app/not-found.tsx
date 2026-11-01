"use client";
import { site } from "@/config/site";
import { useLocale } from "@/components/shared/locale-provider";
import Link from "next/link";
export default function NotFound() {
  const { t } = useLocale();
  return <section className="section"><div className="container not-found"><p className="eyebrow">404 / {site.legalName.toUpperCase()}</p><h1>{t("A different path awaits.", "एक नई राह आपका इंतज़ार कर रही है।")}</h1><p>{t("This page could not be found. Return home to explore our services and contact options.", "यह पेज नहीं मिला। हमारी सेवाओं और संपर्क विकल्पों के लिए होम पेज पर लौटें।")}</p><Link className="button button-navy" href="/">{t("Return to homepage", "होम पेज पर लौटें")} ↗</Link></div></section>;
}
