"use client";

import { motion } from "framer-motion";
import { pngTourism as staticPngTourism } from "@/data/content";

export default function TourismHero({
  pngTourism = staticPngTourism,
}: {
  pngTourism?: typeof staticPngTourism;
} = {}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-[120px] sm:px-10 sm:pt-[140px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[900px] text-center"
      >
        <h1 className="font-display text-[38px] font-extrabold uppercase leading-[1.1] tracking-[1px] text-white sm:text-[48px] lg:text-[56px]">
          {pngTourism.title}
        </h1>
        <div className="mt-7 space-y-5">
          {pngTourism.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-[1.8] text-white/[0.92] sm:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
