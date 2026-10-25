"use client";
import { RecruitmentFlow } from "@/components/shared/recruitment-flow";
import { photography } from "@/data/photography";
import { employerTracks, employerModels } from "@/data/employers";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, PageHero, Photo, TextLink } from "@/components/shared/ui";
import { ContactCTA } from "@/components/shared/contact-cta";

export function HiringPage() {
  const { t, local } = useLocale();
  return <><PageHero eyebrow={t("HOW WE WORK", "हम कैसे काम करते हैं")} title={t("A clear brief.\nA considered process.", "स्पष्ट ज़रूरतें।\nसोच-समझकर प्रक्रिया।")} description={t("Two hiring tracks, shaped around the qualifications and practical skills your business needs. From the first requirement to agreed account support.", "आपकी व्यावसायिक ज़रूरत के अनुसार योग्यता और व्यावहारिक हुनर के लिए दो भर्ती प्रक्रियाएँ। पहली ज़रूरत से तय सहयोग तक।")} image={photography.engineering} />
    <section className="section"><div className="container recruitment-tracks">{employerTracks.map(track => <article key={track.id} id={track.id === "trades" ? "non-technical" : track.id}><Photo src={track.image} alt={local(track.title)} /><Eyebrow>{local(track.label)}</Eyebrow><h2>{local(track.title)}</h2><p className="body-copy">{local(track.description)}</p><ol className="hiring-steps">{track.checks.map((check,index) => <li key={index}><span>0{index+1}</span><div><p>{local(check)}</p></div></li>)}</ol><TextLink href="/workforce">{t("Explore example profiles", "प्रोफाइल के उदाहरण देखें")}</TextLink></article>)}</div></section>
    <RecruitmentFlow />
    <section className="section"><div className="container"><div className="guide-heading"><div><Eyebrow>{t("WAYS TO WORK TOGETHER", "साथ काम करने के तरीके")}</Eyebrow><h2>{t("Your operation.\nThe right engagement.", "आपका काम।\nउपयुक्त सहयोग।")}</h2></div><p>{t("Scope, timing, costs and support are set out in the agreed service terms. Start with the requirement and choose a model that fits.", "दायरा, समय, खर्च और सहयोग सेवा समझौते में तय होते हैं। ज़रूरत से शुरू करके उपयुक्त तरीका चुनें।")}</p></div><div className="recruitment-process">{employerModels.map(model => <article key={model.id}><h3>{local(model.title)}</h3><p>{local(model.body)}</p></article>)}</div><div className="recruitment-closing"><Button href="/request-workforce" variant="navy">{t("Share a workforce requirement", "कामगारों की ज़रूरत बताएँ")}</Button><TextLink href="/employers#employer-models">{t("Compare hiring options", "भर्ती के तरीके देखें")}</TextLink><TextLink href="/find-a-job">{t("Worker preparation guide", "कामगार तैयारी मार्गदर्शिका")}</TextLink></div></div></section><ContactCTA employer />
  </>;
}
