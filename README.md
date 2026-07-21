# PNG Coffee \u2014 Landing Page

A production-ready recreation of the PNG Coffee homepage mockup, rebuilt with
Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP and
Lenis smooth scroll.

This is a faithful rebuild, not a redesign: the cosmic red hero, the fixed
glass navigation, the "PNG GROWN, SHARED WITH THE WORLD" banner and the three
feature cards (About Us / PNG / Our Coffee) all follow the original mockup's
layout and copy, modernized for responsiveness, animation quality and
performance.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```text
src/
  app/            Next.js App Router entry (layout, page, global styles import)
  components/     Navbar, Hero, PNGBanner, FeatureCards, Footer, SmoothScrollProvider
  data/           content.ts \u2014 all site copy and structured content
  lib/            animations.ts \u2014 shared Framer Motion variants
  styles/         globals.css \u2014 design tokens and base styles
public/
  logo/           png-coffee-logo.png
  backgrounds/    nebula-red.jpg (original generated artwork)
  images/         about-us.jpg, png.jpg, our-coffee.jpg
```

## Notes

- `nebula-red.jpg` is an original procedurally generated background (no
  stock photo), matching the red cosmic look of the reference mockup.
- The logo was cropped from the supplied transparent PNG; it reads correctly
  on dark backgrounds (nav bar, footer) and is flattened for use on the white
  PNG Grown banner.
- Tailwind tokens for the `ember` (brand red) and `void` (near-black) palette
  live in `tailwind.config.js` if you need to adjust brand colors later.
- Reduced-motion is respected: Lenis and the twinkling particles are skipped
  when `prefers-reduced-motion` is set, and global CSS shortens all
  animations/transitions in that mode.
