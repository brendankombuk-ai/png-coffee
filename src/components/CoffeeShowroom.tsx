"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function CoffeeShowroom({
  heading,
  paragraph,
  bullets,
  closing,
  image,
  alt,
}: {
  heading: string;
  paragraph: string;
  bullets: string[];
  closing: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative bg-void-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            {paragraph}
          </p>
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-white/85 sm:text-base">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-500/20 text-ember-300">
                  <Check size={12} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-white/60 sm:text-base">
            {closing}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] md:aspect-[4/5]"
        >
          <Image src={image} alt={alt} fill className="object-cover" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}
