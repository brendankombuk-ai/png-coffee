"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { nav } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-1/2 top-5 z-[1000] w-[95%] max-w-6xl -translate-x-1/2">
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between rounded-[20px] border border-white/10 px-4 py-2.5 backdrop-blur-xl transition-colors duration-500 sm:px-6 ${
            scrolled ? "bg-black/45" : "bg-black/25"
          }`}
        >
          <a href="/" className="flex items-center gap-2" aria-label="PNG Coffee home">
            <Image
              src={nav.logo}
              alt="PNG Coffee \u2014 SwissXpresso (PNG) Ltd"
              width={168}
              height={62}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <button
              aria-label="Search products"
              className="text-white/85 transition-colors hover:text-ember-300"
            >
              <Search size={18} strokeWidth={1.75} />
            </button>
            <button
              aria-label="View cart"
              className="text-white/85 transition-colors hover:text-ember-300"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
            </button>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-white md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/70 p-3 backdrop-blur-xl md:hidden"
          >
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1 flex items-center gap-5 px-3 py-1.5">
              <button aria-label="Search products" className="text-white/85">
                <Search size={18} strokeWidth={1.75} />
              </button>
              <button aria-label="View cart" className="text-white/85">
                <ShoppingBag size={18} strokeWidth={1.75} />
              </button>
            </li>
          </motion.ul>
        )}
      </motion.header>
    </div>
  );
}
