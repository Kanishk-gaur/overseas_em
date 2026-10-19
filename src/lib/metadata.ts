import type { Metadata } from "next";
import { site } from "@/config/site";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title: `${title} | ${site.legalName}`, description, url: path, siteName: site.legalName, type: "website", images: [{ url: "/images/hero-workshop.webp", width: 1448, height: 1086, alt: "Indian skilled manufacturing professionals at work" }] } };
}
