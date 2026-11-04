"use client";
import { Building2, UserRound, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContactAction } from "./contact-action";
import { useLocale } from "./locale-provider";
import { Eyebrow, Reveal } from "./ui";

export function ContactCTA({ employer = true }: { employer?: boolean } = {}) {
  const { t } = useLocale();
  return <section className="contact-start"><div className="container"><Reveal className="contact-start-heading"><Eyebrow>{t("CONTACT OUR TEAM", "हमारी टीम से संपर्क करें")}</Eyebrow><h2>{t("Let’s discuss\nyour next team.", "आपकी अगली टीम पर\nबात करें।")}</h2><p>{t("Prepare roles, headcounts and worksite details for an employer enquiry. Candidates have a separate guide.", "नियोक्ता पूछताछ के लिए पद, संख्या और कार्यस्थल का विवरण तैयार करें। उम्मीदवारों के लिए अलग मार्गदर्शिका है।")}</p></Reveal><div className="contact-paths"><Reveal className={"contact-path " + (!employer ? "contact-path-featured" : "")}><UserRound size={27} strokeWidth={1.4} /><span>{t("FOR CANDIDATES", "उम्मीदवारों के लिए")}</span><h3>{t("Looking for work overseas?", "विदेश में काम की तलाश है?")}</h3><p>{t("Tell us your trade, experience and the destinations you’re exploring.", "अपना ट्रेड, अनुभव और पसंद के देश बताएँ।")}</p><ContactAction type="candidate" variant="navy">{t("Talk about overseas work", "विदेश में काम के बारे में बात करें")}</ContactAction><Link href="/find-a-job">{t("Prepare your enquiry", "अपनी पूछताछ की तैयारी करें")}<ArrowUpRight size={16} /></Link></Reveal><Reveal className={"contact-path " + (employer ? "contact-path-featured" : "")}><Building2 size={27} strokeWidth={1.4} /><span>{t("FOR EMPLOYERS", "नियोक्ताओं के लिए")}</span><h3>{t("Planning to hire from India?", "भारत से भर्ती की योजना है?")}</h3><p>{t("Discuss roles, headcount, work locations and your recruitment plans.", "पद, संख्या, काम के स्थान और भर्ती योजना पर बात करें।")}</p><ContactAction type="employer" variant="navy">{t("Discuss your workforce needs", "कामगारों की ज़रूरत बताएँ")}</ContactAction><Link href="/request-workforce">{t("Build your recruitment brief", "भर्ती की जानकारी तैयार करें")}<ArrowUpRight size={16} /></Link></Reveal></div></div></section>;
}
