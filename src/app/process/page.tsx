import { pageMetadata } from "@/lib/metadata";
import { ProcessPage } from "@/components/pages/process-page";
export const metadata = pageMetadata("Our Recruitment Process", "Understand the overseas recruitment process, from your first enquiry to documents, employer interviews, contracts and joining.", "/process");
export default function Page() { return <ProcessPage />; }
