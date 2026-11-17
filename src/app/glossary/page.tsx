import { pageMetadata } from "@/lib/metadata";
import { VisaGuidePage } from "@/components/pages/visa-guide-page";
export const metadata = pageMetadata("Visa Services for Any Country & Purpose", "Help with work, tourist, business, student, family, Schengen and other visas. Document checklist, forms, appointments and application support.", "/glossary");
export default function Page() { return <VisaGuidePage />; }
