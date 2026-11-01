"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { photography } from "@/data/photography";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, Photo } from "@/components/shared/ui";

export function EmployerPreview() {
  const { t } = useLocale();
  const support = [
    { title: t("People matched to your operation", "आपके काम के अनुसार लोग"), text: t("Technical professionals, skilled trades and essential teams, sourced around your role criteria.", "आपकी भूमिका की शर्तों के अनुसार तकनीकी पेशेवर, कुशल कारीगर और ज़रूरी टीमें।") },
    { title: t("Selection with your team involved", "आपकी टीम की भागीदारी से चयन"), text: t("Profile screening, practical assessments and employer interviews coordinated with you.", "आपके साथ प्रोफाइल की जाँच, व्यावहारिक परीक्षण और नियोक्ता इंटरव्यू का समन्वय।") },
    { title: t("Documentation and arrival support", "दस्तावेज़ और आगमन में सहयोग"), text: t("Documentation, arrival planning and ongoing contact within the agreed service scope.", "तय सेवा दायरे में दस्तावेज़, आगमन योजना और लगातार संपर्क।") },
  ];

  return <section className="section employer-studio" aria-labelledby="home-employer-heading">
    <div className="container"><div className="employer-studio-panel">
      <Photo src={photography.engineering} alt={t("Engineers reviewing a production requirement", "उत्पादन की ज़रूरत की समीक्षा करते इंजीनियर")} />
      <div className="employer-studio-copy">
        <Eyebrow light>{t("FOR INTERNATIONAL EMPLOYERS", "विदेशी नियोक्ताओं के लिए")}</Eyebrow>
        <h2 id="home-employer-heading">{t("Who does your\noperation need?", "आपके काम के लिए\nकिसकी ज़रूरत है?")}</h2>
        <p>{t("Tell us about the roles you need to fill. We’ll discuss how to source and assess candidates against your requirements.", "बताएँ आपको किन पदों पर भर्ती करनी है। हम आपकी शर्तों के अनुसार उम्मीदवार खोजने और परखने के तरीके पर चर्चा करेंगे।")}</p>
        <ul className="employer-studio-support">{support.map(item => <li key={item.title}><Check size={16} aria-hidden="true" /><div><strong>{item.title}</strong><small>{item.text}</small></div></li>)}</ul>
        <Button href="/request-workforce">{t("Discuss a workforce requirement", "भर्ती की ज़रूरत बताएँ")}</Button>
        <Link href="/employers">{t("Explore hiring options & employer support", "भर्ती के विकल्प और नियोक्ता सहयोग देखें")}<ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </div></div>
  </section>;
}
