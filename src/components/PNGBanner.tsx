"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nav, banner } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PNGBanner({
  lineOne,
  lineTwo,
}: {
  lineOne?: string;
  lineTwo?: string;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="PNG Grown" className="relative z-10 px-4 sm:px-6">
      <div
        ref={ref}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-black/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_25px_70px_-15px_rgba(232,52,28,0.35)]"
      >
        <Image
          src="/images/png-banner-bg.jpg"
          alt=""
          fill
          className="object-cover object-right"
        />

        <div className="relative z-10 flex items-center justify-between gap-4 px-6 py-6 sm:px-10 sm:py-8">
          <Image
            src={nav.logo}
            alt="PNG Coffee logo"
            width={140}
            height={52}
            className="hidden h-9 w-auto shrink-0 brightness-0 sm:block sm:h-11 md:h-12"
          />

          <div className="mx-auto text-center">
            <p className="font-display text-xl font-extrabold leading-tight tracking-tight text-ember-500 sm:text-2xl md:text-3xl">
              {lineOne ?? banner.lineOne}
            </p>
            <p className="mt-0.5 font-display text-sm font-bold uppercase tracking-[0.15em] text-void-900 sm:text-base md:text-lg">
              {lineTwo ?? banner.lineTwo}
            </p>
          </div>

          <div aria-hidden="true" className="hidden w-24 shrink-0 sm:block sm:w-28" />
        </div>
      </div>
    </section>
  );
}
