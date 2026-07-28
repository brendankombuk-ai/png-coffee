"use client";

import { useZone } from "@/lib/zone/ZoneContext";
import { ZONES, type ZoneId } from "@/lib/shipping/zones";

/**
 * Lets the customer pick their shipping destination (Step 1). All bundle
 * shipping + GST across product cards and the cart reflect the chosen zone,
 * and the cart re-prices automatically when it changes.
 */
export default function ZoneSelector({ compact = false }: { compact?: boolean }) {
  const { zone, setZone } = useZone();

  return (
    <div className={compact ? "" : "mx-auto max-w-4xl"}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-ember-300">
          Step 1 — Ship to
        </p>
        {!zone && <span className="text-xs text-white/50">Choose to see shipping</span>}
      </div>
      <div className={`grid gap-2 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
        {ZONES.map((z) => {
          const active = zone === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => setZone(z.id as ZoneId)}
              aria-pressed={active}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 ${
                active
                  ? "border-ember-400/70 bg-ember-500/20 text-white"
                  : "border-white/12 bg-white/[0.04] text-white/75 hover:border-ember-400/40 hover:bg-white/[0.07]"
              }`}
            >
              <span className="block text-sm font-bold">{z.label}</span>
              {!compact && z.blurb && (
                <span className="mt-0.5 block text-[11px] leading-snug text-white/50">{z.blurb}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
