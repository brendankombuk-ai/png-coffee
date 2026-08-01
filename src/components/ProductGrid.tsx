"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import ProductCard from "./ProductCard";
import ZoneSelector from "./ZoneSelector";
import type { ProductPlaceholder } from "@/data/content";

export default function ProductGrid({
  products,
  categorySlug,
}: {
  products: ProductPlaceholder[];
  categorySlug?: string;
}) {
  const hasOnline = products.some((p) => p.soldOnline);

  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-[100px] sm:px-10">
      {hasOnline && (
        <div className="mb-10">
          <ZoneSelector />
        </div>
      )}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} categorySlug={categorySlug} />
        ))}
      </motion.div>
    </section>
  );
}
