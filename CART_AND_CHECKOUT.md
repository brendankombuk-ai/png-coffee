# Cart & Checkout (Stripe)

The site now has a working shopping cart and Stripe-powered checkout.

## Setup

1. Get your Stripe API keys: [dashboard.stripe.com](https://dashboard.stripe.com) →
   make sure **Test mode** is on (top right) → **Developers → API keys**.
2. Copy `.env.example` to `.env.local` if you haven't already, and fill in:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
   (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` isn't used yet — checkout redirects
   to Stripe's own hosted page rather than embedding Stripe Elements — but
   it's there ready for if you want an embedded checkout later.)
3. Restart `npm run dev`. That's it — Add to Cart and Checkout both work
   immediately in Stripe test mode. Use [Stripe's test card
   numbers](https://docs.stripe.com/testing#cards) (e.g. `4242 4242 4242
   4242`, any future expiry, any CVC) to complete a test purchase.

## How it works

- **`src/lib/cart/CartContext.tsx`** — cart state (add/remove/quantity/
  clear), persisted to `localStorage` so it survives page refreshes and
  closed tabs. Wrapped around the whole app in `src/app/layout.tsx`.
- **`src/components/CartDrawer.tsx`** — the slide-over panel. Opens
  automatically when an item is added, or via the cart icon in the navbar
  (which now shows a live item-count badge).
- **`src/components/ProductCard.tsx`** — "Add to Cart" button on every
  product card. This used to say "Buy Now" — renamed because it now adds
  to a running cart rather than buying immediately, which is what you
  asked for. Say the word if you'd rather have both: an "Add to Cart" and
  a separate one-click "Buy Now" that skips straight to checkout with just
  that item.
- **`src/app/api/checkout/route.ts`** — when "Checkout" is clicked, this
  server route receives the cart contents, **re-validates every price and
  quantity itself** (never trusts numbers sent from the browser for
  anything involving money), creates a Stripe Checkout Session, and
  returns its URL. The browser then redirects there.
- **`src/app/checkout/success/page.tsx`** — Stripe redirects here after a
  successful payment. Clears the cart and shows a confirmation.
- **`src/app/checkout/cancel/page.tsx`** — shown if the customer backs out
  of Stripe's page. Cart is left untouched.
- **`src/app/api/stripe/webhook/route.ts`** — a signature-verified webhook
  endpoint that logs successful payments server-side. **Not yet connected
  to anything beyond logging** — see "What's not built yet" below.

## Currency

Set `NEXT_PUBLIC_CURRENCY` in `.env.local` (defaults to `USD` if unset).
Every price throughout the site — product cards, cart, Stripe Checkout —
reads from this one value via `src/lib/cart/currency.ts`.

**On using PGK (Kina):** Stripe's SDK recognizes `pgk` as a valid currency
code, but whether your specific Stripe account can actually accept/settle
payments in it depends on which country your account is registered
under — Stripe doesn't offer merchant accounts based in Papua New Guinea
itself, so yours is likely registered elsewhere (Australia is common).
**Test it first**: set `NEXT_PUBLIC_CURRENCY=PGK`, try a test checkout, and
see whether Stripe accepts it. If it's rejected, use `USD` or `AUD`
instead.

## Product prices

Every product now has a `price` field:
- **Static fallback data** (`src/data/content.ts`) — real numbers were
  added for all 14 existing products (e.g. Whole Beans Medium Roast =
  $14.99). **These are placeholder prices for demonstration — update them
  to your real prices** by editing the `price:` value for each product in
  that file, or better, once you're managing products through the CMS,
  set the real price there instead (see below).
- **CMS-driven products** — the Strapi `Product` content type already had
  a `price` field from the earlier CMS work; it's now wired all the way
  through to the cart. Set it per-product in the Strapi admin panel. If a
  `salePrice` is also set, that's what's charged (and shown) instead of
  the regular price.

## What's not built yet

This covers cart + checkout end-to-end for a one-time purchase. Not
included (all bigger, separate pieces of work — say if you want any of
these next):

- **Order storage** — the webhook currently only logs payments to the
  console; there's no database record of orders, no order history for
  customers, no admin view of orders. This needs the Strapi side extended
  with an `Order` content type, and the webhook handler filled in to
  create records there.
- **Order confirmation emails** — the original spec asked for automated
  emails (order confirmation, shipping updates, etc.). The CMS's email
  plugin is configured and ready (see the CMS's `SETUP.md`), but nothing
  triggers an email yet — that would hook in at the same point as order
  storage, above.
- **Inventory/stock decrementing** — Product `stock` exists in Strapi but
  nothing reduces it on purchase yet.
- **Shipping cost calculation** — Checkout currently collects a shipping
  address but doesn't calculate shipping cost; it's a flat "shipping
  calculated at checkout" note that Stripe doesn't actually charge for
  yet. Stripe Checkout supports shipping rate options natively when
  you're ready to configure real rates.
- **Customer accounts** — this is guest checkout only; no login, no order
  history tied to an account.
- **PayPal / bank transfer** — only Stripe is wired up so far.

## Testing checklist before going live

- [ ] Switch `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to
      **live mode** keys (Stripe dashboard → toggle off Test mode → API keys)
- [ ] Set up the production webhook endpoint in the Stripe dashboard
      pointing at `https://yourdomain.com/api/stripe/webhook`, and set
      `STRIPE_WEBHOOK_SECRET` to the signing secret it gives you
- [ ] Confirm real product prices are set (not the placeholder values)
- [ ] Decide on and test your actual currency (see PGK note above)
- [ ] Narrow `shipping_address_collection.allowed_countries` in
      `src/app/api/checkout/route.ts` to only the countries you actually ship to
- [ ] Do a real end-to-end test purchase with a real card for a small
      amount before announcing the store is live
