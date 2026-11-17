// Exports the translatable text of the long-form workforce role guides as
// "path<TAB>English text" lines, the format used for translators.
// Usage: node scripts/export-role-guides.mjs welder electrician > roles.tsv
import { loadTypeScript } from "./i18n-shared.mjs";
const { workforceRoleDetails } = await loadTypeScript("src/data/workforce-role-details.ts");
const fields = ["overview", "responsibilities", "competencyGroups", "qualificationGuidance", "experienceGuidance", "workforceLevels", "equipmentEnvironment", "safetyItems", "hiringConsiderations", "faqs"];
const wanted = process.argv.slice(2);
const lines = [];
const walk = (path, value) => {
  if (typeof value === "string") lines.push(`${path}\t${value.replace(/\n/g, "\\n")}`);
  else if (Array.isArray(value)) value.forEach((item, index) => walk(`${path}.${index}`, item));
  else for (const [key, item] of Object.entries(value)) walk(`${path}.${key}`, item);
};
for (const role of workforceRoleDetails.filter(item => !wanted.length || wanted.includes(item.slug))) {
  for (const field of fields) walk(`${role.slug}.${field}`, role[field]);
  role.sources.forEach((source, index) => walk(`${role.slug}.sourceLabels.${index}`, source.label));
}
console.log(lines.join("\n"));
