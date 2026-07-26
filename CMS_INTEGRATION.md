# CMS Integration

This site is now wired to a Strapi CMS (see the companion `png-coffee-cms`
project) for its editable content. This file documents what changed and
how to work with it — see that project's `SETUP.md` for CMS-side setup,
creating your first admin account, and hosting recommendations.

## Setup

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_STRAPI_URL` to your running Strapi instance (defaults to
`http://localhost:1337` for local dev). Then run the site as usual —
`npm install && npm run dev`.

## What's wired up

| Page | Data source |
|---|---|
| `/` (Home) | Homepage single type: hero, banner, feature cards |
| `/about` | About Us single type: story, explore links, mission, value cards |
| `/about/[slug]` | Value card detail pages (Value Added, The Roastery, Barista Training, Coffee Equipment Service). See note below — Strapi doesn't have long-form content for these yet. |
| `/png` | PNG Coffee Page single type: hero, 6 tourism cards |
| `/products` | Our Coffee Page + Category collection: hero, category grid, value-added section |
| `/products/[slug]` | Category + Product collections, filtered by category slug |

Blog, Testimonials, and FAQ content types exist and are queryable
(`src/lib/cms/adapters.ts` → `getBlogPosts`, `getTestimonials`,
`getFaqs`) but aren't rendered on any page yet — there wasn't an existing
page for them. Ask if you'd like pages built for these.

### `/about/[slug]` value card detail pages

Of the 4 value cards on `/about`, 3 now have bespoke dedicated pages that
don't go through this generic template at all — they were rebuilt to match
specific reference designs:

- **`/about/roastery`** — `src/app/about/roastery/page.tsx`. Hero (title +
  intro on a red gradient, large photo), a "Coffee Showroom" section
  (heading, paragraph, bullet list of equipment), and a 5-tile equipment
  gallery. Content lives in `roasteryPage` in `src/data/content.ts`. **The
  5 gallery tiles are placeholders pending real equipment photos** — see
  `EquipmentGallery.tsx`.
- **`/about/barista-training`** — `src/app/about/barista-training/page.tsx`.
  Simple centered hero + full-width photo. Content in `baristaTrainingPage`.
- **`/about/equipment-service`** — same simple layout, content in
  `equipmentServicePage`.
- **Value Added** doesn't have a detail page — its card links straight to
  `/products` via an explicit `href` override on its `ValueCard` entry
  (see "href override" below).

The generic `/about/[slug]` catch-all (`ValueDetailHero` +
`ValueDetailBody`, driven by `getValueCardDetail()`) still exists and is
excluded from generating these 3 known slugs (see
`DEDICATED_ROUTE_SLUGS` in `src/app/about/[slug]/page.tsx`) — it now only
serves as a fallback for any future value card added in Strapi that
doesn't have a bespoke design of its own yet, plus `/about/value-added`
stays reachable as a harmless orphan for old links even though nothing
links to it any more.

**`href` override**: `ValueCard` now has an optional `href` field. When
set (as on the Value Added card, pointing to `/products`), the card on
`/about` links there instead of its computed `/about/${slug}` default.
This isn't in the Strapi schema — a CMS-authored card with no `href`
override always falls back to its own `/about/${slug}` detail page.

- **Slug source**: Strapi's `value-card` component doesn't have a `slug`
  field, so `getValueCards()` derives one from the title via
  `slugify()` (`src/lib/slugify.ts`) — "The Roastery" → `roastery`-style
  kebab-case. This means **renaming a value card's title in Strapi
  changes its URL**. If that's not desired, add a real `slug` field to
  the CMS component and update `getValueCards()` to prefer it.
- **Long-form content**: for any value card that *does* go through the
  generic catch-all, the paragraphs and highlight facts always come from
  `valueCardDetails` in `src/data/content.ts` (keyed by slug) — Strapi
  only supplies the summary fields (title/description/image) used on the
  `/about` grid itself.

## How it works

- **`src/lib/cms/client.ts`** — the fetch wrapper. All requests go
  through here so caching (`revalidate: 60` by default) and error
  handling live in one place.
- **`src/lib/cms/types.ts`** — TypeScript types matching Strapi's actual
  API response shape.
- **`src/lib/cms/adapters.ts`** — one function per piece of content
  (`getHero()`, `getValueCards()`, etc). Each fetches from Strapi and
  reshapes the result into exactly the prop shape the existing
  components expect.
- **Fallback behavior**: every adapter function falls back to this
  project's original static content (`src/data/content.ts`) if the
  Strapi request fails for any reason. The site cannot go blank because
  the CMS is down, mid-deploy, or an entry hasn't been published yet —
  it just quietly shows the last-known-good static copy and logs a
  warning server-side (`[cms] getHero: falling back to static content —
  ...`). If you'd rather a page fail loudly instead, remove the
  `try/catch` around the relevant fetch in `adapters.ts`.
- **Components** (`Hero.tsx`, `ValueGrid.tsx`, `TourismCardGrid.tsx`,
  etc.) were changed to accept their content as a prop, defaulting to
  the original static import when no prop is passed — e.g.
  `export default function Hero({ hero = staticHero } = {})`. This means
  nothing breaks if you use any of these components elsewhere without
  passing CMS data; only the actual page routes (`src/app/page.tsx`,
  `src/app/about/page.tsx`, etc.) were changed to fetch and pass data in.
  No component's JSX, styling, or animation logic was touched.

## `src/data/content.ts` is still here on purpose

It's now the fallback layer, not the primary data source. Three
components (`StorySection.tsx`, `RegionCards.tsx`, `ProductCards.tsx`)
and their content.ts exports (`story`, `aboutHero`, `aboutBanner`,
`pngHero`, `pngBanner`, `originStory`, `regions`, the old `products`
list) were already unused/orphaned before this integration — they
weren't rendered by any live page — so they weren't wired to the CMS.
Worth a decision on whether to delete them or revive them in a future
pass.

## Extending this

To wire up a new field: add it to the relevant Strapi schema, add it to
the matching type in `types.ts`, read it in the matching function in
`adapters.ts`, and pass it as a prop from the page. The pattern is the
same throughout.
