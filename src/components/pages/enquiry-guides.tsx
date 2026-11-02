"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FileCheck2, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { photography } from "@/data/photography";
import { Eyebrow, Photo } from "@/components/shared/ui";
import { EmployerEnquiry } from "@/components/workforce/employer-enquiry";
import { useWorkforceCopy } from "@/components/workforce/use-workforce-copy";
import styles from "@/components/workforce/workforce.module.css";

function EnquiryEntry() {
  const params = useSearchParams();
  const role = params.get("role") || "";
  return <EmployerEnquiry key={role} selectedRole={role} />;
}
export function WorkforceRequestPage() {
  const { t, w } = useWorkforceCopy();
  return <div className={styles.workforce}><section className={styles.enquiryPage}><div className={`container ${styles.enquiryGrid}`}>
    <div className={styles.enquiryIntro}><div className={styles.breadcrumbs}><Link href="/workforce">{w("allRoles")}</Link><span>/</span><span>{t("Request workforce")}</span></div><Eyebrow>{t("FOR INTERNATIONAL EMPLOYERS")}</Eyebrow><h1>{w("formTitle")}</h1><p className={styles.lead}>{w("formIntro")}</p><Photo src={photography.requirements} alt="" sizes="(max-width: 900px) 100vw, 35vw" /><div className={styles.enquirySteps}><div><Users size={22} aria-hidden="true" /><p>{w("stageBriefBody")}</p></div><div><FileCheck2 size={22} aria-hidden="true" /><p>{w("directoryNote")}</p></div></div><Link href="/employers">{t("Explore hiring options & employer support")}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
    <Suspense fallback={<EmployerEnquiry />}><EnquiryEntry /></Suspense>
  </div></section></div>;
}
