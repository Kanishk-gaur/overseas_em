export type Localized = { en: string; hi: string };
export const l = (en: string, hi: string): Localized => ({ en, hi });
