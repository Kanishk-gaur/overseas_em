"use client";
import recruitmentData1 from "@/data/recruitment/team.json";
import { useLocale } from "@/components/shared/locale-provider";
import { Eyebrow, PageHero, Photo, TextLink } from "@/components/shared/ui";
import { ContactCTA } from "@/components/shared/contact-cta";

const { team } = recruitmentData1;

export function TeamPage() {
  const { t } = useLocale();
  return <><PageHero eyebrow={t("OUR TEAM", "हमारी टीम")} title={t("Meet the\nrecruitment team.", "हमारी भर्ती\nटीम से मिलें।")} description={t("Meet the people coordinating workforce strategy, documentation, candidate screening and employer relationships.", "कामगार रणनीति, दस्तावेज़, उम्मीदवार जाँच और नियोक्ता संबंधों को संभालने वाली टीम से मिलें।")} />
    <section className="section"><div className="container"><div className="team-directory">{team.map((member, index) => <article key={member.name} lang="en"><Photo src={member.image.replace(".png", ".webp")} alt={member.name} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw" /><div className="team-member-copy"><Eyebrow>{String(index + 1).padStart(2, "0")} / {t("OUR TEAM", "हमारी टीम")}</Eyebrow><h2>{member.name}</h2><p className="team-role">{member.role}</p><p>{member.specialty}</p></div></article>)}</div><div className="recruitment-closing"><p>{t("One conversation. A team supporting the details.", "एक बातचीत। हर विवरण में टीम का साथ।")}</p><TextLink href="/contact">{t("Speak to our team", "हमारी टीम से बात करें")}</TextLink></div></div></section><ContactCTA />
  </>;
}
