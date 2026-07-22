"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Single large rounded showcase image used by Barista Training and Coffee
 * Equipment Service — same card border/shadow treatment as TourismCardGrid,
 * same hover zoom as ProductCategoryGrid.
 */
export default function ImageShowcase({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-24 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[28px] border border-white/[0.12] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>
    </section>
  );
}
