"use client";
import Link from "next/link";
import { ArrowUpRight, FileText, ShieldCheck, MessagesSquare } from "lucide-react";
import { photography } from "@/data/photography";
import { useLocale } from "@/components/shared/locale-provider";
import { Eyebrow, Photo } from "@/components/shared/ui";

export function WorkerPreview() {
  const { t } = useLocale();
  const links = [
    { href:"/find-a-job#documents",icon:FileText,title:t("Get your documents ready","दस्तावेज़ तैयार रखें"),text:t("A practical checklist, with room for your questions.","ज़रूरी सवालों के साथ तैयारी की उपयोगी सूची।") },
    { href:"/find-a-job#prepare",icon:MessagesSquare,title:t("Prepare for the conversation","बातचीत की तैयारी करें"),text:t("Simple guidance on your CV, interviews and written terms.","बायोडाटा, इंटरव्यू और लिखित शर्तों की सरल जानकारी।") },
    { href:"/find-a-job#safe-recruitment",icon:ShieldCheck,title:t("Know what to verify","जानें कि क्या जाँचना है"),text:t("Check recruiters, offers and payment requests independently.","एजेंट, प्रस्ताव और भुगतान के अनुरोध की स्वतंत्र जाँच करें।") },
  ];
  return <section className="section worker-preview"><div className="container worker-preview-layout"><div className="worker-preview-photo"><Photo src={photography.documents} alt={t("Preparing passport and recruitment documents","पासपोर्ट और भर्ती दस्तावेज़ तैयार करना")} /><div><FileText size={23} aria-hidden="true" /><span>{t("YOUR PREPARATION STARTS HERE","आपकी तैयारी की शुरुआत यहाँ")}</span></div></div><div><Eyebrow>{t("FOR WORKERS & THEIR FAMILIES","कामगारों और उनके परिवारों के लिए")}</Eyebrow><h2>{t("Before the journey,\na little preparation.","सफर से पहले,\nथोड़ी तैयारी।")}</h2><p>{t("Understand the steps, keep your information organised and make room for the questions that matter.","चरण समझें, अपनी जानकारी व्यवस्थित रखें और ज़रूरी सवालों के लिए समय लें।")}</p><div className="worker-preview-links">{links.map(item=><Link href={item.href} key={item.href}><item.icon size={23} strokeWidth={1.5} aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.text}</small></span><ArrowUpRight size={19} aria-hidden="true" /></Link>)}</div></div></div></section>;
}
