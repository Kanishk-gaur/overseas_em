// Imports translated workforce role guides into
// src/data/workforce-role-translations/<locale>.json.
//
// Usage: node scripts/import-role-guides.mjs <locale> <translations.tsv>
// The TSV uses the "path<TAB>text" lines produced by export-role-guides.mjs
// (write "\n" for a line break). Every role present in the file must be
// complete; other roles already in the locale file are kept.
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { loadTypeScript } from "./i18n-shared.mjs";

const [locale, file] = process.argv.slice(2);
if (!locale || !file) { console.error("Usage: node scripts/import-role-guides.mjs <locale> <translations.tsv>"); process.exit(1); }
const { languages } = await loadTypeScript("src/locales/config.ts");
if (!languages.some(item => item.code === locale) || locale === "en") { console.error(`Unknown locale: ${locale}`); process.exit(1); }
const { workforceRoleDetails } = await loadTypeScript("src/data/workforce-role-details.ts");
const fields = ["overview", "responsibilities", "competencyGroups", "qualificationGuidance", "experienceGuidance", "workforceLevels", "equipmentEnvironment", "safetyItems", "hiringConsiderations", "faqs"];
// Technical terms that must appear unchanged in a translation when the English text uses them.
const protectedTerms = ["SMAW", "GTAW/TIG", "GMAW/MIG", "6G", "CNC", "MEP", "PLC", "AutoCAD", "SolidWorks", "BLS", "OSHA", "HSE", "JavaScript", "React", "Windows", "Linux", "Active Directory", "HVAC", "TIG", "MIG"];

const english = {};
const flatten = (path, value) => {
  if (typeof value === "string") english[path] = value;
  else if (Array.isArray(value)) value.forEach((item, index) => flatten(`${path}.${index}`, item));
  else for (const [key, item] of Object.entries(value)) flatten(`${path}.${key}`, item);
};
for (const role of workforceRoleDetails) {
  for (const field of fields) flatten(`${role.slug}.${field}`, role[field]);
  role.sources.forEach((source, index) => flatten(`${role.slug}.sourceLabels.${index}`, source.label));
}

const errors = [], incoming = {};
readFileSync(file, "utf8").split("\n").forEach((line, number) => {
  if (!line.trim()) return;
  const tab = line.indexOf("\t");
  const path = line.slice(0, tab), text = line.slice(tab + 1).trim().replace(/\\n/g, "\n");
  if (tab < 1 || !text) { errors.push(`line ${number + 1}: expected "path<TAB>text"`); return; }
  if (!(path in english)) { errors.push(`line ${number + 1}: unknown path ${path}`); return; }
  if (path in incoming) errors.push(`line ${number + 1}: duplicate path ${path}`);
  incoming[path] = text;
  for (const term of protectedTerms) if (english[path].includes(term) && !text.includes(term)) errors.push(`${path}: technical term "${term}" must stay unchanged`);
  const placeholders = value => (value.match(/\{\w+\}/g) || []).sort().join();
  if (placeholders(english[path]) !== placeholders(text)) errors.push(`${path}: placeholders differ`);
});
const slugs = [...new Set(Object.keys(incoming).map(path => path.split(".")[0]))];
for (const slug of slugs) for (const path of Object.keys(english).filter(item => item.startsWith(slug + "."))) if (!(path in incoming)) errors.push(`${path}: missing`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

// Rebuild nested objects with the same shape as the English guide.
const target = `src/data/workforce-role-translations/${locale}.json`;
mkdirSync("src/data/workforce-role-translations", { recursive: true });
const data = existsSync(target) ? JSON.parse(readFileSync(target, "utf8")) : {};
for (const slug of slugs) {
  const role = workforceRoleDetails.find(item => item.slug === slug);
  const build = (path, value) => typeof value === "string" ? incoming[path] : Array.isArray(value) ? value.map((item, index) => build(`${path}.${index}`, item)) : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, build(`${path}.${key}`, item)]));
  data[slug] = { ...Object.fromEntries(fields.map(field => [field, build(`${slug}.${field}`, role[field])])), sourceLabels: role.sources.map((_, index) => incoming[`${slug}.sourceLabels.${index}`]) };
}
const ordered = Object.fromEntries(workforceRoleDetails.filter(role => data[role.slug]).map(role => [role.slug, data[role.slug]]));
writeFileSync(target, JSON.stringify(ordered, null, 2) + "\n");
console.log(`${locale}: imported ${slugs.join(", ")} (${Object.keys(ordered).length}/${workforceRoleDetails.length} role guides in ${target})`);
