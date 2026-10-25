import { pageMetadata } from "@/lib/metadata";
import { BlogPage } from "@/components/pages/resources-pages";
export const metadata = pageMetadata("Insights & Guides", "Recruitment articles and guides for international employers and Indian workers.", "/blog");
export default function Page() { return <BlogPage />; }

