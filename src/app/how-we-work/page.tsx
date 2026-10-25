import { pageMetadata } from "@/lib/metadata";
import { HiringPage } from "@/components/pages/hiring-page";
export const metadata = pageMetadata("How We Work", "Technical and trade hiring tracks, deployment stages and employer engagement models.", "/how-we-work");
export default function Page() { return <HiringPage />; }

