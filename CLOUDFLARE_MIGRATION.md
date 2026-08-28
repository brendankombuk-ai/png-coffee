# Cloudflare Migration — PNG Coffee

Hosting runs on **Cloudflare Workers** via the OpenNext adapter, with
**git-connected auto-deploy** (push to GitHub → Cloudflare builds & deploys) and a
**custom domain**.

The code changes are already in this repo. The dashboard steps in section 4 are
yours to do — they involve your keys and DNS, which I can't and shouldn't touch.

> **Payments note:** the store now uses **PayPal** (Stripe was removed). The old
> Stripe webhook / signing-secret steps are gone. See section 2.

---

## 1. What changed in the repo

**New files**
- `open-next.config.ts` — OpenNext adapter config (minimal; deploys with no extra resources).
- `wrangler.jsonc` — Worker config: `nodejs_compat`, recent compatibility date, assets binding.
- `.dev.vars.example` — template for local Worker preview secrets (copy to `.dev.vars`).
- `CLOUDFLARE_MIGRATION.md` — this file.

**Edited files**
- `package.json` — added `preview`, `deploy`, `cf-typegen` scripts; added
  `@opennextjs/cloudflare` + `wrangler`; `next` pinned to ≥ 15.5.21 (OpenNext
  requirement). `package-lock.json` regenerated to match.
- `.gitignore` — ignore `.open-next`, `.wrangler`, `.dev.vars`, `cloudflare-env.d.ts`,
  and `.vercel`.

**Left alone on purpose:** all pricing, zones, SKUs, `next.config.js` image config,
Sanity setup, and the checkout pricing logic. No catalog or money values were touched.

You can delete the `.vercel/` folder whenever you like — it's just leftover Vercel
project linkage and is now gitignored. The empty `src/app/api/stripe/` and
`src/lib/stripe/` directories are also harmless leftovers (git doesn't track empty
folders) and can be deleted locally.

---

## 2. Payments & email on the Workers runtime

The Workers runtime has no Node HTTP stack, so anything that talks to an external
service must use `fetch`. Both integrations already do:

- **PayPal** — `src/lib/paypal/client.ts` is a hand-rolled `fetch` client (no SDK).
  It reads `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` / `PAYPAL_ENV` and talks to
  `api-m.paypal.com` (live) or `api-m.sandbox.paypal.com`. Order create/capture live
  in `src/app/api/paypal/*`. There is **no webhook** — capture happens synchronously
  when the buyer approves.
- **Email (Resend)** — `src/app/api/contact/route.ts` sends contact-form
  submissions via the Resend HTTP API.

### Build-time gotcha (already fixed)

Route handlers **must not** construct an SDK client at module scope. `next build`
imports every route module while collecting page data; if the constructor needs a
key that only exists at runtime, the build fails.

- `new Resend(process.env.RESEND_API_KEY)` at module scope crashed the build with
  `Missing API key`. Fixed by moving construction into the `POST` handler and
  returning a `503` when the key is absent.
- `src/lib/paypal/client.ts` already `console.warn`s (doesn't throw) when its keys
  are missing, so it was fine — the `[paypal] ... are not set` line in a build log
  is a warning, not a failure.

Keep this pattern for any future integration.

---

## 3. Local commands (unchanged day-to-day)

- `npm install` — install deps (includes the Cloudflare adapter + wrangler).
- `npm run dev` — normal Next dev server. **Unchanged.** Uses `.env.local` as before.
- `npm run preview` — builds the Worker and runs it locally in the real Workers
  runtime. Needs a `.dev.vars` file (copy from `.dev.vars.example`). Good for a
  final smoke-test before pushing.
- `npm run deploy` — manual build + deploy from your machine (needs `wrangler login`
  first; rarely needed once git auto-deploy is set up).

---

## 4. Cloudflare dashboard steps (yours to do)

### A. Connect the repo (Workers Builds)
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** → connect to Git.
2. Pick the GitHub repo **`brendankombuk-ai/png-coffee`**, production branch **`main`**.
3. **Build command:** `npx opennextjs-cloudflare build`
   (Cloudflare then deploys the built Worker from `wrangler.jsonc` automatically.
   If it asks for a separate deploy command, use `npx wrangler deploy`.)
4. Leave the deploy/output settings at their defaults — `wrangler.jsonc` points to
   `.open-next/worker.js` and `.open-next/assets`.

### B. Environment variables & secrets

Two buckets, because `NEXT_PUBLIC_*` values are **baked into the JS bundle at build
time**, while server keys are **read at runtime**. Several of these must be set in
**both** places (build env *and* runtime) — noted below.

**Build-time variables** (Workers Builds → project **Settings → Variables** for the
build environment):

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `f4srl2my` | Sanity project (also fine as plain text) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | your PayPal **Client ID** | read client-side by the PayPal Buttons; same value as `PAYPAL_CLIENT_ID` |
| `SANITY_API_TOKEN` | Sanity read token | **only if** your dataset is private or the build reads drafts; the public `production` dataset does not need it |

**Runtime secrets** (Worker → **Settings → Variables and Secrets**, add as *Secret*,
or `npx wrangler secret put NAME`):

| Secret | Value | Notes |
|---|---|---|
| `PAYPAL_CLIENT_ID` | your PayPal **Client ID** | same value as the public one above |
| `PAYPAL_CLIENT_SECRET` | your PayPal **Secret** | |
| `PAYPAL_ENV` | `sandbox` or `live` | `live` = real charges. Verify a full checkout in `sandbox` first if you can. |
| `RESEND_API_KEY` | your Resend API key | contact form returns `503` until this is set |
| `SANITY_API_TOKEN` | Sanity read token | only if the dataset is private / you read drafts at request time |

**Not used anymore — do not set:** `STRIPE_*` (Stripe removed),
`SANITY_WEBHOOK_SECRET` (no revalidation webhook route exists),
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (the contact map uses Leaflet + OpenStreetMap,
no key), `NEXT_PUBLIC_CURRENCY` (currency is hard-coded to `USD` in
`src/lib/cart/currency.ts`). These still appear in `.env.example` / `.env.local`
and can be pruned.

Enter all of these yourself — never commit them. `.env.local` and `.dev.vars` stay local.

### C. First deploy on a test URL, then verify
Let the first build deploy to the free `*.workers.dev` URL **before** you point your
domain. Then test:
- Homepage + a product page load; images from `cdn.sanity.io` render.
- `/studio` loads (Sanity Studio).
- **A PayPal checkout end to end** (Buy Now → PayPal login → order-confirmation
  page). Use `sandbox` credentials + `PAYPAL_ENV=sandbox` if you have them; otherwise
  a small real purchase you then refund.
- `create-order` and `capture-order` both return success in the Worker logs.
- Submit the contact form → the email arrives at the address in
  `src/app/api/contact/route.ts` (currently `moe.swissxpressopng29@gmail.com`).

### D. Custom domain
1. Worker → **Settings → Domains & Routes → Add → Custom Domain**.
2. Enter your domain. The site's `metadataBase` is `https://www.pngcoffee.com` in
   `src/app/layout.tsx` — confirm that's the one, or update it.
3. If the domain's DNS is already on Cloudflare, the record is created for you. If
   it's registered elsewhere, move its nameservers to Cloudflare or add the route as
   instructed.

Keep any existing deployment live until the Cloudflare one is verified, then switch DNS.

---

## 5. Heads-up: Worker size limit

A Cloudflare Worker is limited to **3 MiB on the free plan, 10 MiB on paid**. This
app bundles `next-sanity` and the embedded Sanity Studio, so the server bundle may
exceed 3 MiB. If the first deploy fails on size, upgrade to **Workers Paid ($5/mo)**
— that's the usual fix and everything else stays the same. (Removing Stripe helped;
PayPal adds no SDK weight since it's `fetch`-based.)

---

## 6. Optional: proper cross-edge ISR cache (R2)

Product pages use `export const revalidate = 60`. Without a shared cache, each Worker
isolate revalidates independently — fine for a small catalog, but not "true" ISR. To
enable an R2-backed incremental cache later:

1. Create the bucket: `npx wrangler r2 bucket create png-coffee-cache`
2. Uncomment the `r2_buckets` binding in `wrangler.jsonc`.
3. Wire the R2 incremental-cache override into `open-next.config.ts` following the
   current OpenNext docs (Caching → R2 incremental cache).

Skip this for the initial cutover — it's a clean follow-up, not a blocker.

---

## 7. What was validated vs. what runs on Cloudflare

- Validated locally: dependency resolution, full-project `tsc --noEmit`, and
  `next build` with **all** secrets unset (reproduces the CI env — completes all
  routes since the Resend fix in section 2).
- Runs on Cloudflare: the OpenNext/Wrangler build + workerd bundling. Watch the
  first build log; if it trips, it's almost certainly an env var from section B that
  isn't set, or the Worker size limit (section 5).
