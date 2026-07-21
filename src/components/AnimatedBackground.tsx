"use client";

import Image from "next/image";

type AnimatedBackgroundProps = {
  /** Path under /public. Defaults to the same processing imagery used on the Products page. */
  src?: string;
  alt?: string;
};

/**
 * Shared full-screen "living background": fixed behind all content, slow
 * cinematic zoom + drift (Ken Burns style), same dark overlay treatment as
 * the rest of the site. Used on the homepage hero and on every product
 * category page so navigating between them feels continuous.
 */
export default function AnimatedBackground({
  src = "/images/our-coffee.jpg",
  alt = "",
}: AnimatedBackgroundProps) {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-void-950">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        role="presentation"
        className="animate-ken-burns object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/80" />
    </div>
  );
}
