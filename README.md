# GlobalPath Overseas

A corporate recruitment website built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React and Lucide. Public pages are statically exported. The original premium visual identity is retained: navy, muted gold, warm paper surfaces, editorial typography and documentary-style photography. Navigation and shared interface copy support English and Hindi; imported long-form content retains its original English. The site is frontend only: there are no accounts, databases, payments, live job listings or contact-submission endpoints.

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
| `/services` | Ten services, including imported screening, readiness, deployment and account support |
| `/industries` | Twelve industry categories with direct anchors |
| `/countries` | Fifteen named destinations plus other destinations |
| `/employers` | International employer recruitment support |
| `/process` | Eight-step recruitment process and preparation guidance |
| `/contact` | Candidate and employer enquiry options |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/workforce` | Eighteen searchable workforce profiles with industry and qualification filters |
| `/team` | Four original team profiles and portraits |
| `/how-we-work` | Two hiring tracks, seven employer stages and four engagement models |
| `/find-a-job` | Twenty-five recruitment categories and candidate preparation |
| `/request-workforce` | Employer brief guidance; selected workforce roles are retained in the URL |
| `/blog` and `/blog/[slug]` | Nine original articles with search and category filters |
| `/case-studies` | Nine clearly labelled illustrative hiring scenarios |
| `/glossary` | Fourteen searchable visa and recruitment definitions |
| `/compliance` | Verification, written agreements and worker welfare |
| `/disclaimer` | Scope of recruitment content and examples |
| `/countries/[slug]` | Destination detail pages and the original `/countries/uk` alias |
| `/industries/[slug]` | Industry detail pages and original industry aliases |

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
- `src/data/faq.ts`: fourteen bilingual candidate and employer FAQs.
- [Original recruitment data](./src/data/recruitment/): imported public content from the sibling overseas project.
- [Recruitment adapters](./src/data/recruitment.ts): route aliases, image mappings and resource navigation.
- `src/components/pages/`: additional bilingual editorial and legal content.
- `src/app/globals.css`: base layout primitives.
- `src/app/editorial.css`: the refined editorial visual system, typography and independent tablet/mobile compositions.
- [Recruitment styles](./src/app/recruitment.css): additional page layouts using the same existing palette and typography.

The language switch changes navigation, shared content and new-page introductions, updates the document language and remembers the preference in browser local storage. It also works for the current session when browser storage is unavailable. Imported articles, detailed workforce records, team roles and hiring-track copy remain in English and have English language attributes. Language-specific URLs are not introduced; search metadata remains in English.

## Local content migration

The public content was imported from the sibling [overseas project](../overseas/) for local review. The original project was not modified. The existing branding and contact configuration were preserved; only the source office hours were carried over because the source phone, email, address and licence fields contain placeholders.

Country routes include Russia, Portugal, the Czech Republic and Israel. The existing UAE, Germany and Japan homepage features remain in place. Original country and industry detail URLs work alongside the destination site's existing anchors, and the sitemap includes the canonical pages.

Source case studies contain placeholder client names, so they appear as illustrative hiring scenarios. Original testimonial records are retained in [the data archive](./src/data/recruitment/testimonials.json) without presenting them as verified endorsements. Articles retain their original dates.

This pass covers public website content. The source MongoDB database, uploaded applications, API routes, resume uploads, admin dashboard and environment credentials were not migrated. Candidate and employer pages use the destination site's existing contact actions; they do not claim to submit applications.

## Images

Optimized, project-local WebP images live in **`public/images/`**. Replace them with the same filenames or update the `images` object in the site configuration. Asset provenance and the generated hero prompt are recorded in **`docs/ASSETS.md`**.

`next/image` provides sizing, loading behaviour, alt text and hero priority. Because this is a static export, runtime image optimization is disabled; the included files are already resized and compressed to WebP. The current 1448px documentary-style hero is about 134 KB. No external image service is needed when visiting the site.

Photography is illustrative and does not imply endorsement by the people, employers or places shown. Replace illustrative photography with authorised company photography when available.

Original team portraits live in [public/team](./public/team/). Imported article and scenario images live in [public/images/recruitment](./public/images/recruitment/), with their existing WebP versions used by the pages. The four added country images were downloaded from the source project's image URLs, recorded in [the country data](./src/data/recruitment/countries.json). All rendered images are served locally.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The local content migration passed TypeScript and a production build. Browser checks covered all 61 public URLs and 49 image URLs, internal links and anchors, workforce search and combined filters, profile expansion, selected-role links, article filters, glossary filters and desktop/mobile navigation. Sixteen representative pages were checked at 375, 768 and 1440 pixels; eleven added pages were also checked in Hindi at 375 pixels. Reduced motion, keyboard controls, focus indicators, native accordions and dialog focus handling are supported. Sticky mobile actions have reserved footer space.

`scripts/browser-qa.mjs` is the original ten-page integration check. It expects a local Chrome debugging session on port 9222 and the website on port 3000, or a `QA_ORIGIN` environment variable. It saves screenshots and its report under `/tmp/`; it is not shipped in the static site. The added routes and filters were checked separately in the browser during migration.

The initial development dependency audit reports an advisory through the ESLint dependency chain (`braces` → `micromatch` → `fast-glob`). The suggested automatic change downgrades the Next.js ESLint configuration across major versions, so it was not applied. These tools are excluded from the exported site. Consult the current registry audit before changing the dependency tree.

## Hosting

The website can be hosted on any static host using **`out/`** as the document root. `.openai/hosting.json` records the private Sites preview identity and static directory. Keep that project identity when updating this preview. There are no runtime environment variables or credentials required by the website.
