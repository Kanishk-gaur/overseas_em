import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const base = "/Users/kanishkgaur/.codex/generated_images/01a16c66-15a5-7b32-bd2a-7612939a1b66/";
const files = {
  "driver": "exec-850f067e-6b90-4f3d-8ff9-a2bf1b0213ce.png",
  "security": "exec-1bf263b1-b5f6-439a-9570-35ad26f57447.png",
  "agriculture": "exec-1b003c43-8eb5-40f2-8054-f7b0e2a2ba98.png"
};
await mkdir("public/images/recruitment/generated", { recursive: true });
const manifest = [];
for (const [name,file] of Object.entries(files)) {
 const output = "public/images/recruitment/generated/" + name + ".webp";
 const info = await sharp(base + file).resize({width:1280, withoutEnlargement:true}).webp({quality:82, effort:5}).toFile(output);
 manifest.push({file:output, original:base + file, width:info.width,height:info.height,bytes:info.size,tool:"built-in image_gen.imagegen"});
}
await writeFile("docs/generated-image-manifest.json",JSON.stringify(manifest,null,2)+"\n");
console.log(JSON.stringify(manifest,null,2));
