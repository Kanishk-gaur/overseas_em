import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import { industryAliases } from "@/data/recruitment";
import { IndustryPage } from "@/components/pages/detail-pages";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return [...industries.map(item => item.slug), ...Object.keys(industryAliases)].map(slug => ({ slug }));
}
function findItem(slug: string) {
  return industries.find(item => item.slug === (industryAliases[slug] || slug));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();
  return pageMetadata(item.title.en, item.description.en, "/industries/" + item.slug);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findItem(slug)) notFound();
  return <IndustryPage slug={slug} />;
}

