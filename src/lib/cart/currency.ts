/**
 * The store operates entirely in US Dollars — all prices, the cart, and PayPal
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

/** Format a whole-currency amount (80 or 14.99) as a PayPal amount string ("80.00"). */
export function toPayPalAmount(amount: number): string {
  return amount.toFixed(2);
}
