/**
 * Currency is read from NEXT_PUBLIC_CURRENCY (defaults to USD). Stripe's
 * SDK recognizes "pgk" (Papua New Guinea Kina) as a currency code, but
 * whether YOUR Stripe account can actually settle in it depends on which
 * country the account is registered under — Stripe has no PNG-based
 * merchant accounts, so this is very likely registered elsewhere (e.g.
 * Australia). Test creating a Checkout Session with currency=pgk in Stripe
 * test mode before relying on it; fall back to USD or AUD if it's rejected.
 */
export const CURRENCY = (process.env.NEXT_PUBLIC_CURRENCY || "USD").toUpperCase();

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
  currencyDisplay: CURRENCY === "PGK" ? "narrowSymbol" : "symbol",
});

export function formatPrice(amount: number): string {
  try {
    return formatter.format(amount);
  } catch {
    // Intl doesn't recognize PGK in some environments — fall back to a
    // manual "K" prefix (PNG Kina's actual currency symbol) rather than
    // throwing.
    if (CURRENCY === "PGK") return `K${amount.toFixed(2)}`;
    return `${CURRENCY} ${amount.toFixed(2)}`;
  }
}

/** Convert a whole-currency-unit amount (14.99) to the smallest unit Stripe expects (1499). */
export function toStripeAmount(amount: number): number {
  return Math.round(amount * 100);
}
