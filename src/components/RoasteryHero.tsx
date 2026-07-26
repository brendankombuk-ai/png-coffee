"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function RoasteryHero({
  title,
  intro,
  image,
  alt,
}: {
  title: string;
  intro: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ember-800 via-ember-900 to-void-950 pt-24">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-2 md:py-24">
        <div>
          <motion.a
            href="/about"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back To About
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-4xl font-extrabold uppercase tracking-wide text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base"
          >
            {intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] md:-mr-10 md:aspect-auto md:h-[420px] lg:-mr-16"
        >
          <Image src={image} alt={alt} fill priority className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
