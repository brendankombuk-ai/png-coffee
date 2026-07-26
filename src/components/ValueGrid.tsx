"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { valueCards as staticValueCards, type ValueCard } from "@/data/content";
import { staggerContainer, cardReveal } from "@/lib/animations";

function SealMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <circle cx="32" cy="26" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M23 40 L19 58 L32 50 L45 58 L41 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M25 26 L30 31 L40 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlameMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <path
        d="M32 6 C24 18 18 24 18 36 a14 14 0 0 0 28 0 c0-6-3-9-5-12 c-1 5-4 7-4 7 c1-8-4-16-5-25 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CupMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <path d="M14 24 h28 v18 a14 14 0 0 1-14 14 a14 14 0 0 1-14-14 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M42 28 h4 a7 7 0 0 1 0 14 h-4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M22 14 q3 4 0 8 M30 14 q3 4 0 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function GearMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-white/90" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a5 5 0 0 0-6.7 6.7L3 18l3 3 5-5a5 5 0 0 0 6.7-6.7l-2.8 2.8a2 2 0 1 1-2.83-2.83Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const icons: Record<ValueCard["icon"], () => JSX.Element> = {
  seal: SealMark,
  flame: FlameMark,
  cup: CupMark,
  gear: GearMark,
};

function ValueCardItem({ card, index }: { card: ValueCard; index: number }) {
  const Icon = icons[card.icon];
  return (
    <motion.a
      href={card.href ?? `/about/${card.slug}`}
      variants={cardReveal}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-200"
    >
      <div
        className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]`}
      >
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        <span className="absolute left-4 top-4 font-display text-xs font-bold tracking-[0.2em] text-white/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${card.accent} shadow-[0_4px_14px_rgba(0,0,0,0.4)]`}
        >
          <span className="scale-[0.6]">
            <Icon />
          </span>
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
        {card.title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
        {card.description}
        <span className="ml-1.5 inline-flex translate-y-[1px] items-center text-ember-300 transition-all duration-300 group-hover:translate-x-1">
          &#8212;&#8594;
        </span>
      </p>
    </motion.a>
  );
}

export default function ValueGrid({
  valueCards = staticValueCards,
}: {
  valueCards?: ValueCard[];
} = {}) {
  return (
    <section className="relative z-10 bg-void-950 px-4 py-20 sm:px-6 sm:py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-4xl grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2"
      >
        {valueCards.map((card, i) => (
          <ValueCardItem key={card.id} card={card} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
