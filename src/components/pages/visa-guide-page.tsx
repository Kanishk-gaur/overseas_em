"use client";
import { useState, useSyncExternalStore } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, BriefcaseBusiness, CalendarClock, Check, ClipboardList, FileCheck2, FilePenLine, GraduationCap, HeartPulse, House, MapPinned, MessageSquareText, PlaneTakeoff, Send, TreePalm, FileSignature, FileText, FolderCheck, Handshake, IdCard, Info, Landmark, Languages, ListOrdered, Plane, Plus, Route, ShieldCheck, Stamp, Stethoscope, TriangleAlert, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import glossaryData from "@/data/recruitment/glossary.json";
import { officialSources, sourcesReviewed } from "@/data/official-sources";
import { photography } from "@/data/photography";
import { permissionTypes, visaDisclaimer, visaDocuments, visaFaqs, visaHowItWorks, visaRedFlags, visaSections, visaServiceTypes, visaSupportServices, visaTimeline, visaVerification } from "@/data/visa-guide";
import { visaCountries, type VisaAudience } from "@/data/visaCountries";
import { isRTL } from "@/locales/config";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, PageHero, Reveal, TextLink } from "@/components/shared/ui";
import { OfficialLink } from "@/components/shared/official-link";
import styles from "./visa-guide.module.css";

const { glossary } = glossaryData;
const permissionIcons: Record<typeof permissionTypes[number]["id"], LucideIcon> = { visa: Stamp, "work-permit": BriefcaseBusiness, "residence-permit": IdCard };
const serviceIcons: Record<typeof visaServiceTypes[number]["id"], LucideIcon> = { work: BriefcaseBusiness, tourist: TreePalm, business: Handshake, student: GraduationCap, family: Users, schengen: MapPinned, medical: HeartPulse, transit: PlaneTakeoff, extension: CalendarClock, other: House };
const howIcons: Record<typeof visaHowItWorks[number]["id"], LucideIcon> = { trip: MessageSquareText, checklist: ClipboardList, prepare: FilePenLine, track: Send };
const timelineIcons: Record<typeof visaTimeline[number]["id"], LucideIcon> = { offer: BriefcaseBusiness, contract: FileSignature, documents: FolderCheck, clearance: Stethoscope, application: FileCheck2, approval: Landmark, orientation: BookOpen, arrival: Plane };

// The country list is a vertical tab list on wide screens and a wrapping row
// of pills below that, so the arrow keys and aria-orientation follow the layout.
const wideLayout = "(min-width: 1024px)";
const subscribeToLayout = (onChange: () => void) => {
  const media = window.matchMedia(wideLayout);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

function CountryGuide() {
  const { t, local, language } = useLocale();
  const [active, setActive] = useState(0);
  const vertical = useSyncExternalStore(subscribeToLayout, () => window.matchMedia(wideLayout).matches, () => false);
  const country = visaCountries[active];
  const source = officialSources[country.officialSource];
  const audienceLabels: Record<VisaAudience, string> = { skilled: t("Skilled", "कुशल"), "semi-skilled": t("Semi-skilled", "अर्ध-कुशल"), professional: t("Professional", "पेशेवर") };
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl = isRTL(language);
    const forward = vertical ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight";
    const back = vertical ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft";
    const last = visaCountries.length - 1;
    const next = event.key === forward ? (index === last ? 0 : index + 1) : event.key === back ? (index === 0 ? last : index - 1) : event.key === "Home" ? 0 : event.key === "End" ? last : -1;
    if (next < 0) return;
    event.preventDefault();
    setActive(next);
    document.getElementById("visa-tab-" + visaCountries[next].slug)?.focus();
  };

  return <section className={"section " + styles.countries} aria-labelledby="which-countries-title"><div className="container">
    <div className={styles.whichCountries} id="which-countries"><div><Eyebrow>{t("WHERE WE HELP", "हम कहाँ मदद करते हैं")}</Eyebrow><h2 id="which-countries-title">{t("Which countries?", "कौन-से देश?")}</h2></div><div><p>{t("We help with visa applications for most countries, including the UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, the UK, the Schengen countries (Germany, Portugal, Poland, Czech Republic and more), Romania, Japan, Israel, Russia, the USA, Canada, Australia and others. Don’t see your destination? Ask us.", "हम ज़्यादातर देशों के वीज़ा आवेदनों में मदद करते हैं, जिनमें यूएई, सऊदी अरब, कतर, ओमान, कुवैत, बहरीन, यूके, शेंगेन देश (जर्मनी, पुर्तगाल, पोलैंड, चेक गणराज्य और अन्य), रोमानिया, जापान, इज़राइल, रूस, अमेरिका, कनाडा, ऑस्ट्रेलिया और अन्य देश शामिल हैं। आपका गंतव्य सूची में नहीं है? हमसे पूछें।")}</p><TextLink href="/contact?type=visa">{t("Ask about your destination", "अपने गंतव्य के बारे में पूछें")}</TextLink></div></div>
    <div className="guide-heading" id="country-guide"><div><Eyebrow>{t("WORK VISA GUIDE BY COUNTRY", "देश के अनुसार कार्य वीज़ा मार्गदर्शिका")}</Eyebrow><h2 id="country-guide-title">{t("Find the route\nfor your destination.", "अपने गंतव्य का\nवीज़ा मार्ग जानें।")}</h2></div><p>{t("Choose a country to see commonly used route names, typical documents and the usual steps. Treat this as a starting point; the official source decides what applies to you.", "देश चुनकर आम तौर पर इस्तेमाल होने वाली वीज़ा श्रेणियों के नाम, सामान्य दस्तावेज़ और चरण देखें। इसे शुरुआती जानकारी मानें; आप पर क्या लागू होगा, यह आधिकारिक स्रोत तय करता है।")}</p></div>
    <div className={styles.countryLayout}>
      <div className={styles.tabs} role="tablist" aria-label={t("Destination countries", "गंतव्य देश")} aria-orientation={vertical ? "vertical" : "horizontal"}>
        {visaCountries.map((item, index) => <button type="button" role="tab" key={item.slug} id={"visa-tab-" + item.slug} aria-selected={active === index} aria-controls="visa-country-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => onKeyDown(event, index)}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><strong>{t(item.name)}</strong><ArrowUpRight size={16} aria-hidden="true" /></button>)}
      </div>
      <div className={styles.panel} id="visa-country-panel" role="tabpanel" aria-labelledby={"visa-tab-" + country.slug} tabIndex={0}>
        <div className={styles.panelHead}>
          <div><h3>{t(country.name)}</h3><ul className={styles.chips} aria-label={t("Who it is generally for", "आम तौर पर किसके लिए")}>{country.audience.map(item => <li key={item}>{audienceLabels[item]}</li>)}</ul></div>
          <a className="button button-navy" href={source.url} target="_blank" rel="noopener noreferrer">{t("Check official source", "आधिकारिक स्रोत देखें")}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> {t("(opens in a new tab)", "(नए टैब में खुलेगा)")}</span></a>
        </div>
        <div className={styles.panelGrid}>
          <div className={styles.column}>
            <div className={styles.block}><h4><Route size={17} aria-hidden="true" />{t("Common routes", "आम वीज़ा श्रेणियाँ")}</h4><ul className={styles.routes}>{country.routes.map(item => <li key={item}>{t(item)}</li>)}</ul><p className={styles.hint}>{t("Route names only. The route that applies depends on the actual job, the employer and your qualifications.", "केवल श्रेणियों के नाम। कौन-सी श्रेणी लागू होगी, यह वास्तविक काम, नियोक्ता और आपकी योग्यता पर निर्भर है।")}</p></div>
            <div className={styles.block}><h4><Users size={17} aria-hidden="true" />{t("Who it is generally for", "आम तौर पर किसके लिए")}</h4><p className={styles.blockText}>{t(country.audienceNote)}</p></div>
            <div className={styles.block}><h4><Languages size={17} aria-hidden="true" />{t("Language & qualification recognition", "भाषा और योग्यता की मान्यता")}</h4><p className={styles.blockText}>{t(country.languageNote)}</p></div>
          </div>
          <div className={styles.column}>
            <div className={styles.block}><h4><FileText size={17} aria-hidden="true" />{t("Typical documents", "आम तौर पर माँगे जाने वाले दस्तावेज़")}</h4><ul className={styles.documents}>{country.documents.map(item => <li key={item}><Check size={15} aria-hidden="true" /><span>{t(item)}</span></li>)}</ul></div>
            <div className={styles.block}><h4><ListOrdered size={17} aria-hidden="true" />{t("Common steps", "सामान्य चरण")}</h4><ol className={styles.steps}>{country.steps.map((item, index) => <li key={item}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{t(item)}</p></li>)}</ol></div>
          </div>
        </div>
        <div className={styles.panelFoot}>
          <div><h4>{t("Fees & processing time", "शुल्क और प्रक्रिया का समय")}</h4>{country.feesAndTiming ? <p>{t(country.feesAndTiming)}</p> : <p>{t("Varies — confirm with the official source.", "अलग-अलग होता है — आधिकारिक स्रोत से पुष्टि करें।")}</p>}</div>
          <div className={styles.panelLinks}><OfficialLink source={country.officialSource} /><TextLink href={"/countries/" + country.slug}>{t("Read the destination guide", "गंतव्य मार्गदर्शिका पढ़ें")}</TextLink></div>
        </div>
        <p className={styles.reviewed}>{local(sourcesReviewed)}</p>
      </div>
    </div>
  </div></section>;
}

function GlossarySection() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const results = glossary.filter(item => (!country || item.country === country) && [item.term, item.definition, t(item.term), t(item.definition)].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  return <section className={"section " + styles.glossary} id="glossary" aria-labelledby="glossary-title"><div className="container">
    <div className="guide-heading"><div><Eyebrow>{t("Glossary", "शब्दावली")}</Eyebrow><h2 id="glossary-title">{t("Key terms,\nin plain language.", "ज़रूरी शब्द,\nसरल भाषा में।")}</h2></div><p>{t("A plain-language starting point for the visa, documentation and recruitment terms you may encounter. Confirm the current rules for each destination.", "वीज़ा, दस्तावेज़ और भर्ती के शब्दों का सरल परिचय। हर देश के मौजूदा नियमों की पुष्टि करें।")}</p></div>
    <div className="recruitment-filters"><label className="recruitment-search"><span>{t("Search the glossary", "शब्दावली में खोजें")}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Try Blue Card or qualification", "Blue Card या qualification खोजें")} /></label><label><span>{t("Country", "देश")}</span><select value={country} onChange={event => setCountry(event.target.value)}><option value="">{t("All destinations", "सभी देश")}</option>{[...new Set(glossary.map(item => item.country))].map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label></div>
    <p className="recruitment-count" role="status">{results.length} {t("terms", "शब्द")}</p>
    <dl className="glossary-directory">{results.map(item => <div key={item.term}><dt><Eyebrow>{t(item.country)}</Eyebrow>{t(item.term)}</dt><dd>{t(item.definition)}</dd></div>)}</dl>
    {!results.length && <div className="recruitment-empty"><h3>{t("No matching terms", "कोई शब्द नहीं मिला")}</h3><button type="button" className="button button-navy" onClick={() => { setQuery(""); setCountry(""); }}>{t("Clear filters", "फ़िल्टर हटाएँ")}</button></div>}
  </div></section>;
}

export function VisaGuidePage() {
  const { t, local } = useLocale();
  const [ready, setReady] = useState<string[]>([]);
  const decisionNote = t("We support your application. The final decision is always made by the embassy or immigration authority.", "हम आपके आवेदन में सहयोग करते हैं। अंतिम फैसला हमेशा दूतावास या आव्रजन प्राधिकरण करता है।");
  return <>
    <PageHero eyebrow={t("Visa services", "वीज़ा सेवाएँ")} title={t("Any visa.\nOne trusted team.", "कोई भी वीज़ा।\nएक भरोसेमंद टीम।")} description={t("Whether you’re travelling for work, study, business, family or a holiday, Aaroham Overseas helps you prepare a complete, correct visa application. You don’t need to be hired through us — if you only need a visa, we can help.", "चाहे आप काम, पढ़ाई, व्यापार, परिवार या छुट्टियों के लिए यात्रा कर रहे हों, Aaroham Overseas आपको पूरा और सही वीज़ा आवेदन तैयार करने में मदद करता है। इसके लिए हमारे ज़रिए नौकरी लेना ज़रूरी नहीं है — अगर आपको सिर्फ़ वीज़ा चाहिए, तो भी हम मदद कर सकते हैं।")} image={photography.documents} imageAlt="Passport and documents on a desk">
      <div className={"button-row " + styles.heroActions}><Button href="/contact?type=visa">{t("Get visa help", "वीज़ा सहायता लें")}</Button><Button href="#documents" variant="white">{t("Check the document list", "दस्तावेज़ों की सूची देखें")}</Button></div>
      <p className={styles.heroNote}><Landmark size={15} aria-hidden="true" /><span>{decisionNote}</span></p>
    </PageHero>
    <nav className="guide-section-nav" aria-label={t("Visa services sections", "वीज़ा सेवाओं के भाग")}><div className="container">{visaSections.map(item => <a key={item.href} href={item.href}>{local(item.label)}<ArrowDown size={14} aria-hidden="true" /></a>)}</div></nav>
    <div className={styles.disclaimerBand}><div className="container"><p className={"information-note " + styles.disclaimer} role="note"><Info size={18} aria-hidden="true" /><span>{local(visaDisclaimer)}</span></p></div></div>

    <section className="section" id="visa-services" aria-labelledby="visa-services-title"><div className="container">
      <div className="guide-heading"><div><Eyebrow>{t("VISA ASSISTANCE", "वीज़ा सहायता")}</Eyebrow><h2 id="visa-services-title">{t("Visa services\nfor every purpose", "हर उद्देश्य के लिए\nवीज़ा सेवाएँ")}</h2></div><p>{t("Not looking for a job abroad? You can still use our visa services on their own.", "विदेश में नौकरी नहीं ढूँढ रहे? फिर भी आप हमारी वीज़ा सेवाओं का अलग से उपयोग कर सकते हैं।")}</p></div>
      <ul className={styles.services}>{visaServiceTypes.map(item => { const Icon = serviceIcons[item.id]; return <li key={item.id}><Icon size={26} strokeWidth={1.4} aria-hidden="true" /><h3>{local(item.title)}</h3><p>{local(item.body)}</p></li>; })}</ul>
      <div className={styles.servicesFoot}><p>{decisionNote}</p><Button href="/contact?type=visa" variant="navy">{t("Get visa help", "वीज़ा सहायता लें")}</Button></div>
    </div></section>

    <section className={"section " + styles.support} id="what-we-do" aria-labelledby="what-we-do-title"><div className="container">
      <div className="guide-heading"><div><Eyebrow>{t("VISA SUPPORT", "वीज़ा सहयोग")}</Eyebrow><h2 id="what-we-do-title">{t("What we do\nfor you", "हम आपके लिए\nक्या करते हैं")}</h2></div><p>{t("From choosing the right visa to following up after you apply, we help you prepare each step.", "सही वीज़ा चुनने से लेकर आवेदन के बाद की जानकारी लेने तक, हम हर कदम की तैयारी में मदद करते हैं।")}</p></div>
      <ul className={styles.supportList}>{visaSupportServices.map(item => <li key={item.en}><Check size={18} aria-hidden="true" /><span>{local(item)}</span></li>)}</ul>
      <p className={"information-note " + styles.supportNote}><Info size={18} aria-hidden="true" /><span>{t("Service fees are shared in writing before we start. Government and embassy visa fees are paid separately as per the official rules.", "काम शुरू करने से पहले सेवा शुल्क लिखित में बताया जाता है। सरकारी और दूतावास के वीज़ा शुल्क आधिकारिक नियमों के अनुसार अलग से चुकाए जाते हैं।")}</span></p>
    </div></section>

    <section className="section recruitment-flow-section" id="how-it-works" aria-labelledby="how-it-works-title"><div className="container">
      <Reveal className="section-heading"><div><Eyebrow>{t("HOW IT WORKS", "यह कैसे काम करता है")}</Eyebrow><h2 id="how-it-works-title">{t("Four steps to\na complete application.", "पूरे आवेदन तक\nचार कदम।")}</h2></div><div><p>{t("A simple path from your first message to your visa appointment.", "आपके पहले संदेश से वीज़ा अपॉइंटमेंट तक का आसान रास्ता।")}</p><TextLink href="/contact?type=visa">{t("Get visa help", "वीज़ा सहायता लें")}</TextLink></div></Reveal>
      <ol className={styles.timeline}>{visaHowItWorks.map((step, index) => { const Icon = howIcons[step.id]; const number = String(index + 1).padStart(2, "0"); return <li className={"flow-node " + styles.step + (step.id === "track" ? " flow-node-support" : "")} key={step.id}><div className="flow-card-shell"><article aria-label={t("Step ", "चरण ") + number}><div className="flow-card-top"><span className="flow-number">{number}</span><Icon size={23} strokeWidth={1.45} aria-hidden="true" /></div><h3>{local(step.title)}</h3><p>{local(step.body)}</p></article></div></li>; })}</ol>
      <div className={"flow-footnote " + styles.timelineNote}><Landmark size={20} aria-hidden="true" /><p>{decisionNote}</p></div>
    </div></section>

    <section className="section" id="visa-types" aria-labelledby="visa-types-title"><div className="container">
      <div className="guide-heading"><div><Eyebrow>{t("THREE DIFFERENT PERMISSIONS", "तीन अलग अनुमतियाँ")}</Eyebrow><h2 id="visa-types-title">{t("Visa vs work permit\nvs residence permit", "वीज़ा, कार्य परमिट\nऔर निवास परमिट में अंतर")}</h2></div><p>{t("These three terms are often used as if they mean the same thing. They answer different questions, and many destinations require more than one.", "इन तीनों शब्दों को अक्सर एक ही अर्थ में इस्तेमाल किया जाता है। ये अलग-अलग सवालों के जवाब हैं, और कई गंतव्यों में एक से अधिक की ज़रूरत होती है।")}</p></div>
      <div className={styles.compare}>{permissionTypes.map(item => { const Icon = permissionIcons[item.id]; return <article key={item.id}><div className={styles.compareTop}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /><span>{local(item.tag)}</span></div><h3>{local(item.title)}</h3><p>{local(item.body)}</p><p className={styles.issuer}><Landmark size={15} aria-hidden="true" /><span>{local(item.issuer)}</span></p></article>; })}</div>
      <p className="studio-note">{t("Some destinations combine these into a single document; others issue each one separately. Check which apply to your route.", "कुछ गंतव्य इन्हें एक ही दस्तावेज़ में जोड़ देते हैं; कुछ हर एक अलग जारी करते हैं। जाँचें कि आपकी श्रेणी पर कौन-से लागू होते हैं।")}</p>
    </div></section>

    <CountryGuide />

    <section className="section recruitment-flow-section" id="visa-process" aria-labelledby="visa-process-title"><div className="container">
      <Reveal className="section-heading"><div><Eyebrow>{t("THE WORK VISA PROCESS", "कार्य वीज़ा की प्रक्रिया")}</Eyebrow><h2 id="visa-process-title">{t("From job offer\nto arrival.", "नौकरी के प्रस्ताव से\nआगमन तक।")}</h2></div><div><p>{t("Most work-visa journeys follow a similar order, although each destination adds its own steps. Use this outline to see where you are and what comes next.", "ज़्यादातर कार्य वीज़ा की प्रक्रिया एक जैसे क्रम में चलती है, हालाँकि हर गंतव्य अपने चरण जोड़ता है। इस रूपरेखा से समझें कि आप कहाँ हैं और आगे क्या होगा।")}</p><TextLink href="/process">{t("The recruitment journey", "भर्ती का सफर")}</TextLink></div></Reveal>
      <ol className={styles.timeline}>{visaTimeline.map((step, index) => { const Icon = timelineIcons[step.id]; const number = String(index + 1).padStart(2, "0"); return <li className={"flow-node " + styles.step + (step.id === "approval" ? " flow-node-interview" : step.id === "arrival" ? " flow-node-support" : "")} key={step.id}><div className="flow-card-shell"><article aria-label={t("Step ", "चरण ") + number}><div className="flow-card-top"><span className="flow-number">{number}</span><Icon size={23} strokeWidth={1.45} aria-hidden="true" /></div><h3>{local(step.title)}</h3><p>{local(step.body)}</p></article></div></li>; })}</ol>
      <div className={"flow-footnote " + styles.timelineNote}><Handshake size={20} aria-hidden="true" /><p>{t("Aaroham coordinates documents and communication at each stage. Approval, timing and conditions are decided by the relevant authorities and vary by destination — confirm with the official source.", "Aaroham हर चरण में दस्तावेज़ों और बातचीत का समन्वय करता है। स्वीकृति, समय और शर्तें संबंधित अधिकारी तय करते हैं और हर गंतव्य में अलग होती हैं — आधिकारिक स्रोत से पुष्टि करें।")}</p></div>
    </div></section>

    <section className="section guide-documents" id="documents" aria-labelledby="visa-documents-title"><div className="container guide-documents-layout">
      <div className="guide-documents-intro"><Eyebrow>{t("DOCUMENT CHECKLIST", "दस्तावेज़ों की सूची")}</Eyebrow><h2 id="visa-documents-title">{t("Documents commonly\nasked for.", "आम तौर पर माँगे जाने\nवाले दस्तावेज़।")}</h2><p>{t("Tick what you already have. The final list depends on the employer, destination and visa category, so use this as a preparation aid.", "जो आपके पास पहले से है, उसे चुनें। अंतिम सूची नियोक्ता, गंतव्य और वीज़ा श्रेणी पर निर्भर है, इसलिए इसे तैयारी में मदद के रूप में इस्तेमाल करें।")}</p><div className={styles.introLinks}><TextLink href="/find-a-job#documents">{t("See the full candidate document checklist", "उम्मीदवारों की पूरी दस्तावेज़ सूची देखें")}</TextLink><OfficialLink source="passport" /></div></div>
      <div className="guide-checklist"><div className="guide-checklist-heading"><FileText size={26} strokeWidth={1.4} aria-hidden="true" /><div><h3>{t("Your preparation checklist", "आपकी तैयारी की सूची")}</h3><p role="status">{ready.length} / {visaDocuments.length} {t("items marked ready", "चीज़ें तैयार चुनी गईं")}</p></div></div><fieldset><legend className="sr-only">{t("Documents you have ready", "आपके तैयार दस्तावेज़")}</legend>{visaDocuments.map(item => <label className={ready.includes(item.id) ? "is-ready" : ""} key={item.id}><input type="checkbox" checked={ready.includes(item.id)} onChange={event => setReady(previous => event.target.checked ? [...previous, item.id] : previous.filter(value => value !== item.id))} /><span><strong>{local(item.title)}</strong><small>{local(item.body)}</small></span></label>)}</fieldset><p className="guide-checklist-note">{t("Preparation aid only. Ticking an item does not confirm eligibility or submit an application.", "यह तैयारी में मदद के लिए है। कोई चीज़ चुनने से पात्रता की पुष्टि या आवेदन जमा नहीं होता।")}</p></div>
    </div></section>

    <section className="section" id="visa-safety" aria-labelledby="visa-safety-title"><div className="container">
      <div className="guide-heading"><div><Eyebrow>{t("VISA SAFETY FOR JOB SEEKERS", "काम तलाशने वालों के लिए वीज़ा सुरक्षा")}</Eyebrow><h2 id="visa-safety-title">{t("Spot visa fraud\nbefore it costs you.", "नुकसान से पहले\nवीज़ा धोखाधड़ी पहचानें।")}</h2></div><p>{t("Most problems start with the wrong visa, an unclear payment or a missing contract. Check these warning signs before you agree to anything.", "ज़्यादातर परेशानियाँ गलत वीज़ा, अस्पष्ट भुगतान या अनुबंध न होने से शुरू होती हैं। किसी भी बात पर सहमत होने से पहले ये चेतावनी संकेत जाँचें।")}</p></div>
      <div className={styles.safetyLayout}>
        <div className={styles.flags}><h3><TriangleAlert size={23} strokeWidth={1.5} aria-hidden="true" />{t("Red flags", "चेतावनी के संकेत")}</h3><ul className={styles.safetyList}>{visaRedFlags.map((item, index) => <li key={item.title.en}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><strong>{local(item.title)}</strong><p>{local(item.body)}</p></div></li>)}</ul></div>
        <div className={styles.verify}><h3><ShieldCheck size={23} strokeWidth={1.5} aria-hidden="true" />{t("How to verify", "पुष्टि कैसे करें")}</h3><ul className={styles.safetyList}>{visaVerification.map(item => <li key={item.title.en}><Check size={17} aria-hidden="true" /><div><strong>{local(item.title)}</strong><p>{local(item.body)}</p></div></li>)}</ul><TextLink href="/find-a-job#safe-recruitment">{t("Read the safe recruitment guide", "सुरक्षित भर्ती मार्गदर्शिका पढ़ें")}</TextLink></div>
      </div>
      <div className="guide-official-strip"><ShieldCheck size={27} strokeWidth={1.4} aria-hidden="true" /><div><h3>{t("Use independent, official information", "स्वतंत्र और आधिकारिक जानकारी लें")}</h3><p>{t("Registration checks and overseas recruitment guidance from the Government of India.", "भारत सरकार से पंजीकरण की जाँच और विदेशी भर्ती की जानकारी।")}</p></div><div><OfficialLink source="emigrate" /><OfficialLink source="meaSafety" /></div></div>
    </div></section>

    <section className={"section faq-section " + styles.faq} id="visa-faq" aria-labelledby="visa-faq-title"><div className="container faq-layout">
      <div><Eyebrow>{t("Visa FAQs", "वीज़ा के सवाल")}</Eyebrow><h2 id="visa-faq-title">{t("Questions about\nvisas, answered.", "वीज़ा से जुड़े\nसवालों के जवाब।")}</h2><p className="body-copy">{t("Short answers to common visa questions. For anything specific to your case, check the official source or ask our team.", "वीज़ा से जुड़े आम सवालों के संक्षिप्त जवाब। अपने मामले से जुड़ी किसी भी बात के लिए आधिकारिक स्रोत देखें या हमारी टीम से पूछें।")}</p><TextLink href="/find-a-job#candidate-faq">{t("More questions for candidates", "उम्मीदवारों के और सवाल")}</TextLink></div>
      <div className="faq-list">{visaFaqs.map((faq, index) => <details key={faq.question.en}><summary><span className="faq-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{local(faq.question)}</span><Plus size={19} aria-hidden="true" /></summary><p>{local(faq.answer)}</p></details>)}</div>
    </div></section>

    <GlossarySection />

    <section className="guide-closing" aria-labelledby="visa-closing-title"><div className="container">
      <div><Eyebrow light>{t("CONTACT OUR TEAM", "हमारी टीम से संपर्क करें")}</Eyebrow><h2 id="visa-closing-title">{t("Talk to us before\nyou decide.", "फैसला करने से पहले\nहमसे बात करें।")}</h2><p>{t("Tell us where you’re going and why, or about your hiring plan. We help you apply; the embassy or immigration authority makes the decision.", "बताएँ कि आप कहाँ और क्यों जा रहे हैं, या अपनी भर्ती योजना बताएँ। हम आवेदन में मदद करते हैं; फैसला दूतावास या आव्रजन प्राधिकरण करता है।")}</p><div className="button-row"><Button href="/contact?type=visa">{t("Get visa help", "वीज़ा सहायता लें")}</Button><Button href="/contact?type=candidate" variant="outline">{t("Looking for work overseas?", "विदेश में काम की तलाश है?")}</Button><Button href="/contact?type=employer" variant="outline">{t("Hiring from India?", "भारत से भर्ती कर रहे हैं?")}</Button></div></div>
      <aside><Info size={32} strokeWidth={1.3} aria-hidden="true" /><h3>{t("General guidance only", "केवल सामान्य मार्गदर्शन")}</h3><p className={styles.closingNote}>{local(visaDisclaimer)}</p></aside>
    </div></section>
  </>;
}
