"use client";

import { Building2, Wrench, Factory, Calculator, CalendarRange, Globe2, Users, ClipboardCheck, Route, Settings2 } from "lucide-react";
import { homeWorkforceCopy as copy, homePrimaryBenefits, homeCommercialBenefit, homeSupportingBenefits } from "@/data/home-workforce-benefits";
import { photography } from "@/data/photography";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, Photo, Reveal } from "@/components/shared/ui";
import styles from "./workforce-benefits.module.css";

const primaryIcons = [Building2, Wrench, Factory];
const supportingIcons = [CalendarRange, Globe2, Users, ClipboardCheck, Route, Settings2];

export function WorkforceBenefits() {
  const { local } = useLocale();
  return <section className={`section ${styles.section}`} id="why-indian-workforce" aria-labelledby="home-workforce-benefits-title">
    <div className="container">
      <div className={styles.intro}>
        <Reveal><Eyebrow>{local(copy.eyebrow)}</Eyebrow><h2 id="home-workforce-benefits-title">{local(copy.title)}</h2><p className={styles.lead}>{local(copy.intro)}</p></Reveal>
        <Reveal className={styles.visual}><Photo src={photography.engineering} alt="Two engineers reviewing equipment at a manufacturing plant" sizes="(max-width: 767px) 100vw, 42vw" /></Reveal>
      </div>
      <div className={styles.primary}>
        {homePrimaryBenefits.map((benefit, index) => {
          const Icon = primaryIcons[index];
          return <Reveal className={styles.primaryCard} key={benefit.title.en}><div className={styles.marker}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div><h3>{local(benefit.title)}</h3><p>{local(benefit.body)}</p></Reveal>;
        })}
      </div>
      <div className={styles.detailLayout}>
        <Reveal className={styles.commercial}><div className={styles.marker}><Calculator size={28} strokeWidth={1.4} aria-hidden="true" /><span aria-hidden="true">04</span></div><h3>{local(homeCommercialBenefit.title)}</h3><p>{local(homeCommercialBenefit.body)}</p><Photo src={photography.warehouse} alt="Warehouse workers packing and checking orders" sizes="(max-width: 767px) 100vw, 30vw" /></Reveal>
        <div className={styles.supporting}>{homeSupportingBenefits.map((benefit, index) => {
          const Icon = supportingIcons[index];
          return <Reveal className={styles.supportingItem} key={benefit.title.en}><div className={styles.marker}><Icon size={23} strokeWidth={1.4} aria-hidden="true" /><span aria-hidden="true">{String(index + 5).padStart(2, "0")}</span></div><h3>{local(benefit.title)}</h3><p>{local(benefit.body)}</p></Reveal>;
        })}</div>
      </div>
      <p className={styles.note}>{local(copy.note)}</p>
      <Reveal className={styles.cta}><div><h3>{local(copy.ctaTitle)}</h3><p>{local(copy.ctaBody)}</p></div><div className={styles.actions}><Button href="/request-workforce">{local(copy.primary)}</Button><Button href="/workforce" variant="outline">{local(copy.secondary)}</Button></div></Reveal>
    </div>
  </section>;
}
