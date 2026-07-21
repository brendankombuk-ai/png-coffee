"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { featureCards as staticFeatureCards, type FeatureCard } from "@/data/content";
import { staggerContainer, cardReveal } from "@/lib/animations";

function TiltCard({ card }: { card: FeatureCard }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.a
      href={card.href}
      variants={cardReveal}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX as MotionValue<number>,
        rotateY: springY as MotionValue<number>,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(232,52,28,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-200"
    >
      <span className="absolute left-5 top-5 z-10 font-display text-xs font-bold tracking-[0.2em] text-white/70">
        {card.index}
      </span>

      <div className="relative h-64 w-full overflow-hidden sm:h-72">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-ember-400/50 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="relative -mt-14 space-y-2 px-6 pb-7 pt-0">
        <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/75">
          {card.description}
        </p>
        <span className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold uppercase tracking-widest text-ember-300 transition-all duration-300 group-hover:gap-2.5 group-hover:text-ember-200">
          Discover
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

export default function FeatureCards({
  featureCards = staticFeatureCards,
}: {
  featureCards?: FeatureCard[];
} = {}) {
  return (
    <section id="products" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-xl text-center sm:mb-16"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            From Farm To Cup
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-white sm:text-4xl">
            Everything that goes into your cup
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featureCards.map((card) => (
            <TiltCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
