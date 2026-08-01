"use client";

import { motion } from "framer-motion";
import { ChevronRight, MapPin, Coffee, Package, ShoppingCart, CheckCircle } from "lucide-react";

const STEPS = [
  { n: 1, Icon: MapPin,       label: "Select your zone",        note: "Sets your shipping price" },
  { n: 2, Icon: Coffee,       label: "Choose coffee type",      note: "Dark or Medium roast" },
  { n: 3, Icon: Package,      label: "Pick your bundle",        note: "3, 6 or 10-pack" },
  { n: 4, Icon: ShoppingCart, label: "Proceed to checkout",     note: "Review & pay securely" },
  { n: 5, Icon: CheckCircle,  label: "Order confirmed",         note: "We'll ship straight to you" },
];

export default function ShoppingGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative z-10 mx-auto max-w-[900px] px-6 pb-10 sm:px-10"
    >
      <div className="rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-500/[0.07] via-ember-800/[0.05] to-void-950/60 px-6 py-5 backdrop-blur-sm">
        {/* Header */}
        <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-ember-400">
          How to order
        </p>

        {/* Steps — horizontal on sm+, 2-col grid on mobile */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-start sm:gap-0">
          {STEPS.map(({ n, Icon, label, note }, i) => (
            <div key={n} className="flex sm:flex-1 sm:items-start">
              {/* Step card */}
              <div className="flex flex-1 flex-col items-center gap-1.5 text-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ember-400/30 bg-ember-500/10">
                  <Icon className="h-3.5 w-3.5 text-ember-300" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ember-400/80">
                  Step {n}
                </span>
                <p className="text-xs font-semibold leading-snug text-white/85">{label}</p>
                <p className="text-[10px] leading-snug text-white/40">{note}</p>
              </div>

              {/* Arrow connector — only between steps, hidden on mobile */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:flex sm:items-start sm:pt-3.5 sm:px-1">
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ember-500/40" strokeWidth={2} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll nudge */}
        <p className="mt-4 text-center text-[10px] text-white/30">
          Follow the steps below — you cannot advance until each selection is complete.
        </p>
      </div>
    </motion.div>
  );
}
