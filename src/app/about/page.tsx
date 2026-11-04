import { pageMetadata } from "@/lib/metadata";
import { AboutPage } from "@/components/pages/about-page";
export const metadata = pageMetadata("About Us", "We help overseas employers recruit from India, aligning candidate sourcing, technical assessment and mobilization with their workforce requirements.", "/about");
export default function Page() { return <AboutPage />; }
