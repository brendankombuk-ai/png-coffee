import type { BundleTier } from "@/lib/shipping/zones";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  /** Category slug, used to build a link back to the product on /products/[slug]. */
  categorySlug?: string;
  quantity: number;
  /** Set for online bundle items: the packet tier (3/6/10). Price is derived
   *  from the chosen zone + this tier, so it re-prices if the zone changes. */
  bundleTier?: BundleTier;
  /** Optional grind choice shown on the line (e.g. "Ground", "Whole Beans"). */
  grind?: string;
};
