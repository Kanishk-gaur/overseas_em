"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, MapPin } from "lucide-react";
import { useLocale } from "./locale-provider";
import { Eyebrow, TextLink } from "./ui";
import styles from "./work-certificates.module.css";

export function IndiaExperience() {
  const { t, language } = useLocale();
  return <section className={`section ${styles.experience}`} aria-labelledby="india-experience-title">
    <div className={`container ${styles.experienceGrid}`}>
      <div className={styles.story}>
        <Eyebrow>{t("OUR BACKGROUND", "हमारी पृष्ठभूमि")}</Eyebrow>
        <h2 id="india-experience-title">{t("Taking our Indian\nexperience overseas.", "भारत का अनुभव\nविदेश तक ले जाना।")}</h2>
        <p>{t("Our move into international recruitment builds on work across Indian states. That experience informs how we discuss requirements with workers and overseas employers.", "अंतरराष्ट्रीय भर्ती में हमारा कदम भारतीय राज्यों में किए गए काम पर आधारित है। यही अनुभव कामगारों और विदेशी नियोक्ताओं से ज़रूरतों पर हमारी बातचीत को दिशा देता है।")}</p>
        <ol className={styles.journey}>
          <li><MapPin size={21} strokeWidth={1.5} aria-hidden="true" /><div><span>{t("OUR FOUNDATION", "हमारा आधार")}</span><strong>{t("Work across India", "भारत में काम का अनुभव")}</strong></div></li>
          <li><Globe2 size={21} strokeWidth={1.5} aria-hidden="true" /><div><span>{t("OUR NEXT STEP", "हमारा अगला कदम")}</span><strong>{t("International recruitment", "अंतरराष्ट्रीय भर्ती")}</strong></div></li>
        </ol>
        <TextLink href="/work-certificates">{t("Explore work certificates", "कार्य प्रमाणपत्र देखें")}</TextLink>
      </div>
      <Link href="/work-certificates" className={styles.preview}>
        <div className={styles.previewTop}><span>{t("WORK CERTIFICATES", "कार्य प्रमाणपत्र")}</span><span className={styles.draft}>{t("Draft templates", "प्रारूप")}</span></div>
        <div className={styles.previewPaper}><Image src={`/certificates/${language === "en" ? "" : `${language}/`}work-completion-draft.svg`} alt={t("Draft work completion certificate with blank project and issuer details", "खाली परियोजना और जारीकर्ता विवरण वाला कार्य पूर्णता प्रमाणपत्र का प्रारूप")} width={1120} height={790} unoptimized sizes="(max-width: 900px) 90vw, 42vw" /></div>
        <div className={styles.previewBottom}><div><strong>{t("The record behind the work", "काम का लिखित रिकॉर्ड")}</strong><p>{t("Project details and issuer approval pending.", "परियोजना विवरण और जारीकर्ता की स्वीकृति बाकी है।")}</p></div><ArrowUpRight size={22} aria-hidden="true" /></div>
      </Link>
    </div>
  </section>;
}
