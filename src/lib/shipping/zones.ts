/**
 * ============================================================================
 *  COMMERCE CONFIG — 3 postal zones, all-in USD pricing (postage included)
 * ============================================================================
 * Prices come from the supplied rate sheet and ALREADY INCLUDE shipping, so
 * there is no separate shipping line. Price depends on zone × bundle size and
 * is the same across all four products. Everything is in USD.
 * ============================================================================
 */

/* -------------------------------- Zones -------------------------------- */

export type ZoneId = "z1" | "z2" | "z3";

export type Zone = { id: ZoneId; label: string; note: string; countries: string[] };

export const ZONES: Zone[] = [
  { id: "z1", label: "Zone 1", note: "Australia", countries: ["AU"] },
  {
    id: "z2",
    label: "Zone 2",
    note: "Fiji, Hong Kong, Indonesia, Japan, Malaysia, Philippines, Singapore, Solomon Islands",
    countries: ["FJ", "HK", "ID", "JP", "MY", "PH", "SG", "SB"],
  },
  {
    id: "z3",
    label: "Zone 3",
    note: "All other countries (New Zealand, China, Taiwan, USA, Canada, UK, Europe, Russia…)",
    countries: [], // catch-all — see zoneAllowedCountries()
  },
];

const ZONE_BY_ID: Record<ZoneId, Zone> = Object.fromEntries(ZONES.map((z) => [z.id, z])) as Record<ZoneId, Zone>;

export function getZone(id: ZoneId): Zone {
  return ZONE_BY_ID[id];
}

export function isZoneId(v: unknown): v is ZoneId {
  return v === "z1" || v === "z2" || v === "z3";
}

/**
 * Country codes Stripe accepts for shipping_address_collection.allowed_countries.
 * (Taken from Stripe's own validation list — using this guarantees no
 * "invalid allowed_countries" error.)
 */
const STRIPE_COUNTRIES = [
  "AC","AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CV","CW","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MK","ML","MM","MN","MO","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SZ","TA","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","US","UY","UZ","VA","VC","VE","VG","VN","VU","WF","WS","XK","YE","YT","ZA","ZM","ZW","ZZ",
];

/** Stripe-valid country list for a zone. Zone 3 = everything except Zones 1 & 2. */
export function zoneAllowedCountries(id: ZoneId): string[] {
  const zone = ZONE_BY_ID[id];
  if (zone.countries.length) return zone.countries.filter((c) => STRIPE_COUNTRIES.includes(c));
  const excluded = new Set([...ZONES[0].countries, ...ZONES[1].countries]);
  return STRIPE_COUNTRIES.filter((c) => !excluded.has(c));
}

/* --------------------------- Bundles & weight --------------------------- */

export type BundleSize = 3 | 6 | 10;
export const BUNDLE_SIZES: BundleSize[] = [3, 6, 10];

/** Grams per bag. All coffee is packed in 350g bags. */
export const BAG_GRAMS = 350;

export function bundleWeightGrams(size: BundleSize): number {
  return size * BAG_GRAMS;
}

/* --------------------- All-in bundle prices (USD) ---------------------- */
// From the rate sheet — prices INCLUDE shipping. Same grid for all products.
const BUNDLE_PRICES: Record<ZoneId, Record<BundleSize, number>> = {
  z1: { 3: 80, 6: 120, 10: 175 },
  z2: { 3: 99, 6: 158, 10: 234 },
  z3: { 3: 120, 6: 183, 10: 264 },
};

export function bundlePrice(zone: ZoneId, size: BundleSize): number {
  return BUNDLE_PRICES[zone][size];
}

export function isBundleSize(v: unknown): v is BundleSize {
  return v === 3 || v === 6 || v === 10;
}

/* ------------------------------- Products ------------------------------- */

export type Roast = "Dark Roast" | "Medium Roast";
export type Grind = "Beans" | "Ground";

export type CoffeeProduct = {
  id: string;
  name: string;
  roast: Roast;
  grind: Grind;
  description: string;
  image: string;
  alt: string;
  /** Per-bundle SKU + stock. (Price comes from the shared zone grid above.) */
  bundles: Record<BundleSize, { sku: string; stock: number }>;
  featured?: boolean;
};

// ⚠️ SKUs/stock are placeholders — replace with real values.
export const PRODUCTS: CoffeeProduct[] = [
  {
    id: "dark-roast-beans",
    name: "Dark Roast – Beans",
    roast: "Dark Roast",
    grind: "Beans",
    description: "Rich, bold dark roast whole beans from the PNG highlands. Packed in 350g bags.",
    image: "/images/products/coffee/dark-roast-beans.png",
    alt: "PNG Coffee Dark Roast whole beans 350g bag",
    bundles: { 3: { sku: "DRB-3", stock: 100 }, 6: { sku: "DRB-6", stock: 100 }, 10: { sku: "DRB-10", stock: 100 } },
    featured: true,
  },
  {
    id: "dark-roast-ground",
    name: "Dark Roast – Ground",
    roast: "Dark Roast",
    grind: "Ground",
    description: "Rich, bold dark roast, freshly ground. Packed in 350g bags.",
    image: "/images/products/coffee/dark-roast-ground.png",
    alt: "PNG Coffee Dark Roast ground 350g bag",
    bundles: { 3: { sku: "DRG-3", stock: 100 }, 6: { sku: "DRG-6", stock: 100 }, 10: { sku: "DRG-10", stock: 100 } },
  },
  {
    id: "medium-roast-beans",
    name: "Medium Roast – Beans",
    roast: "Medium Roast",
    grind: "Beans",
    description: "Smooth, balanced medium roast whole beans. Packed in 350g bags.",
    image: "/images/products/coffee/medium-roast-beans.png",
    alt: "PNG Coffee Medium Roast whole beans 350g bag",
    bundles: { 3: { sku: "MRB-3", stock: 100 }, 6: { sku: "MRB-6", stock: 100 }, 10: { sku: "MRB-10", stock: 100 } },
  },
  {
    id: "medium-roast-ground",
    name: "Medium Roast – Ground",
    roast: "Medium Roast",
    grind: "Ground",
    description: "Smooth, balanced medium roast, freshly ground. Packed in 350g bags.",
    image: "/images/products/coffee/medium-roast-ground.png",
    alt: "PNG Coffee Medium Roast ground 350g bag",
    bundles: { 3: { sku: "MRG-3", stock: 100 }, 6: { sku: "MRG-6", stock: 100 }, 10: { sku: "MRG-10", stock: 100 } },
  },
];

const PRODUCT_BY_ID: Record<string, CoffeeProduct> = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export function getProduct(id: string): CoffeeProduct | undefined {
  return PRODUCT_BY_ID[id];
}

/* --------------------------- Order calculation -------------------------- */

export type QuoteLine = { productId: string; size: BundleSize; quantity: number };
export type OrderQuote = { total: number };

/** All-in order total (prices already include postage). */
export function quoteOrder(zone: ZoneId, lines: QuoteLine[]): OrderQuote {
  let total = 0;
  for (const line of lines) total += bundlePrice(zone, line.size) * line.quantity;
  return { total: Math.round(total * 100) / 100 };
}
