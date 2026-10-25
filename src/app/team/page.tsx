import { pageMetadata } from "@/lib/metadata";
import { TeamPage } from "@/components/pages/team-page";
export const metadata = pageMetadata("Our Team", "Meet our workforce strategy, screening, documentation and account management team.", "/team");
export default function Page() { return <TeamPage />; }

