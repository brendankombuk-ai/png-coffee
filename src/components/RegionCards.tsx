"use client";

import { motion } from "framer-motion";
import { regions } from "@/data/content";
import { staggerContainer, cardReveal } from "@/lib/animations";

function MountainMark() {
  return (
    <svg viewBox="0 0 64 48" className="h-9 w-11 text-white/90" aria-hidden="true">
      <path
        d="M4 40 L20 14 L28 26 L36 10 L60 40 Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M4 40 L20 14 L28 26 L36 10 L60 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="36" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

export default function RegionCards() {
  return (
    <section id="regions" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-xl text-center sm:mb-16"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            Growing Regions
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-white sm:text-4xl">
            From These Highlands
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {regions.map((region) => (
            <motion.article
              key={region.id}
              variants={cardReveal}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(232,52,28,0.45)]"
            >
              <div
                className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${region.accent}`}
              >
                <MountainMark />
                <span className="absolute right-4 top-4 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-bold text-white/90 backdrop-blur-sm">
                  {region.altitude}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2 px-6 py-6">
                <h3 className="font-display text-lg font-extrabold text-white">
                  {region.name}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {region.notes}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
