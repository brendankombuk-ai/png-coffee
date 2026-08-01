"use client";

import { motion } from "framer-motion";
import { products } from "@/data/content";
import { staggerContainer, cardReveal } from "@/lib/animations";

function BeanMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9 text-white/90" aria-hidden="true">
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="17"
        fill="currentColor"
        opacity="0.15"
        transform="rotate(-20 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(-20 32 32)"
      />
      <path
        d="M20 24 Q32 32 20 40"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-20 32 32)"
      />
    </svg>
  );
}

export default function ProductCards() {
  return (
    <section id="products" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-xl text-center sm:mb-16"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            Shop The Range
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-white sm:text-4xl">
            Our Coffee, Ready For Your Cup
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              variants={cardReveal}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(232,52,28,0.45)]"
            >
              <div
                className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${product.accent}`}
              >
                <BeanMark />
                <span className="absolute right-4 top-4 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-bold text-white/90 backdrop-blur-sm">
                  {product.weight}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2 px-6 py-6">
                <h3 className="font-display text-lg font-extrabold text-white">
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg font-extrabold text-ember-300">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/85 transition-colors duration-300 hover:border-ember-400 hover:bg-ember-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-200"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
