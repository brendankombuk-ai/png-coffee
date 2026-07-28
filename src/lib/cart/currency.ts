/**
 * The store operates entirely in US Dollars — all prices, the cart, and Stripe
 * charges use USD. (Fixed in code intentionally: it must not fall back to any
 * other currency via an env var. If you ever need to change it, do it here.)
 */
export const CURRENCY = "USD";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});

export function formatPrice(amount: number): string {
  try {
    return formatter.format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

/** Convert a whole-currency amount (14.99) to the smallest unit Stripe expects (1499). */
export function toStripeAmount(amount: number): number {
  return Math.round(amount * 100);
}
