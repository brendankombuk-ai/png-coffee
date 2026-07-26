"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

type Highlight = { title: string; description: string };

export default function ValueDetailBody({
  paragraphs,
  highlights,
}: {
  paragraphs: string[];
  highlights: Highlight[];
}) {
  return (
    <section className="relative z-10 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-5"
        >
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/75 sm:text-base">
              {p}
            </p>
          ))}
        </motion.div>

        {highlights.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {highlights.map((h) => (
              <motion.div
                key={h.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-ember-400/40"
              >
                <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-ember-300">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {h.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
