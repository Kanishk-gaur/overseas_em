import { pageMetadata } from "@/lib/metadata";
import { AboutPage } from "@/components/pages/about-page";
export const metadata = pageMetadata("About Us", "People-focused international recruitment from India. Our purpose, values and approach to connecting workers and employers.", "/about");
export default function Page() { return <AboutPage />; }
