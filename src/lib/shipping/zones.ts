/**
 * ============================================================================
 *  COMMERCE CONFIG — PLACEHOLDER PRICING · REPLACE BEFORE GOING LIVE
 * ============================================================================
 * Every money value in this file (bundle prices, shipping rates, GST) is a
 * PLACEHOLDER. Swap in the real figures below — this is the single source of
 * truth for the store, so no code changes are needed elsewhere. (Later these
 * can be moved into Strapi CMS; the shapes here map 1:1 to that.)
 * ============================================================================
 */

/* -------------------------------- Zones -------------------------------- */

export type ZoneId = "png" | "au" | "nz" | "asia" | "pacific" | "row";

export type Zone = {
  id: ZoneId;
  label: string;
  blurb: string;
  /** ISO alpha-2 countries in this zone. "row" is the catch-all (empty list). */
  countries: string[];
};

export const ZONES: Zone[] = [
  { id: "png", label: "Papua New Guinea", blurb: "Domestic", countries: ["PG"] },
  { id: "au", label: "Australia", blurb: "", countries: ["AU"] },
  { id: "nz", label: "New Zealand", blurb: "", countries: ["NZ"] },
  {
    id: "asia",
    label: "Asia",
    blurb: "Japan, China, Singapore, Malaysia, Indonesia, Philippines…",
    countries: ["JP", "CN", "HK", "TW", "KR", "SG", "MY", "ID", "PH", "TH", "VN", "IN", "BD", "LK", "KH", "LA", "MM", "BN", "NP", "MN", "MO"],
  },
  {
    id: "pacific",
    label: "Pacific Islands",
    blurb: "Fiji, Solomon Islands, Vanuatu, Samoa, Tonga…",
    countries: ["FJ", "SB", "VU", "WS", "TO", "NC", "PF", "KI", "FM", "MH", "PW", "NR", "TV", "CK", "NU"],
  },
  { id: "row", label: "Rest of World", blurb: "Everywhere else (USA, Canada, UK, Europe…)", countries: [] },
];

const ZONE_BY_ID: Record<ZoneId, Zone> = Object.fromEntries(
  ZONES.map((z) => [z.id, z])
) as Record<ZoneId, Zone>;

export function getZone(id: ZoneId): Zone {
  return ZONE_BY_ID[id];
}

export function isZoneId(v: unknown): v is ZoneId {
  return typeof v === "string" && v in ZONE_BY_ID;
}

/** Countries allowed at checkout for a zone. "row" allows a broad global list. */
export function zoneAllowedCountries(id: ZoneId): string[] {
  const zone = ZONE_BY_ID[id];
  if (zone.countries.length) return [...zone.countries];
  // Rest of World: a broad list of common destinations minus the specific zones.
  const specific = new Set(ZONES.flatMap((z) => z.countries));
  return ROW_COUNTRIES.filter((c) => !specific.has(c));
}

const ROW_COUNTRIES = [
  "US", "CA", "GB", "IE", "FR", "DE", "IT", "ES", "PT", "NL", "BE", "LU", "CH",
  "AT", "DK", "SE", "NO", "FI", "IS", "PL", "CZ", "SK", "HU", "RO", "BG", "GR",
  "HR", "SI", "RS", "UA", "TR", "AE", "SA", "QA", "KW", "IL", "ZA", "EG", "NG",
  "KE", "BR", "AR", "CL", "CO", "PE", "MX", "PK",
];

/* --------------------------- Bundles & weight --------------------------- */

export type BundleSize = 3 | 6 | 10;
export const BUNDLE_SIZES: BundleSize[] = [3, 6, 10];

/** Grams per bag. All coffee is packed in 350g bags. */
export const BAG_GRAMS = 350;

/** Total shipping weight (grams) for a bundle = bags × 350g. */
export function bundleWeightGrams(size: BundleSize): number {
  return size * BAG_GRAMS;
}

/* ------------------------------- Products ------------------------------- */

export type Roast = "Dark Roast" | "Medium Roast";
export type Grind = "Beans" | "Ground";

export type BundleInfo = { sku: string; price: number; stock: number };

export type CoffeeProduct = {
  id: string;
  name: string;
  roast: Roast;
  grind: Grind;
  description: string;
  image: string;
  alt: string;
  /** Per-bundle price (product only — shipping is added separately), SKU + stock. */
  bundles: Record<BundleSize, BundleInfo>;
  featured?: boolean;
};

// ⚠️ PLACEHOLDER prices/SKUs/stock — replace with real values.
export const PRODUCTS: CoffeeProduct[] = [
  {
    id: "dark-roast-beans",
    name: "Dark Roast – Beans",
    roast: "Dark Roast",
    grind: "Beans",
    description: "Rich, bold dark roast whole beans from the PNG highlands. Packed in 350g bags.",
    image: "/images/products/coffee/dark-roast-beans.png",
    alt: "PNG Coffee Dark Roast whole beans 350g bag",
    bundles: {
      3: { sku: "DRB-3", price: 60, stock: 100 },
      6: { sku: "DRB-6", price: 110, stock: 100 },
      10: { sku: "DRB-10", price: 170, stock: 100 },
    },
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
    bundles: {
      3: { sku: "DRG-3", price: 60, stock: 100 },
      6: { sku: "DRG-6", price: 110, stock: 100 },
      10: { sku: "DRG-10", price: 170, stock: 100 },
    },
  },
  {
    id: "medium-roast-beans",
    name: "Medium Roast – Beans",
    roast: "Medium Roast",
    grind: "Beans",
    description: "Smooth, balanced medium roast whole beans. Packed in 350g bags.",
    image: "/images/products/coffee/medium-roast-beans.png",
    alt: "PNG Coffee Medium Roast whole beans 350g bag",
    bundles: {
      3: { sku: "MRB-3", price: 60, stock: 100 },
      6: { sku: "MRB-6", price: 110, stock: 100 },
      10: { sku: "MRB-10", price: 170, stock: 100 },
    },
  },
  {
    id: "medium-roast-ground",
    name: "Medium Roast – Ground",
    roast: "Medium Roast",
    grind: "Ground",
    description: "Smooth, balanced medium roast, freshly ground. Packed in 350g bags.",
    image: "/images/products/coffee/medium-roast-ground.png",
    alt: "PNG Coffee Medium Roast ground 350g bag",
    bundles: {
      3: { sku: "MRG-3", price: 60, stock: 100 },
      6: { sku: "MRG-6", price: 110, stock: 100 },
      10: { sku: "MRG-10", price: 170, stock: 100 },
    },
  },
];

const PRODUCT_BY_ID: Record<string, CoffeeProduct> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p])
);

export function getProduct(id: string): CoffeeProduct | undefined {
  return PRODUCT_BY_ID[id];
}

/* ---------------------- Shipping rates (by zone) ----------------------- */

// ⚠️ PLACEHOLDER shipping rates (per bundle size, per zone) — replace.
export const SHIPPING_RATES: Record<ZoneId, Record<BundleSize, number>> = {
  png:     { 3: 10, 6: 15, 10: 20 },
  au:      { 3: 25, 6: 40, 10: 60 },
  nz:      { 3: 28, 6: 45, 10: 68 },
  asia:    { 3: 30, 6: 50, 10: 75 },
  pacific: { 3: 22, 6: 36, 10: 55 },
  row:     { 3: 45, 6: 75, 10: 110 },
};

export function shippingRate(zone: ZoneId, size: BundleSize): number {
  return SHIPPING_RATES[zone][size];
}

/* -------------------------------- GST ---------------------------------- */

// ⚠️ PLACEHOLDER GST config — confirm rate + where it applies.
export const GST = {
  rate: 0.1, // PNG GST is 10%
  /** Zones the GST applies to. Empty array = never; ["png"] = domestic only. */
  appliesToZones: ["png"] as ZoneId[],
  /** Whether GST is charged on shipping as well as goods. */
  includeShipping: true,
};

export function gstApplies(zone: ZoneId): boolean {
  return GST.appliesToZones.includes(zone);
}

/* --------------------------- Order calculation -------------------------- */

export function isBundleSize(v: unknown): v is BundleSize {
  return v === 3 || v === 6 || v === 10;
}

export type QuoteLine = { productId: string; size: BundleSize; quantity: number };

export type OrderQuote = {
  subtotal: number;
  shipping: number;
  gst: number;
  total: number;
};

/** Compute an order's subtotal / shipping / GST / total, server-safe. */
export function quoteOrder(zone: ZoneId, lines: QuoteLine[]): OrderQuote {
  let subtotal = 0;
  let shipping = 0;
  for (const line of lines) {
    const product = PRODUCT_BY_ID[line.productId];
    if (!product) continue;
    subtotal += product.bundles[line.size].price * line.quantity;
    shipping += shippingRate(zone, line.size) * line.quantity;
  }
  const taxBase = subtotal + (GST.includeShipping ? shipping : 0);
  const gst = gstApplies(zone) ? round2(taxBase * GST.rate) : 0;
  return { subtotal: round2(subtotal), shipping: round2(shipping), gst, total: round2(subtotal + shipping + gst) };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
