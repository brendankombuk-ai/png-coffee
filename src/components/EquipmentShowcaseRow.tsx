"use client";

import { motion } from "framer-motion";
import { roasteryEquipment as staticEquipment, type EquipmentItem } from "@/data/content";
import { staggerContainer, fadeUp } from "@/lib/animations";

function MachineMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7 text-ember-600" aria-hidden="true">
      <rect x="10" y="14" width="28" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 14 V8 h16 v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 24 h16 M16 30 h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * White strip of equipment tiles shown in the roastery's showroom, matching
 * the site's white-panel treatment used by ExploreBanner. Renders styled
 * placeholder tiles (icon + label) until real product photography is
 * supplied — swap in an `image` field on EquipmentItem and an <Image> here.
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
            role="img"
            aria-label={item.alt}
            className="group flex flex-col items-center gap-3 rounded-xl border border-black/5 bg-black/[0.02] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(232,52,28,0.45)]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-50 transition-colors duration-300 group-hover:bg-ember-100">
              <MachineMark />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-void-900/70">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
