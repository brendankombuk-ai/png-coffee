"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { useZone } from "@/lib/zone/ZoneContext";
import { formatPrice } from "@/lib/cart/currency";
import ZoneSelector from "./ZoneSelector";
import {
  BUNDLE_SIZES,
  bundlePrice,
  bundleWeightGrams,
  type BundleSize,
  type CoffeeProduct,
} from "@/lib/shipping/zones";

export default function BundleModal({
  product,
  open,
  onClose,
}: {
  product: CoffeeProduct | null;
  open: boolean;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const { zone } = useZone();
  const [size, setSize] = useState<BundleSize>(6);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !product) return null;

  const bundle = product.bundles[size];
  const weightG = bundleWeightGrams(size);
  const price = zone ? bundlePrice(zone, size) : null;
  const inStock = bundle.stock > 0;

  function handleAdd() {
    if (!zone || !product || !inStock) return;
    addItem(
      {
        id: `${product.id}::${size}`,
        productId: product.id,
        name: `${product.name} · ${size}-Pack (${size} × 350g)`,
        roast: product.roast,
        grind: product.grind,
        size,
        image: product.image,
      },
      qty
    );
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Choose a bundle for ${product.name}`}
            className="relative z-[1201] flex max-h-[90vh] w-[min(560px,94vw)] flex-col overflow-hidden rounded-3xl border border-ember-500/25 bg-void-950 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
                  <Image src={product.image} alt={product.alt} fill sizes="64px" className="object-contain p-1.5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-extrabold uppercase tracking-wide">{product.name}</h2>
                  <p className="text-xs text-white/55">{product.roast} · {product.grind} · 350g bags</p>
                </div>
              </div>
              <button aria-label="Close" onClick={onClose} className="text-white/60 transition-colors hover:text-white">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {!zone && (
                <div className="rounded-xl border border-ember-400/25 bg-ember-500/[0.06] p-4">
                  <ZoneSelector compact />
                </div>
              )}

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/55">Bundle size</p>
                <div className="grid grid-cols-3 gap-2">
                  {BUNDLE_SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                      className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                        size === s ? "border-ember-400/70 bg-ember-500/20" : "border-white/12 bg-white/[0.04] hover:border-ember-400/40"
                      }`}
                    >
                      <span className="block text-base font-bold">{s}-Pack</span>
                      <span className="block text-[11px] text-white/50">{s} × 350g</span>
                    </button>
                  ))}
                </div>
              </div>

              <dl className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
                <Row label="Price (incl. postage)">
                  {price !== null ? <span className="font-bold">{formatPrice(price)}</span> : <span className="text-ember-200">select a zone</span>}
                </Row>
                <Row label="Total weight">{(weightG / 1000).toFixed(2)} kg</Row>
                <Row label="Availability">
                  {inStock ? <span className="text-emerald-300">In stock</span> : <span className="text-ember-300">Out of stock</span>}
                </Row>
              </dl>

              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-white/55">Quantity</p>
                <div className="flex items-center gap-3 rounded-full border border-white/15 px-2 py-1">
                  <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-white/70 hover:text-white">
                    <Minus size={15} />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                  <button aria-label="Increase" onClick={() => setQty((q) => Math.min(99, q + 1))} className="text-white/70 hover:text-white">
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-void-950 p-5">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!zone || !inStock}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {justAdded ? (
                  <><Check className="h-4 w-4" strokeWidth={2.5} /> Added to cart</>
                ) : !zone ? (
                  "Select a shipping zone first"
                ) : !inStock ? (
                  "Out of stock"
                ) : (
                  <><ShoppingCart className="h-4 w-4" strokeWidth={2} /> Add {qty} × {size}-Pack — {formatPrice((price ?? 0) * qty)}</>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/55">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
