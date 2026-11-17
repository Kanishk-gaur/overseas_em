"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Download, Mail, Stamp } from "lucide-react";
import { site } from "@/config/site";
import { visaServiceTypes } from "@/data/visa-guide";
import { workforceMailto } from "@/lib/workforce-enquiry";
import { useWorkforceCopy } from "@/components/workforce/use-workforce-copy";
import formStyles from "@/components/workforce/workforce.module.css";
import styles from "./visa-enquiry.module.css";

// Same approach as the employer brief: nothing is sent from the website. The
// visitor opens a prepared email (once a verified address is configured) or
// downloads a copy. Shared status, privacy and button copy comes from the
// workforce dictionaries, which are already translated.
const fields = ["name", "phone", "email", "destination", "visaType", "purpose", "travelDate", "message"] as const;
type VisaEnquiryValues = Record<typeof fields[number], string>;

export function VisaEnquiry() {
  const { t, w, local } = useWorkforceCopy();
  const [values, setValues] = useState<VisaEnquiryValues>({ name: "", phone: "", email: "", destination: "", visaType: "", purpose: "", travelDate: "", message: "" });
  const [status, setStatus] = useState<"emailOpened" | "downloaded" | "longBrief" | null>(null);
  const ready = Boolean(workforceMailto(site.contact.email, "", ""));
  const labels: VisaEnquiryValues = {
    name: t("Full name", "पूरा नाम"),
    phone: t("Phone / WhatsApp", "फोन / WhatsApp"),
    email: t("Email", "ईमेल"),
    destination: t("Destination country", "गंतव्य देश"),
    visaType: t("Visa type", "वीज़ा का प्रकार"),
    purpose: t("Purpose of travel", "यात्रा का उद्देश्य"),
    travelDate: t("Planned travel date", "यात्रा की संभावित तारीख"),
    message: t("Message", "संदेश"),
  };
  const selected = visaServiceTypes.find(item => item.id === values.visaType);
  const visaLabel = selected ? local(selected.title) : "";
  const body = fields.map(key => `${labels[key]}: ${(key === "visaType" ? visaLabel : values[key]).trim() || "—"}`).join("\n\n");
  const subject = t("Visa enquiry: {visa}", "वीज़ा पूछताछ: {visa}", { visa: [visaLabel, values.destination.trim()].filter(Boolean).join(" · ") });
  function update(key: keyof VisaEnquiryValues, value: string) { setValues(previous => ({ ...previous, [key]: value })); setStatus(null); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = workforceMailto(site.contact.email, subject, body);
    if (!href) return;
    if (href.length > 1800) { setStatus("longBrief"); return; }
    setStatus("emailOpened");
    window.location.href = href;
  }
  function download() {
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "visa-enquiry.txt";
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("downloaded");
  }
  const optional = <small>({w("optional")})</small>;
  const required = <span aria-hidden="true">*</span>;
  function input(key: keyof VisaEnquiryValues, isRequired: boolean, type = "text", autoComplete?: string) {
    return <label className={formStyles.field} htmlFor={`visa-${key}`}><span>{labels[key]} {isRequired ? required : optional}</span><input id={`visa-${key}`} name={key} type={type} required={isRequired} pattern={isRequired && type === "text" ? ".*\\S.*" : undefined} value={values[key]} autoComplete={autoComplete} maxLength={type === "email" ? 254 : 160} onChange={event => update(key, event.target.value)} /></label>;
  }
  return <form className={`${formStyles.form} ${styles.form}`} onSubmit={submit} aria-labelledby="visa-form-title">
    <div className={formStyles.formHeading}><Stamp size={24} aria-hidden="true" /><h4 id="visa-form-title" className={styles.title}>{t("Visa enquiry", "वीज़ा पूछताछ")}</h4></div>
    <p className={formStyles.formHint}>{w("requiredNote")}</p>
    <fieldset><legend>{t("Your details", "आपकी जानकारी")}</legend><div className={formStyles.fields}>
      {input("name", true, "text", "name")}{input("phone", false, "tel", "tel")}
      <div className={formStyles.fullField + " " + styles.fieldReset}>{input("email", true, "email", "email")}</div>
    </div></fieldset>
    <fieldset><legend>{t("Your trip", "आपकी यात्रा")}</legend><div className={formStyles.fields}>
      {input("destination", true, "text", "country-name")}
      <label className={formStyles.field} htmlFor="visa-visaType"><span>{labels.visaType} {required}</span><select id="visa-visaType" name="visaType" required value={values.visaType} onChange={event => update("visaType", event.target.value)}><option value="">{t("Choose a visa type", "वीज़ा का प्रकार चुनें")}</option>{visaServiceTypes.map(item => <option key={item.id} value={item.id}>{local(item.title)}</option>)}</select></label>
      {input("purpose", false)}
      <label className={formStyles.field} htmlFor="visa-travelDate"><span>{labels.travelDate} {optional}</span><input id="visa-travelDate" name="travelDate" type="date" value={values.travelDate} onChange={event => update("travelDate", event.target.value)} /></label>
      <label className={`${formStyles.field} ${formStyles.fullField} ${styles.fieldReset}`} htmlFor="visa-message"><span>{labels.message} {optional}</span><textarea id="visa-message" name="message" rows={5} maxLength={4000} value={values.message} onChange={event => update("message", event.target.value)} aria-describedby="visa-message-help" /><small id="visa-message-help">{t("Please do not include passport numbers or copies of documents in this message.", "कृपया इस संदेश में पासपोर्ट नंबर या दस्तावेज़ों की प्रतियाँ न डालें।")}</small></label>
    </div></fieldset>
    <div className={formStyles.formPrivacy}><p>{w("formPrivacy")}</p><Link href="/privacy-policy">{t("Privacy Policy")}</Link></div>
    {!ready && <p className={formStyles.notice} id="visa-email-unavailable">{w("unconfigured")}</p>}
    <div className={formStyles.formActions}><button className="button button-navy" type="submit" disabled={!ready} aria-describedby={!ready ? "visa-email-unavailable" : undefined}><Mail size={17} aria-hidden="true" />{w("emailButton")}</button><button className={formStyles.downloadButton} type="button" onClick={download}><Download size={17} aria-hidden="true" />{w("download")}</button></div>
    <div role="status" aria-live="polite" className={formStyles.formStatus}>{status && <p>{w(status)}{status === "longBrief" && ready && <> <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></>}</p>}</div>
  </form>;
}
