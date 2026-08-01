"use client";

import { motion } from "framer-motion";
import { storyIntro as staticStoryIntro } from "@/data/content";

export default function StoryIntro({
  storyIntro = staticStoryIntro,
}: {
  storyIntro?: typeof staticStoryIntro;
} = {}) {
  return (
    <section className="relative z-10 bg-void-950 px-4 pb-8 pt-20 sm:px-6 sm:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="font-display text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
          {storyIntro.heading}
        </h1>
        <div className="mt-6 space-y-4">
          {storyIntro.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-white/70 sm:text-base"
            >
              {p}
            </p>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="mt-6 inline-block h-1.5 w-1.5 rounded-full bg-ember-500"
        />
      </motion.div>
    </section>
  );
}
