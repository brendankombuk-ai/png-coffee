"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { roasteryEquipment as staticEquipment, type EquipmentItem } from "@/data/content";
import { staggerContainer, fadeUp } from "@/lib/animations";

/**
 * White strip of equipment tiles shown in the roastery's showroom, matching
 * the site's white-panel treatment used by ExploreBanner. Each tile shows a
 * real cut-out photo of the machine (transparent PNG, object-contain) above
 * its label.
 */
export default function EquipmentShowcaseRow({
  equipment = staticEquipment,
}: {
  equipment?: EquipmentItem[];
} = {}) {
  return (
    <section aria-label="Roastery equipment on display" className="relative z-10 bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-6 py-12 sm:grid-cols-3 sm:px-10 sm:py-14 lg:grid-cols-5"
      >
        {equipment.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            className="group flex flex-col items-center gap-3 rounded-xl border border-black/5 bg-black/[0.02] px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/30 hover:shadow-[0_16px_40px_-18px_rgba(232,52,28,0.45)]"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.05]"
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
