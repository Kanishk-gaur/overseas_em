import { pageMetadata } from "@/lib/metadata";
import { EmployersPage } from "@/components/pages/employers-page";
export const metadata = pageMetadata("For International Employers", "Discuss Indian manpower sourcing, skilled workforce requirements, technical recruitment and candidate screening coordination.", "/employers");
export default function Page() { return <EmployersPage />; }
