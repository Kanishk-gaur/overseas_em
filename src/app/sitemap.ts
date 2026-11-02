import type { MetadataRoute } from "next";
import { workforceIndex } from "@/data/workforce-index";
import { site } from "@/config/site";
import { countries } from "@/data/countries";
import { industries } from "@/data/industries";
import recruitmentData1 from "@/data/recruitment/blog.json";
import { resourceLinks } from "@/data/recruitment";

const { posts } = recruitmentData1;
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/industries", "/employers", "/process", "/contact", "/privacy-policy", "/terms", "/disclaimer", ...resourceLinks.map(link => link.href), ...workforceIndex.map(role => "/workforce/" + role.slug), ...countries.map(country => "/countries/" + country.slug), ...industries.map(industry => "/industries/" + industry.slug), ...posts.map(post => "/blog/" + post.slug)];
  // The certificate collection remains a noindex preview until real records are approved.
  return [...new Set(paths)].filter(path => path !== "/work-certificates").map(path => ({ url: `${site.url}${path}/`, changeFrequency: "monthly", priority: path === "" ? 1 : .7 }));
}
