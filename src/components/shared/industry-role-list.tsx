"use client";

import Link from "next/link";
import { getIndustryRoles } from "@/data/industry-roles";
import { workforceIndex } from "@/data/workforce-index";
import { useLocale } from "./locale-provider";
import styles from "./industry-role-list.module.css";

const roleLinks = new Map(workforceIndex.map(role => [role.title.toLowerCase(), role.slug]));

export function IndustryRoleList({ slug, labelledBy }: { slug: string; labelledBy: string }) {
  const { t, local } = useLocale();
  const hintId = `industry-scroll-hint-${slug}`;
  return <><div className={styles.scroll} role="region" aria-labelledby={labelledBy} aria-describedby={hintId} tabIndex={0}><ul className={styles.roles}>{getIndustryRoles(slug).map(role => {
    const title = role.en.toLowerCase();
    const target = roleLinks.get(title) || roleLinks.get(title.replace(/s$/, ""));
    return <li key={role.en}>{target ? <Link href={`/workforce/${target}/`}>{local(role)}</Link> : local(role)}</li>;
  })}</ul></div><p id={hintId} className={styles.hint}>{t("Scroll to explore all roles.", "सभी भूमिकाएँ देखने के लिए स्क्रॉल करें।")}</p></>;
}
