"use client";

import { motion } from "framer-motion";
import { story as defaultStory } from "@/data/content";
import { staggerContainer, fadeUp } from "@/lib/animations";

type Value = { title: string; description: string };

export default function StorySection({
  id = "story",
  eyebrow,
  heading,
  paragraphs,
  values,
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  values?: Value[];
} = {}) {
  const content = {
    eyebrow: eyebrow ?? defaultStory.eyebrow,
    heading: heading ?? defaultStory.heading,
    paragraphs: paragraphs ?? defaultStory.paragraphs,
    values: values ?? defaultStory.values,
  };

  return (
    <section id={id} className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-white sm:text-4xl">
            {content.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-10 space-y-5"
        >
          {content.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/75 sm:text-base">
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {content.values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-ember-400/40"
            >
              <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-ember-300">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {v.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
