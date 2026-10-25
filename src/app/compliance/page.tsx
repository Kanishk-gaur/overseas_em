import { pageMetadata } from "@/lib/metadata";
import { CompliancePage } from "@/components/pages/resources-pages";
export const metadata = pageMetadata("Recruitment Standards", "Candidate verification, written terms and worker welfare.", "/compliance");
export default function Page() { return <CompliancePage />; }

