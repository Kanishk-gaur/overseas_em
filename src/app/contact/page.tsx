import { site } from "@/config/site";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import { ContactEntry } from "@/components/pages/contact-entry";
import { ContactPage } from "@/components/pages/contact-page";
export const metadata = pageMetadata("Contact Us", `Talk to ${site.legalName} about overseas work or international workforce recruitment. Candidate and employer enquiry options.`, "/contact");
export default function Page() { return <Suspense fallback={<ContactPage />}><ContactEntry /></Suspense>; }
