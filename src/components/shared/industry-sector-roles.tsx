"use client";

import { Check } from "lucide-react";
import { getIndustryRoles } from "@/data/industry-roles";
import { useLocale } from "./locale-provider";
import styles from "./industry-sector-roles.module.css";

export function IndustrySectorRoles({ slug, labelledBy }: { slug: string; labelledBy: string }) {
  const { local } = useLocale();
  return <div className={styles.scroll} role="region" aria-labelledby={labelledBy} tabIndex={0}>
    <ul className={styles.list}>{getIndustryRoles(slug).map(role => <li key={role.en}><Check size={16} aria-hidden="true" /><span>{local(role)}</span></li>)}</ul>
  </div>;
}
