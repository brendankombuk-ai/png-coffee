"use client";

import { motion } from "framer-motion";
import { missionSection as staticMissionSection } from "@/data/content";

export default function MissionSection({
  missionSection = staticMissionSection,
}: {
  missionSection?: typeof staticMissionSection;
} = {}) {
  return (
    <section
      id="mission"
      className="relative z-10 bg-void-950 px-4 py-20 text-center sm:px-6 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl"
      >
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
          {missionSection.heading}
        </h2>
        <p className="mt-3 font-display text-lg font-bold text-white sm:text-xl">
          {missionSection.tagline}
        </p>
        <p className="mx-auto mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
          {missionSection.paragraph}
        </p>
      </motion.div>
    </section>
  );
}
