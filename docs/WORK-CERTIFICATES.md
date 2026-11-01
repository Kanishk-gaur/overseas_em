# Work certificate designs

The owner described previous work across Indian states and a move into international recruitment. The homepage and About page now reflect that broad history. No individual state, client, assignment, duration or result has been invented.

The [certificate gallery](../src/components/pages/work-certificates-page.tsx) is available locally at `/work-certificates/`. It contains two editable vector documents, in the existing navy, cream and gold palette:

- [Work completion template](../public/certificates/work-completion-draft.svg)
- [Service experience template](../public/certificates/service-experience-draft.svg)

Both documents visibly say **DRAFT — NOT ISSUED** and retain blank project, issuer, location, date and signatory fields. Downloads retain these labels. They are design templates, not evidence of past work. The gallery is marked noindex and excluded from the sitemap while it contains drafts. The English documents have English/Hindi descriptions and controls on the website.

To complete each document, provide the contractor's legal name, client and issuing company, project/work-order reference, scope, city/state, service dates or completion date, and the authorised signatory's details. The named issuer must approve the wording and any signature before its document is presented as issued. A self-issued company experience statement must be identified as such rather than presented as a client certificate.

When approved records replace the drafts, update the labels, preview and download assets together, then update the page's indexing and sitemap treatment. Do not simply remove the draft label from the present placeholder documents.

No new dependencies, backend, Git commit, push or deployment are part of this change.

## Validation

- Production build, ESLint and TypeScript checks passed.
- Homepage, About and certificate gallery checked at 360, 390, 768, 1024, 1440 and 1920px in English and Hindi: 36 layout states, with no horizontal overflow, broken images or production browser console errors.
- Nine focused checks passed for draft labels, indexing, download filenames, accessible preview links, touch targets, desktop/mobile navigation and keyboard focus.
- Both SVG downloads resolve and retain their unissued labels and issuer-approval placeholders. Desktop/mobile gallery screenshots and the full-size certificate design were visually reviewed.
