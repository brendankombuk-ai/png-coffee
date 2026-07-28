"use client";

import { useZone } from "@/lib/zone/ZoneContext";
import { useCart } from "@/lib/cart/CartContext";
import { ZONE_LABELS, type Zone } from "@/lib/shipping/zones";

const ZONES: Zone[] = [1, 2, 3];

/**
 * Lets the customer pick their postal zone. All online bundle prices — on
 * product cards and in the cart — reflect the chosen zone, and any bundles
 * already in the cart are re-priced when it changes.
 */
export default function ZoneSelector({ compact = false }: { compact?: boolean }) {
  const { zone, setZone } = useZone();
  const { repriceBundles } = useCart();

  function choose(next: Zone) {
    setZone(next);
    repriceBundles(next);
  }

  return (
    <div className={compact ? "" : "mx-auto max-w-3xl"}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-ember-300">
          Shipping to — select your postal zone
        </p>
        {!zone && (
          <span className="text-xs text-white/50">Prices appear once you choose</span>
        )}
      </div>
      <div className={`grid gap-2 ${compact ? "grid-cols-3" : "sm:grid-cols-3"}`}>
        {ZONES.map((z) => {
          const active = zone === z;
          return (
            <button
              key={z}
              type="button"
              onClick={() => choose(z)}
              aria-pressed={active}
              className={`rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                active
                  ? "border-ember-400/70 bg-ember-500/20 text-white"
                  : "border-white/12 bg-white/[0.04] text-white/75 hover:border-ember-400/40 hover:bg-white/[0.07]"
              }`}
            >
              <span className="block text-sm font-bold uppercase tracking-wide">
                {ZONE_LABELS[z].name}
              </span>
              {!compact && (
                <span className="mt-0.5 block text-[11px] leading-snug text-white/50">
                  {ZONE_LABELS[z].countries}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {!compact && (
        <p className="mt-2 text-[11px] text-white/40">
          Prices are in US$ and include EMS postage. Please select the correct zone — we can&apos;t
          fulfil an order shipped to the wrong zone.
        </p>
      )}
    </div>
  );
}
