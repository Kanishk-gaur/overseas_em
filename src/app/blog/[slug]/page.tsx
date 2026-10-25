import { notFound } from "next/navigation";
import recruitmentData1 from "@/data/recruitment/blog.json";
import { blogImages } from "@/data/recruitment";
import { pageMetadata } from "@/lib/metadata";
import { ArticlePage } from "@/components/pages/resources-pages";

const { posts } = recruitmentData1;

export const dynamicParams = false;
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) notFound();
  const metadata = pageMetadata(post.title, post.excerpt, "/blog/" + post.slug);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" as const, publishedTime: post.date, images: [{ url: "/images/recruitment/blog/webp/" + blogImages[post.slug] + ".webp", alt: post.title }] } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!posts.some(post => post.slug === slug)) notFound();
  return <ArticlePage slug={slug} />;
}
