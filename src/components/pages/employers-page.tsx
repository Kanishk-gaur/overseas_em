"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, ClipboardCheck, FileCheck2, Handshake, ListChecks, Plus, Search, Send, UsersRound } from "lucide-react";
import { employerBrief, employerFaqs, employerModels, employerServices, employerStages, employerTracks } from "@/data/employers";
import { industries } from "@/data/industries";
import { photography } from "@/data/photography";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, Photo, Reveal, TextLink } from "@/components/shared/ui";
import { ContactAction } from "@/components/shared/contact-action";

const serviceIcons = [Search, ClipboardCheck, FileCheck2, UsersRound, Send, Handshake];
const sectorSlugs = ["construction", "manufacturing", "logistics", "hospitality", "healthcare", "agriculture", "facilities", "it-professional"];
const sectors = sectorSlugs.map(slug => industries.find(industry => industry.slug === slug)!);

export function EmployersPage() {
  const { t, local } = useLocale();
  const [activeModel, setActiveModel] = useState(0);
  const model = employerModels[activeModel];

  function onModelKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % employerModels.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + employerModels.length) % employerModels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = employerModels.length - 1;
    else return;
    event.preventDefault();
    setActiveModel(next);
    document.getElementById(`employer-model-tab-${employerModels[next].id}`)?.focus();
  }

  return <div className="employer-page">
    <section className="employer-hero">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">{t("Home", "होम")}</Link><ChevronRight size={12} aria-hidden="true" /><span>{t("For employers", "नियोक्ताओं के लिए")}</span></div>
        <div className="employer-hero-grid">
          <div className="employer-hero-copy">
            <Eyebrow>{t("INDIAN TALENT. YOUR NEXT TEAM.", "भारतीय प्रतिभा। आपकी अगली टीम।")}</Eyebrow>
            <h1>{t("Your next team.", "आपकी अगली टीम।")}<br />{t("Built around", "आपके कारोबार")}<br /><em>{t("your business.", "के अनुसार।")}</em></h1>
            <p>{t("From a specialist appointment to a complete project team, connect with Indian talent through a recruitment process shaped around your roles, standards and plans.", "एक विशेषज्ञ की नियुक्ति से लेकर पूरी प्रोजेक्ट टीम तक, आपकी भूमिकाओं, मानकों और योजनाओं के अनुसार भर्ती प्रक्रिया से भारतीय प्रतिभा से जुड़ें।")}</p>
            <div className="button-row"><Button href="/request-workforce" variant="navy">{t("Discuss your hiring needs", "अपनी भर्ती की ज़रूरत बताएँ")}</Button><a className="employer-hero-link" href="#employer-process">{t("See how it works", "प्रक्रिया समझें")}<ArrowDown size={16} aria-hidden="true" /></a></div>
            <div className="employer-hero-points">{[t("Technical professionals", "तकनीकी पेशेवर"), t("Skilled trades", "कुशल कारीगर"), t("Essential teams", "ज़रूरी टीमें")].map(point => <span key={point}><Check size={14} aria-hidden="true" />{point}</span>)}</div>
          </div>
          <div className="employer-hero-visual">
            <Photo src={photography.engineering} alt={t("Engineers reviewing work on a production floor", "उत्पादन स्थल पर काम की समीक्षा करते इंजीनियर")} priority />
            <span className="employer-image-label">{t("PEOPLE BEHIND YOUR PROGRESS", "आपकी प्रगति के पीछे के लोग")}</span>
            <div className="employer-hero-caption"><span><UsersRound size={24} strokeWidth={1.4} aria-hidden="true" /></span><div><p>{t("A clear brief. A considered shortlist.", "स्पष्ट ज़रूरतें। सोच-समझकर चयन।")}</p><small>{t("The right starting point for your next hire.", "आपकी अगली भर्ती की सही शुरुआत।")}</small></div></div>
          </div>
        </div>
      </div>
    </section>

    <nav className="employer-section-nav" aria-label={t("Employer page sections", "नियोक्ता पेज के भाग")}><div className="container">
      {[
        ["#employer-tracks", t("The talent", "प्रतिभा")],
        ["#employer-support", t("Our support", "हमारा सहयोग")],
        ["#employer-models", t("Ways to hire", "भर्ती के विकल्प")],
        ["#employer-process", t("The process", "प्रक्रिया")],
        ["#employer-brief", t("Your hiring brief", "आपकी भर्ती की जानकारी")],
      ].map(([href, label], index) => <a href={href} key={href}><span>0{index + 1}</span>{label}<ArrowDown size={13} aria-hidden="true" /></a>)}
    </div></nav>

    <section className="section employer-tracks" id="employer-tracks" aria-labelledby="employer-tracks-heading">
      <div className="container">
        <Reveal className="employer-section-heading"><div><Eyebrow>{t("DIFFERENT SKILLS. THE RIGHT APPROACH.", "अलग हुनर। उपयुक्त तरीका।")}</Eyebrow><h2 id="employer-tracks-heading">{t("Expertise for the role.\nPeople for the team.", "भूमिका के लिए विशेषज्ञता।\nटीम के लिए उपयुक्त लोग।")}</h2></div><p>{t("A technical interview and a practical trade test answer different questions. We shape sourcing and assessment around the work your people will actually do.", "तकनीकी इंटरव्यू और व्यावहारिक ट्रेड परीक्षण अलग क्षमताएँ परखते हैं। खोज और मूल्यांकन उसी काम के अनुसार तय होते हैं जो आपकी टीम को करना है।")}</p></Reveal>
        <div className="employer-track-grid">{employerTracks.map((track, index) => <Reveal className="employer-track" key={track.id}>
          <div className="employer-track-image"><Photo src={track.image} alt={local(track.title)} /><span>0{index + 1} / {local(track.label)}</span></div>
          <div className="employer-track-copy"><h3>{local(track.title)}</h3><p>{local(track.description)}</p><ul className="employer-checks">{track.checks.map(check => <li key={check.en}><Check size={16} aria-hidden="true" />{local(check)}</li>)}</ul><div className="employer-track-roles"><span>{t("TYPICAL ROLES", "प्रमुख भूमिकाएँ")}</span><p>{local(track.roles)}</p></div></div>
        </Reveal>)}</div>
        <div className="employer-section-foot"><p>{t("One project can combine both tracks, with the right assessment for each role.", "एक परियोजना में दोनों तरह की भर्ती हो सकती है, हर भूमिका के लिए उपयुक्त मूल्यांकन के साथ।")}</p><TextLink href="/workforce">{t("Explore workforce profiles", "कामगार प्रोफाइल देखें")}</TextLink></div>
      </div>
    </section>

    <section className="section employer-support" id="employer-support" aria-labelledby="employer-support-heading"><div className="container">
      <Reveal className="employer-section-heading"><div><Eyebrow>{t("THE DETAILS, CONNECTED", "हर ज़रूरी बात, एक साथ")}</Eyebrow><h2 id="employer-support-heading">{t("More than a shortlist.\nSupport at every stage.", "उम्मीदवारों की सूची से आगे।\nहर चरण पर सहयोग।")}</h2></div><p>{t("From the first requirement to the first day at work, we coordinate the recruitment details with your team. The exact scope is agreed before hiring begins.", "पहली ज़रूरत से लेकर काम के पहले दिन तक, हम आपकी टीम के साथ भर्ती की ज़रूरी बातों का समन्वय करते हैं। भर्ती शुरू होने से पहले सेवा का दायरा तय होता है।")}</p></Reveal>
      <div className="employer-service-grid">{employerServices.map((service, index) => {
        const Icon = serviceIcons[index];
        return <Reveal className="employer-service" key={service.title.en}><div className="employer-service-top"><Icon size={26} strokeWidth={1.4} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{local(service.title)}</h3><p>{local(service.text)}</p><ul>{service.items.map(item => <li key={item.en}>{local(item)}</li>)}</ul></Reveal>;
      })}</div>
    </div></section>

    <section className="section employer-models" id="employer-models" aria-labelledby="employer-models-heading"><div className="container">
      <div className="employer-section-heading"><div><Eyebrow light>{t("A FIT FOR YOUR BUSINESS", "आपके कारोबार के अनुसार")}</Eyebrow><h2 id="employer-models-heading">{t("Different needs.\nFlexible ways to hire.", "अलग ज़रूरतें।\nभर्ती के लचीले विकल्प।")}</h2></div><p>{t("A single specialist, a full project team or a recurring requirement. Start with the arrangement that fits your operation.", "एक विशेषज्ञ, पूरी प्रोजेक्ट टीम या नियमित ज़रूरत। उस विकल्प से शुरुआत करें जो आपके काम के लिए उपयुक्त है।")}</p></div>
      <div className="employer-model-layout">
        <div role="tablist" aria-orientation="vertical" aria-label={t("Hiring arrangements", "भर्ती के विकल्प")} className="employer-model-tabs">
          {employerModels.map((item, index) => <button type="button" role="tab" id={`employer-model-tab-${item.id}`} aria-controls="employer-model-panel" aria-selected={index === activeModel} tabIndex={index === activeModel ? 0 : -1} onClick={() => setActiveModel(index)} onKeyDown={event => onModelKeyDown(event, index)} key={item.id}><span className="employer-model-index">0{index + 1}</span><span><strong>{local(item.title)}</strong><small>{local(item.subtitle)}</small></span><ArrowUpRight size={19} aria-hidden="true" /></button>)}
        </div>
        <div role="tabpanel" id="employer-model-panel" aria-labelledby={`employer-model-tab-${model.id}`} tabIndex={0} className="employer-model-panel">
          <Photo src={model.image} alt={local(model.title)} sizes="(max-width: 767px) 100vw, 55vw" />
          <div className="employer-model-copy"><h3>{local(model.heading)}</h3><p>{local(model.body)}</p><h4>{t("What we plan together", "हम साथ मिलकर क्या तय करते हैं")}</h4><ul className="employer-checks">{model.points.map(point => <li key={point.en}><Check size={15} aria-hidden="true" />{local(point)}</li>)}</ul><TextLink href="/request-workforce">{t("Discuss this requirement", "इस ज़रूरत पर चर्चा करें")}</TextLink></div>
        </div>
      </div>
    </div></section>

    <section className="section employer-process" id="employer-process" aria-labelledby="employer-process-heading"><div className="container">
      <Reveal className="employer-section-heading"><div><Eyebrow>{t("FROM REQUIREMENT TO ARRIVAL", "ज़रूरत से आगमन तक")}</Eyebrow><h2 id="employer-process-heading">{t("A shared plan.\nClear responsibilities.", "एक साझा योजना।\nस्पष्ट ज़िम्मेदारियाँ।")}</h2></div><p>{t("Your team stays involved in selection and decision-making. Here is how our coordination and your input come together through the hiring journey.", "चयन और निर्णय में आपकी टीम की भागीदारी बनी रहती है। भर्ती के सफर में हमारा समन्वय और आपका योगदान इस तरह साथ चलते हैं।")}</p></Reveal>
      <div className="employer-process-labels" aria-hidden="true"><span>{t("THE STAGE", "चरण")}</span><span>{t("OUR COORDINATION", "हमारा समन्वय")}</span><span>{t("YOUR TEAM’S PART", "आपकी टीम का योगदान")}</span></div>
      <ol className="employer-stage-list">{employerStages.map((stage, index) => <li key={stage.title.en}><div className="employer-stage-title"><span>0{index + 1}</span><h3>{local(stage.title)}</h3></div><p><span className="employer-stage-mobile-label">{t("Our coordination", "हमारा समन्वय")}</span>{local(stage.ours)}</p><p><span className="employer-stage-mobile-label">{t("Your team’s part", "आपकी टीम का योगदान")}</span>{local(stage.yours)}</p></li>)}</ol>
      <div className="employer-section-foot"><p>{t("Timing depends on selection, document readiness and official processing. We discuss an indicative plan for your requirement.", "समय चयन, दस्तावेज़ों की तैयारी और आधिकारिक प्रक्रिया पर निर्भर है। आपकी ज़रूरत के लिए अनुमानित योजना पर चर्चा होती है।")}</p><TextLink href="/how-we-work">{t("View the full recruitment journey", "भर्ती का पूरा सफर देखें")}</TextLink></div>
    </div></section>

    <section className="section employer-sectors" aria-labelledby="employer-sectors-heading"><div className="container employer-sector-layout">
      <Reveal className="employer-sector-intro"><Eyebrow>{t("UNDERSTANDING YOUR WORLD", "आपके काम की समझ")}</Eyebrow><h2 id="employer-sectors-heading">{t("The people\nbehind your\nindustry.", "आपके उद्योग\nको आगे बढ़ाने\nवाले लोग।")}</h2><p>{t("Different workplaces ask for different strengths. Explore the roles and skills relevant to your sector.", "अलग कार्यस्थलों पर अलग क्षमताएँ चाहिए। अपने उद्योग से जुड़ी भूमिकाएँ और हुनर जानें।")}</p><TextLink href="/industries">{t("Explore all industries", "सभी उद्योग देखें")}</TextLink><Photo src={photography.requirements} alt={t("A recruiter reviewing a workforce requirement", "कामगारों की ज़रूरतों की समीक्षा करती भर्ती सलाहकार")} /></Reveal>
      <div className="employer-sector-list">{sectors.map((sector, index) => <Link href={`/industries/${sector.slug}`} key={sector.slug}><span className="employer-sector-number">0{index + 1}</span><div><h3>{local(sector.title)}</h3><p>{local(sector.roles)}</p></div><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div>
    </div></section>

    <section className="section employer-brief-section" id="employer-brief" aria-labelledby="employer-brief-heading"><div className="container">
      <div className="employer-brief-panel"><div className="employer-brief-intro"><span className="employer-brief-icon"><ListChecks size={32} strokeWidth={1.4} aria-hidden="true" /></span><Eyebrow>{t("MAKE THE FIRST CONVERSATION COUNT", "पहली बातचीत को उपयोगी बनाएँ")}</Eyebrow><h2 id="employer-brief-heading">{t("A better brief.\nA stronger start.", "बेहतर जानकारी।\nबेहतर शुरुआत।")}</h2><p>{t("Bring these details to the conversation so we can understand your requirement and agree practical next steps. Still shaping the brief? Start with what you know.", "ये जानकारी साथ लाएँ ताकि हम आपकी ज़रूरत समझकर अगले कदम तय कर सकें। जानकारी अभी पूरी नहीं है? जो तय है, उसी से शुरुआत करें।")}</p><Button href="/request-workforce" variant="navy">{t("Start your workforce enquiry", "भर्ती के बारे में पूछताछ शुरू करें")}</Button></div><ol className="employer-brief-list">{employerBrief.map((item, index) => <li key={item.title.en}><span>0{index + 1}</span><div><h3>{local(item.title)}</h3><p>{local(item.text)}</p></div></li>)}</ol></div>
    </div></section>

    <section className="section employer-faq" aria-labelledby="employer-faq-heading"><div className="container employer-faq-layout"><div><Eyebrow>{t("BEFORE WE BEGIN", "शुरू करने से पहले")}</Eyebrow><h2 id="employer-faq-heading">{t("Good questions.\nClearer decisions.", "सही सवाल।\nस्पष्ट निर्णय।")}</h2><p>{t("A few things employers often want to know before starting a recruitment conversation.", "भर्ती की बातचीत शुरू करने से पहले नियोक्ता अक्सर ये बातें जानना चाहते हैं।")}</p><Link href="/contact?type=employer" className="employer-faq-link">{t("Have another question?", "कोई और सवाल है?")}<ArrowRight size={17} aria-hidden="true" /></Link></div><div className="employer-faq-list">{employerFaqs.map(faq => <details key={faq.question.en}><summary>{local(faq.question)}<Plus size={19} aria-hidden="true" /></summary><p>{local(faq.answer)}</p></details>)}</div></div></section>

    <section className="employer-closing"><div className="container"><div className="employer-closing-copy"><Eyebrow light>{t("YOUR NEXT TEAM STARTS HERE", "आपकी अगली टीम की शुरुआत यहाँ")}</Eyebrow><h2>{t("Tell us where\nyou want to grow.", "बताएँ, आप कहाँ\nआगे बढ़ना चाहते हैं।")}</h2><p>{t("Share your roles, workforce numbers and plans. Let’s shape the next step together.", "अपनी भूमिकाएँ, कर्मचारियों की संख्या और योजनाएँ साझा करें। अगला कदम साथ मिलकर तय करते हैं।")}</p><div className="button-row"><Button href="/request-workforce">{t("Discuss your requirement", "अपनी ज़रूरत पर चर्चा करें")}</Button><ContactAction method="email" type="employer" variant="outline">{t("Email our team", "हमारी टीम को ईमेल करें")}</ContactAction></div></div><div className="employer-closing-note"><Handshake size={38} strokeWidth={1.2} aria-hidden="true" /><h3>{t("A conversation first.\nA clear plan next.", "पहले बातचीत।\nफिर स्पष्ट योजना।")}</h3><p>{t("Roles, selection criteria, service scope and responsibilities — agreed together before hiring begins.", "भूमिकाएँ, चयन की शर्तें, सेवा का दायरा और ज़िम्मेदारियाँ — भर्ती से पहले मिलकर तय करें।")}</p></div></div></section>
  </div>;
}
