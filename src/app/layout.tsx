import type { Metadata } from "next";
import { Manrope, Inter, Noto_Sans_Devanagari } from "next/font/google";
import { site } from "@/config/site";
import { LocaleProvider } from "@/components/shared/locale-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import "./editorial.css";
import "./recruitment.css";
import "./studio.css";
import "./employers.css";
import "./polish.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-hindi", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.legalName} | Indian Talent. Global Opportunities.`, template: `%s | ${site.legalName}` },
  description: "People-focused overseas manpower recruitment from India. Explore skilled, technical and general workforce services for Indian workers and international employers.",
  openGraph: { type: "website", siteName: site.legalName, locale: "en_IN", images: [{ url: "/images/hero-workshop.webp", width: 1448, height: 1086, alt: "Indian skilled manufacturing professionals at work" }] },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: site.legalName, url: site.url, slogan: site.tagline, ...(site.contact.email ? { email: site.contact.email } : {}), ...(site.contact.phone ? { telephone: site.contact.phone } : {}) };
  return <html lang="en" className={`${manrope.variable} ${inter.variable} ${devanagari.variable}`}><body id="top"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><LocaleProvider><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /></LocaleProvider></body></html>;
}
