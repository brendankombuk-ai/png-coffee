"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useZone } from "@/lib/zone/ZoneContext";
import { useCart } from "@/lib/cart/CartContext";
import {
  ZONES,
  PRODUCTS,
  BUNDLE_SIZES,
  bundlePrice,
  bundleWeightGrams,
  type CoffeeProduct,
  type BundleSize,
} from "@/lib/shipping/zones";
import { formatPrice } from "@/lib/cart/currency";

type Step = 1 | 2 | 3;

const STEPS = [
  { n: 1 as Step, label: "Your Zone", Icon: MapPin },
  { n: 2 as Step, label: "Coffee Type", Icon: Coffee },
  { n: 3 as Step, label: "Package", Icon: Package },
];

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28 }),
};

export default function PurchaseWizard() {
  const { zone, setZone } = useZone();
  const { addItem } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [dir, setDir] = useState(1);
  const [product, setProduct] = useState<CoffeeProduct | null>(null);
  const [bundleSize, setBundleSize] = useState<BundleSize>(6);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function goTo(next: Step) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function handleAddToCart() {
    if (!zone || !product) return;
    addItem(
      {
        id: `${product.id}::${bundleSize}`,
        productId: product.id,
        name: `${product.name} · ${bundleSize}-Pack (${bundleSize} × 250g)`,
        roast: product.roast,
        grind: product.grind,
        size: bundleSize,
        image: product.image,
      },
      qty
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  const price = zone ? bundlePrice(zone, bundleSize) : null;
  const total = price !== null ? price * qty : null;
  const zoneName = ZONES.find((z) => z.id === zone)?.label;

  return (
    <section className="relative z-10 mx-auto max-w-[900px] px-6 pb-[100px] sm:px-10">
      {/* Progress indicator */}
      <div className="mb-10 flex items-start gap-0">
        {STEPS.map(({ n, label, Icon }, i) => {
          const done = step > n;
          const active = step === n;
          return (
            <div key={n} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {/* Left connector */}
                <div
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i === 0 ? "invisible" : done || active ? "bg-ember-500/60" : "bg-white/10"
                  }`}
                />
                {/* Circle */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                    done
                      ? "border-ember-400 bg-ember-500 text-white"
                      : active
                      ? "border-ember-400/70 bg-ember-500/20 text-white"
                      : "border-white/15 bg-white/[0.04] text-white/35"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Icon className="h-4 w-4" />}
                </div>
                {/* Right connector */}
                <div
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i === STEPS.length - 1 ? "invisible" : done ? "bg-ember-500/60" : "bg-white/10"
                  }`}
                />
              </div>
              <span
                className={`mt-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  active ? "text-ember-300" : done ? "text-white/60" : "text-white/25"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step panels */}
      <AnimatePresence mode="wait" custom={dir}>
        {step === 1 && (
          <motion.div
            key="step1"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <h2 className="mb-1 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Where are we shipping to?
            </h2>
            <p className="mb-8 text-sm text-white/55">
              Prices are all-in USD and include postage — your zone sets the price.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {ZONES.map((z) => {
                const active = zone === z.id;
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setZone(z.id)}
                    aria-pressed={active}
                    className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                      active
                        ? "border-ember-400/70 bg-ember-500/20 shadow-[0_0_20px_-5px_rgba(232,52,28,0.3)]"
                        : "border-white/12 bg-white/[0.04] hover:border-ember-400/40 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="block text-base font-bold text-white">{z.label}</span>
                    <span className="mt-1 block text-[11px] leading-snug text-white/50">{z.note}</span>
                    {active && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-ember-300">
                        <Check className="h-3 w-3" strokeWidth={3} /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <NextButton
                onClick={() => goTo(2)}
                disabled={!zone}
                label="Next — Choose Coffee"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <h2 className="mb-1 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Choose your coffee
            </h2>
            <p className="mb-8 text-sm text-white/55">
              Select one product to continue.{" "}
              {zoneName && (
                <span className="text-ember-300">
                  Prices shown for {zoneName}.
                </span>
              )}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRODUCTS.map((p) => {
                const selected = product?.id === p.id;
                const fromPrice = zone ? bundlePrice(zone, 3) : null;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProduct(p)}
                    aria-pressed={selected}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                      selected
                        ? "border-ember-400/70 bg-ember-500/15 shadow-[0_0_20px_-5px_rgba(232,52,28,0.3)]"
                        : "border-white/12 bg-white/[0.04] hover:border-ember-400/40 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-ember-200/15 to-ember-950/40">
                      <Image
                        src={p.image}
                        alt={p.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-extrabold uppercase tracking-wide text-white">
                        {p.name}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-white/55 line-clamp-2">
                        {p.description}
                      </p>
                      {fromPrice !== null && (
                        <p className="mt-2 text-xs text-white/60">
                          From{" "}
                          <span className="font-bold text-white">
                            {formatPrice(fromPrice)}
                          </span>
                        </p>
                      )}
                    </div>
                    <div
                      className={`ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                        selected
                          ? "border-ember-400 bg-ember-500 text-white"
                          : "border-white/20 text-transparent"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <BackButton onClick={() => goTo(1)} />
              <NextButton
                onClick={() => goTo(3)}
                disabled={!product}
                label="Next — Select Package"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && product && (
          <motion.div
            key="step3"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <h2 className="mb-1 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Select your bundle
            </h2>
            <p className="mb-8 text-sm text-white/55">
              Choose how many bags per pack, and how many packs.
            </p>

            {/* Chosen product recap */}
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-ember-200/15 to-ember-950/40">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-extrabold uppercase tracking-wide text-white">
                  {product.name}
                </p>
                <p className="text-[11px] text-white/50">
                  {product.roast} · {product.grind} · 250g bags
                </p>
              </div>
              <button
                type="button"
                onClick={() => goTo(2)}
                className="shrink-0 text-[11px] font-semibold text-ember-300 underline hover:text-ember-200"
              >
                Change
              </button>
            </div>

            {/* Bundle size */}
            <div className="mb-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/55">
                Bundle Size
              </p>
              <div className="grid grid-cols-3 gap-3">
                {BUNDLE_SIZES.map((s) => {
                  const p = zone ? bundlePrice(zone, s) : null;
                  const wg = bundleWeightGrams(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setBundleSize(s)}
                      aria-pressed={bundleSize === s}
                      className={`rounded-2xl border px-3 py-4 text-center transition-all duration-200 ${
                        bundleSize === s
                          ? "border-ember-400/70 bg-ember-500/20"
                          : "border-white/12 bg-white/[0.04] hover:border-ember-400/40"
                      }`}
                    >
                      <span className="block font-display text-lg font-bold text-white">
                        {s}-Pack
                      </span>
                      <span className="block text-[11px] text-white/50">{s} × 250g</span>
                      <span className="block text-[10px] text-white/30">
                        {(wg / 1000).toFixed(2)} kg
                      </span>
                      {p !== null && (
                        <span className="mt-1.5 block text-sm font-bold text-ember-200">
                          {formatPrice(p)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">Quantity</p>
                <p className="text-[11px] text-white/40">How many {bundleSize}-Packs?</p>
              </div>
              <div className="flex items-center gap-4 rounded-full border border-white/15 px-3 py-1.5">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-base font-bold text-white">
                  {qty}
                </span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Order summary */}
            {zone && price !== null && total !== null && (
              <dl className="mb-8 space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm">
                <SummaryRow label="Zone">{zoneName}</SummaryRow>
                <SummaryRow label="Product">{product.name}</SummaryRow>
                <SummaryRow label="Bundle">{bundleSize} × 250g bags</SummaryRow>
                <SummaryRow label="Quantity">
                  {qty} pack{qty !== 1 ? "s" : ""}
                </SummaryRow>
                <SummaryRow label="Price per pack">{formatPrice(price)}</SummaryRow>
                <div className="border-t border-white/10 pt-2">
                  <SummaryRow label="Order total" bold>
                    {formatPrice(total)}
                  </SummaryRow>
                </div>
                <p className="pt-0.5 text-[10px] text-white/35">
                  Price includes postage · All in USD
                </p>
              </dl>
            )}

            <div className="flex items-center justify-between gap-4">
              <BackButton onClick={() => goTo(2)} />
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!zone}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ember-500 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-8"
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" strokeWidth={2} />
                    Add to cart
                    {total !== null && <span className="opacity-80">— {formatPrice(total)}</span>}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function NextButton({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full border border-ember-400/30 bg-ember-500/15 px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white/90 transition-colors hover:border-ember-400/70 hover:bg-ember-500/25 hover:text-ember-100 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-sm font-semibold text-white/55 transition-colors hover:border-white/30 hover:text-white/90"
    >
      <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      Back
    </button>
  );
}

function SummaryRow({
  label,
  children,
  bold,
}: {
  label: string;
  children: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/50">{label}</dt>
      <dd className={bold ? "font-bold text-white" : "text-white/80"}>{children}</dd>
    </div>
  );
}
