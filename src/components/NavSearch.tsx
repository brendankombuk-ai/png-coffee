"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { searchSite } from "@/lib/search";

type NavSearchProps = {
  /** Extra classes for the trigger button (icon colour / hover states). */
  className?: string;
  /**
   * "desktop" renders the panel as a dropdown anchored to the navbar;
   * "mobile" renders it as a full overlay so it works from inside the
   * mobile menu.
   */
  variant?: "desktop" | "mobile";
  /** Called when the panel opens/closes — lets the mobile menu react. */
  onOpenChange?: (open: boolean) => void;
};

export default function NavSearch({
  className = "text-white/85 transition-colors hover:text-ember-300",
  variant = "desktop",
  onOpenChange,
}: NavSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const results = useMemo(() => searchSite(query), [query]);
  const trimmed = query.trim();

  const close = () => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  };

  useEffect(() => {
    onOpenChange?.(open);
    if (!open) return;

    const t = window.setTimeout(() => inputRef.current?.focus(), 20);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const first = results[0];
    if (first) {
      window.location.assign(first.href);
    }
  };

  const panel = (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal={variant === "mobile"}
      aria-label="Site search"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={
        variant === "desktop"
          ? "absolute right-0 top-[calc(100%+12px)] z-[1100] w-[min(90vw,26rem)] rounded-[20px] border border-white/10 bg-black/70 p-3 shadow-2xl backdrop-blur-xl"
          : "absolute left-0 top-[calc(100%+8px)] z-[1100] w-[min(78vw,22rem)] rounded-2xl border border-white/10 bg-black/80 p-3 shadow-2xl backdrop-blur-xl"
      }
    >
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Search size={16} strokeWidth={1.75} className="shrink-0 text-white/50" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages and products…"
          aria-label="Search pages and products"
          aria-expanded={results.length > 0}
          aria-controls={listboxId}
          autoComplete="off"
          className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Close search"
          className="shrink-0 rounded-md p-1 text-white/60 transition-colors hover:text-ember-300"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </form>

      {trimmed.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="mt-3 max-h-[min(60vh,22rem)] space-y-1 overflow-y-auto"
        >
          {results.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-white/50">
              No results for &ldquo;{trimmed}&rdquo;
            </li>
          )}
          {results.map((r) => (
            <li key={`${r.type}-${r.href}-${r.title}`} role="option" aria-selected={false}>
              <Link
                href={r.href}
                onClick={close}
                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white/90">{r.title}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ember-300">
                    {r.type}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-xs text-white/50">
                  {r.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Search products"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className={className}
      >
        <Search size={18} strokeWidth={1.75} />
      </button>

      {open && panel}
    </div>
  );
}
