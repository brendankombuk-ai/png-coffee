"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function EquipmentGallery({
  items,
}: {
  items: { label: string; alt: string; image: string }[];
}) {
  return (
    <section className="relative bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-12 sm:grid-cols-3 sm:px-10 lg:grid-cols-5"
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-void-900/10 bg-gradient-to-b from-void-900/[0.02] to-void-900/[0.06] p-4 text-center transition-colors duration-300 hover:border-ember-500/30 hover:from-ember-500/[0.04] hover:to-void-900/[0.06]"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-void-900/70">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
