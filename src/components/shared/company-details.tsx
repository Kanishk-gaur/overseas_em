"use client";
import { site } from "@/config/site";
import { useLocale } from "./locale-provider";

/**
 * Registered company details for the footer, contact page and recruitment
 * standards page. Only details that have been filled in src/config/site.ts
 * are returned, so nothing is shown until the real values are added.
 */
export function useCompanyDetails() {
  const { t } = useLocale();
  return [
    { label: t("Registered office", "पंजीकृत कार्यालय"), value: site.company.registeredOffice },
    { label: "CIN", value: site.company.cin },
    { label: t("MEA Recruiting Agent licence", "MEA भर्ती एजेंट लाइसेंस"), value: site.company.raLicence },
  ].filter(item => item.value);
}
