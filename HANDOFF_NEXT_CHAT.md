# PNG Coffee — Handoff (continuing in a new chat)

## Latest change (this session): 8 About photos wired in ✅

The 8 pending photos for the `/about` sub-pages are now in and verified with a
clean `tsc` and a full `next build` (22/22 pages). No placeholders remain on
the Roastery / Barista Training / Equipment Service pages.

### Where each photo landed (mapped by IMAGE CONTENT, not filename)
Two of the uploaded files had **swapped filenames** — wired by what's actually
in the picture:

**Hero photos** — `public/images/about-values/`
- `roastery.jpg` — the drum roaster, composited onto an ember-red gradient
  backdrop (the source `roasting-machine-.png` was a transparent cutout, so it
  was placed on brand-red to match "roasting machine on the red backdrop").
  Used by the Roastery hero, the Coffee Showroom section, AND the Roastery
  card in the `/about` value grid — all via `object-cover`, so one red-backdrop
  asset serves all three.
- `barista-training.jpg` — the espresso-tamping photo. (Came from the file
  *named* `Coffee_Equipment_Service.jpg` — filename was swapped.)
- `equipment-service.jpg` — the row of grinders/espresso machines on a café
  counter. (Came from the file *named* `Barista_Training.jpg` — swapped.)

**Roastery equipment gallery (5)** — `public/images/about-values/gallery/`
transparent PNG cutouts, trimmed to their alpha bounds + padded so each fills
its tile evenly. Rendered `object-contain` on light tiles.
1. `de-stoner.png`        (from `stoner.png`)
2. `bagging-filling.png`  (from `Sorter.png` — white wheeled touchscreen unit)
3. `roaster.png`          (from `ground.png` — tall dark vertical tower; note
   the gallery label is "Roaster" but the machine is the tall packaging/filling
   tower, per the original gallery spec "Roaster/packaging tower")
4. `weighing-filling.png` (from `Ground-Machine.png`)
5. `sealing-line.png`     (from `packaging-machine.png` — green-belt conveyor)

### Files changed
- `src/data/content.ts` → `roasteryPage.gallery` now carries `image` paths.
- `src/components/EquipmentGallery.tsx` → rewritten from placeholder icon tiles
  to real `next/image` tiles (`object-contain`, light gradient tiles, hover).
- 8 new/replaced image files under `public/images/about-values/`.

### ⚠️ Static mirror NOT updated this session
The `png-coffee-static/` HTML mirror was **not included in this zip**, so it
still shows the old placeholders for these three pages. When you have it,
mirror the same swap: copy the 8 images into the static tree and replace the
equipment-gallery placeholder blocks + the three hero `<img>`s.

---

## Where things stand otherwise
- **Structure**: Home, About (+ Roastery, Barista Training, Equipment Service),
  PNG (+ `/png/heart-of-papua-new-guinea`), Products (+ `/products/[slug]`),
  Contact, Checkout success/cancel.
- **CMS**: Strapi with graceful static-content fallback everywhere (see
  `CMS_INTEGRATION.md`). Strapi isn't running in-sandbox — expected; the build
  logs "falling back to static content" and still succeeds.
- **Cart/Checkout**: Stripe-backed (`CART_AND_CHECKOUT.md`).
- **Value Added** card on `/about` links straight to `/products` (intentional).

## Known gotchas (so they don't get re-hit)
- Sandbox can't reach Google Fonts / any CDN — `next/font/google` fails to
  fetch *only inside this sandbox*. To build here: temporarily stub the
  `Archivo`/`Inter` calls in `src/app/layout.tsx`, build, then **restore the
  real calls before packaging** and double-check the restore landed. (Done and
  verified this session — `layout.tsx` has the real font imports.)
- `\u2014`/`\u2013`/`\u2190` escapes are safe inside `.ts`/`.tsx` string or
  template-literal contexts, but render as literal backslash-u text if they
  land as raw JSX text. Grep after any copy edit.
- A `fixed` element with negative `z-index` can render invisibly behind an
  opaque `body` background — use `z-0` for fixed backgrounds, `z-10`+ for
  foreground.

## To view/build locally
`npm install` then `npm run dev` (fonts fetch fine on a real machine).
Vercel: set Root Directory to `png-coffee` in project settings.
