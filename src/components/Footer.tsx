import Image from "next/image";
import { nav, site } from "@/data/content";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 mt-16 border-t border-white/10 bg-black/40 px-4 py-12 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Image
            src={nav.logo}
            alt="PNG Coffee \u2014 SwissXpresso (PNG) Ltd"
            width={140}
            height={52}
            className="h-9 w-auto"
          />
          <p className="max-w-xs text-sm text-white/60">{site.description}</p>
        </div>

        <div className="text-sm text-white/60">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ember-400">
            Get In Touch
          </p>
          <p className="mt-2">hello@pngcoffee.com</p>
          <p>{site.location}</p>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/35">
        &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </p>
    </footer>
  );
}
