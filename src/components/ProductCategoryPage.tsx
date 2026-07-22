"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";
import AnimatedBackground from "./AnimatedBackground";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";
import type { ProductCategoryPageData } from "@/data/content";

/**
 * Shared template for every /products/[slug] page. Takes title, description
 * and products through props so the same component can later be driven by
 * a CMS, JSON file, or API response instead of the static data map.
 */
export default function ProductCategoryPage({
  slug,
  title,
  description,
  products,
  background,
}: ProductCategoryPageData) {
  return (
    <>
      <Navbar />
      <AnimatedBackground {...(background ? { src: background } : {})} />
      <main id="main-content" className="relative">
        {/* ============ HERO TITLE ============ */}
        <section className="relative z-10 mx-auto flex min-h-[46vh] max-w-[1400px] flex-col items-center justify-center px-6 pb-12 pt-[140px] text-center sm:px-10 sm:pt-[160px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[900px]"
          >
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
              {title}
            </h1>
            {description && (
              <p className="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-white/85 sm:text-lg">
                {description}
              </p>
            )}
          </motion.div>
        </section>

        {/* ============ PRODUCT GRID ============ */}
        <ProductGrid products={products} categorySlug={slug} />
      </main>
      <Footer />
    </>
  );
}
