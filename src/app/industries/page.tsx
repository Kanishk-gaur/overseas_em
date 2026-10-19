import { pageMetadata } from "@/lib/metadata";
import { IndustriesPage } from "@/components/pages/directory-pages";
export const metadata = pageMetadata("Industries We Serve", "Explore recruitment support across construction, manufacturing, logistics, hospitality, healthcare and other industries.", "/industries");
export default function Page() { return <IndustriesPage />; }
