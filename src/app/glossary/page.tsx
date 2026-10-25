import { pageMetadata } from "@/lib/metadata";
import { GlossaryPage } from "@/components/pages/resources-pages";
export const metadata = pageMetadata("Recruitment Glossary", "Understand common visa, documentation and international recruitment terminology.", "/glossary");
export default function Page() { return <GlossaryPage />; }

