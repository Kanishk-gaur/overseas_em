import type { Locale } from "@/locales/config";
import type { WorkforceRoleDetail } from "./workforce-role-details";

// Add reviewed, complete role translations by stable slug and locale here.
// The server passes only the requested role's translations to the browser.
// An absent entry produces an explicit English fallback notice, never a
// partially translated guide presented as a complete local-language edition.
export const workforceRoleTranslations: Record<string, Partial<Record<Locale, WorkforceRoleDetail>>> = {};
