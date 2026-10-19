import type { Metadata } from "next";
import { site } from "@/config/site";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title: `${title} | ${site.legalName}`, description, url: path, siteName: site.legalName, type: "website", images: [{ url: "/images/hero-workers.webp", width: 1942, height: 809, alt: "Indian skilled professionals at work" }] } };
}
