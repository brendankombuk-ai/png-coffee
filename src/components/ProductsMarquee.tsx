"use client";

import Image from "next/image";
import { useState } from "react";

const IMAGES = [
  { src: "/images/products/marquee/marquee-1.png", alt: "PNG Coffee Whole Beans product range" },
  { src: "/images/products/marquee/marquee-2.png", alt: "PNG Coffee Ground Coffee product range" },
  { src: "/images/products/marquee/marquee-3.png", alt: "PNG Coffee Drip Coffee product range" },
  { src: "/images/products/marquee/marquee-4.png", alt: "PNG Coffee Nespresso-compatible Capsules range" },
];

export default function ProductsMarquee() {
  const [paused, setPaused] = useState(false);
  const tiles = [...IMAGES, ...IMAGES];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden pb-2 pt-2 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={() => setPaused(true)}
      onMouseUp={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex w-max gap-3 sm:gap-5 lg:gap-8"
        style={{
          animation: "marquee 50s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {tiles.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 aspect-video overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 w-[80vw] sm:w-[560px] lg:w-[860px]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              quality={100}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 560px, 860px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>

    <p className="mt-3 mb-8 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-white/35">
      Hold to pause · Release to resume
    </p>
  );
}
