# Multilingual website

The website remains a static Next.js export. Language changes happen in the browser, using local dictionaries. No server, database, translation API, API key or translation subscription is required.

## Languages and destinations

English is the initial language. The selector also includes Hindi for the Indian audience, and the following languages associated with the About page's destination guides:

| Language | Relevant destinations |
| --- | --- |
| Arabic | UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain |
| Hebrew | Israel |
| Russian | Russia |
| Portuguese | Portugal |
| Czech | Czech Republic |
| German | Germany |
| Japanese | Japan |
| Polish | Poland |
| Romanian | Romania |
| English | United Kingdom, international enquiries |

Shared languages appear once. Visitors choose freely; the site does not infer a visitor's nationality or location. Native language names identify the options, without national flags.

## Runtime behavior

- The existing locale provider translates both inline English/Hindi pairs and the original content data.
- Only the selected non-English dictionary is imported, as a static JavaScript chunk. Successfully loaded dictionaries are cached in memory.
- A selection is applied only after its complete dictionary loads. Failed loads preserve the previous language and offer a retry. Rapid selections cannot apply an older response over the latest choice.
- The preference uses `localStorage` under `globalpath-language`. Access is guarded. If storage is blocked, selection still works and survives client-side navigation in memory; persistence across a full refresh cannot be provided when the browser forbids storage.
- English server output and the initial client snapshot match. The saved preference is restored after hydration. English is the fallback for absent or blank translations.
- The document language and direction follow the selection. Arabic and Hebrew use RTL layouts, mirrored carousel controls and a matching recruitment-flow return path.
- Filter values, route slugs, query parameters and external links remain stable. Visible labels and search matching support the selected language.
- Proper names, branding, software names and standard technical abbreviations may remain unchanged. External government websites retain their own language options.

## Content maintenance

Production dictionaries are in [the messages directory](../src/locales/messages/). Keys are the original English strings so a missing key has a meaningful fallback. The manually refined common interface copy is also recorded in [overrides.json](../src/locales/overrides.json).

When adding or changing content:

1. Use `t(english, optionalHindi)` or the existing `local({ en, hi })` helper for visible text, accessible labels and placeholders.
2. Run `npm run i18n:catalog` to regenerate the English inventory and route metadata map.
3. Add the new keys to every language dictionary, preserving any `{named}` placeholders. Update the corresponding editorial override if present.
4. Run `npm run i18n:check`, lint, typecheck and build.
5. Inspect the affected pages in the relevant languages, including long translations and RTL layouts.

The production prebuild checks completeness, nonempty entries, repeated-output patterns, locale configuration, placeholders and fallback behavior. It also generates translated SVG certificate previews from the original blank drafts. All translations retain the draft/unissued status and require real project details and issuer approval before use as certificates.

## Translation provenance and review

The initial additional-language text was generated locally using OPUS-MT and M2M100 models, followed by interface corrections and coverage checks. Existing edited Hindi translations were retained. Model downloads, generation tools and rejected intermediate drafts are confined to the ignored local review directory; they are not production dependencies or deployed assets.

Model projects: [Helsinki-NLP OPUS-MT](https://huggingface.co/Helsinki-NLP), [Xenova ONNX conversions](https://huggingface.co/Xenova), and [Meta M2M100](https://huggingface.co/facebook/m2m100_418M). Individual OPUS model licenses vary between Apache 2.0 and CC BY 4.0; M2M100 is MIT licensed. No NLLB model or noncommercial-only translation service is used.

Automated coverage is not a substitute for native-language editorial review. Before a public launch, a qualified reviewer should check recruitment terminology and consequential guidance in each language against the English source.

## SEO and deployment

Existing routes, English static metadata, canonical URLs and the sitemap are preserved. The browser title, description and Open Graph text follow the selected language. There are no separate locale URLs, so this preference-based implementation does not claim independently indexed language pages or add misleading `hreflang` alternates.

Use the existing `npm run build` command and deploy the generated `out` directory through the current static-export hosting configuration. No secrets or runtime services are introduced. Language dictionaries and certificate previews are ordinary same-origin static assets.

## Validation completed

- All ten additional dictionaries cover the 1,674-message English inventory, with valid interpolation placeholders and English fallback checks.
- Production browser checks covered all 63 page routes in all 11 languages: 1,518 layouts, including 360, 390, 768, 1024, 1440 and 1920px on the main pages. No horizontal overflow, broken images, catalog fallback leaks or JavaScript errors were detected.
- All 21 language interaction checks passed, including keyboard selection, refresh persistence, rapid selection, mobile navigation, translated filtering, RTL carousel controls, blocked storage, failed dictionary loading and retry, cross-tab preference updates, and reduced motion.
- A production-only title issue found during testing was fixed: localized metadata now stays synchronized when Next.js restores static head tags after hydration or navigation.
- The existing site checks passed for 71 image sources and 91 internal links, as well as recruitment-flow connections, service tabs, FAQs, contact fallbacks and mobile navigation.
- The final copy adjustments passed another 120 responsive layout checks across Arabic, Hebrew, Japanese and Polish. Production build, TypeScript and lint checks passed.

These checks validate functionality and translation coverage. They do not replace the native-language editorial review described above. English remains the statically indexed language; a saved browser preference does not create separately indexed localized URLs.
