"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ValueDetailHero({
  image,
  alt,
  eyebrow,
  title,
  intro,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative flex min-h-[56svh] items-end overflow-hidden bg-void-950 pb-16 pt-32 sm:min-h-[60svh]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-void-950" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6">
        <motion.a
          href="/about"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-ember-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-200"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back To About
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-300"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}
