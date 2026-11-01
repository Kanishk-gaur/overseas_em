"use client";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { industries } from "@/data/industries";
import { industryGroups, industryGuides } from "@/data/industry-guides";
import { photography } from "@/data/photography";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, PageHero, Photo, TextLink } from "@/components/shared/ui";

export function IndustriesPage() {
  const { t, local } = useLocale();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const found = industries.filter(item => (group === "all" || industryGuides[item.slug].group === group) && `${item.title.en} ${item.title.hi} ${item.roles.en} ${item.roles.hi} ${local(item.title)} ${local(item.roles)}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><PageHero eyebrow={t("INDUSTRIES", "उद्योग")} title={t("Find the work\nthat fits your skills.", "अपने हुनर के\nअनुसार काम जानें।")} description={t("Browse the sectors we recruit for, with examples of the roles, skills and preparation each involves.", "उन क्षेत्रों को देखें जिनमें हम भर्ती करते हैं, साथ में संबंधित भूमिकाओं, हुनर और तैयारी के उदाहरण जानें।")} image={photography.engineering} />
    <section className="section catalog-section"><div className="container">
      <div className="guide-heading"><div><Eyebrow>{t("FIND YOUR FIELD", "अपना क्षेत्र खोजें")}</Eyebrow><h2>{t("Inside the industries\nwe recruit for.", "हमारे भर्ती क्षेत्रों\nकी जानकारी।")}</h2></div><p className="catalog-intro">{t("These are industry and role guides, not current vacancies. Availability, employer requirements and individual eligibility must be confirmed for each enquiry.", "ये उद्योग और भूमिकाओं की जानकारी है, मौजूदा रिक्तियाँ नहीं। हर पूछताछ में उपलब्धता, नियोक्ता की ज़रूरत और व्यक्तिगत पात्रता की पुष्टि ज़रूरी है।")}</p></div>
      <div className="catalog-toolbar"><div className="guide-filter-pills" aria-label={t("Industry category", "उद्योग श्रेणी")}><button type="button" aria-pressed={group === "all"} onClick={() => setGroup("all")}>{t("All industries", "सभी उद्योग")}</button>{industryGroups.map(item => <button type="button" key={item.id} aria-pressed={group === item.id} onClick={() => setGroup(item.id)}>{local(item.label)}</button>)}</div><label className="guide-search"><Search size={18} aria-hidden="true" /><span className="sr-only">{t("Search industries or roles", "उद्योग या भूमिकाएँ खोजें")}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Search a role or industry", "भूमिका या उद्योग खोजें")} /></label></div>
      <p className="guide-result-count" role="status">{t("{count} of {total} industries", "{total} में से {count} उद्योग", { count: found.length, total: industries.length })}</p>
      <div className="industry-catalog-grid">{found.map(item => <article className="industry-catalog-card" key={item.slug} id={item.slug}><Link href={`/industries/${item.slug}`} className="catalog-image-link" aria-label={local(item.title)}><Photo src={item.image} alt={local(item.title)} sizes="(max-width: 767px) 100vw, (max-width: 1400px) 45vw, 620px" /><span>{local(industryGroups.find(group => group.id === industryGuides[item.slug].group)!.label)}</span></Link><div className="catalog-card-copy"><h2><Link href={`/industries/${item.slug}`}>{local(item.title)}</Link></h2><p>{local(item.description)}</p><div className="catalog-roles"><span>{t("EXAMPLE ROLES", "भूमिकाओं के उदाहरण")}</span><p>{local(item.roles)}</p></div><TextLink href={`/industries/${item.slug}`}>{t("Explore skills & preparation", "हुनर और तैयारी जानें")}</TextLink></div></article>)}</div>
      {!found.length && <div className="guide-empty"><h3>{t("No matching industries", "कोई उद्योग नहीं मिला")}</h3><p>{t("Try a broader role name or reset the filters.", "भूमिका का सामान्य नाम खोजें या फ़िल्टर हटाएँ।")}</p><button type="button" className="button button-navy" onClick={() => { setGroup("all"); setQuery(""); }}>{t("Reset filters", "फ़िल्टर हटाएँ")}</button></div>}
      <div className="catalog-next"><div><h3>{t("Found a relevant field?", "अपने अनुभव से जुड़ा क्षेत्र मिला?")}</h3><p>{t("Workers can prepare their profile. Employers can outline the team they need.", "कामगार अपनी जानकारी तैयार करें। नियोक्ता अपनी टीम की ज़रूरत बताएँ।")}</p></div><div className="button-row"><Button href="/find-a-job" variant="navy">{t("Worker guide", "कामगार मार्गदर्शिका")}</Button><TextLink href="/request-workforce">{t("Plan your hiring", "भर्ती की योजना बनाएँ")}</TextLink></div></div>
    </div></section></>;
}
