"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Localized } from "@/data/types";
import { workforceIndex } from "@/data/workforce-index";
import { useLocale } from "./locale-provider";
import styles from "./industry-role-list.module.css";

const roleLinks = new Map(workforceIndex.map(role => [role.title.toLowerCase(), role.slug]));

export function IndustryRoleList({ slug, original, additions, initiallyExpanded = false }: { slug: string; original: Localized; additions: Localized[]; initiallyExpanded?: boolean }) {
  const { t, local } = useLocale();
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const id = `industry-extra-roles-${slug}`;
  return <><p>{local(original)}</p><ul id={id} className={styles.roles} hidden={!expanded}>{additions.map(role => {
    const title = role.en.toLowerCase();
    const target = roleLinks.get(title) || roleLinks.get(title.replace(/s$/, ""));
    return <li key={role.en}>{target ? <Link href={`/workforce/${target}/`}>{local(role)}</Link> : local(role)}</li>;
  })}</ul><button className={styles.toggle} type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>{expanded ? t("Show fewer roles") : t("Show more roles ({count})", undefined, { count: additions.length })}<ChevronDown size={15} aria-hidden="true" /></button></>;
}
