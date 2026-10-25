import { pageMetadata } from "@/lib/metadata";
import { WorkforceRequestPage } from "@/components/pages/enquiry-guides";
export const metadata = pageMetadata("Request Workforce", "Prepare your employer brief for specialist, bulk and ongoing workforce needs.", "/request-workforce");
export default function Page() { return <WorkforceRequestPage />; }

