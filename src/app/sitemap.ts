import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/services", "/industries", "/countries", "/employers", "/process", "/contact", "/privacy-policy", "/terms"].map(path => ({ url: `${site.url}${path}/`, changeFrequency: "monthly", priority: path === "" ? 1 : .7 }));
}
