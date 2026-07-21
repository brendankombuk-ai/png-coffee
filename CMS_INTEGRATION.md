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
| `/png` | PNG Coffee Page single type: hero, 6 tourism cards |
| `/products` | Our Coffee Page + Category collection: hero, category grid, value-added section |
| `/products/[slug]` | Category + Product collections, filtered by category slug |

Blog, Testimonials, and FAQ content types exist and are queryable
(`src/lib/cms/adapters.ts` → `getBlogPosts`, `getTestimonials`,
`getFaqs`) but aren't rendered on any page yet — there wasn't an existing
page for them. Ask if you'd like pages built for these.

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
