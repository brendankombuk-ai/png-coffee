"use client";

import { motion } from "framer-motion";
import { exploreLinks as staticExploreLinks } from "@/data/content";

export default function ExploreBanner({
  exploreLinks = staticExploreLinks,
}: {
  exploreLinks?: typeof staticExploreLinks;
} = {}) {
  return (
    <section aria-label="Explore" className="relative z-10 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
      >
        {exploreLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="group flex flex-col items-center justify-center gap-1.5 px-6 py-8 text-center transition-colors duration-300 hover:bg-black/[0.03] sm:py-10"
          >
            <span className="font-display text-base font-extrabold uppercase tracking-wide text-void-900 sm:text-lg">
              {link.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-void-900/50 transition-all duration-300 group-hover:gap-2.5 group-hover:text-ember-600">
              Explore More
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
