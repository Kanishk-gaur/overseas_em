import { pageMetadata } from "@/lib/metadata";
import { CaseStudiesPage } from "@/components/pages/resources-pages";
export const metadata = pageMetadata("Hiring Scenarios", "Illustrative workforce hiring briefs across countries and industries.", "/case-studies");
export default function Page() { return <CaseStudiesPage />; }

