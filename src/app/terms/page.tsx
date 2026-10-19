import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/pages/legal-page";
export const metadata = pageMetadata("Terms and Conditions", `Read the terms and conditions for the ${site.legalName} website.`, "/terms");
export default function Page() { return <LegalPage kind="terms" />; }
