import { pageMetadata } from "@/lib/metadata";
import { CountriesPage } from "@/components/pages/directory-pages";
export const metadata = pageMetadata("International Destinations", "Explore potential overseas recruitment destinations across the Middle East, Europe and Asia, with clear eligibility considerations.", "/countries");
export default function Page() { return <CountriesPage />; }
