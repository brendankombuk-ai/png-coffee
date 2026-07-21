"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero as staticHero } from "@/data/content";

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

export default function Hero({ hero = staticHero }: { hero?: typeof staticHero }) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1 + ((i * 7) % 3),
        delay: (i % 10) * 0.4,
        duration: 3 + (i % 5),
      })),
    []
  );

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${py * -3}deg) rotateY(${
        px * 3
      }deg)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-void-950"
    >
      {/* Background layer */}
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

      {/* Particles */}
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

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-[92%] max-w-3xl px-2 pt-16"
      >
        <div
          ref={cardRef}
          className="animate-floaty rounded-[40px] border border-white/10 bg-black/35 p-8 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-transform duration-300 ease-out sm:p-12"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-300"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl md:text-6xl"
          >
            {hero.headline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-xl space-y-4"
          >
            {hero.body.map((para, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed text-white/80 sm:text-base ${
                  i === hero.body.length - 1 ? "italic text-white/70" : ""
                }`}
              >
                {para}
              </p>
            ))}
          </motion.div>

          <motion.a
            href="/products"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ember-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_30px_-8px_rgba(232,52,28,0.7)] transition-colors hover:bg-ember-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-200"
          >
            {hero.cta}
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
