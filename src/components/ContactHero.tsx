"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px]">
      <Image
        src="/images/our-coffee.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-void-950" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-[38px] font-extrabold uppercase leading-[1.1] tracking-[1px] text-white sm:text-[52px]">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
