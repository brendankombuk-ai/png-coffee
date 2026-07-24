"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import HeartOfPngCardItem from "./HeartOfPngCardItem";
import type { HeartOfPngCard } from "@/data/content";

export default function HeartOfPngGrid({ cards }: { cards: HeartOfPngCard[] }) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 sm:px-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card) => (
          <HeartOfPngCardItem key={card.id} card={card} />
        ))}
      </motion.div>
    </section>
  );
}
