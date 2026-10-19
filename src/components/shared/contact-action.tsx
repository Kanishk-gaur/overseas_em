"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone, X } from "lucide-react";
import { contactHref, type EnquiryType } from "@/lib/contact";
import { useLocale } from "./locale-provider";

export function ContactAction({ method = "whatsapp", type = "candidate", children, variant = "gold", compact = false }: { method?: "whatsapp" | "phone" | "email"; type?: EnquiryType; children?: React.ReactNode; variant?: "gold" | "navy" | "outline" | "white"; compact?: boolean }) {
  const { d, t } = useLocale();
  const dialog = useRef<HTMLDialogElement>(null);
  const href = contactHref(method, type);
  const Icon = method === "whatsapp" ? MessageCircle : method === "phone" ? Phone : Mail;
  const label = children || (method === "whatsapp" ? d.whatsapp : method === "phone" ? d.call : d.email);
  const content = <><Icon size={17} aria-hidden="true" /><span>{label}</span>{!compact && <ArrowUpRight size={16} aria-hidden="true" />}</>;
  return <>
    {href ? <a className={`button button-${variant}`} href={href} target={method === "whatsapp" ? "_blank" : undefined} rel={method === "whatsapp" ? "noopener noreferrer" : undefined}>{content}</a> : <button type="button" className={`button button-${variant}`} onClick={() => dialog.current?.showModal()}>{content}</button>}
    {!href && <dialog ref={dialog} className="contact-dialog" aria-label={t("Contact information", "संपर्क जानकारी")} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><button className="dialog-close icon-button" aria-label={t("Close", "बंद करें")} onClick={() => dialog.current?.close()}><X size={20} /></button><span className="dialog-symbol"><Icon size={26} /></span><h2>{t("Let’s connect soon.", "जल्द ही बात होगी।")}</h2><p>{d.notConfigured}</p><p className="small muted">{t("The verified phone number, WhatsApp and email will appear on our contact page once available.", "सत्यापित फोन, WhatsApp और ईमेल उपलब्ध होने पर संपर्क पेज पर दिखेंगे।")}</p><Link href="/contact" className="button button-navy" onClick={() => dialog.current?.close()}>{d.nav[7]}<ArrowUpRight size={17} /></Link></dialog>}
  </>;
}
