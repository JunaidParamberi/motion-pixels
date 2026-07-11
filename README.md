# Motion Pixels Website

Production website for Motion Pixels, built with Next.js App Router.

This repo includes:
- Marketing pages (`Home`, `About`, `Services`, `Case Studies`, `Contact`)
- Dynamic case study detail pages (`/case-studies/[slug]`)
- Motion-rich UI with Framer Motion
- SEO metadata, sitemap, robots, and structured data
- Vercel Analytics and Speed Insights integration

---

## Tech Stack

- `next@15` (App Router, metadata APIs, route handlers for `robots`/`sitemap`/`manifest`)
- `react@19`, `react-dom@19`
- `typescript`
- `tailwindcss@4`
- `framer-motion`
- `lucide-react` + `react-icons`
- `@studio-freight/lenis` (smooth scrolling)
- `@tsparticles/react` + `tsparticles` (background particles)
- `@vercel/analytics` + `@vercel/speed-insights` (production analytics/perf telemetry)

---

## Project Structure

```text
app/
  layout.tsx                      # Root layout, global metadata, footer, analytics
  page.tsx                        # Home
  about-us/page.tsx               # About page
  contact/page.tsx                # Contact page + Formspree submit
  services/page.tsx               # Services listing
  services/<slug>/page.tsx        # Service detail pages
  case-studies/page.tsx           # Case studies listing
  case-studies/[slug]/page.tsx    # Case study detail route + dynamic metadata
  case-studies/[slug]/CaseStudyDetailContent.tsx
  components/                     # Shared UI and interaction components
  contexts/SiteDataContext.tsx    # Central data provider hook
  data/                           # Centralized content/data models
  robots.ts                       # robots.txt generation
  sitemap.ts                      # sitemap.xml generation
  manifest.ts                     # web app manifest
```

---

## Routes

- `/` Home
- `/about-us`
- `/services`
- `/services/experience`
- `/services/artificial-intelligence`
- `/services/architectural`
- `/case-studies`
- `/case-studies/[slug]`
- `/contact`

Machine-readable routes:
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`

---

## Components Reference

Core shared components in `app/components`:

- `Navbar.tsx`
  - Desktop + mobile navigation
  - Mobile fullscreen menu with scroll lock
  - Sets navbar height CSS variable (`--navbar-height`)
- `Hero.tsx`
  - Home hero with full-screen background image + intro animation
- `ServiceCard.tsx`
  - Animated service card used on services listing page
- `MouseFollower.tsx`
  - Custom cursor for fine-pointer devices only
- `SmoothScroll.tsx`
  - Lenis smooth scroll, auto-disabled on touch/reduced-motion devices
- `ParticlesBackground.tsx`
  - Particle background effect, constrained to suitable devices
- `RouteChangeLoader.tsx`
  - Initial/route reveal behavior
- `PageTransition.tsx`
  - Route-level animation wrapper
- `Breadcrumbs.tsx`
  - Breadcrumb-style nav element
- `NotFoundView.tsx`
  - Shared not-found presentation

Legacy/optional:
- `HamburgerModal.tsx` (not primary mobile nav path)

---

## Data Layer

All content is centralized in `app/data`:

- `site-data.ts`
  - Aggregates and re-exports data slices
  - Defines `siteData` object used in context provider
- `services-data.ts`
  - Services listing and service-detail content
- `case-study-data.ts`
  - Case study list/detail content keyed by slug
- `about-data.ts`, `contact-data.ts`, `navigation-data.ts`
- `types.ts`
  - Shared TypeScript types/interfaces

Context:
- `SiteDataContext.tsx`
  - `SiteDataProvider`
  - `useSiteData()` hook for consuming centralized data in client components

---

## APIs and External Integrations

### 1) Contact Form (Formspree)

- Used in: `app/contact/page.tsx`
- Method: `POST`
- Endpoint: `https://formspree.io/f/xanoejon`
- Payload: `FormData` with `name`, `email`, `message`

There are currently no internal Next.js API routes under `app/api`.

### 2) Vercel Analytics + Speed Insights

Integrated globally in `app/layout.tsx`:

- `<Analytics />` from `@vercel/analytics/react`
- `<SpeedInsights />` from `@vercel/speed-insights/next`

These activate automatically in deployed environments and provide:
- traffic/session analytics
- web performance telemetry (Core Web Vitals and related metrics)

---

## SEO and Discoverability

Implemented SEO features:

- Root metadata in `app/layout.tsx`:
  - title template, description, keywords
  - Open Graph and Twitter metadata
  - robots directives
  - canonical support via `metadataBase`
- Route metadata layouts:
  - `app/services/layout.tsx`
  - `app/about-us/layout.tsx`
  - `app/contact/layout.tsx`
  - `app/case-studies/layout.tsx`
- Dynamic case-study metadata:
  - `app/case-studies/[slug]/page.tsx` via `generateMetadata`
- Structured data (JSON-LD Organization) in root layout
- Crawl/index files:
  - `app/robots.ts`
  - `app/sitemap.ts`
  - `app/manifest.ts`

---

## Performance Notes

Optimizations already applied:

- Motion-heavy features are conditionally disabled/reduced on less capable devices.
- Custom cursor only mounts for fine-pointer devices.
- Particle background limited and capped for performance.
- Responsive `next/image` sizing added on key visuals.
- Background service video uses `preload="none"`.
- Next image output configured for `AVIF`/`WebP`.

---

## Scripts

```bash
npm run dev      # Development (Turbopack)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Lint
```

---

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

- [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

Recommended deployment target is Vercel.

- Push repo to GitHub/GitLab/Bitbucket
- Import project in Vercel
- Build command: `npm run build`
- Output: Next.js default

After deployment, confirm:
- Analytics tab receives events
- Speed Insights tab receives performance samples
- `robots.txt` and `sitemap.xml` are reachable

