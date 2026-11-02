"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Download, Mail, FileText } from "lucide-react";
import { site } from "@/config/site";
import { workforceIndex, findWorkforceRole } from "@/data/workforce-index";
import { enquiryFields, formatWorkforceEnquiry, workforceMailto, type WorkforceEnquiry } from "@/lib/workforce-enquiry";
import { useWorkforceCopy } from "./use-workforce-copy";
import styles from "./workforce.module.css";

export function EmployerEnquiry({ selectedRole = "" }: { selectedRole?: string }) {
  const { w, t } = useWorkforceCopy();
  const [values, setValues] = useState<WorkforceEnquiry>({ company: "", person: "", email: "", country: "", phone: "", role: findWorkforceRole(selectedRole)?.title || "", quantity: "", level: "", location: "", timeline: "", details: "" });
  const [status, setStatus] = useState<"emailOpened" | "downloaded" | "longBrief" | null>(null);
  const role = findWorkforceRole(values.role);
  const ready = Boolean(workforceMailto(site.contact.email, "", ""));
  const labels = Object.fromEntries(enquiryFields.map(key => [key, w(key)])) as Record<keyof WorkforceEnquiry, string>;
  const levelKeys = ["entry", "experienced", "specialist", "supervisor", "mixed"] as const;
  const preparedValues = { ...values, role: role ? t(role.title) : values.role === "multiple" ? w("multipleRoles") : "", level: levelKeys.includes(values.level as typeof levelKeys[number]) ? w(values.level as typeof levelKeys[number]) : "" };
  const body = formatWorkforceEnquiry(preparedValues, labels);
  function update(key: keyof WorkforceEnquiry, value: string) { setValues(previous => ({ ...previous, [key]: value })); setStatus(null); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = workforceMailto(site.contact.email, w("enquirySubject", { role: preparedValues.role }), body);
    if (!href) return;
    if (href.length > 1800) { setStatus("longBrief"); return; }
    setStatus("emailOpened");
    window.location.href = href;
  }
  function download() {
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "workforce-enquiry.txt";
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("downloaded");
  }
  function input(key: keyof WorkforceEnquiry, required = false, type = "text", autoComplete?: string) {
    return <label className={styles.field} key={key} htmlFor={`brief-${key}`}><span>{w(key)} {required ? <span aria-hidden="true">*</span> : <small>({w("optional")})</small>}</span><input id={`brief-${key}`} name={key} type={type} required={required} pattern={required && type === "text" ? ".*\\S.*" : undefined} value={values[key]} autoComplete={autoComplete} maxLength={type === "email" ? 254 : 160} onChange={event => update(key, event.target.value)} /></label>;
  }
  return <form className={styles.form} onSubmit={submit} aria-labelledby="workforce-form-title">
    <div className={styles.formHeading}><FileText size={24} aria-hidden="true" /><h2 id="workforce-form-title">{w("atGlance")}</h2></div>
    <p className={styles.formHint}>{w("requiredNote")}</p>
    <fieldset><legend>{w("companySection")}</legend><div className={styles.fields}>
      {input("company", true, "text", "organization")}{input("person", true, "text", "name")}{input("email", true, "email", "email")}{input("country", true, "text", "country-name")}{input("phone", false, "tel", "tel")}
    </div></fieldset>
    <fieldset><legend>{w("requirementSection")}</legend><div className={styles.fields}>
      <label className={`${styles.field} ${styles.fullField}`} htmlFor="brief-role"><span>{w("role")} <span aria-hidden="true">*</span></span><select id="brief-role" name="role" required value={values.role} onChange={event => update("role", event.target.value)}><option value="">{w("chooseRole")}</option>{workforceIndex.map(item => <option value={item.title} key={item.slug}>{t(item.title)}</option>)}<option value="multiple">{w("multipleRoles")}</option></select></label>
      {role && <Link className={styles.fullField} href={`/workforce/${role.slug}/`}>{w("reviewRole")} <ArrowUpRight size={14} aria-hidden="true" /></Link>}
      <label className={styles.field} htmlFor="brief-quantity"><span>{w("quantity")} <small>({w("optional")})</small></span><input id="brief-quantity" name="quantity" type="number" min="1" max="100000" step="1" inputMode="numeric" value={values.quantity} onChange={event => update("quantity", event.target.value)} aria-describedby="quantity-help" /><small id="quantity-help">{w("quantityHelp")}</small></label>
      <label className={styles.field} htmlFor="brief-level"><span>{w("level")} <small>({w("optional")})</small></span><select id="brief-level" name="level" value={values.level} onChange={event => update("level", event.target.value)}><option value="">{w("chooseLevel")}</option>{levelKeys.map(key => <option key={key} value={key}>{w(key)}</option>)}</select></label>
      {input("location")}{input("timeline")}
      <label className={`${styles.field} ${styles.fullField}`} htmlFor="brief-details"><span>{w("details")} <small>({w("optional")})</small></span><textarea id="brief-details" name="details" rows={5} maxLength={4000} value={values.details} onChange={event => update("details", event.target.value)} aria-describedby="details-help" /><small id="details-help">{w("detailHelp")}</small></label>
    </div></fieldset>
    <div className={styles.formPrivacy}><p>{w("formPrivacy")}</p><Link href="/privacy-policy">{t("Privacy Policy")}</Link></div>
    {!ready && <p className={styles.notice} id="email-unavailable">{w("unconfigured")}</p>}
    <div className={styles.formActions}><button className="button button-navy" type="submit" disabled={!ready} aria-describedby={!ready ? "email-unavailable" : undefined}><Mail size={17} aria-hidden="true" />{w("emailButton")}</button><button className={styles.downloadButton} type="button" onClick={download}><Download size={17} aria-hidden="true" />{w("download")}</button></div>
    <div role="status" aria-live="polite" className={styles.formStatus}>{status && <p>{w(status)}{status === "longBrief" && ready && <> <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></>}</p>}</div>
  </form>;
}
