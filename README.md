# 2ndCFO-Web

## Public contact email

The public mailbox is currently disabled. Visitors use the Contact page form.
To restore email, set `contactEmail` in the DOMContentLoaded handler in `index.html` to a verified, working mailbox. This reveals and populates the email entry on the Contact page and all nine footers. Leave it empty to hide those entries. The form's email input collects the visitor's reply address and remains available.

## Service and industry pages

The production website is static HTML, not Next.js. `content/pages.json` holds the six differentiated service/industry pages; `scripts/build.mjs` renders their HTML, structured data, sitemap, and robots.txt. Shared page styling is in `pages.css`. The homepage keeps its existing hash-based overview and contact form, with direct links to the new routes. Legacy industry hashes forward to the matching page.

Run `npm run build` and `npm test` with Node 20 or later. No dependencies are required. Vercel builds and serves `dist/` using `vercel.json`; only public site assets are copied there. Generated route HTML is also tracked for review. Do not edit generated route files directly; update the content or renderer and rebuild.

Published routes:
- `/services/bookkeeping/`
- `/services/financial-intelligence/`
- `/services/fractional-cfo/`
- `/industries/law-firms/`
- `/industries/specialty-contractors/`
- `/industries/hvac-plumbing-electrical/`

New-page CTAs open the existing `/#contact` form. No form submission is required for route verification. No additional city pages, integrations, testimonials, guarantees, or pricing commitments were added.
