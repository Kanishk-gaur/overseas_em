import { readdir, mkdir, stat, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const output = process.argv[2] || path.join(root, ".review/image-audit");
await mkdir(output, { recursive: true });
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}
const records = [];
const unique = new Map();
for (const project of ["overseas", "overseas-forgiving"]) {
  const directory = path.resolve(root, "..", project);
  const files = (await walk(path.join(directory, "public"))).filter(file => /\.(png|jpe?g|webp|avif)$/i.test(file)).sort();
  for (const file of files) {
    const bytes = await readFile(file);
    const metadata = await sharp(bytes).metadata();
    const hash = createHash("sha256").update(bytes).digest("hex");
    const record = { project, file: path.relative(directory, file), width: metadata.width, height: metadata.height, bytes: (await stat(file)).size, format: metadata.format, sha256: hash };
    records.push(record);
    if (!unique.has(hash)) unique.set(hash, { ...record, absolute: file });
  }
}
const scenes = [...unique.values()];
const escape = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
for (let offset = 0; offset < scenes.length; offset += 24) {
  const batch = scenes.slice(offset, offset + 24);
  const layers = [];
  for (const [index, record] of batch.entries()) {
    const x = (index % 4) * 360, y = Math.floor(index / 4) * 240;
    layers.push({ input: await sharp(record.absolute).resize(350, 185, { fit: "contain", background: "#e8e7e1" }).jpeg().toBuffer(), left: x + 5, top: y });
    const label = '<svg width="355" height="55"><rect width="355" height="55" fill="#ffffff"/><text x="5" y="17" font-size="11" font-family="Arial" fill="#0b1f33">' + (offset + index + 1) + " / " + record.project + '</text><text x="5" y="33" font-size="10" font-family="Arial">' + escape(record.file.replace("public/images/", "")) + '</text><text x="5" y="48" font-size="10" font-family="Arial" fill="#607080">' + record.width + " × " + record.height + " / " + Math.round(record.bytes / 1024) + ' KB</text></svg>';
    layers.push({ input: Buffer.from(label), left: x + 5, top: y + 185 });
  }
  await sharp({ create: { width: 1440, height: Math.ceil(batch.length / 4) * 240, channels: 3, background: "#ffffff" } }).composite(layers).jpeg({ quality: 88 }).toFile(path.join(output, "sheet-" + String(offset / 24 + 1).padStart(2, "0") + ".jpg"));
}
await writeFile(path.join(output, "inventory.json"), JSON.stringify(records, null, 2));
console.log(JSON.stringify({ files: records.length, uniqueFiles: scenes.length, sheets: Math.ceil(scenes.length / 24), output }));
