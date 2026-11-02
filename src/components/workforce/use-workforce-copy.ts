"use client";
import copy from "@/locales/workforce/en.json";
import { useLocale } from "@/components/shared/locale-provider";
import type { MessageValues } from "@/locales/translate";

export function useWorkforceCopy() {
  const locale = useLocale();
  return { ...locale, w: (key: keyof typeof copy, values?: MessageValues) => locale.t(copy[key], undefined, values) };
}
