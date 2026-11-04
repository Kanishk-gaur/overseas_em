import { pageMetadata } from "@/lib/metadata";
import { ProcessPage } from "@/components/pages/process-page";
export const metadata = pageMetadata("Our Recruitment Process", "International hiring involves linked decisions. Define your requirements, review candidate evidence and coordinate each stage with our recruitment team.", "/process");
export default function Page() { return <ProcessPage />; }
