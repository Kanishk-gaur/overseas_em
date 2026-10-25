"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { photography } from "@/data/photography";
import workforceData from "@/data/recruitment/workforce.json";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, PageHero, TextLink } from "@/components/shared/ui";
import { ContactAction } from "@/components/shared/contact-action";


function SelectedWorkforceRole() {
  const params = useSearchParams();
  const { t } = useLocale();
  const role = workforceData.workforce.find(item => item.title === params.get("role"));
  if (!role) return null;
  return <div className="detail-roles selected-workforce-role"><Eyebrow>{t("YOUR SELECTED ROLE", "आपकी चुनी हुई भूमिका")}</Eyebrow><h2 lang="en">{role.title}</h2><p lang="en">{role.description}</p><p className="small">{t("Include this role when sharing your requirement with our team.", "टीम को अपनी ज़रूरत बताते समय इस भूमिका का उल्लेख करें।")}</p></div>;
}

export function WorkforceRequestPage() {
  const { t } = useLocale();
  const groups = [
    [t("Your organisation", "आपका संगठन"), t("Company name, contact person, designation, industry, business email and phone number.", "कंपनी का नाम, संपर्क व्यक्ति, पद, उद्योग, व्यावसायिक ईमेल और फोन नंबर।")],
    [t("Your workforce brief", "कामगारों की ज़रूरत"), t("Destination country, worksite, roles, technical or trade category, headcount and experience requirements.", "देश, कार्यस्थल, भूमिकाएँ, तकनीकी या ट्रेड श्रेणी, कर्मचारियों की संख्या और अनुभव।")],
    [t("Terms & timing", "शर्तें और समय"), t("Target joining date, contract duration, salary range, working hours, accommodation, transport and other benefits.", "जॉइनिंग की तारीख, अनुबंध अवधि, वेतन, काम का समय, आवास, परिवहन और अन्य सुविधाएँ।")],
    [t("Assessment & support", "मूल्यांकन और सहयोग"), t("Interview format, practical assessments, qualification requirements, documentation and ongoing account support.", "इंटरव्यू का तरीका, व्यावहारिक परीक्षण, योग्यता, दस्तावेज़ और लगातार सहयोग।")],
  ];
  return <><PageHero eyebrow={t("REQUEST WORKFORCE", "कामगारों की ज़रूरत बताएँ")} title={t("A clear requirement.\nThe right people.", "स्पष्ट ज़रूरत।\nउपयुक्त लोग।")} description={t("Share your hiring requirements with our team. A clear brief helps us discuss sourcing, screening and deployment around your operation.", "अपनी भर्ती ज़रूरत टीम को बताएँ। स्पष्ट जानकारी से आपके काम के अनुसार भर्ती, जाँच और तैनाती पर चर्चा होती है।")} image={photography.requirements} imageAlt={t("Manufacturing workplace", "औद्योगिक कार्यस्थल")} />
    <section className="section"><div className="container"><Suspense fallback={null}><SelectedWorkforceRole /></Suspense><div className="section-heading"><div><Eyebrow>{t("YOUR WORKFORCE BRIEF", "आपकी भर्ती ज़रूरत")}</Eyebrow><h2>{t("The details that\nshape a good match.", "सही मेल के लिए\nज़रूरी विवरण।")}</h2></div><p>{t("We support single specialist hires, bulk workforce orders and phased deployments. Scope and availability are confirmed for each requirement.", "एकल विशेषज्ञ भर्ती, बड़ी कामगार टीम और चरणबद्ध तैनाती में सहयोग। दायरा और उपलब्धता हर ज़रूरत के लिए तय होते हैं।")}</p></div><div className="recruitment-process">{groups.map(([title, body], index) => <article key={title}><span className="editorial-number">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className="recruitment-closing"><Button href="/contact?type=employer" variant="navy">{t("Discuss your requirement", "अपनी ज़रूरत पर बात करें")}</Button><ContactAction type="employer" method="email" variant="white" /></div><div className="button-row"><TextLink href="/workforce">{t("Browse workforce profiles", "कामगार प्रोफाइल देखें")}</TextLink><TextLink href="/how-we-work">{t("Explore hiring tracks", "भर्ती प्रक्रिया जानें")}</TextLink></div></div></section>
  </>;
}
