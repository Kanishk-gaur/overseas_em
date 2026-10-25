import sharp from "sharp";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
// Explicit catalogue: add new Photo/PageHero sources to image-sources.json.
const sources = JSON.parse(await readFile("src/data/image-sources.json", "utf8"));
const manifest = {};
let generated = 0;
for (const src of sources) {
  if ((!src.startsWith("/images/") && !src.startsWith("/team/")) || src.includes("..")) throw new Error(`Invalid image source: ${src}`);
  const input = await readFile(`public${src}`);
  const hash = createHash("sha256").update(input).update("webp-quality-82-v1").digest("hex").slice(0, 14);
  const metadata = await sharp(input).metadata();
  const widths = [...new Set([320, 640, 960, 1280, 1920].map(width => Math.min(width, metadata.width)))].sort((a,b) => a-b);
  const folder = `/images/responsive/${hash}`;
  await mkdir(`public${folder}`, { recursive: true });
  manifest[src] = { folder, widths };
  for (const width of widths) {
    const file = `public${folder}/${width}.webp`;
    try { await stat(file); } catch {
      await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(file);
      generated++;
    }
  }
}
const output = JSON.stringify(manifest, null, 2) + "\n";
let existing = "";
try { existing = await readFile("src/data/responsive-images.json", "utf8"); } catch {}
if (output !== existing) await writeFile("src/data/responsive-images.json", output);
console.log(`Responsive images: ${sources.length} sources; ${generated} variants generated.`);
