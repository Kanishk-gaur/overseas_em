import { pageMetadata } from "@/lib/metadata";
import { EmployersPage } from "@/components/pages/employers-page";
export const metadata = pageMetadata("For International Employers", "Plan your next team with Indian technical professionals and skilled trades. Explore hiring options, screening, deployment coordination and ongoing workforce support.", "/employers");
export default function Page() { return <EmployersPage />; }
