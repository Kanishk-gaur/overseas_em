# GlobalPath Overseas

A complete, bilingual corporate recruitment website built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React and Lucide. All ten pages are statically exported. The visual identity uses a custom path mark, editorial typography, documentary-style workforce images and varied layouts rather than repeated feature cards. The site is frontend only: there are no accounts, databases, payments, job listings or contact-submission endpoints.

## Run locally

Use Node.js 20.9 or newer (validated with Node 24).

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For the production version:

```bash
npm run build
npm start
```

`npm start` serves the static `out/` directory on localhost:3000. Set `PORT` to choose another port. The production build uses Next.js’s supported webpack option because Turbopack’s build process encountered an environment port restriction. Fonts are downloaded at build time by `next/font/google` and then self-hosted; visitors do not contact Google Fonts. The first build needs internet access.

## Available pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us |
| `/services` | Seven detailed recruitment services |
| `/industries` | Twelve industry categories with direct anchors |
| `/countries` | Twelve potential destination categories |
| `/employers` | International employer recruitment support |
| `/process` | Eight-step recruitment process and preparation guidance |
| `/contact` | Candidate and employer enquiry options |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms and conditions |

An additional 404 page, `sitemap.xml`, `robots.txt`, favicon, canonical metadata, Open Graph metadata and factual Organization structured data are included.

## Update the brand and contact information

Edit **`src/config/site.ts`**. It holds the display name, descriptor, full name, English/Hindi taglines, canonical site URL, contact methods, office details, company identification, social links and image paths.

- `phone`: international phone number with country code.
- `whatsapp`: a real WhatsApp number including country code. Formatting characters are removed when constructing `wa.me` links.
- `email`: verified enquiry email address.
- `address` and `officeHours`: confirmed office and visiting details.
- `mapUrl`: a verified HTTPS map link. The map action appears only when both an address and map URL exist.
- `registration`: add only verified company identification text. It is hidden while empty.
- `social`: real profile URLs only. Empty social links are hidden.
- `url`: change this when using another deployment/domain; rebuild to update canonical URLs, sitemap and structured data.

Contact fields are intentionally empty. Unconfigured actions open an accessible explanatory dialog instead of a fake link or success notification. Once configured, they open WhatsApp with separate candidate/employer messages, the telephone app or email composer. No message is sent by the website. `/contact?type=employer` selects the employer enquiry path directly.

The website is suitable for private review now. **Before offering live recruitment services, verify the legal company identity, actual recruitment activities, authorisations where applicable, contact information, services and destination coverage, fee information and privacy/terms content with the responsible business owner and appropriate adviser.** No approvals, registration numbers, offices abroad, clients, placement statistics or company history have been invented.

## Content and translation

- `src/locales/en.ts` and `src/locales/hi.ts`: reusable navigation, homepage and shared interface copy.
- `src/data/services.ts`: detailed service content in both languages.
- `src/data/industries.ts`: all industry descriptions, roles and anchors.
- `src/data/countries.ts`: all destination descriptions and eligibility caveats.
- `src/data/process.ts`: the recruitment timeline.
- `src/data/faq.ts`: all nine bilingual FAQs.
- `src/components/pages/`: additional bilingual editorial and legal content.
- `src/app/globals.css`: base layout primitives.
- `src/app/editorial.css`: the refined editorial visual system, typography and independent tablet/mobile compositions.

The language switch changes real content, updates the document language and remembers the preference in browser local storage. It also works for the current session when browser storage is unavailable. Language-specific URLs are not introduced; search metadata remains in English.

## Images

Optimized, project-local WebP images live in **`public/images/`**. Replace them with the same filenames or update the `images` object in the site configuration. Asset provenance and the generated hero prompt are recorded in **`docs/ASSETS.md`**.

`next/image` provides sizing, loading behaviour, alt text and hero priority. Because this is a static export, runtime image optimization is disabled; the included files are already resized and compressed to WebP. The current 1448px documentary-style hero is about 134 KB. No external image service is needed when visiting the site.

Photography is illustrative and does not imply endorsement by the people, employers or places shown. Replace illustrative photography with authorised company photography when available.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

Browser QA checked all ten routes, canonical metadata, images, internal links and anchors, English/Hindi switching and persistence, mobile menu navigation, employer deep links, native fallback dialogs and FAQ interactions. All ten routes were checked at 375, 430, 768, 1024, 1440 and 1920 pixels. Hindi layouts were additionally checked at 375 pixels on every route. Reduced motion, keyboard controls, focus indicators, native accordions and dialog focus handling are supported. Sticky mobile actions have reserved footer space.

`scripts/browser-qa.mjs` is a repeatable integration check. It expects a local Chrome debugging session on port 9222 and the website on port 3000, or a `QA_ORIGIN` environment variable. It saves screenshots and its report under `/tmp/`; it is not shipped in the static site.

The initial development dependency audit reports an advisory through the ESLint dependency chain (`braces` → `micromatch` → `fast-glob`). The suggested automatic change downgrades the Next.js ESLint configuration across major versions, so it was not applied. These tools are excluded from the exported site. Consult the current registry audit before changing the dependency tree.

## Hosting

The website can be hosted on any static host using **`out/`** as the document root. `.openai/hosting.json` records the private Sites preview identity and static directory. Keep that project identity when updating this preview. There are no runtime environment variables or credentials required by the website.
