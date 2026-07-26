"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function SimpleDetailHero({
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
    <section className="relative bg-void-950">
      <div className="mx-auto max-w-3xl px-6 pb-10 pt-32 text-center sm:px-10">
        <motion.a
          href="/about"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-ember-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-200"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back To About
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base"
        >
          {intro}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative h-[320px] w-full sm:h-[440px] lg:h-[520px]"
      >
        <Image src={image} alt={alt} fill priority className="object-cover" />
      </motion.div>
    </section>
  );
}
