"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import ProductCard from "./ProductCard";
import type { ProductPlaceholder } from "@/data/content";

export default function ProductGrid({
  products,
}: {
  products: ProductPlaceholder[];
}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-[100px] sm:px-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}
