/**
 * Shipping zones and rates.
 *
 * Shipping is a fee added ON TOP of the cart subtotal at checkout. The fee
 * depends on (a) the destination zone, derived from the shipping country, and
 * (b) how many packets (total item quantity) are being shipped.
 *
 * Rate table (USD, from the supplied pricing sheet — "Black Pkts, including
 * shipping fee"):
 *
 *              3 pkts   6 pkts   10 pkts
 *   Zone 1      80        120      175
 *   Zone 2      99        158      234
 *   Zone 3     120        183      264
 *
 * NOTE: these amounts are denominated in USD. They're used as-is in the
 * store's display currency (NEXT_PUBLIC_CURRENCY, default USD). If you switch
 * the store to a non-USD currency, convert these numbers accordingly.
 */

export type Zone = 1 | 2 | 3;

/** Zone 1 destinations (ISO 3166-1 alpha-2). */
const ZONE_1 = new Set<string>(["AU"]);

/** Zone 2 destinations (ISO 3166-1 alpha-2). */
const ZONE_2 = new Set<string>([
  "FJ", // Fiji
  "HK", // Hong Kong
  "ID", // Indonesia
  "JP", // Japan
  "MY", // Malaysia
  "PH", // Philippines
  "SG", // Singapore
  "SB", // Solomon Islands
]);

// Everything else falls into Zone 3 ("all other countries not listed").
//
// NOTE: Papua New Guinea (PG) is not on the supplied international rate sheet.
// It currently falls through to Zone 3 like any unlisted country. If you offer
// a different domestic rate (or free local pickup), add a `PG` case here and a
// domestic column to SHIPPING_RATES.

/** Map a shipping country (ISO alpha-2, any case) to its zone. */
export function zoneForCountry(countryCode: string): Zone {
  const code = countryCode.trim().toUpperCase();
  if (ZONE_1.has(code)) return 1;
  if (ZONE_2.has(code)) return 2;
  return 3;
}

/** Per-zone rates keyed by packet tier. */
const SHIPPING_RATES: Record<Zone, { 3: number; 6: number; 10: number }> = {
  1: { 3: 80, 6: 120, 10: 175 },
  2: { 3: 99, 6: 158, 10: 234 },
  3: { 3: 120, 6: 183, 10: 264 },
};

/**
 * Fee for up to 10 packets, bracketed into the three published tiers:
 *   1–3 packets  -> "3 pkt" rate
 *   4–6 packets  -> "6 pkt" rate
 *   7–10 packets -> "10 pkt" rate
 */
function bracketFee(zone: Zone, packets: number): number {
  const rates = SHIPPING_RATES[zone];
  if (packets <= 3) return rates[3];
  if (packets <= 6) return rates[6];
  return rates[10];
}

/**
 * Total shipping fee for any packet count.
 *
 * The rate sheet only defines 3 / 6 / 10 packets, so for orders larger than 10
 * we bill each full block of 10 at the "10 pkt" rate and bracket the remainder
 * into the tier above it. Examples: 10 -> rate(10); 13 -> rate(10) + rate(3);
 * 16 -> rate(10) + rate(6); 20 -> 2 x rate(10).
 *
 * This is the one place the >10 behaviour is defined — adjust here if you want
 * a different rule for bulk orders.
 */
export function shippingFee(countryCode: string, totalPackets: number): number {
  if (!Number.isFinite(totalPackets) || totalPackets <= 0) return 0;
  const zone = zoneForCountry(countryCode);
  const blocks = Math.floor(totalPackets / 10);
  const remainder = totalPackets % 10;
  let fee = blocks * SHIPPING_RATES[zone][10];
  if (remainder > 0) fee += bracketFee(zone, remainder);
  return fee;
}

/** Convenience: zone + fee together, for display and server-side use. */
export function shippingQuote(
  countryCode: string,
  totalPackets: number
): { zone: Zone; fee: number } {
  return { zone: zoneForCountry(countryCode), fee: shippingFee(countryCode, totalPackets) };
}

/**
 * Countries offered in the checkout destination selector (ISO alpha-2). The
 * specifically-listed Zone 1 & 2 countries come first, followed by a broad set
 * of common Zone 3 destinations. Any country here that isn't in Zone 1 or 2 is
 * automatically Zone 3. Human-readable names are rendered at display time via
 * Intl.DisplayNames, so this stays a plain code list.
 */
export const SHIPPING_COUNTRY_CODES: string[] = [
  // Zone 1
  "AU",
  // Zone 2
  "FJ", "HK", "ID", "JP", "MY", "PH", "SG", "SB",
  // Zone 3 (all others) — common destinations
  "NZ", "CN", "TW", "US", "CA", "GB", "IE", "FR", "DE", "IT", "ES", "PT",
  "NL", "BE", "LU", "CH", "AT", "DK", "SE", "NO", "FI", "IS", "PL", "CZ",
  "SK", "HU", "RO", "BG", "GR", "HR", "SI", "RS", "UA", "RU", "TR", "AE",
  "SA", "QA", "KW", "BH", "OM", "IL", "IN", "PK", "BD", "LK", "NP", "TH",
  "VN", "KH", "LA", "MM", "KR", "MN", "BN", "TL", "PG", "VU", "NC", "PF",
  "WS", "TO", "KI", "FM", "MH", "PW", "NR", "TV", "ZA", "EG", "MA", "NG",
  "KE", "GH", "TZ", "ET", "MU", "BR", "AR", "CL", "CO", "PE", "MX", "UY",
  "EC", "BO", "PY", "VE", "CR", "PA", "GT", "DO", "JM", "TT",
];
