import { notFound } from "next/navigation";

// Work certificates page hidden for now — the route returns the 404 page.
// To restore it, delete the notFound() page below and uncomment the original code.
//
// import { pageMetadata } from "@/lib/metadata";
// import { WorkCertificatesPage } from "@/components/pages/work-certificates-page";
//
// export const metadata = {
//   ...pageMetadata("Work Certificates", "Aaroham’s work in India and its next chapter in international recruitment. Preview draft work completion and service experience certificate designs.", "/work-certificates"),
//   robots: { index: false, follow: true },
// };
//
// export default function Page() { return <WorkCertificatesPage />; }

export default function Page() { notFound(); }
