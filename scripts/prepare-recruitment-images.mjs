import sharp from "sharp";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

// Reuse only reviewed, content-matched scenes from the original project.
const source = path.resolve("../overseas/public/images");
const output = path.resolve("public/images/recruitment/editorial");
const scenes = {
  consultation: "home/webp/about-1.webp",
  workforce: "home/webp/about-2.webp",
  documents: "home/webp/about-3.webp",
  welder: "home/webp/gallery-1.webp",
  nurse: "home/webp/gallery-2.webp",
  electrician: "home/webp/gallery-3.webp",
  chef: "home/webp/gallery-4.webp",
  forklift: "home/webp/gallery-5.webp",
  construction: "home/webp/gallery-6.webp",
  requirements: "home/webp/step-1.webp",
  screening: "home/webp/step-2.webp",
  assessment: "home/webp/step-3.webp",
  verification: "home/webp/step-4.webp",
  orientation: "home/webp/step-5.webp",
  departure: "home/webp/step-6.webp",
  support: "home/webp/step-7.webp",
  engineering: "home/webp/track-technical.webp",
  trades: "home/webp/track-non-technical.webp",
  team: "home/webp/cta-bg.webp",
  manufacturing: "case-studies/webp/germany-technicians.webp",
  caregiver: "case-studies/webp/israel-caregivers.webp",
  hospitality: "case-studies/webp/qatar-hospitality.webp",
  facilities: "case-studies/webp/uae-facilities.webp",
  siteEngineer: "case-studies/webp/saudi-engineers.webp",
  software: "case-studies/webp/germany-developers.webp",
  warehouse: "case-studies/webp/poland-warehouse.webp",
  machine: "blog/webp/germany-visa.webp",
};
await mkdir(output, { recursive: true });
const manifest = [];
for (const [name, file] of Object.entries(scenes)) {
  const target = path.join(output, name + ".webp");
  const info = await sharp(path.join(source, file)).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(target);
  manifest.push({ file: "/images/recruitment/editorial/" + name + ".webp", source: "overseas/public/images/" + file, width: info.width, height: info.height, bytes: (await stat(target)).size, provenance: "Existing project-provided illustrative generated photography" });
}
for (let i = 1; i <= 4; i++) {
  await sharp(`public/team/member-${i}.png`).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/team/member-${i}.webp`);
}
await writeFile("docs/reused-image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Prepared ${manifest.length} editorial photographs and four team portraits.`);
