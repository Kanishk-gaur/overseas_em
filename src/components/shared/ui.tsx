"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./locale-provider";
import { site } from "@/config/site";
import { imageDescriptions } from "@/data/photography";

export function Button({ href, children, variant = "gold", className = "", arrow = true }: { href: string; children: React.ReactNode; variant?: "gold" | "navy" | "outline" | "white"; className?: string; arrow?: boolean }) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}{arrow && <ArrowUpRight size={17} aria-hidden="true" />}</Link>;
}
export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link className={`text-link ${light ? "text-link-light" : ""}`} href={href}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`eyebrow ${light ? "light" : ""}`}><span />{children}</p>; }
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { opacity: [0.65, 1], y: [10, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: .45, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
export function Photo({ src, alt, className = "", priority = false, sizes = "(max-width: 767px) 100vw, 50vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const { local } = useLocale();
  const description = imageDescriptions[src];
  return <div className={`photo ${className}`}><Image src={src} alt={alt && description ? local(description) : alt} fill sizes={sizes} preload={priority} style={{ objectPosition: description?.position }} /></div>;
}
export function PageHero({ eyebrow, title, description, image, imageAlt }: { eyebrow: string; title: string; description: string; image?: string; imageAlt?: string }) {
  const { d, local } = useLocale();
  const descriptionImage = image ? imageDescriptions[image] : undefined;
  return <section className={`page-hero ${image ? "page-hero-image" : ""}`}>
    <div className="container page-hero-content"><div className="breadcrumbs"><Link href="/">{d.nav[0]}</Link><ChevronRight size={12} /><span>{eyebrow}</span></div><div className="page-hero-grid"><div className="page-hero-editorial"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p className="page-hero-description">{description}</p><div className="page-hero-signature">{site.tagline}</div></div>{image && <div className="page-hero-visual"><Image src={image} alt={descriptionImage ? local(descriptionImage) : imageAlt || ""} fill preload sizes="(max-width: 767px) 100vw, 42vw" style={{ objectPosition: descriptionImage?.position }} /></div>}</div></div>
  </section>;
}
