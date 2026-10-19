"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./locale-provider";
import { site } from "@/config/site";

export function Button({ href, children, variant = "gold", className = "", arrow = true }: { href: string; children: React.ReactNode; variant?: "gold" | "navy" | "outline" | "white"; className?: string; arrow?: boolean }) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}{arrow && <ArrowUpRight size={17} aria-hidden="true" />}</Link>;
}
export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link className={`text-link ${light ? "text-link-light" : ""}`} href={href}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`eyebrow ${light ? "light" : ""}`}><span />{children}</p>; }
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { opacity: [0.65, 1], y: [18, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: .6, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
export function Photo({ src, alt, className = "", priority = false, sizes = "(max-width: 767px) 100vw, 50vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`photo ${className}`}><Image src={src} alt={alt} fill sizes={sizes} priority={priority} /></div>;
}
export function PageHero({ eyebrow, title, description, image, imageAlt }: { eyebrow: string; title: string; description: string; image?: string; imageAlt?: string }) {
  const { d } = useLocale();
  return <section className={`page-hero ${image ? "page-hero-image" : ""}`}>
    {image && <Image src={image} alt={imageAlt || ""} fill priority sizes="100vw" />}
    <div className="container page-hero-content"><div className="breadcrumbs"><Link href="/">{d.nav[0]}</Link><ChevronRight size={12} /><span>{eyebrow}</span></div><Reveal><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p className="page-hero-description">{description}</p></Reveal></div>
    <div className="page-hero-index" aria-hidden="true">{site.name.toUpperCase()} / {site.descriptor}</div>
  </section>;
}
