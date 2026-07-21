"use client";

import Image from "next/image";

export default function TribalBackdrop({ src }: { src?: string }) {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden">
      {src ? (
        <Image src={src} alt="" fill priority className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#241009,#020101_70%)]" />
      )}
      {/* rgba(0,0,0,0.65) flat overlay */}
      <div className="absolute inset-0 bg-black/65" />
      {/* 180deg gradient overlay, rgba(0,0,0,0.55) -> rgba(0,0,0,0.75) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/75" />
    </div>
  );
}
