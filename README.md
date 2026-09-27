# [COMPANY NAME]: Website

Marketing website for a contract architectural and engineering design documentation company:
drafting, construction documentation, structural and MEP coordination, and permit support,
with licensed architects and engineers coordinated where a project requires them.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**, exported as a
fully static site and deployed to **GitHub Pages** (`https://tejp07.github.io/biz-website/`).

---

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional for local development
npm run dev                  # http://localhost:3000
```

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Development server with hot reload   |
| `npm run build` | Static export to `out/`              |
| `npm start`     | Preview `out/` locally (after build) |
| `npm run lint`  | ESLint (Next.js + TypeScript rules)  |

---

## Pages

| Route                     | Purpose                                                              |
| ------------------------- | -------------------------------------------------------------------- |
| `/`                       | Home: hero, what we do, services, clients, process, project types, sample projects, trust, FAQ, CTA |
| `/services`               | Six service categories in detail, pricing factors                    |
| `/projects`               | Filterable portfolio (`?category=structural` etc. can be linked)      |
| `/projects/[slug]`        | Project detail with drawing gallery and lightbox                     |
| `/process`                | Five-step process, responsibilities matrix, start checklist          |
| `/about`                  | Company story, principles, team, credentials, service areas          |
| `/contact`                | **Start Your Project**: pre-filled email template (mailto) + contact details |
| `/faq`                    | All FAQs grouped by topic (FAQPage structured data)                  |
| `/pricing`                | How quotes work (no published prices)                                |
| `/service-areas`, `/service-areas/[slug]` | Local SEO pages generated from `service-areas.ts`    |
| `/privacy`                | Placeholder privacy policy (replace before launch)                   |

Also generated: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/og.png` (social image),
favicon (`src/app/icon.svg`) and Apple touch icon.

---

## Editing content

All company-specific content lives in **`src/content/`**. You rarely need to touch a component.

| To change…                                          | Edit                              |
| --------------------------------------------------- | --------------------------------- |
| Company name, email, phone, address, hours, response time, service-area summary, social links, logo, credentials | `src/content/site.ts` |
| Professional-services notice (footer, services)     | `professionalNotice` in `site.ts` |
| Services and their deliverables                     | `src/content/services.ts`         |
| Client groups ("Who we serve")                      | `src/content/audiences.ts`        |
| Project types (home page grid + form dropdown)      | `src/content/project-types.ts`    |
| Portfolio projects and images                       | `src/content/projects.ts`         |
| Process steps, responsibilities, start checklist    | `src/content/process.ts`          |
| Why-us pillars, statistics, testimonials, pricing factors | `src/content/trust.ts`      |
| FAQs                                                | `src/content/faqs.ts`             |
| Team members and photos                             | `src/content/team.ts`             |
| Service areas (each creates a page)                 | `src/content/service-areas.ts`    |
| Contact email subject and template                  | `src/content/contact.ts`          |
| Header / footer links                               | `src/content/navigation.ts`       |
| Colors and type scale                               | `src/app/globals.css` (`@theme`)  |

Sections hide automatically when their data is empty. For example, set `testimonials` or `stats`
to `[]` in `trust.ts` to remove those blocks.

### Placeholders to replace

Anything in `[SQUARE BRACKETS]` is a placeholder. While an email or phone number is still a
placeholder it renders as plain text, never as a broken `mailto:`/`tel:` link.

- **`site.ts`**: `[COMPANY NAME]`, `[COMPANY LEGAL NAME]`, `[EMAIL ADDRESS]`, `[PHONE NUMBER]` (+ `phoneE164`),
  `[BUSINESS ADDRESS]`, `[CITY]`, `[STATE]`, `[ZIP CODE]`, `[COUNTRY]`, `[BUSINESS HOURS]`, `[RESPONSE TIME]`,
  `[SERVICE AREA]`, `[PRIMARY SERVICE AREA]`, `[STATE / REGION]`, credentials/licenses/affiliations/insurance,
  `[CAD / BIM PLATFORMS]`
- **`service-areas.ts`**: area names, slugs, localities, jurisdictions, descriptions
- **`team.ts`**: names, titles, bios, credentials, photos
- **`trust.ts`**: `[Project Statistic]` and `[Client Testimonial]` entries (use only real, verifiable information)
- **`projects.ts`**: sample projects (see below), `[CITY, STATE]`, `[SQ FT]`
- **About page** (`src/app/about/page.tsx`): the `[Company story…]` paragraph and `[Studio / team photo]`
- **Privacy policy** (`src/app/privacy/page.tsx`): full text

Do not add licenses, certifications, awards, years in business, client logos, statistics, or
testimonials that aren't true and verifiable.

### Logo

A text logo is rendered from `site.name`. To use a logo file, put it in `public/brand/` and set
`site.logo.src` (and `srcOnDark` for a light version used on dark backgrounds). Update
`src/app/icon.svg` and `src/app/apple-icon.png` for the favicon.

---

## Images

No stock photography is used. Every image is an **original placeholder drawing** generated for
this project (floor plans, framing plans, ceiling/MEP plans, sections, elevations, axonometrics,
cover sheets) in `public/images/placeholders/`. Each sheet's title block is marked
"PLACEHOLDER IMAGE · ILLUSTRATIVE ONLY · NOT A COMPLETED CLIENT PROJECT", and the site labels
them as placeholders. The hero illustration is `public/images/hero-drawing.svg`.

To use real photography or drawings:

1. Add files to `public/images/…` (JPG/WebP, about 2000px wide for covers).
2. Point the `cover` / `gallery` entries in `projects.ts` (or `image` in `services.ts`) at them.
   `next/image` automatically serves optimized, responsive versions of JPG/PNG/WebP files.
3. For a real completed project, set `isSample: false`, which removes the "Sample scope" labels.
4. For remote images (e.g. a CMS or CDN), add the host to `images.remotePatterns` in `next.config.ts`.

Fonts: Inter, Archivo and IBM Plex Mono via `next/font` (self-hosted at build time). The Open Graph
image uses Archivo TTF files bundled in `src/assets/fonts` (SIL Open Font License).

---

## Deploying to GitHub Pages

The site is a static export (`output: "export"` in `next.config.ts`), built and published by
`.github/workflows/deploy-pages.yml` on every push to `main`.

**One-time setup (repository settings):**
1. **Settings → Branches:** make `main` the default branch. The `github-pages` environment only
   accepts deployments from the default branch.
2. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The site is published at
   `https://<owner>.github.io/<repo>/`.

**How the sub-folder works.** On `https://tejp07.github.io/biz-website/` everything lives under
`/biz-website`. The workflow sets `NEXT_PUBLIC_BASE_PATH=/biz-website`; `next/link` adds it to links
automatically and `withBasePath()` (`src/lib/paths.ts`) adds it to image and icon paths. Use
`withBasePath()` for any new raw asset path.

**Custom domain later:** add the domain under Settings → Pages, set `NEXT_PUBLIC_BASE_PATH` to `""`
and `NEXT_PUBLIC_SITE_URL` to `https://www.yourdomain.com` in the workflow, and follow GitHub's DNS
instructions.

**Preview the Pages build locally:**
```bash
NEXT_PUBLIC_BASE_PATH=/biz-website npm run build
mkdir -p /tmp/site && cp -r out /tmp/site/biz-website && npx serve /tmp/site   # open /biz-website/
```

**Limits of static hosting.** There is no server, so no API routes, server-side form handling,
redirects or custom headers, and images are served unoptimized (use sensibly sized JPG/WebP files).

---

## Contact / project inquiries

GitHub Pages can't receive form submissions, so `/contact` uses email. The **"Email your project
details"** button opens the visitor's email app with a pre-filled template covering contact
details, project address and type, services, size, timeline, existing drawings, and notes, and
asks them to attach drawings. The same template is shown on the page for webmail users to copy.

- Edit the subject and template in `src/content/contact.ts`.
- The button stays inactive until `contact.email` in `site.ts` is a real address.
- To bring back a structured web form, either post it to a form service (Formspree, Web3Forms,
  Basin) from the browser, or move to a host with server functions (Vercel, Netlify). A complete
  form with validation, file uploads and webhook/email delivery exists in the git history
  (commit `1246ef7`, `src/components/forms/` and `src/app/api/inquiry/`).

---

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags (`src/lib/seo.ts`).
- Structured data: `ProfessionalService` (site-wide), `Service`, `FAQPage`, `BreadcrumbList`.
  Placeholder values are omitted from structured data automatically.
- `sitemap.xml` includes every page, project and service area.
- Note: search engines only read `robots.txt` at a domain root, so on `github.io/biz-website` the
  per-page `noindex` meta tag is what keeps the site out of search results until launch.
- **Indexing is disabled by default** (`robots.txt` disallows all, pages carry `noindex`), so a
  site with placeholders is never indexed. At launch set `NEXT_PUBLIC_SITE_URL` and
  `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- Local SEO: each entry in `service-areas.ts` generates `/service-areas/<slug>` with its own
  title, description and `areaServed` schema. Use real city/county names and rename the slugs.

---

## Launch checklist

- [ ] Replace all `[PLACEHOLDERS]` (see list above); search the codebase for `[` to confirm
- [ ] Add a logo, favicon, team photos, and real project imagery
- [ ] Replace or remove sample projects, statistics and testimonials
- [ ] Have the professional-services notice and privacy policy reviewed for your jurisdiction
- [ ] Set a real `contact.email` and test the "Email your project details" button
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING: "true"` in `.github/workflows/deploy-pages.yml`
- [ ] Add analytics if needed (and mention it in the privacy policy)
- [ ] Submit `sitemap.xml` to Google Search Console

---

## Project structure

```
src/
  app/                   Routes (App Router), metadata files, og.png route
  components/
    layout/              SiteHeader (mobile menu), SiteFooter, RevealObserver
    sections/            Hero, page hero, services, process, FAQ, CTA, trust sections…
    projects/            ProjectCard, ProjectGrid (filter), ImageGallery (lightbox)
    ui/                  Button, Logo, icons, SectionHeader, Breadcrumbs, ArchImage…
  content/               All editable content and configuration
  lib/
    seo.ts               Metadata and structured-data helpers
    paths.ts             withBasePath() for GitHub Pages sub-folder hosting
public/images/           Hero illustration and placeholder drawings
```

## Accessibility and performance notes

- Semantic landmarks, one `h1` per page, skip link, visible focus styles, keyboard-operable menu
  (focus trap, Escape to close),
  FAQ built on native `<details>`, lightbox built on native `<dialog>`.
- Animations are subtle, CSS-only, and disabled for visitors who prefer reduced motion.
- Minimal client JavaScript: only the header, project filter, gallery and a small
  scroll-reveal observer are client components. No UI or animation libraries.
