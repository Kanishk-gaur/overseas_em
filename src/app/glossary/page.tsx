import { pageMetadata } from "@/lib/metadata";
import { VisaGuidePage } from "@/components/pages/visa-guide-page";
export const metadata = pageMetadata("Visa & Work Permit Guide", "Understand work visas, work permits and residence permits for 15 destinations: common routes, typical documents, process steps, fraud warnings, FAQs and a glossary.", "/glossary");
export default function Page() { return <VisaGuidePage />; }
