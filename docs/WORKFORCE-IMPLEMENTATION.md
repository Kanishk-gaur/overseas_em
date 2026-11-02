# Employer workforce experience

Implemented and verified on 2 November 2026. The site remains a frontend-only Next.js static export. No database, API route, submission provider or new dependency was added.

## Delivered

The searchable workforce directory retains all 18 original roles and their existing categories. Cards now lead to dedicated `/workforce/[slug]/` pages, with role-aware enquiry links to `/request-workforce/?role=<slug>`. Existing title-based enquiry URLs also remain supported.

Every role has original employer guidance: overview, four responsibilities, three competency groups, qualifications and experience preferences, workforce levels, equipment, safety considerations, hiring assessment and staffing guidance, three specific FAQs, related industries and related roles. The individual guides contain approximately 560–640 words before shared recruitment-planning content. Suggested experience bands are explicitly illustrative employer preferences, not legal requirements or universal standards.

The layout includes role photography, a desktop sidebar, section navigation, varied competency and hiring sections, native keyboard-accessible FAQ disclosures and mobile layouts. Existing local photos, responsive image variants, navy/gold/paper colours and fonts are reused.

Homepage primary actions, header hiring action, industry links and the default contact audience now favour employers. Candidate routes remain available. Industry detail pages link directly to their relevant workforce guides.

## Implementation map

- [Directory records and stable slugs](../src/data/workforce-index.ts)
- [Structured English role guidance and occupational references](../src/data/workforce-role-details.ts)
- [Static route generation and metadata](../src/app/workforce/[slug]/page.tsx)
- [Reusable role detail view](../src/components/workforce/role-detail.tsx)
- [Directory view](../src/components/pages/workforce-page.tsx)
- [Enquiry form](../src/components/workforce/employer-enquiry.tsx)
- [Email encoding and brief formatting](../src/lib/workforce-enquiry.ts)
- [Scoped responsive styles](../src/components/workforce/workforce.module.css)
- [Sitemap](../src/app/sitemap.ts)

Full guides are imported by server route modules. Each generated page receives only its own guide and related summaries. Checks found no full guide overview in shared browser JavaScript chunks and no other role's complete overview in an individual role page. All 18 routes have static English HTML, unique titles/descriptions, canonical metadata and sitemap entries. No client-only rendering is required to read a guide.

## Email configuration and honest delivery states

The verified enquiry address remains empty in [site configuration](../src/config/site.ts). No email address was invented. Set `site.contact.email` to a verified single recipient and rebuild when ready.

Until then, the form displays an explicit verification notice, disables the email action and offers a plain-text brief download. Required fields are company, contact person, business email, country and role. Phone, headcount, experience, worksite, timing and additional requirements are optional. An incomplete draft can be downloaded.

With an address configured, a valid form prepares an encoded `mailto:` link. It requests the visitor's email application and explicitly says the message has not been sent. The visitor reviews and sends it themselves. Links above the conservative 1,800-character limit use the download-and-attach fallback. Availability of an email application and actual delivery cannot be verified by this frontend.

Form values are held in React memory, not submitted, written to local storage or included in the URL. Only the non-sensitive role slug appears in the query string. Language changes preserve in-progress form values. Refresh or leaving the form can discard the draft; downloading preserves a copy on the visitor's device. Privacy copy was updated to match this behaviour.

## Language coverage

All 89 new UI messages are provided for English, Hindi, Arabic, Hebrew, Russian, Portuguese, Czech, German, Japanese, Polish and Romanian in [scoped workforce dictionaries](../src/locales/workforce/). The locale loader merges the selected dictionary into the existing translation system. The original catalog completeness and placeholder checks remain enforced; scoped key completeness is also checked.

Detailed role prose and role-specific FAQ questions/answers currently remain English. Non-English visitors see a translated disclosure, and untranslated content carries `lang="en" dir="ltr"`. Section headings, role titles, controls, forms, shared planning stages and metadata follow the selected language. The language menu also discloses this limitation.

Add complete, reviewed translations by stable role slug and locale in the [role translation registry](../src/data/workforce-role-translations.ts). The route passes only that role's translations. The registry is intentionally empty until reviewed translations exist. English remains the statically indexed language; browser preferences do not create locale URLs. Translation completeness checks validate coverage, not native-language editorial quality.

## Content references

Role pages link directly to the relevant occupational references. The [US Bureau of Labor Statistics Occupational Outlook Handbook](https://www.bls.gov/ooh/) informed the general occupational scope, with [OSHA hazardous-energy guidance](https://www.osha.gov/control-hazardous-energy), [welding guidance](https://www.osha.gov/welding-cutting-brazing) and [HSE display-screen guidance](https://www.hse.gov.uk/msd/dse/) supporting relevant safety context. These sources are not presented as destination-specific legal advice or proof of company authorisation.

Hiring questions, practical-assessment scenarios, staffing considerations and illustrative experience preferences are editorial guidance tailored to the existing role catalog. No salaries, available candidates, client partnerships, placement statistics or deployment guarantees were added. The shared recruitment stages explicitly limit coordination to the agreed company service scope and reserve selection and permission decisions to employers and authorities.

## Verification

Passed on the final implementation:

- `npm run lint`
- `npm run typecheck`
- `npm run build`: successful static export, 86 generated pages including all 18 workforce details; translation, certificate and image preparation checks passed.
- `npm run test:workforce`: all 18 guides present and unique; references and related-role/industry slugs valid; email payload encoding and header separation checked; 20 exported workforce/enquiry routes, 1,313 local links and 84 image references checked; sitemap and per-role payload checks passed.
- `node scripts/workforce-browser-qa.mjs`: 214 checks passed with no captured JavaScript errors. Tested all 18 direct URLs, images and enquiry prefills; search, category and industry filtering; keyboard FAQ activation; required/email/headcount validation; actual brief download contents and honest status; invalid and legacy role queries; all 11 languages, RTL and English fallback labelling; form-value retention during language changes; industry cross-links and unknown routes.
- Responsive checks cover 390px on every role and enquiry, plus 360, 768, 1024 and 1440px on the directory, enquiry, industries and homepage. Screenshots were inspected for desktop, mobile and RTL views. No horizontal overflow was detected.

The browser script uses the existing dependency-free Chrome DevTools approach and requires an isolated Chrome session on port 9222 plus the static preview server. `QA_ORIGIN` can override the default `http://localhost:3000`. Local screenshots and the detailed browser results are in the ignored `.review/` directory.

The finished build is available locally through `npm start`. This implementation has not been published to the remote hosting project. External email delivery remains unverified until the owner configures the recipient and tests their chosen mail application.
