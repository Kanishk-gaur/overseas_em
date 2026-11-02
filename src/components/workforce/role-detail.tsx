"use client";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Check, ChevronDown, ExternalLink } from "lucide-react";
import type { WorkforceRoleDetail } from "@/data/workforce-role-details";
import type { Locale } from "@/locales/config";
import { Button, Eyebrow, Photo } from "@/components/shared/ui";
import { useWorkforceCopy } from "./use-workforce-copy";
import styles from "./workforce.module.css";

type RoleLink = { slug: string; title: string; image: string };
type IndustryLink = { slug: string; title: { en: string; hi: string } };
export function RoleDetail({ role, image, summary, related, industries, translations = {} }: {
  role: WorkforceRoleDetail; image: string; summary: string;
  related: RoleLink[]; industries: IndustryLink[];
  translations?: Partial<Record<Locale, WorkforceRoleDetail>>;
}) {
  const { w, t, local, language } = useWorkforceCopy();
  const content = translations[language] || role;
  const contentLanguage = translations[language] ? language : "en";
  const contentDirection = contentLanguage === "ar" || contentLanguage === "he" ? "rtl" : "ltr";
  const contentProps = { lang: contentLanguage, dir: contentDirection } as const;
  const enquiry = `/request-workforce/?role=${encodeURIComponent(role.slug)}`;
  const sections = ["overview", "responsibilities", "competencies", "qualifications", "hiring", "faq"] as const;
  const stages = [["stageBrief", "stageBriefBody"], ["stageAssess", "stageAssessBody"], ["stagePrepare", "stagePrepareBody"], ["stageJoin", "stageJoinBody"]] as const;
  return <div className={styles.workforce}>
    <section className={styles.detailHero}><div className={`container ${styles.detailHeroGrid}`}>
      <div className={styles.detailHeroCopy}><div className={styles.breadcrumbs}><Link href="/workforce/">{w("allRoles")}</Link><span>/</span><span>{t(role.title)}</span></div><Eyebrow light>{w("guide")}</Eyebrow><h1>{t(role.title)}</h1><p className={styles.lead}>{t(summary)}</p><div className="button-row"><Button href={enquiry}>{w("requestRole")}</Button><a href="#overview" className={styles.inlineLink}>{w("readGuide")}<ArrowDown size={16} aria-hidden="true" /></a></div></div>
      <Photo src={image} alt={role.title} priority className={styles.detailPhoto} sizes="(max-width: 900px) 100vw, 42vw" />
    </div></section>
    <div className={`container ${styles.detailLayout}`}>
      <aside className={styles.sidebar}><div className={styles.sidebarInner}><p className={styles.sideTitle}>{t(role.title)}</p><nav aria-label={w("readGuide")}>{sections.map((key, i) => <a href={`#${key}`} key={key}><span>{String(i + 1).padStart(2, "0")}</span>{w(key)}</a>)}</nav><div className={styles.sideBrief}><Eyebrow>{w("atGlance")}</Eyebrow><p>{w("briefPrompt")}</p><Button href={enquiry} variant="navy">{w("requestRole")}</Button></div><Link href="/workforce/" className={styles.backLink}>{w("allRoles")}<ArrowUpRight size={16} aria-hidden="true" /></Link></div></aside>
      <article className={styles.guide}>
        {language !== "en" && !translations[language] && <p className={styles.notice}>{w("fallback")}</p>}
        <section id="overview" className={styles.guideSection}><Eyebrow>{w("guide")}</Eyebrow><h2>{w("overview")}</h2><p className={styles.overview} {...contentProps}>{content.overview}</p><div className={styles.industryLinks}><h3>{w("industries")}</h3>{industries.map(industry => <Link key={industry.slug} href={`/industries/${industry.slug}/`}>{local(industry.title)}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div></section>
        <section id="responsibilities" className={styles.guideSection}><h2>{w("responsibilities")}</h2><ol className={styles.responsibilities} {...contentProps}>{content.responsibilities.map((item, i) => <li key={item}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol></section>
        <section id="competencies" className={styles.competencies}><Eyebrow light>{w("capabilities")}</Eyebrow><h2>{w("competencies")}</h2><div {...contentProps}>{content.competencyGroups.map(item => <div className={styles.competency} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div></section>
        <section id="qualifications" className={styles.guideSection}><h2>{w("qualifications")}</h2><div className={styles.qualificationGrid}><div><h3>{w("background")}</h3><p {...contentProps}>{content.qualificationGuidance}</p></div><div><h3>{w("experience")}</h3><p {...contentProps}>{content.experienceGuidance}</p></div></div><h3 className={styles.subheading}>{w("levels")}</h3><dl className={styles.levels} {...contentProps}>{content.workforceLevels.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl></section>
        <section className={styles.guideSection}><div className={styles.environment}><div><h2>{w("equipment")}</h2><p {...contentProps}>{content.equipmentEnvironment}</p></div><div className={styles.safety}><h3>{w("safety")}</h3><ul {...contentProps}>{content.safetyItems.map(item => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>
        <section id="hiring" className={styles.hiring}><Eyebrow>{w("atGlance")}</Eyebrow><h2>{w("hiring")}</h2><div {...contentProps}>{content.hiringConsiderations.map((item, i) => <div key={item.title}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></div>)}</div><Button href={enquiry} variant="navy">{w("requestRole")}</Button></section>
        <section className={styles.guideSection}><h2>{w("planning")}</h2><p>{w("planningNote")}</p><ol className={styles.stages}>{stages.map(([heading, body], i) => <li key={heading}><span aria-hidden="true">{i + 1}</span><div><h3>{w(heading)}</h3><p>{w(body)}</p></div></li>)}</ol></section>
        <section id="faq" className={styles.guideSection}><h2>{w("faq")}</h2><div className={styles.faqs} {...contentProps}>{content.faqs.map(item => <details key={item.question}><summary>{item.question}<ChevronDown size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>
        <section className={styles.sources}><h2>{w("sources")}</h2><p>{w("sourceNote")}</p><ul lang="en" dir="ltr">{role.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ExternalLink size={13} aria-hidden="true" /></a></li>)}</ul></section>
      </article>
    </div>
    <section className={styles.related}><div className="container"><div className={styles.directoryHeading}><h2>{w("related")}</h2><Link href="/workforce/">{w("allRoles")}<ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className={styles.relatedGrid}>{related.map(item => <Link className={styles.relatedCard} key={item.slug} href={`/workforce/${item.slug}/`}><Photo src={item.image} alt="" sizes="(max-width: 650px) 100vw, 33vw" /><div><h3>{t(item.title)}</h3><span>{w("explore")}<ArrowUpRight size={18} aria-hidden="true" /></span></div></Link>)}</div></div></section>
    <section className={styles.closing}><div className="container"><div><Eyebrow light>{t(role.title)}</Eyebrow><h2>{w("formTitle")}</h2><p>{w("briefPrompt")}</p></div><Button href={enquiry}>{w("requestRole")}</Button></div></section>
  </div>;
}
