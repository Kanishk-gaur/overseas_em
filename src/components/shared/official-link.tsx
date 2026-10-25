"use client";
import { useLocale } from "./locale-provider";
import { ArrowUpRight } from "lucide-react";
import { officialSources, type OfficialSourceKey } from "@/data/official-sources";

export function OfficialLink({ source, children }: { source: OfficialSourceKey; children?: React.ReactNode }) {
  const { t } = useLocale();
  const item = officialSources[source];
  return <a className="official-link" href={item.url} target="_blank" rel="noopener noreferrer"><span>{children || item.label}</span><ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> {t("(opens in a new tab)", "(नए टैब में खुलेगा)")}</span></a>;
}
