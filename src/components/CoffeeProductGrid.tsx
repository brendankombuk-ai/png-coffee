"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, cardReveal } from "@/lib/animations";
import { formatPrice } from "@/lib/cart/currency";
import ZoneSelector from "./ZoneSelector";
import BundleModal from "./BundleModal";
import { PRODUCTS, type CoffeeProduct } from "@/lib/shipping/zones";

export default function CoffeeProductGrid() {
  const [active, setActive] = useState<CoffeeProduct | null>(null);
  const [open, setOpen] = useState(false);

  function selectBundle(product: CoffeeProduct) {
    setActive(product);
    setOpen(true);
  }

  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-[100px] sm:px-10">
      {/* Step 1 — choose zone */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <ZoneSelector />
      </div>

      {/* Step 2 — four products */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PRODUCTS.map((product) => (
          <motion.article
            key={product.id}
            variants={cardReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-500/10 via-ember-800/10 to-void-950/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[10px] transition-all duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(232,52,28,0.4)]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-ember-200/15 to-ember-950/40">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-5 transition-transform duration-[350ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-ember-400/40 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
              <h3 className="font-display text-base font-extrabold uppercase tracking-wide text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-ember-300">
                {product.roast} · {product.grind}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{product.description}</p>
              <p className="mt-3 text-sm text-white/70">
                From <span className="font-display text-lg font-bold text-white">{formatPrice(product.bundles[3].price)}</span>
              </p>
              <button
                type="button"
                onClick={() => selectBundle(product)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-ember-400/30 bg-ember-500/15 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white/90 transition-colors duration-300 hover:border-ember-400/70 hover:bg-ember-500/25 hover:text-ember-100"
              >
                Select Bundle
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <BundleModal product={active} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
