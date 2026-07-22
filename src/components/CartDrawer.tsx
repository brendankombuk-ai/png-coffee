"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/cart/currency";

export default function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart, removeItem, setQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    setCheckoutError(null);
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout. Please try again.");
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Something went wrong.");
      setIsCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-[1101] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-void-950 text-white shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-wide">
                Your Cart {itemCount > 0 && <span className="text-white/50">({itemCount})</span>}
              </h2>
              <button
                aria-label="Close cart"
                onClick={closeCart}
                className="text-white/70 transition-colors hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={40} className="text-white/25" strokeWidth={1.5} />
                <p className="text-white/60">Your cart is empty.</p>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/85 transition-colors hover:border-ember-400/60 hover:text-ember-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white/5">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag size={20} className="text-white/20" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-snug">{item.name}</p>
                          <button
                            aria-label={`Remove ${item.name} from cart`}
                            onClick={() => removeItem(item.id)}
                            className="shrink-0 text-white/40 transition-colors hover:text-ember-300"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-white/15 px-1.5 py-1">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              className="text-white/70 transition-colors hover:text-white"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-4 text-center text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              className="text-white/70 transition-colors hover:text-white"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-white/90">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-base font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mb-4 text-xs text-white/45">
                    Shipping and any applicable taxes are calculated at checkout.
                  </p>
                  {checkoutError && (
                    <p className="mb-3 text-xs text-ember-300">{checkoutError}</p>
                  )}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full rounded-full bg-ember-500 py-3 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isCheckingOut ? "Redirecting to checkout…" : "Checkout"}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
