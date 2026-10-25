import { pageMetadata } from "@/lib/metadata";
import { DisclaimerPage } from "@/components/pages/resources-pages";
export const metadata = pageMetadata("Disclaimer", "Understand the scope of recruitment information, articles and examples.", "/disclaimer");
export default function Page() { return <DisclaimerPage />; }

