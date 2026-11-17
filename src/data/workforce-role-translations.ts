import type { Locale } from "@/locales/config";
import { workforceRoleDetails, type WorkforceRoleDetail } from "./workforce-role-details";
import hi from "./workforce-role-translations/hi.json";
import ar from "./workforce-role-translations/ar.json";
import he from "./workforce-role-translations/he.json";
import ru from "./workforce-role-translations/ru.json";
import pt from "./workforce-role-translations/pt.json";
import cs from "./workforce-role-translations/cs.json";
import de from "./workforce-role-translations/de.json";
import ja from "./workforce-role-translations/ja.json";
import pl from "./workforce-role-translations/pl.json";
import ro from "./workforce-role-translations/ro.json";

// Translated long-form role guides, one JSON file per locale in
// src/data/workforce-role-translations/, keyed by role slug.
// Add or update them with scripts/export-role-guides.mjs and
// scripts/import-role-guides.mjs, which check the structure against English.
// The server passes only the requested role's translations to the browser.
// A role without a translation shows the English guide with an explicit
// fallback notice, never a partially translated guide.
export type RoleGuideTranslation = Pick<WorkforceRoleDetail, "overview" | "responsibilities" | "competencyGroups" | "qualificationGuidance" | "experienceGuidance" | "workforceLevels" | "equipmentEnvironment" | "safetyItems" | "hiringConsiderations" | "faqs"> & { sourceLabels: string[] };

const files = { hi, ar, he, ru, pt, cs, de, ja, pl, ro } as unknown as Record<Exclude<Locale, "en">, Record<string, RoleGuideTranslation>>;

export const workforceRoleTranslations: Record<string, Partial<Record<Locale, WorkforceRoleDetail>>> = Object.fromEntries(workforceRoleDetails.map(role => [role.slug, Object.fromEntries(Object.entries(files).flatMap(([locale, roles]) => {
  const translation = roles[role.slug];
  if (!translation) return [];
  const { sourceLabels, ...content } = translation;
  return [[locale, { ...role, ...content, sources: role.sources.map((source, index) => ({ ...source, label: sourceLabels[index] || source.label })) }]];
}))]));
