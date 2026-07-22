export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  /** Category slug, used to build a link back to the product on /products/[slug]. */
  categorySlug?: string;
  quantity: number;
};
