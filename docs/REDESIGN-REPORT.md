# GlobalPath Overseas — final local refinement report

Reviewed 25 October 2026. Preview: **http://localhost:3000/**, running from the development server in the target project. All work stays local. No commit, push, publication or deployment was performed. The original overseas project was not modified.

## Final precision pass — existing colors locked

The latest refinement preserves the exact color system. A before/after source comparison confirms that all 403 existing color literals, 26 color-token declarations and 16 gradient declarations are unchanged. No imagery, dependency, route or backend was added in this pass.

- Removed an unintended top margin above the hero eyebrow and refined phone image proportions. At 390px, the hero photograph now starts about 42px earlier while retaining the headline, copy and both enquiry paths.
- Removed duplicate spacing before directory filters: the measured mobile gap drops from 95px to the standard 65px section spacing.
- Aligned service-card actions, standardized selected card/control radii with the existing tokens, and improved navigation, hero-description and flow text sizing.
- Replaced long fixed mobile contact labels with “WhatsApp” and “Call us”, retaining complete accessible names and the existing enquiry behavior.
- Fixed the mobile recruitment-track “OR” label overlapping the second track. It now participates in the layout and stays centered between tracks in both languages. Flow cards remain stationary during section reveals so connectors stay anchored; the original steps, split/merge and return branch are unchanged.
- Made desktop dropdowns mutually exclusive, added outside-click dismissal, and restored focus to the opening label when Escape is pressed from a dropdown link. Mobile current-page styling now handles trailing slashes correctly.
- Replaced the workforce disclosure's duplicated arrow/plus treatment with a single consistent expanding icon. Reduced-motion preferences still disable decorative transitions.
- Replaced the vague arrival-service label with “Coordinate the arrival” and practical supporting wording.

The production build, lint and TypeScript checks pass. Focused browser checks cover the changed controls, both motion settings, and all four service panels across eight widths in both languages. The full route and responsive validation is recorded below.

## Design refinement

The existing navy, warm-paper, muted-gold and teal identity is preserved. This pass refines the current design rather than replacing it.

- Balanced text-only page heroes with a clear title/description hierarchy and less unused space.
- Tightened repeated headlines and made the worker, employer and resource entry points clearer.
- Aligned article and workforce card actions, normalized control radii, prevented icon compression and improved small-screen text sizes.
- Refined hover, active and keyboard-focus states; reduced entrance motion and respected reduced-motion preferences.
- Improved mobile menu target size, focus handling and scroll locking. The skip link now moves keyboard focus into the main content.
- Compacted the footer navigation, improved link legibility and legal separation, and kept the large brand wordmark proportional on phones.
- Retained the homepage and employer compositions, useful photography, asymmetric image corners and restrained background accents.

## Useful content added and corrected

The site now includes 63 public routes, 14 industry guides, 16 destination guides, 18 workforce profiles, all 25 original work-category names, nine articles, nine illustrative hiring-planning briefs, 14 glossary entries and four original team profiles. Alias URLs remain available.

The worker preparation guide adds a six-item document checklist, CV/interview/contract/travel preparation, safe-recruitment guidance and 20 searchable FAQs across four topics. Checklist selections are temporary browser state, not an application or eligibility result. New guidance and navigation support English and Hindi; some imported detailed profiles, articles and glossary text remain in English.

The employer page includes two hiring tracks, six support areas, four keyboard-operable hiring arrangements, a seven-stage responsibility guide, sector links, a six-part workforce brief and six FAQs. Enquiry links preserve the employer context and selected role where applicable.

Industry and destination directories now have useful preparation information, search, combined filters and clear empty states. Food processing and retail have their own content and appropriate imagery.

Unsupported claims about ready-to-deploy workers, automatic visa outcomes, fixed replacement promises, client results and guaranteed availability were removed or qualified. Hiring scenarios are explicitly illustrative planning briefs. Articles retain their original publication dates and show the review date and relevant official sources.

## Recruitment flow

The original twelve-stage sequence is preserved in [recruitment-flow.tsx](../src/components/shared/recruitment-flow.tsx), used on the homepage, About and How We Work.

Stages 02 and 03 retain the technical/non-technical branches, producing fourteen cards. The desktop diagram retains fifteen forward connectors, the split/merge and the dashed interview return branch. Phones use a clear vertical reading order with explicit alternative tracks. Added reading guidance and expandable checks explain key responsibilities. Visa and permit decisions remain with the relevant authorities.

## Images and performance

The initial audit covered 266 raster assets and five starter SVGs. Reviewed original photography and four team portraits were reused. Five missing category scenes were generated: driver, security, agriculture, food processing and retail. Generated scenes are illustrative, not evidence of real clients, employees or placements.

See [asset notes](./ASSETS.md), [reused-image manifest](./reused-image-manifest.json), [generated-image notes](./GENERATED-IMAGES.md) and [generated-image manifest](./generated-image-manifest.json).

The responsive pipeline covers 71 image sources. It creates local WebP derivatives and supplies responsive image choices in the static export. Browsers no longer need the largest source for a small card or phone screen. Measured 640px-file reductions against source files:

| Image | Source bytes | 640px WebP bytes | Reduction |
| --- | ---: | ---: | ---: |
| Homepage workshop | 137,428 | 44,116 | 68% |
| Russia | 563,064 | 135,844 | 76% |
| Portugal | 276,824 | 67,682 | 76% |
| Czech Republic | 232,633 | 52,446 | 77% |

Add future images to [image-sources.json](../src/data/image-sources.json). Both development and production builds run the image preparation step automatically. No new package or backend was added.

## Source review

[official-sources.ts](../src/data/official-sources.ts) is the central registry used by destination guides, worker guidance and article source panels. Sources include MEA/eMigrate, Passport Seva and the relevant government immigration or employment authorities.

The content avoids blanket language-level requirements, claims of unrestricted EU work rights or promises that qualifications alone establish eligibility. UK care-worker guidance reflects the official restriction on new overseas applications rather than advertising the old route. Country pages direct readers to the relevant official authority for current requirements. These guides are introductory information, not an assessment of an individual's eligibility.

## Validation

- Production build, ESLint and TypeScript checks pass.
- All 63 public routes render successfully.
- All 291 rendered responsive image variants and 88 distinct internal links/anchors resolve.
- Every rendered page is checked at 360, 390, 768, 1024, 1440 and 1920px in English and Hindi: 756 layout states.
- Checks cover horizontal overflow, clipped headings/buttons, image decoding and browser console errors.
- Actual desktop/mobile screenshots were reviewed, including heroes, cards, the employer page, recruitment flow and footer.
- Interaction checks cover search/filter combinations, checklist and FAQ controls, hiring tabs, selected-role enquiries, contact fallback, mobile navigation, Escape/focus restoration, skip navigation and reduced motion.

The final 360px check exposed a footer wordmark that was too wide after a typography refinement. Its phone-specific sizing was restored rather than hiding page overflow.

These are local Chromium, static-export, keyboard and layout checks. No claim is made of a full assistive-technology audit, Safari/Firefox device testing, Lighthouse score or production Core Web Vitals.

## Inputs still needed before launch

- Verified phone, WhatsApp, email, office address, office hours, social links and recruitment registration details in [site.ts](../src/config/site.ts).
- Confirmation of the final domain; metadata currently uses the existing configured preview domain.
- Owner confirmation of legal/company details, team identities and portrait permissions, current vacancies, service scope, charges and contractual replacement terms.
- Review of the informational privacy/terms wording against the actual operating business and any future data collection.

Contact fields remain empty rather than using invented details. Contact buttons show a clear configuration fallback; the frontend does not send or store enquiries. A production enquiry service would be a separate implementation once the destination and requirements are provided.
