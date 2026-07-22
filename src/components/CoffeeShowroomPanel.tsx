"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { coffeeShowroom as staticShowroom } from "@/data/content";

export default function CoffeeShowroomPanel({
  showroom = staticShowroom,
}: {
  showroom?: typeof staticShowroom;
} = {}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-14 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid overflow-hidden rounded-[28px] border border-black/10 bg-gradient-to-br from-ember-600 to-ember-800 shadow-[0_25px_70px_-20px_rgba(232,52,28,0.45)] md:grid-cols-2"
      >
        <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-14">
          <h2 className="font-display text-2xl font-extrabold uppercase italic tracking-wide text-white sm:text-3xl">
            {showroom.heading}
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/90 sm:text-base">
            {showroom.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <ul className="space-y-1">
              {showroom.items.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>

            <p>{showroom.outro}</p>
          </div>
        </div>

        <div className="relative min-h-[280px] sm:min-h-[380px]">
          <Image
            src={showroom.image}
            alt={showroom.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ember-800/25" />
        </div>
      </motion.div>
    </section>
  );
}
