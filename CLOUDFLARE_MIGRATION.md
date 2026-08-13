# Cloudflare Migration — PNG Coffee

Moving hosting from **Vercel** to **Cloudflare Workers** using the OpenNext adapter,
with **git-connected auto-deploy** (push to GitHub → Cloudflare builds & deploys,
same flow you had with Vercel) and a **custom domain**.

The code changes below are already done in this repo. The dashboard steps at the
bottom are yours to do (they involve your keys and DNS, which I can't and shouldn't touch).

---

## 1. What changed in the repo

**New files**
- `open-next.config.ts` — OpenNext adapter config (minimal; deploys with no extra resources).
- `wrangler.jsonc` — Worker config: `nodejs_compat`, recent compatibility date, assets binding.
- `.dev.vars.example` — template for local Worker preview secrets (copy to `.dev.vars`).
- `CLOUDFLARE_MIGRATION.md` — this file.

**Edited files**
- `package.json` — added `preview`, `deploy`, `cf-typegen` scripts; added
  `@opennextjs/cloudflare` + `wrangler`; **bumped `next` 15.5.20 → 15.5.22** and
  `eslint-config-next` to match (OpenNext requires Next ≥ 15.5.21; this is a patch
  bump inside the same minor). `package-lock.json` regenerated to match.
- `.gitignore` — ignore `.open-next`, `.wrangler`, `.dev.vars`, `cloudflare-env.d.ts`,
  and `.vercel`.
- **`src/lib/stripe/client.ts`** — see "Payment-path changes" below.
- **`src/app/api/stripe/webhook/route.ts`** — see "Payment-path changes" below.

**Left alone on purpose:** all pricing, zones, SKUs, `next.config.js` image config,
Sanity setup, and the checkout pricing logic. No catalog or money values were touched.

You can delete the `.vercel/` folder whenever you like — it's just leftover Vercel
project linkage and is now gitignored.

---

## 2. Payment-path changes (please review)

Two changes were required because the Cloudflare Workers runtime has no Node HTTP
stack and uses async Web Crypto. Both are **behaviour-preserving** — same checkout,
same signature verification — just Workers-compatible. They also still work under
plain `next dev` on Node.

1. **`src/lib/stripe/client.ts`** — added `httpClient: Stripe.createFetchHttpClient()`
   to the Stripe client so requests use fetch instead of Node's HTTP module.

2. **`src/app/api/stripe/webhook/route.ts`** — swapped the synchronous
   `stripe.webhooks.constructEvent(...)` for the async
   `stripe.webhooks.constructEventAsync(..., Stripe.createSubtleCryptoProvider())`.
   The sync version relies on Node crypto and throws on Workers; the async version
   verifies the exact same way using SubtleCrypto.

Nothing else in the payment flow changed.

---

## 3. Local commands (unchanged day-to-day)

- `npm install` — install deps (now includes the Cloudflare adapter + wrangler).
- `npm run dev` — normal Next dev server. **Unchanged.** Uses `.env.local` as before.
- `npm run preview` — builds the Worker and runs it locally in the real Workers
  runtime. Needs a `.dev.vars` file (copy from `.dev.vars.example`). Good for a
  final smoke-test before pushing.
- `npm run deploy` — manual build + deploy from your machine (rarely needed once
  git auto-deploy is set up; handy as a fallback).

---

## 4. Cloudflare dashboard steps (yours to do)

### A. Connect the repo (Workers Builds)
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** → connect to Git.
2. Pick the GitHub repo **`brendankombuk-ai/PNG-Coffee`**, branch **main**.
3. **Build command:** `npx @opennextjs/cloudflare build`
   (Cloudflare then deploys the built Worker from `wrangler.jsonc` automatically.
   If it asks for a separate deploy command, use `npx wrangler deploy`.)
4. Leave the deploy/output settings at their defaults — the wrangler config points
   to `.open-next/worker.js` and `.open-next/assets`.

### B. Environment variables & secrets
Two buckets, because `NEXT_PUBLIC_*` values are baked in **at build time**, while the
server keys are read **at runtime**:

**Build-time vars** (set in the Workers Builds environment / project settings — these
are needed while the build runs, because `NEXT_PUBLIC_*` values get baked into the
JS bundle at build time, not read at runtime):
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` — same value as `PAYPAL_CLIENT_ID` below; the
  PayPal Buttons component reads this one client-side.
- `NEXT_PUBLIC_CURRENCY`
- `SANITY_API_TOKEN` (if your build queries Sanity for static pages)

**Runtime secrets** (Worker → Settings → **Variables and Secrets**, added as *Secret*,
or via `npx wrangler secret put NAME`):
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_ENV` — `sandbox` while testing, `live` only after a full sandbox
  purchase has been verified end to end.
- `SANITY_API_TOKEN`
- `SANITY_WEBHOOK_SECRET`

Enter these yourself — never commit them. `.env.local` and `.dev.vars` stay local.

### C. First deploy on a test URL, then verify
Let the first build run and deploy to the free `*.workers.dev` URL **before** you
point your domain. Then test:
- Homepage + a product page load, images from `cdn.sanity.io` render.
- `/studio` loads (Sanity Studio).
- **A full sandbox-mode PayPal checkout** end to end (Buy Now → PayPal
  sandbox login → order confirmation page).
- Order creation and capture routes both return success in the Worker logs.

### D. Custom domain
1. Worker → **Settings** → **Domains & Routes** → **Add** → Custom Domain.
2. Enter your domain (the site's `metadataBase` is currently
   `https://www.pngcoffee.com` in `src/app/layout.tsx` — confirm that's the one, or
   update it).
3. If the domain's DNS is already on Cloudflare, the record is created for you. If
   it's registered elsewhere, either move its nameservers to Cloudflare or add the
   route as Cloudflare instructs.

Keep the Vercel deployment live until the Cloudflare one is verified, then switch DNS.

### E. Update Stripe webhook endpoint
After the domain is live, in the Stripe Dashboard → Developers → Webhooks, set the
endpoint URL to `https://YOUR-DOMAIN/api/stripe/webhook` and copy the new signing
secret into the `STRIPE_WEBHOOK_SECRET` runtime secret.

---

## 5. Heads-up: Worker size limit

A Cloudflare Worker is limited to **3 MiB on the free plan, 10 MiB on paid**. This app
bundles the Stripe SDK, `next-sanity`, and the embedded Sanity Studio, so the server
bundle may exceed 3 MiB. If the first deploy fails on size, upgrade to **Workers Paid
($5/mo)** — that's the usual fix and everything else stays the same.

---

## 6. Optional: proper cross-edge ISR cache (R2)

Your product pages use `export const revalidate = 60`. Without a shared cache, each
Worker isolate revalidates independently — fine for a 4-SKU catalog, but not "true"
ISR. To enable an R2-backed incremental cache later:

1. Create the bucket: `npx wrangler r2 bucket create png-coffee-cache`
2. Uncomment the `r2_buckets` binding in `wrangler.jsonc`.
3. Wire the R2 incremental-cache override into `open-next.config.ts` following the
   current OpenNext docs (Caching → R2 incremental cache), since the exact override
   import path can change between adapter versions.

Skip this for the initial cutover — it's a clean follow-up, not a blocker.

---

## 7. What I validated vs. what runs on Cloudflare

- Validated here: dependency resolution (no peer conflicts), full-project
  `tsc --noEmit` type-check (including the two Stripe edits), config file validity.
- **Not** run here: the OpenNext/Wrangler build itself (needs the Cloudflare
  toolchain and network access this sandbox doesn't have). That runs on your first
  Cloudflare build — which is exactly the git-connected flow you chose. Watch that
  first build log; if anything trips, it'll almost certainly be an env-var that
  isn't set yet (section B) or the Worker size limit (section 5).
