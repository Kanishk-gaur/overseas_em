import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";
import { HomePage } from "@/components/home/home-page";
export const metadata = { ...pageMetadata(site.tagline, "At GlobalPath Overseas, we define your workforce requirements, assess relevant Indian candidates and coordinate the steps towards mobilization.", "/"), title: `${site.legalName} | ${site.tagline}` };
export default function Page() { return <HomePage />; }
