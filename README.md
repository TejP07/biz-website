# [COMPANY NAME]: Website

Marketing website for a contract architectural and engineering design documentation company:
drafting, construction documentation, structural and MEP coordination, and permit support,
with licensed architects and engineers coordinated where a project requires them.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**. Every page is
statically prerendered except the inquiry API route.

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
| `npm run build` | Production build                     |
| `npm start`     | Serve the production build           |
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
| `/contact`                | **Start Your Project**: detailed inquiry form                        |
| `/faq`                    | All FAQs grouped by topic (FAQPage structured data)                  |
| `/pricing`                | How quotes work (no published prices)                                |
| `/service-areas`, `/service-areas/[slug]` | Local SEO pages generated from `service-areas.ts`    |
| `/privacy`                | Placeholder privacy policy (replace before launch)                   |
| `/api/inquiry`            | Receives form submissions (POST only)                                |

Also generated: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`,
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
| Form options and upload limits                      | `src/content/inquiry.ts`          |
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

## Connecting the inquiry form

The form (`src/components/forms/ProjectInquiryForm.tsx`) validates on the client, then posts
`multipart/form-data` to `/api/inquiry` (`src/app/api/inquiry/route.ts`), which validates again
with the same rules (`src/lib/inquiry/schema.ts`) and hands the inquiry to the configured delivery
providers (`src/lib/inquiry/deliver.ts`).

**Until a provider is configured, nothing is sent.** The API returns `503 NOT_CONFIGURED` and the
visitor sees a clear "Preview mode: this inquiry was not sent" message with your email and phone
number. Configure a provider before launch.

Set environment variables (see `.env.example`):

**Option A: Webhook** (Zapier, Make, n8n, a CRM integration, or your own endpoint)
```
INQUIRY_WEBHOOK_URL=https://hooks.example.com/…
INQUIRY_WEBHOOK_SECRET=long-random-string        # optional, sent as a Bearer token
INQUIRY_WEBHOOK_INCLUDE_FILES=true               # optional, base64 file contents in the JSON
```
The payload contains all fields, a reference number (`INQ-YYYYMMDD-XXXX`), a timestamp, and file
metadata.

**Option B: Email via [Resend](https://resend.com)** (files are attached)
```
RESEND_API_KEY=re_…
INQUIRY_EMAIL_TO=projects@yourcompany.com
INQUIRY_EMAIL_FROM="Website <website@yourcompany.com>"   # verified domain
```

Both can run at once; the submission succeeds if at least one delivery succeeds. To add another
destination (a database, a CRM SDK, S3 for uploads), add a provider object to `providers` in
`deliver.ts`.

**File uploads.** Defaults: 10 files, 10 MB each, 25 MB total (`src/content/inquiry.ts`).
Serverless platforms often cap request size (Vercel: 4.5 MB per request). If you host there and
expect large drawing sets, either lower the limits, ask clients to share a download link in the
notes, or switch to direct-to-storage uploads (e.g. Vercel Blob or S3 pre-signed URLs). The form
already handles `413 Payload Too Large` with a helpful message.

**Spam protection.** A hidden honeypot field and a minimum fill time. Bots get a normal-looking
response and nothing is delivered. For heavier traffic, add rate limiting or a CAPTCHA
(e.g. Cloudflare Turnstile) in the route handler.

---

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags (`src/lib/seo.ts`).
- Structured data: `ProfessionalService` (site-wide), `Service`, `FAQPage`, `BreadcrumbList`.
  Placeholder values are omitted from structured data automatically.
- `sitemap.xml` includes every page, project and service area.
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
- [ ] Configure an inquiry delivery provider and send a test inquiry
- [ ] Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING=true`
- [ ] Add analytics if needed (and mention it in the privacy policy)
- [ ] Submit `sitemap.xml` to Google Search Console

---

## Project structure

```
src/
  app/                   Routes (App Router), metadata files, API route
  components/
    layout/              SiteHeader (mobile menu), SiteFooter, RevealObserver
    sections/            Hero, page hero, services, process, FAQ, CTA, trust sections…
    projects/            ProjectCard, ProjectGrid (filter), ImageGallery (lightbox)
    forms/               ProjectInquiryForm and field primitives
    ui/                  Button, Logo, icons, SectionHeader, Breadcrumbs, ArchImage…
  content/               All editable content and configuration
  lib/
    seo.ts               Metadata and structured-data helpers
    inquiry/             Shared validation (schema.ts) and delivery providers (deliver.ts)
public/images/           Hero illustration and placeholder drawings
```

## Accessibility and performance notes

- Semantic landmarks, one `h1` per page, skip link, visible focus styles, labelled form fields
  with inline errors and an error summary, keyboard-operable menu (focus trap, Escape to close),
  FAQ built on native `<details>`, lightbox built on native `<dialog>`.
- Animations are subtle, CSS-only, and disabled for visitors who prefer reduced motion.
- Minimal client JavaScript: only the header, form, project filter, gallery and a small
  scroll-reveal observer are client components. No UI or animation libraries.
