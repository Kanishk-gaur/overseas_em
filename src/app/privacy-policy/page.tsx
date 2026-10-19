import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/pages/legal-page";
export const metadata = pageMetadata("Privacy Policy", `Read the privacy policy for the ${site.legalName} website.`, "/privacy-policy");
export default function Page() { return <LegalPage kind="privacy" />; }
