"use client";

import { motion } from "framer-motion";
import { productsHero as staticProductsHero } from "@/data/content";

export default function ProductsHero({
  productsHero = staticProductsHero,
}: {
  productsHero?: typeof staticProductsHero;
} = {}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-8 pt-[120px] sm:px-10 sm:pt-[140px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[900px] text-center"
      >
        <h1 className="font-display text-[38px] font-extrabold uppercase leading-[1.1] tracking-[1px] text-white sm:text-[48px] lg:text-[52px]">
          {productsHero.title}
        </h1>
        <div className="mt-[30px] space-y-5">
          {productsHero.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-[1.8] text-white/90 sm:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
