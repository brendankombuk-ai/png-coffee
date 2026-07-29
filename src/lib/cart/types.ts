import type { BundleSize, Roast, Grind } from "@/lib/shipping/zones";

export type CartItem = {
  /** `${productId}::${size}` */
  id: string;
  productId: string;
  name: string;
  roast: Roast;
  grind: Grind;
  size: BundleSize;
  image?: string;
  quantity: number;
};
