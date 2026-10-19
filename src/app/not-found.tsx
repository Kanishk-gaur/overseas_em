import { site } from "@/config/site";
import Link from "next/link";
export default function NotFound() { return <section className="section"><div className="container not-found"><p className="eyebrow">404 / {site.legalName.toUpperCase()}</p><h1>A different path awaits.</h1><p>This page could not be found. Return home to explore our services and contact options.</p><Link className="button button-navy" href="/">Return to homepage ↗</Link></div></section>; }
