import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import { ContactEntry } from "@/components/pages/contact-entry";
import { ContactPage } from "@/components/pages/contact-page";
export const metadata = pageMetadata("Contact Us", "Planning an international team? Share your hiring requirements. Candidates can also ask about preparing for overseas work.", "/contact");
export default function Page() { return <Suspense fallback={<ContactPage />}><ContactEntry /></Suspense>; }
