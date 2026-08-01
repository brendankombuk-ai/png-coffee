"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ImageIcon, ShoppingCart } from "lucide-react";
import { cardReveal } from "@/lib/animations";
import { useCart } from "@/lib/cart/CartContext";
import { useZone } from "@/lib/zone/ZoneContext";
import { formatPrice } from "@/lib/cart/currency";
import {
  BUNDLE_SIZES,
  BAG_GRAMS,
  bundlePrice,
  type BundleSize,
  type Roast,
  type Grind,
} from "@/lib/shipping/zones";
import type { ProductPlaceholder } from "@/data/content";

export default function ProductCard({
  product,
  categorySlug,
}: {
  product: ProductPlaceholder;
  categorySlug?: string;
}) {
  const { addItem } = useCart();
  const { zone } = useZone();
  const [justAdded, setJustAdded] = useState(false);
  const [tier, setTier] = useState<BundleSize>(6);
  const [grind, setGrind] = useState(product.grindOptions?.[0] ?? "");

  const online = product.soldOnline === true;
  const price = zone ? bundlePrice(zone, tier) : null;

  function handleAddToCart() {
    if (!zone) return;
    const grindSuffix = grind ? ` (${grind})` : "";
    const roastValue: Roast = product.name.toLowerCase().includes("dark") ? "Dark Roast" : "Medium Roast";
    const grindValue: Grind = grind === "Ground" ? "Ground" : "Beans";
    addItem({
      id: `${product.id}::${tier}pk${grind ? `::${grind}` : ""}`,
      productId: product.id,
      name: `${product.name} — ${tier} × ${BAG_GRAMS}g${grindSuffix}`,
      roast: roastValue,
      grind: grindValue,
      size: tier,
      image: product.image,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <motion.article
      variants={cardReveal}
      className="group overflow-hidden rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-500/10 via-ember-800/10 to-void-950/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[10px] transition-all duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(232,52,28,0.4)]"
    >
      {/* Image area, 4:5 */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-ember-200/15 to-ember-950/40">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-[350ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[350ms] ease-out group-hover:scale-105">
            <ImageIcon className="h-10 w-10 text-white/25" strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-ember-400/40 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="space-y-3 px-5 pb-6 pt-5 text-center">
        <h3 className="font-display text-base font-extrabold uppercase tracking-wide text-white sm:text-lg">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-white/65">{product.description}</p>

        {/* Display-only products stop here — no price, no add-to-cart. */}
        {online && (
          <div className="space-y-3 pt-1">
            {/* Bundle size selector */}
            <div className="flex justify-center gap-1.5" role="group" aria-label="Bundle size">
              {BUNDLE_SIZES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  aria-pressed={tier === t}
                  className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-bold transition-colors ${
                    tier === t
                      ? "border-ember-400/70 bg-ember-500/25 text-white"
                      : "border-white/12 bg-white/[0.04] text-white/70 hover:border-ember-400/40"
                  }`}
                >
                  {t} pkts
                </button>
              ))}
            </div>

            {/* Grind selector (optional) */}
            {product.grindOptions && product.grindOptions.length > 0 && (
              <select
                aria-label="Grind"
                value={grind}
                onChange={(e) => setGrind(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2 text-xs text-white outline-none focus:border-ember-400/60 [&>option]:bg-void-950"
              >
                {product.grindOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            )}

            <p className="text-[11px] text-white/45">
              {tier} × {BAG_GRAMS}g ({(tier * BAG_GRAMS) / 1000}kg) · postage included
            </p>

            {/* Price + add, or a prompt to pick a zone */}
            {price !== null ? (
              <>
                <p className="font-display text-xl font-bold text-white">{formatPrice(price)}</p>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ember-400/30 bg-ember-500/15 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/90 transition-colors duration-300 hover:border-ember-400/70 hover:bg-ember-500/25 hover:text-ember-100"
                >
                  {justAdded ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      Add to Cart
                    </>
                  )}
                </button>
              </>
            ) : (
              <p className="rounded-lg border border-ember-400/25 bg-ember-500/5 px-3 py-2 text-[11px] font-semibold text-ember-200">
                Select your postal zone above to see the price
              </p>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
