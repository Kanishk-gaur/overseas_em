"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Search, SlidersHorizontal } from "lucide-react";
import { workforceIndex } from "@/data/workforce-index";
import { roleImages, photography } from "@/data/photography";
import { Button, Eyebrow, Photo, TextLink } from "@/components/shared/ui";
import { useWorkforceCopy } from "@/components/workforce/use-workforce-copy";
import styles from "@/components/workforce/workforce.module.css";

export function WorkforcePage() {
  const { t, w } = useWorkforceCopy();
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const results = workforceIndex.filter(role => (!industry || role.industry === industry) && (!type || role.type === type) && [role.title, role.industry, role.description, role.details, ...role.skills].flatMap(value => [value, t(value)]).join(" ").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <div className={styles.workforce}>
    <section className={styles.directoryHero}><div className={`container ${styles.heroGrid}`}>
      <div><div className={styles.breadcrumbs}><Link href="/">{t("Home")}</Link><span>/</span><span>{t("Workforce directory")}</span></div><Eyebrow>{w("directoryEyebrow")}</Eyebrow><h1>{w("directoryTitle")}</h1><p className={styles.lead}>{w("directoryIntro")}</p><div className="button-row"><Button href="/request-workforce" variant="navy">{w("request")}</Button><a className={styles.inlineLink} href="#profiles">{w("browse")}<ArrowDown size={16} aria-hidden="true" /></a></div></div>
      <div className={styles.heroPhoto}><Photo src={photography.workforce} alt="" priority sizes="(max-width: 900px) 100vw, 45vw" /><div className={styles.heroCaption}><span>01 — 18</span><strong>{t("Tradespeople, technicians\nand professionals.")}</strong></div></div>
    </div></section>
    <section className={styles.directory} id="profiles"><div className="container">
      <div className={styles.directoryHeading}><div><Eyebrow>{t("THE TALENT DIRECTORY")}</Eyebrow><h2>{w("directoryHeading")}</h2></div><p>{w("directoryHelp")}</p></div>
      <div className={styles.filters}>
        <div className={styles.typeFilters} role="group" aria-label={t("Workforce type")}>{[["", w("allTypes")], ["Technical", w("technical")], ["Non-Technical", w("trades")]].map(([value, label]) => <button type="button" key={value} aria-pressed={type === value} onClick={() => setType(value)}>{label}<span>{workforceIndex.filter(role => !value || role.type === value).length}</span></button>)}</div>
        <div className={styles.searchFilters}><label className={styles.search}><Search size={18} aria-hidden="true" /><span className="sr-only">{t("Search roles or skills")}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Search roles or skills")} /></label><label className={styles.industryFilter}><SlidersHorizontal size={16} aria-hidden="true" /><span className="sr-only">{t("Industry")}</span><select value={industry} onChange={event => setIndustry(event.target.value)}><option value="">{t("All industries")}</option>{[...new Set(workforceIndex.map(role => role.industry))].map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label></div>
      </div>
      <p className={styles.resultCount} role="status">{w("results", { count: results.length, total: workforceIndex.length })}</p>
      <div className={styles.roleGrid}>{results.map(role => <article className={styles.roleCard} key={role.slug}>
        <Link className={styles.cardImage} href={`/workforce/${role.slug}/`} aria-label={`${w("explore")}: ${t(role.title)}`}><Photo src={roleImages[role.title]} alt="" sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>{role.type === "Technical" ? w("technical") : w("trades")}</span></Link>
        <div className={styles.cardCopy}><p className={styles.cardIndustry}>{t(role.industry)}</p><h3><Link href={`/workforce/${role.slug}/`}>{t(role.title)}</Link></h3><p>{t(role.description)}</p><div className={styles.cardSkills}><span>{w("capabilities")}</span><ul>{role.skills.slice(0, 3).map(skill => <li key={skill}>{t(skill)}</li>)}</ul></div><Link className={styles.cardAction} href={`/workforce/${role.slug}/`} aria-label={`${w("explore")}: ${t(role.title)}`}>{w("explore")}<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
      </article>)}</div>
      {!results.length && <div className={styles.empty}><h3>{t("No matching profiles")}</h3><p>{t("Try another role, skill or industry.")}</p><button className="button button-navy" onClick={() => { setQuery(""); setIndustry(""); setType(""); }}>{t("Clear filters")}</button></div>}
      <p className={styles.directoryNote}>{w("directoryNote")}</p>
    </div></section>
    <section className={styles.closing}><div className="container"><div><Eyebrow light>{w("atGlance")}</Eyebrow><h2>{w("formTitle")}</h2><p>{w("briefPrompt")}</p></div><div><Button href="/request-workforce">{w("request")}</Button><TextLink href="/industries" light>{t("Explore all industries")}</TextLink></div></div></section>
    <div className={`container ${styles.candidateFoot}`}><Link href="/find-a-job">{w("candidateLink")} <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
  </div>;
}
