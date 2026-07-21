"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon, ShoppingCart } from "lucide-react";
import { cardReveal } from "@/lib/animations";
import type { ProductPlaceholder } from "@/data/content";

export default function ProductCard({ product }: { product: ProductPlaceholder }) {
  return (
    <motion.article
      variants={cardReveal}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-500/10 via-ember-800/10 to-void-950/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[10px] transition-all duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(232,52,28,0.4)]"
    >
      {/* Image area, 4:5 */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-ember-200/15 to-ember-950/40">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-[350ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[350ms] ease-out group-hover:scale-105">
            <ImageIcon
              className="h-10 w-10 text-white/25"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        )}
        <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-ember-400/40 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="space-y-2 px-5 pb-6 pt-5 text-center">
        <h3 className="font-display text-base font-extrabold uppercase tracking-wide text-white sm:text-lg">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-white/65">
          {product.description}
        </p>
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-ember-400/30 bg-ember-500/15 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/90 transition-colors duration-300 group-hover:border-ember-400/70 group-hover:bg-ember-500/25 group-hover:text-ember-100">
          <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          Buy Now
        </span>
      </div>
    </motion.article>
  );
}
