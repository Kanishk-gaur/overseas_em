"use client";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { images } from "@/config/site";
import recruitmentData1 from "@/data/recruitment/workforce.json";
import recruitmentData2 from "@/data/recruitment/workforceCategories.json";
import { roleImages, photography } from "@/data/photography";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, PageHero, Photo, TextLink } from "@/components/shared/ui";
import { ContactCTA } from "@/components/shared/contact-cta";

const { workforce } = recruitmentData1;
const { workforceCategories } = recruitmentData2;

export function WorkforcePage() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const results = workforce.filter(role =>
    (!industry || role.industry === industry) &&
    (!type || role.type === type) &&
    [role.title, role.description, role.details, ...role.skills, ...role.markets].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  );
  return <>
    <PageHero eyebrow={t("OUR WORKFORCE", "हमारे कामगार")} title={t("Skills for\nyour next team.", "आपकी अगली टीम\nके लिए कौशल।")} description={t("Explore 18 workforce profiles, from experienced tradespeople to engineers and care professionals. Find the skills, experience and destination focus for your next requirement.", "अनुभवी कारीगरों से इंजीनियरों और स्वास्थ्यकर्मियों तक 18 कामगार प्रोफाइल जानें। अपनी ज़रूरत के अनुसार कौशल, अनुभव और देश चुनें।")} image={photography.workforce} imageAlt={t("Precision welding in a workshop", "वर्कशॉप में सटीक वेल्डिंग")} />
    <section className="section"><div className="container">
      <div className="recruitment-tracks">{workforceCategories.map(category => <article key={category.id} lang="en">
        <Photo src={category.id === "technical" ? photography.engineering : photography.trades} alt={category.title} /><Eyebrow>{category.tagline}</Eyebrow><h2>{category.title}</h2><p className="body-copy">{category.description}</p>
        <ul className="recruitment-list">{category.examples.map(example => <li key={example}>{example}</li>)}</ul>
        <p className="small muted">{category.qualificationBasis}</p>
      </article>)}</div>
    </div></section>
    <section className="section surface" id="profiles"><div className="container">
      <div className="section-heading"><div><Eyebrow>{t("THE TALENT DIRECTORY", "प्रतिभा निर्देशिका")}</Eyebrow><h2>{t("Find the skills\nyou are looking for.", "आपकी ज़रूरत\nके अनुसार हुनर।")}</h2></div><p>{t("Profiles describe our sourcing focus. Current availability and role requirements are confirmed with our team.", "प्रोफाइल हमारे भर्ती क्षेत्रों को दर्शाती हैं। मौजूदा उपलब्धता और भूमिका की शर्तें टीम से पूछें।")}</p></div>
      <div className="recruitment-filters">
        <label className="recruitment-search"><span>{t("Search roles, skills or countries", "भूमिका, हुनर या देश खोजें")}</span><div><Search size={18} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Try welding, Germany, CNC…", "वेल्डिंग, Germany, CNC…")} /></div></label>
        <label><span>{t("Industry", "उद्योग")}</span><select value={industry} onChange={event => setIndustry(event.target.value)}><option value="">{t("All industries", "सभी उद्योग")}</option>{[...new Set(workforce.map(role => role.industry))].map(value => <option key={value}>{value}</option>)}</select></label>
        <label><span>{t("Workforce type", "कामगार श्रेणी")}</span><select value={type} onChange={event => setType(event.target.value)}><option value="">{t("All profiles", "सभी प्रोफाइल")}</option><option value="Technical">{t("Technical professionals", "तकनीकी पेशेवर")}</option><option value="Non-Technical">{t("Skilled & general trades", "कुशल और सामान्य कामगार")}</option></select></label>
      </div>
      <p className="recruitment-count" role="status">{results.length} {t("profiles", "प्रोफाइल")}</p>
      <div className="workforce-grid">{results.map(role => <article className="workforce-profile" key={role.title} lang="en">
        <Photo src={roleImages[role.title] || images.technical} alt={role.industry + " workplace"} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <div className="workforce-profile-copy"><div className="recruitment-meta"><span>{role.industry}</span><span>{role.experience}</span></div>
          <h3>{role.title}</h3><p>{role.description}</p>
          <details className="profile-details"><summary>{t("Skills & experience", "कौशल और अनुभव")}<Plus size={17} aria-hidden="true" /></summary>
            <p>{role.details}</p><ul className="recruitment-tags">{role.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
            <p className="small"><strong>{t("Destination focus", "प्रमुख देश")}</strong><br />{role.markets.join(" · ")}</p>
          </details>
          <TextLink href={"/request-workforce?role=" + encodeURIComponent(role.title)}>{t("Discuss this role", "इस भूमिका के बारे में पूछें")}</TextLink>
        </div>
      </article>)}</div>
      {!results.length && <div className="recruitment-empty"><h3>{t("No matching profiles", "कोई प्रोफाइल नहीं मिली")}</h3><p>{t("Try another skill, industry or destination.", "दूसरा कौशल, उद्योग या देश खोजें।")}</p><button className="button button-navy" onClick={() => { setQuery(""); setIndustry(""); setType(""); }}>{t("Clear filters", "फ़िल्टर हटाएँ")}</button></div>}
      <div className="recruitment-closing"><p>{t("Looking for your next opportunity?", "अपने अगले अवसर की तलाश में हैं?")}</p><Button href="/find-a-job" variant="navy">{t("Explore candidate guidance", "उम्मीदवार मार्गदर्शन देखें")}</Button></div>
    </div></section><ContactCTA employer />
  </>;
}
