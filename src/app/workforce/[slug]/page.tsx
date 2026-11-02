import { notFound } from "next/navigation";
import { workforceRoleDetails } from "@/data/workforce-role-details";
import { workforceRoleTranslations } from "@/data/workforce-role-translations";
import { workforceIndex } from "@/data/workforce-index";
import { industries } from "@/data/industries";
import { roleImages } from "@/data/photography";
import { RoleDetail } from "@/components/workforce/role-detail";
import { pageMetadata } from "@/lib/metadata";
import copy from "@/locales/workforce/en.json";

export const dynamicParams = false;
export function generateStaticParams() { return workforceIndex.map(({ slug }) => ({ slug })); }
function findRole(slug: string) {
  const role = workforceRoleDetails.find(item => item.slug === slug);
  const summary = workforceIndex.find(item => item.slug === slug);
  if (!role || !summary) notFound();
  return { role, summary };
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { role } = findRole(slug);
  const metadata = pageMetadata(copy.detailTitle.replace("{role}", role.title), copy.detailDescription.replace("{role}", role.title), `/workforce/${slug}/`);
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: roleImages[role.title], alt: role.title }] } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { role, summary } = findRole(slug);
  const related = role.relatedSlugs.flatMap(slug => {
    const item = workforceIndex.find(item => item.slug === slug);
    return item ? [{ slug, title: item.title, image: roleImages[item.title] }] : [];
  });
  const relatedIndustries = industries.filter(item => role.industrySlugs.includes(item.slug)).map(({ slug, title }) => ({ slug, title }));
  return <RoleDetail role={role} summary={summary.description} image={roleImages[role.title]} related={related} industries={relatedIndustries} translations={workforceRoleTranslations[slug]} />;
}
