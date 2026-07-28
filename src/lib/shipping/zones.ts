/**
 * Postal zones + all-in bundle pricing.
 *
 * Coffee sold online is sold in fixed BUNDLES of 3, 6 or 10 packets (220g
 * each). Each bundle has ONE all-in US$ price that already INCLUDES EMS
 * postage, and that price depends only on the destination zone + the bundle
 * size — it's the same grid for every online product (the "Black Pkts"
 * pricing sheet):
 *
 *              3 pkts   6 pkts   10 pkts
 *   Zone 1      80        120      175
 *   Zone 2      99        158      234
 *   Zone 3     120        183      264
 *
 * The customer picks their zone first (see ZoneContext / ZoneSelector); all
 * online prices then reflect that zone. Amounts are USD — if you change the
 * store currency (NEXT_PUBLIC_CURRENCY), convert these numbers too.
 */

export type Zone = 1 | 2 | 3;
export type BundleTier = 3 | 6 | 10;

export const BUNDLE_TIERS: BundleTier[] = [3, 6, 10];

/** Grams per packet — used to show pack weight (e.g. "6 × 220g = 1320g"). */
export const PACKET_GRAMS = 220;

/** Zone 1 destinations (ISO 3166-1 alpha-2). */
const ZONE_1 = ["AU"];

/** Zone 2 destinations (ISO 3166-1 alpha-2). */
const ZONE_2 = ["FJ", "HK", "ID", "JP", "MY", "PH", "SG", "SB"];

/**
 * A broad list of common Zone 3 destinations ("all other countries not
 * listed"). Used to populate the allowed shipping countries at checkout for
 * Zone 3 orders. Not exhaustive of every country on earth, but covers the
 * realistic destinations — add more here if a customer needs one.
 */
const ZONE_3 = [
  "NZ", "CN", "TW", "US", "CA", "GB", "IE", "FR", "DE", "IT", "ES", "PT",
  "NL", "BE", "LU", "CH", "AT", "DK", "SE", "NO", "FI", "IS", "PL", "CZ",
  "SK", "HU", "RO", "BG", "GR", "HR", "SI", "RS", "UA", "RU", "TR", "AE",
  "SA", "QA", "KW", "BH", "OM", "IL", "IN", "PK", "BD", "LK", "NP", "TH",
  "VN", "KH", "LA", "MM", "KR", "MN", "BN", "TL", "PG", "VU", "NC", "PF",
  "WS", "TO", "KI", "FM", "MH", "PW", "NR", "TV", "ZA", "EG", "MA", "NG",
  "KE", "GH", "TZ", "ET", "MU", "BR", "AR", "CL", "CO", "PE", "MX", "UY",
  "EC", "BO", "PY", "VE", "CR", "PA", "GT", "DO", "JM", "TT",
];

/** Human-readable zone summaries, shown in the zone selector. */
export const ZONE_LABELS: Record<Zone, { name: string; countries: string }> = {
  1: { name: "Zone 1", countries: "Australia" },
  2: {
    name: "Zone 2",
    countries: "Fiji, Hong Kong, Indonesia, Japan, Malaysia, Philippines, Singapore, Solomon Islands",
  },
  3: {
    name: "Zone 3",
    countries: "All other countries (New Zealand, China, USA, Canada, UK, Europe, etc.)",
  },
};

/** Map a shipping country (ISO alpha-2, any case) to its zone. */
export function zoneForCountry(countryCode: string): Zone {
  const code = countryCode.trim().toUpperCase();
  if (ZONE_1.includes(code)) return 1;
  if (ZONE_2.includes(code)) return 2;
  return 3;
}

/** Countries allowed at checkout for a given zone (for Stripe address collection). */
export function zoneAllowedCountries(zone: Zone): string[] {
  if (zone === 1) return [...ZONE_1];
  if (zone === 2) return [...ZONE_2];
  return [...ZONE_3];
}

/** The all-in bundle price grid (USD). */
const BUNDLE_PRICES: Record<Zone, Record<BundleTier, number>> = {
  1: { 3: 80, 6: 120, 10: 175 },
  2: { 3: 99, 6: 158, 10: 234 },
  3: { 3: 120, 6: 183, 10: 264 },
};

/** All-in price (incl. postage) for a bundle of `tier` packets to `zone`. */
export function bundlePrice(zone: Zone, tier: BundleTier): number {
  return BUNDLE_PRICES[zone][tier];
}

/** Type guard for a valid bundle tier coming off the wire. */
export function isBundleTier(value: unknown): value is BundleTier {
  return value === 3 || value === 6 || value === 10;
}

/** Type guard for a valid zone coming off the wire. */
export function isZone(value: unknown): value is Zone {
  return value === 1 || value === 2 || value === 3;
}
