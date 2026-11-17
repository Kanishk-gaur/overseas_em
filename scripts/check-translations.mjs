// Translation audit: `npm run check:i18n`
//
// Lists, for every non-English locale:
//   - keys that are missing or empty
//   - keys that no longer exist in English (stale)
//   - values identical to the English text, unless allow-listed
//     (brand names, country names, acronyms and technical terms)
// and checks that the scoped workforce dictionaries and the long-form role
// guides have the same shape as their English source.
//
// Run `npm run i18n:catalog` first when English text has changed; the
// `check:i18n` script does this for you. Exit code 1 means something to fix.
import { existsSync, readFileSync } from "node:fs";
import { loadTypeScript } from "./i18n-shared.mjs";

const read = file => JSON.parse(readFileSync(file, "utf8"));
const { languages } = await loadTypeScript("src/locales/config.ts");
const locales = languages.map(item => item.code).filter(code => code !== "en");
const english = read("src/locales/generated/en.json");
const workforceEnglish = read("src/locales/workforce/en.json");
const allow = read("scripts/i18n-identical-allowlist.json");
const allowed = locale => new Set([...allow.all, ...(allow.locales[locale] || [])]);
const short = text => { const line = text.replace(/\n/g, "\\n"); return line.length > 90 ? line.slice(0, 87) + "…" : line; };
const report = {}, totals = { missing: 0, empty: 0, stale: 0, identical: 0, structure: 0 };
const note = (locale, kind, text) => { ((report[locale] ||= {})[kind] ||= []).push(text); totals[kind]++; };

// 1. Interface and content dictionaries. English keys are the source text.
const workforceKeys = Object.keys(workforceEnglish);
const workforceOnly = new Set(Object.values(workforceEnglish));
const keySets = {};
for (const locale of locales) {
  const messages = read(`src/locales/messages/${locale}.json`);
  const workforce = read(`src/locales/workforce/${locale}.json`);
  const scoped = Object.fromEntries(workforceKeys.map(key => [workforceEnglish[key], workforce[key]]));
  const dictionary = { ...messages, ...scoped };
  const skip = allowed(locale);
  keySets[locale] = new Set(Object.keys(messages));
  for (const key of Object.keys(english)) {
    const value = dictionary[key];
    if (value === undefined) note(locale, "missing", key);
    else if (typeof value !== "string" || !value.trim()) note(locale, "empty", key);
    else if (value === key && !skip.has(key)) note(locale, "identical", key);
  }
  for (const key of Object.keys(messages)) if (!(key in english)) note(locale, "stale", key);
  for (const key of workforceKeys) if (!(key in workforce)) note(locale, "missing", `workforce/${locale}.json → ${key}`);
  for (const key of Object.keys(workforce)) if (!(key in workforceEnglish)) note(locale, "stale", `workforce/${locale}.json → ${key}`);
}
// Every locale file must hold exactly the same keys as the others.
const expected = new Set(Object.keys(english).filter(key => !workforceOnly.has(key) || locales.some(locale => keySets[locale].has(key))));
for (const locale of locales) {
  for (const key of expected) if (!keySets[locale].has(key) && !report[locale]?.missing?.includes(key)) note(locale, "missing", key);
}

// 2. Long-form workforce role guides (src/data/workforce-role-translations/<locale>.json).
const { workforceRoleDetails } = await loadTypeScript("src/data/workforce-role-details.ts");
const roleFields = ["overview", "responsibilities", "competencyGroups", "qualificationGuidance", "experienceGuidance", "workforceLevels", "equipmentEnvironment", "safetyItems", "hiringConsiderations", "faqs"];
function compare(locale, path, source, target, skip) {
  if (typeof source === "string") {
    if (typeof target !== "string" || !target.trim()) note(locale, "structure", `${path}: missing or empty`);
    else if (target === source && !skip.has(source)) note(locale, "identical", `${path}: ${source}`);
  } else if (Array.isArray(source)) {
    if (!Array.isArray(target) || target.length !== source.length) note(locale, "structure", `${path}: expected ${source.length} items, found ${Array.isArray(target) ? target.length : "none"}`);
    else source.forEach((item, index) => compare(locale, `${path}[${index}]`, item, target[index], skip));
  } else {
    if (!target || typeof target !== "object") { note(locale, "structure", `${path}: missing`); return; }
    for (const key of Object.keys(source)) compare(locale, `${path}.${key}`, source[key], target[key], skip);
    for (const key of Object.keys(target)) if (!(key in source)) note(locale, "structure", `${path}.${key}: not in English`);
  }
}
const roleCoverage = {};
for (const locale of locales) {
  const file = `src/data/workforce-role-translations/${locale}.json`;
  if (!existsSync(file)) { note(locale, "structure", `${file}: file missing (role guides fall back to English)`); roleCoverage[locale] = 0; continue; }
  const roles = read(file), skip = allowed(locale);
  roleCoverage[locale] = 0;
  for (const role of workforceRoleDetails) {
    if (!roles[role.slug]) { note(locale, "structure", `${file} → ${role.slug}: role missing`); continue; }
    roleCoverage[locale]++;
    compare(locale, `roles/${locale}/${role.slug}`, { ...Object.fromEntries(roleFields.map(field => [field, role[field]])), sourceLabels: role.sources.map(source => source.label) }, roles[role.slug], skip);
  }
  for (const slug of Object.keys(roles)) if (!workforceRoleDetails.some(role => role.slug === slug)) note(locale, "structure", `${file} → ${slug}: not an English role`);
}

// 3. Report.
const labels = { missing: "Missing", empty: "Empty", stale: "Not in English (stale)", identical: "Identical to English", structure: "Role guide structure" };
console.log(`English catalogue: ${Object.keys(english).length} keys · ${workforceRoleDetails.length} role guides · ${locales.length} locales\n`);
console.log("locale  missing  empty  stale  identical  role guides");
for (const locale of locales) {
  const count = kind => String(report[locale]?.[kind]?.length || 0);
  console.log(`${locale.padEnd(6)}  ${count("missing").padStart(7)}  ${count("empty").padStart(5)}  ${count("stale").padStart(5)}  ${count("identical").padStart(9)}  ${String(roleCoverage[locale]).padStart(2)}/${workforceRoleDetails.length}${report[locale]?.structure ? `  (${report[locale].structure.length} structure issue(s))` : ""}`);
}
const limit = process.argv.includes("--all") ? Infinity : 25;
for (const locale of locales) {
  for (const [kind, items] of Object.entries(report[locale] || {})) {
    console.log(`\n${locale} · ${labels[kind]} (${items.length})`);
    for (const item of items.slice(0, limit)) console.log(`  - ${short(item)}`);
    if (items.length > limit) console.log(`  … ${items.length - limit} more (run with --all to list everything)`);
  }
}
const failures = Object.values(totals).reduce((sum, value) => sum + value, 0);
console.log(failures ? `\n✗ ${failures} issue(s) found.` : `\n✓ All ${locales.length} locales match English: no missing, empty, stale or unreviewed identical values.`);
console.log(`  Allow-listed identical values: ${allow.all.length} for every locale, ${Object.values(allow.locales).reduce((sum, list) => sum + list.length, 0)} locale-specific (scripts/i18n-identical-allowlist.json).`);
process.exit(failures ? 1 : 0);
