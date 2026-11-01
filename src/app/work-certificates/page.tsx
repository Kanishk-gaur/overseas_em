import { pageMetadata } from "@/lib/metadata";
import { WorkCertificatesPage } from "@/components/pages/work-certificates-page";

export const metadata = {
  ...pageMetadata("Work Certificates", "GlobalPath’s work in India and its next chapter in international recruitment. Preview draft work completion and service experience certificate designs.", "/work-certificates"),
  robots: { index: false, follow: true },
};

export default function Page() { return <WorkCertificatesPage />; }
