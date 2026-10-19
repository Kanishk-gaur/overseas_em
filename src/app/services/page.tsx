import { pageMetadata } from "@/lib/metadata";
import { ServicesPage } from "@/components/pages/directory-pages";
export const metadata = pageMetadata("Our Services", "Overseas manpower recruitment, skilled and technical recruitment, general workforce services and employer hiring support from India.", "/services");
export default function Page() { return <ServicesPage />; }
