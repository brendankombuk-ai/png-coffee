"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { cardReveal } from "@/lib/animations";
import type { HeartOfPngCard } from "@/data/content";

export default function HeartOfPngCardItem({ card }: { card: HeartOfPngCard }) {
  return (
    <motion.article
      variants={cardReveal}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(20,20,20,0.6)] shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[10px]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.03]">
        {card.image ? (
          <Image
            src={card.image}
            alt={card.alt ?? card.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="h-9 w-9 text-white/20" strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-white sm:text-base">
          {card.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}
