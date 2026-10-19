import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";
import { HomePage } from "@/components/home/home-page";
export const metadata = { ...pageMetadata(site.tagline, `Connecting Indian talent with international opportunities through people-focused recruitment at ${site.legalName}.`, "/"), title: `${site.legalName} | ${site.tagline}` };
export default function Page() { return <HomePage />; }
