"use client";

import { Building2, Wrench, BriefcaseBusiness, CalendarRange, Users, ClipboardCheck, ShieldCheck, Plane } from "lucide-react";
import { employerBenefits, employerCapabilities, employerSectionCopy as copy } from "@/data/about-employers";
import { photography } from "@/data/photography";
import { useLocale } from "./locale-provider";
import { Button, Eyebrow, Photo, Reveal } from "./ui";
import styles from "./about-employer-sections.module.css";

const icons = [Building2, Wrench, BriefcaseBusiness, CalendarRange, Users, ClipboardCheck, ShieldCheck, Plane];

export function AboutEmployerSections() {
  const { local } = useLocale();
  return <>
    <section className={`section ${styles.benefits}`} id="why-hire-indian-workforce" aria-labelledby="indian-workforce-title">
      <div className="container">
        <div className={styles.introduction}>
          <Reveal><Eyebrow>{local(copy.whyEyebrow)}</Eyebrow><h2 id="indian-workforce-title">{local(copy.whyTitle)}</h2><p className={styles.lead}>{local(copy.whyIntro)}</p><p className={styles.note}>{local(copy.whyNote)}</p></Reveal>
          <Reveal className={styles.visual}><Photo src={photography.workforce} alt="Indian professionals representing healthcare, construction and skilled trades" sizes="(max-width: 900px) 100vw, 42vw" /></Reveal>
        </div>
        <div className={styles.benefitGrid}>{employerBenefits.map((item, index) => {
          const Icon = icons[index];
          return <Reveal key={item.title.en} className={styles.benefit}><div className={styles.cardTop}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div><h3>{local(item.title)}</h3><p>{local(item.body)}</p></Reveal>;
        })}</div>
      </div>
    </section>
    <section className={`section ${styles.offering}`} id="employer-recruitment-services" aria-labelledby="employer-services-title">
      <div className={`container ${styles.offerLayout}`}>
        <Reveal className={styles.offerIntro}><Eyebrow>{local(copy.offerEyebrow)}</Eyebrow><h2 id="employer-services-title">{local(copy.offerTitle)}</h2><p className={styles.lead}>{local(copy.offerIntro)}</p><Photo src={photography.requirements} alt="A recruitment coordinator recording workforce requirements" sizes="(max-width: 900px) 100vw, 33vw" /><p className={styles.note}>{local(copy.offerNote)}</p></Reveal>
        <div><ol className={styles.capabilities}>{employerCapabilities.map((item, index) => <li key={item.title.en}><Reveal><span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{local(item.title)}</h3><p>{item.body.map(local).join(" ")}</p></Reveal></li>)}</ol><div className={styles.action}><Button href="/request-workforce" variant="navy">{local(copy.cta)}</Button></div></div>
      </div>
    </section>
  </>;
}
