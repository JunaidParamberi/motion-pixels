# Default project images

Use these SVG placeholders until real assets are ready.

**Wire a case study to defaults**

- Set `cardImage`, `heroImage`, and each `media[].src` to paths under `/images/projects/_defaults/` (see `draft-project` in `app/case-studies/case-study-data.ts`).

**Add a real project**

1. Copy `../draft-slot/` to `../your-slug/` (or create `public/images/projects/your-slug/`).
2. Drop `card.*`, `hero.*`, and gallery files there.
3. In `case-study-data.ts`, duplicate a full `CaseStudyDetail` object and point `slug`, strings, and image paths to your folder.
4. Remove the slug from `disabledCaseStudySlugs` when you want it on the Case Studies page.
