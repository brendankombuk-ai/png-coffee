"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { tourismCards as staticTourismCards, type TourismCard } from "@/data/content";
import { staggerContainer, cardReveal } from "@/lib/animations";

function MaskMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <path d="M32 6 L54 16 L54 32 Q54 50 32 58 Q10 50 10 32 L10 16 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 24 L28 24 M36 24 L44 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 32 L32 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 42 Q32 48 42 42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IslandMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <path d="M6 42 Q20 34 32 42 Q44 50 58 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 42 Q22 24 30 14 Q32 24 26 42 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 50 Q32 58 58 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WaveMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <path d="M6 24 Q14 16 22 24 T38 24 T54 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 36 Q14 28 22 36 T38 36 T54 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 48 Q14 40 22 48 T38 48 T54 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrackMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <path d="M8 54 Q18 40 14 28 Q10 16 22 10 Q34 4 38 16 Q42 28 54 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
      <circle cx="8" cy="54" r="3" fill="currentColor" />
      <circle cx="54" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

function PeakMark() {
  return (
    <svg viewBox="0 0 64 48" className="h-10 w-11 text-white/90" aria-hidden="true">
      <path d="M4 40 L20 14 L28 26 L36 10 L60 40 Z" fill="currentColor" opacity="0.18" />
      <path d="M4 40 L20 14 L28 26 L36 10 L60 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M30 16 L32 18 L36 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BirdMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-white/90" aria-hidden="true">
      <path d="M32 34 Q20 14 4 16 Q14 26 20 32 Q10 32 4 40 Q18 42 26 36 Q28 46 22 56 Q34 52 34 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="33" cy="30" r="3.4" fill="currentColor" />
      <path d="M36 28 L44 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const icons: Record<TourismCard["icon"], () => JSX.Element> = {
  mask: MaskMark,
  island: IslandMark,
  wave: WaveMark,
  track: TrackMark,
  peak: PeakMark,
  bird: BirdMark,
};

function Card({ card }: { card: TourismCard }) {
  const Icon = icons[card.icon];
  const body = (
    <motion.article
      variants={cardReveal}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-[28px] border border-white/[0.12] bg-[rgba(20,20,20,0.45)] p-7 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[20px] ${card.href ? "cursor-pointer" : ""}`}
    >
      <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
        {card.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-[15px]">
        {card.description}
      </p>
      <div className="relative mt-5 h-[180px] w-full overflow-hidden rounded-[18px]">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span
          className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${card.accent} shadow-[0_4px_14px_rgba(0,0,0,0.4)]`}
        >
          <span className="scale-[0.55]">
            <Icon />
          </span>
        </span>
      </div>
    </motion.article>
  );

  if (card.href) {
    const isExternal = /^https?:\/\//.test(card.href);
    if (isExternal) {
      return (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${card.title} (opens in a new tab)`}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-200"
        >
          {body}
        </a>
      );
    }
    return (
      <Link href={card.href} aria-label={card.title} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-200">
        {body}
      </Link>
    );
  }

  return body;
}

export default function TourismCardGrid({
  tourismCards = staticTourismCards,
}: {
  tourismCards?: TourismCard[];
} = {}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-24 sm:px-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-7 sm:grid-cols-2"
      >
        {tourismCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </motion.div>
    </section>
  );
}
