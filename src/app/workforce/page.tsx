import { pageMetadata } from "@/lib/metadata";
import { WorkforcePage } from "@/components/pages/workforce-page";
export const metadata = pageMetadata("Workforce Directory", "Explore 18 workforce profiles, practical skills, experience and destination markets.", "/workforce");
export default function Page() { return <WorkforcePage />; }

