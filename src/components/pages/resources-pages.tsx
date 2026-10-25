"use client";
import { articleSources } from "@/data/article-sources";
import { OfficialLink } from "@/components/shared/official-link";
import { useState } from "react";
import recruitmentData1 from "@/data/recruitment/blog.json";
import recruitmentData2 from "@/data/recruitment/cases.json";
import recruitmentData3 from "@/data/recruitment/glossary.json";
import { blogImages, caseImages } from "@/data/recruitment";
import { images, site } from "@/config/site";
import { useLocale } from "@/components/shared/locale-provider";
import { Eyebrow, PageHero, Photo, TextLink } from "@/components/shared/ui";
import { ContactCTA } from "@/components/shared/contact-cta";

const { posts } = recruitmentData1;
const { caseStudies } = recruitmentData2;
const { glossary } = recruitmentData3;

export function BlogPage() {
  const { t } = useLocale();
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const results = posts.filter(post => (!category || post.category === category) && [post.title, post.excerpt, ...post.countries].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  return <><PageHero eyebrow={t("INSIGHTS & GUIDES", "लेख और मार्गदर्शन")} title={t("Better informed.\nBetter prepared.", "बेहतर जानकारी।\nबेहतर तैयारी।")} description={t("Practical reading on overseas hiring, workforce planning and the questions to ask before taking the next step.", "विदेशी भर्ती, कामगार योजना और अगला कदम लेने से पहले पूछने योग्य सवालों पर उपयोगी लेख।")} image={images.professional} imageAlt={t("A team planning their next project", "अपनी अगली परियोजना की योजना बनाती टीम")} />
    <section className="section"><div className="container"><div className="recruitment-filters">
      <label className="recruitment-search"><span>{t("Search articles", "लेख खोजें")}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Search a topic or country", "विषय या देश खोजें")} /></label>
      <label><span>{t("Topic", "विषय")}</span><select value={category} onChange={event => setCategory(event.target.value)}><option value="">{t("All topics", "सभी विषय")}</option>{[...new Set(posts.map(post => post.category))].map(value => <option key={value}>{value}</option>)}</select></label>
    </div><p className="recruitment-count" role="status">{results.length} {t("articles", "लेख")}</p>
    <div className="resource-grid">{results.map(post => <article className="resource-article" key={post.slug} lang="en"><Photo src={"/images/recruitment/blog/webp/" + blogImages[post.slug] + ".webp"} alt={post.title} sizes="(max-width: 767px) 100vw, 33vw" /><div className="resource-article-copy"><div className="recruitment-meta"><span>{post.category}</span><time dateTime={post.date}>{new Date(post.date + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time></div><h2>{post.title}</h2><p>{post.excerpt}</p><TextLink href={"/blog/" + post.slug}>{t("Read the guide", "लेख पढ़ें")}</TextLink></div></article>)}</div>
    {!results.length && <div className="recruitment-empty"><h3>{t("No matching articles", "कोई लेख नहीं मिला")}</h3><button className="button button-navy" onClick={() => { setQuery(""); setCategory(""); }}>{t("Clear filters", "फ़िल्टर हटाएँ")}</button></div>}
    </div></section><ContactCTA /></>;
}

export function ArticlePage({ slug }: { slug: string }) {
  const { t } = useLocale();
  const post = posts.find(item => item.slug === slug)!;
  return <><PageHero eyebrow={post.category} title={post.title} description={post.excerpt} image={"/images/recruitment/blog/webp/" + blogImages[post.slug] + ".webp"} imageAlt={post.title} /><section className="section"><div className="container article-layout"><aside><Eyebrow>{t("RECRUITMENT JOURNAL", "भर्ती लेख")}</Eyebrow><p>{t("Published", "प्रकाशित")}: <time dateTime={post.date}>{post.date}</time></p><p>{t("Reviewed", "समीक्षित")}: <time dateTime={post.reviewedDate}>{post.reviewedDate}</time></p><p>{post.countries.join(" · ") || t("International hiring", "अंतरराष्ट्रीय भर्ती")}</p><TextLink href="/blog">{t("All insights & guides", "सभी लेख देखें")}</TextLink></aside><article className="article-content" lang="en">{post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="article-note">{t("Reviewed on 25 October 2026. Confirm current requirements with the relevant authorities and the employer before making recruitment or travel arrangements.", "25 अक्टूबर 2026 को समीक्षा की गई। भर्ती या यात्रा से पहले संबंधित अधिकारियों और नियोक्ता से मौजूदा शर्तों की पुष्टि करें।")}</p><div className="article-sources"><h2>{t("Official starting points", "आधिकारिक संदर्भ")}</h2>{articleSources[post.slug].map(source => <OfficialLink source={source} key={source} />)}</div><TextLink href="/glossary">{t("Explore the recruitment glossary", "भर्ती शब्दावली देखें")}</TextLink></article></div></section><ContactCTA /></>;
}

export function CaseStudiesPage() {
  const { t } = useLocale();
  return <><PageHero eyebrow={t("HIRING SCENARIOS", "भर्ती के उदाहरण")} title={t("How a hiring\nplan takes shape.", "भर्ती की योजना\nकैसे बनती है।")} description={t("Illustrative workforce briefs across healthcare, construction, manufacturing, logistics and hospitality. These examples explain an approach; they are not verified client results.", "स्वास्थ्य, निर्माण, उत्पादन, लॉजिस्टिक्स और होटल क्षेत्रों के उदाहरण। ये भर्ती का तरीका समझाते हैं; सत्यापित ग्राहक परिणाम नहीं हैं।")} image={images.manufacturing} imageAlt={t("Industrial production floor", "औद्योगिक उत्पादन स्थल")} />
    <section className="section"><div className="container case-directory">{caseStudies.map((study, index) => <article id={study.slug} key={study.slug} className="case-feature" lang="en"><Photo src={"/images/recruitment/case-studies/webp/" + caseImages[study.slug] + ".webp"} alt={study.industry + " workforce"} /><div><Eyebrow>{String(index + 1).padStart(2, "0")} / {study.country}</Eyebrow><h2>{study.industry}</h2><div className="case-facts"><span>{t("Illustrative brief", "उदाहरण विवरण")}</span><span>{study.workforceType}</span></div><h3>{t("The brief", "ज़रूरत")}</h3><p>{study.challenge}</p><h3>{t("The approach", "तरीका")}</h3><p>{study.solution}</p><details className="profile-details"><summary>{t("Planning checks", "योजना की जाँच")}</summary><p>{study.result}</p></details><TextLink href="/request-workforce">{t("Discuss a similar requirement", "ऐसी ज़रूरत पर बात करें")}</TextLink></div></article>)}</div></section><ContactCTA /></>;
}

export function GlossaryPage() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const results = glossary.filter(item => (!country || item.country === country) && (item.term + " " + item.definition).toLowerCase().includes(query.trim().toLowerCase()));
  return <><PageHero eyebrow={t("RECRUITMENT GLOSSARY", "भर्ती शब्दावली")} title={t("Recruitment terms,\nin plain language.", "भर्ती के शब्द,\nसरल भाषा में।")} description={t("A plain-language starting point for the visa, documentation and recruitment terms you may encounter. Confirm the current rules for each destination.", "वीज़ा, दस्तावेज़ और भर्ती के शब्दों का सरल परिचय। हर देश के मौजूदा नियमों की पुष्टि करें।")} />
    <section className="section"><div className="container"><div className="recruitment-filters"><label className="recruitment-search"><span>{t("Search the glossary", "शब्दावली में खोजें")}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Try Blue Card or qualification", "Blue Card या qualification खोजें")} /></label><label><span>{t("Country", "देश")}</span><select value={country} onChange={event => setCountry(event.target.value)}><option value="">{t("All destinations", "सभी देश")}</option>{[...new Set(glossary.map(item => item.country))].map(value => <option key={value}>{value}</option>)}</select></label></div><p className="recruitment-count" role="status">{results.length} {t("terms", "शब्द")}</p><dl className="glossary-directory">{results.map(item => <div key={item.term} lang="en"><dt><Eyebrow>{item.country}</Eyebrow>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl>{!results.length && <div className="recruitment-empty"><h3>{t("No matching terms", "कोई शब्द नहीं मिला")}</h3><button className="button button-navy" onClick={() => { setQuery(""); setCountry(""); }}>{t("Clear filters", "फ़िल्टर हटाएँ")}</button></div>}</div></section><ContactCTA /></>;
}

export function CompliancePage() {
  const { t } = useLocale();
  const standards = [
    [t("Company registration", "कंपनी पंजीकरण"), site.registration || t("Ask our team for company registration and recruitment authorisation documents before entering a service agreement.", "सेवा समझौते से पहले टीम से कंपनी पंजीकरण और भर्ती प्राधिकरण दस्तावेज़ माँगें।")],
    [t("Ethical recruitment", "नैतिक भर्ती"), t("Discuss the employer-pays approach and obtain an itemised written agreement covering all applicable fees and responsibilities.", "नियोक्ता द्वारा भुगतान के तरीके पर बात करें और सभी लागू शुल्क तथा ज़िम्मेदारियों का मदवार लिखित समझौता लें।")],
    [t("Candidate verification", "उम्मीदवार सत्यापन"), t("Identity, education, experience and trade credentials are reviewed against the role. Medical and police checks depend on the destination and employer requirements.", "पहचान, पढ़ाई, अनुभव और ट्रेड प्रमाणपत्र की भूमिका के अनुसार जाँच होती है। स्वास्थ्य और पुलिस जाँच देश तथा नियोक्ता की शर्तों पर निर्भर है।")],
    [t("Data confidentiality", "जानकारी की गोपनीयता"), t("Share documents only through verified channels, and confirm the purpose, recipients and retention arrangements before sharing personal information.", "दस्तावेज़ केवल सत्यापित माध्यम से साझा करें और व्यक्तिगत जानकारी देने से पहले उद्देश्य, प्राप्तकर्ता और संग्रह की व्यवस्था समझें।")],
    [t("Replacement & account support", "प्रतिस्थापन और सहयोग"), t("Replacement eligibility, support windows and responsibilities are defined in the service agreement. Confirm these terms for your specific workforce order.", "प्रतिस्थापन की पात्रता, सहयोग की अवधि और ज़िम्मेदारियाँ सेवा समझौते में तय होती हैं। अपनी भर्ती के लिए इन शर्तों की पुष्टि करें।")],
    [t("Worker welfare", "कामगार कल्याण"), t("Keep your employer and recruitment contacts available throughout the contract. Raise concerns with your account contact and ask for the agreed grievance process.", "अनुबंध के दौरान नियोक्ता और भर्ती टीम के संपर्क साथ रखें। अपनी समस्याएँ संपर्क व्यक्ति को बताएँ और तय शिकायत प्रक्रिया समझें।")],
  ];
  return <><PageHero eyebrow={t("RECRUITMENT STANDARDS", "भर्ती के मानक")} title={t("Trust, through\nclear commitments.", "स्पष्ट प्रतिबद्धताओं\nसे भरोसा।")} description={t("Verification, written agreements and worker welfare at each stage of the recruitment conversation.", "भर्ती के हर चरण में सत्यापन, लिखित समझौते और कामगारों के हित पर ध्यान।")} /><section className="section"><div className="container"><div className="recruitment-process">{standards.map(([title, body], index) => <article key={title}><span className="editorial-number">{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{body}</p></article>)}</div><div className="recruitment-closing"><TextLink href="/glossary">{t("Understand recruitment terms", "भर्ती के शब्द समझें")}</TextLink><TextLink href="/contact">{t("Speak to our team", "हमारी टीम से बात करें")}</TextLink></div></div></section><ContactCTA /></>;
}

export function DisclaimerPage() {
  const { t } = useLocale();
  return <><PageHero eyebrow={t("DISCLAIMER", "अस्वीकरण")} title={t("Information for\nyour next decision.", "आपके अगले फैसले\nके लिए जानकारी।")} description={t("How to understand the workforce profiles, destination information and examples on this website.", "इस वेबसाइट के कामगार प्रोफाइल, देशों की जानकारी और उदाहरणों को कैसे समझें।")} /><section className="section"><div className="container article-content">
    <h2>{t("Recruitment information", "भर्ती की जानकारी")}</h2><p>{t("Workforce profiles and destination pages describe recruitment areas, not live vacancies or guaranteed availability. Employment, visa and travel outcomes depend on the employer, individual eligibility and the relevant authorities.", "कामगार प्रोफाइल और देशों के पेज भर्ती क्षेत्रों की जानकारी हैं, मौजूदा रिक्ति या उपलब्धता की गारंटी नहीं। रोजगार, वीज़ा और यात्रा नियोक्ता, पात्रता तथा संबंधित अधिकारियों पर निर्भर हैं।")}</p>
    <h2>{t("Articles and examples", "लेख और उदाहरण")}</h2><p>{t("Articles retain their original publication dates. Requirements can change; confirm current rules with official sources. Hiring scenarios are illustrative planning briefs and are not verified testimonials or placement results.", "लेखों में उनकी मूल प्रकाशन तिथियाँ दी गई हैं। नियम बदल सकते हैं; मौजूदा शर्तें आधिकारिक स्रोतों से जाँचें। भर्ती के उदाहरण सत्यापित ग्राहक प्रशंसा या नियुक्ति परिणाम नहीं हैं।")}</p>
    <h2>{t("Written terms", "लिखित शर्तें")}</h2><p>{t("Confirm the employer, duties, remuneration, costs, timelines and any replacement support in a written agreement before proceeding.", "आगे बढ़ने से पहले नियोक्ता, काम, वेतन, खर्च, समय और प्रतिस्थापन सहयोग की लिखित समझौते में पुष्टि करें।")}</p><TextLink href="/terms">{t("Read the website terms", "वेबसाइट की शर्तें पढ़ें")}</TextLink>
  </div></section></>;
}
