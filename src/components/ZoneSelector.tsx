"use client";

import { useZone } from "@/lib/zone/ZoneContext";
import { ZONES } from "@/lib/shipping/zones";

/**
 * Step 1 — the customer picks their postal zone. All-in bundle prices across
 * the store and cart reflect the chosen zone.
 */
export default function ZoneSelector({ compact = false }: { compact?: boolean }) {
  const { zone, setZone } = useZone();

  return (
    <div className={compact ? "" : "mx-auto max-w-4xl"}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-ember-300">Step 1 — Ship to</p>
        {!zone && <span className="text-xs text-white/50">Choose to see pricing</span>}
      </div>
      <div className={`grid gap-2 ${compact ? "grid-cols-1 sm:grid-cols-3" : "sm:grid-cols-3"}`}>
        {ZONES.map((z) => {
          const active = zone === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => setZone(z.id)}
              aria-pressed={active}
              className={`rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                active
                  ? "border-ember-400/70 bg-ember-500/20 text-white"
                  : "border-white/12 bg-white/[0.04] text-white/75 hover:border-ember-400/40 hover:bg-white/[0.07]"
              }`}
            >
              <span className="block text-sm font-bold uppercase tracking-wide">{z.label}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-white/50">{z.note}</span>
            </button>
          );
        })}
      </div>
      {!compact && (
        <p className="mt-2 text-[11px] text-white/40">
          Prices are in US$ and include postage. Please pick the correct zone — orders shipped to the wrong zone can&apos;t be fulfilled.
        </p>
      )}
    </div>
  );
}
