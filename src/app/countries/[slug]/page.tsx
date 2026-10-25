import { notFound } from "next/navigation";
import { countries } from "@/data/countries";
import { countryAliases } from "@/data/recruitment";
import { CountryPage } from "@/components/pages/detail-pages";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return [...countries.map(item => item.slug), ...Object.keys(countryAliases)].map(slug => ({ slug }));
}
function findItem(slug: string) {
  return countries.find(item => item.slug === (countryAliases[slug] || slug));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();
  return pageMetadata(item.name.en, item.description.en, "/countries/" + item.slug);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findItem(slug)) notFound();
  return <CountryPage slug={slug} />;
}

