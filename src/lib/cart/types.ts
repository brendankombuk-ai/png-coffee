import type { BundleSize, Roast, Grind } from "@/lib/shipping/zones";

export type CartItem = {
  /** `${productId}::${size}` */
  id: string;
  productId: string;
  name: string;
  roast: Roast;
  grind: Grind;
  size: BundleSize;
  /** Product-only bundle price (shipping + GST are added at the order level). */
  unitPrice: number;
  image?: string;
  quantity: number;
};
