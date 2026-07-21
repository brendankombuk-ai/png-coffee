"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

export default function PageHero({
  eyebrow,
  headline,
  body,
}: {
  eyebrow: string;
  headline: string;
  body: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        left: `${(i * 41) % 100}%`,
        top: `${(i * 59) % 100}%`,
        size: 1 + ((i * 5) % 3),
        delay: (i % 10) * 0.4,
        duration: 3 + (i % 5),
      })),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[72svh] items-center justify-center overflow-hidden bg-void-950 pt-24 sm:min-h-[78svh]"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-10 will-change-transform"
      >
        <Image
          src="/backgrounds/nebula-red.jpg"
          alt=""
          fill
          priority
          role="presentation"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-white/70"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-[92%] max-w-3xl px-2">
        <div className="rounded-[40px] border border-white/10 bg-black/35 p-8 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-300"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl md:text-6xl"
          >
            {headline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-xl space-y-4"
          >
            {body.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-white/80 sm:text-base">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
