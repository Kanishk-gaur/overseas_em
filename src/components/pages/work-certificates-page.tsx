"use client";

import Image from "next/image";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, PageHero } from "@/components/shared/ui";
import { workCertificates } from "@/data/work-certificates";
import styles from "@/components/shared/work-certificates.module.css";

export function WorkCertificatesPage() {
  const { t, local, language } = useLocale();
  return <>
    <PageHero eyebrow={t("Work certificates", "कार्य प्रमाणपत्र")} title={t("Documenting\nour work in India.", "भारत में हमारे काम\nका दस्तावेज़ीकरण।")} description={t("Our work across Indian states forms the foundation of our move into international recruitment. This collection brings together the documents that will record that work.", "भारत के राज्यों में किया गया हमारा काम अंतरराष्ट्रीय भर्ती की शुरुआत का आधार है। यह संग्रह उस काम का रिकॉर्ड रखने वाले दस्तावेज़ों के लिए है।")} />
    <section className={`section ${styles.collection}`} aria-labelledby="certificate-collection-title">
      <div className="container">
        <div className={styles.collectionHeading}>
          <div><Eyebrow>{t("THE DOCUMENT COLLECTION", "दस्तावेज़ संग्रह")}</Eyebrow><h2 id="certificate-collection-title">{t("The project record", "परियोजना का रिकॉर्ड")}</h2></div>
          <p className={styles.status}><FileText size={22} strokeWidth={1.5} aria-hidden="true" /><span>{t("These are draft designs, not issued certificates. Client names, states, dates and signatures will be added only after the project details and issuer approval are confirmed.", "ये प्रमाणपत्रों के प्रारूप हैं, जारी किए गए प्रमाणपत्र नहीं। परियोजना विवरण और जारीकर्ता की स्वीकृति मिलने के बाद ही ग्राहक, राज्य, तारीख और हस्ताक्षर जोड़े जाएँगे।")}</span></p>
        </div>
        <div className={styles.certificateGrid}>
          {workCertificates.map((certificate, index) => {
            const file = `/certificates/${language === "en" ? "" : `${language}/`}${certificate.id}-draft.svg`;
            return <article className={styles.certificateCard} key={certificate.id} aria-labelledby={`${certificate.id}-title`}>
              <div className={styles.documentFrame}>
                <div className={styles.documentIndex}><span>{String(index + 1).padStart(2, "0")} / {t("CERTIFICATE DESIGN", "प्रमाणपत्र प्रारूप")}</span><span className={styles.draft}>{t("Draft · Not issued", "प्रारूप · जारी नहीं")}</span></div>
                <a href={file} target="_blank" rel="noopener noreferrer" aria-label={`${t("Open full-size draft", "पूरा प्रारूप खोलें")}: ${local(certificate.title)} ${t("(opens in a new tab)", "(नए टैब में)")}`}>
                  <Image src={file} alt={`${local(certificate.title)} — ${t("Template with blank project details, marked DRAFT — NOT ISSUED", "खाली परियोजना विवरण वाला प्रारूप — जारी नहीं किया गया")}`} width={1120} height={790} unoptimized />
                </a>
              </div>
              <div className={styles.documentCopy}>
                <h3 id={`${certificate.id}-title`}>{local(certificate.title)}</h3>
                <p>{local(certificate.description)}</p>
                <ul>{certificate.fields.en.map((field, index) => <li key={field}>{t(field, certificate.fields.hi[index])}</li>)}</ul>
                <div className={styles.documentActions}>
                  <a href={file} download={`globalpath-${certificate.id}-draft.svg`} className="button button-navy"><Download size={16} aria-hidden="true" />{t("Download draft", "प्रारूप डाउनलोड करें")}</a>
                  <a href={file} target="_blank" rel="noopener noreferrer" className={styles.fullSize}>{t("View full size", "पूरे आकार में देखें")}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">{t("(opens in a new tab)", "(नए टैब में)")}</span></a>
                </div>
                <span className={styles.fileDetails}>{t("Editable SVG · A4 landscape proportions", "संपादन योग्य SVG · A4 लैंडस्केप अनुपात")}</span>
              </div>
            </article>;
          })}
        </div>
        <div className={styles.collectionClosing}><div><h3>{t("Building a team beyond India?", "भारत से बाहर टीम बनाना चाहते हैं?")}</h3><p>{t("Start with the roles, work location and support your project needs.", "भूमिकाओं, कार्यस्थल और परियोजना की ज़रूरतों से शुरुआत करें।")}</p></div><Button href="/request-workforce">{t("Discuss your workforce needs", "भर्ती की ज़रूरत बताएँ")}</Button></div>
      </div>
    </section>
  </>;
}
