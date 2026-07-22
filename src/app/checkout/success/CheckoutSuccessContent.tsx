"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart/CartContext";

export default function CheckoutSuccessContent() {
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    // Clear the cart once the customer has actually reached Stripe's
    // success redirect — i.e. payment genuinely went through.
    clearCart();
    setCleared(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative flex min-h-screen flex-col items-center justify-center bg-void-950 px-6 text-center"
      >
        <CheckCircle2 className="mb-6 h-16 w-16 text-ember-400" strokeWidth={1.5} />
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
          Order Confirmed
        </h1>
        <p className="mt-4 max-w-md text-white/70">
          Thank you for your order! A confirmation email is on its way. Your
          PNG Coffee will be roasted and shipped shortly.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-full bg-ember-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-ember-400"
        >
          Continue Shopping
        </Link>
        {!cleared && <span className="sr-only">Finalizing your order…</span>}
      </main>
      <Footer />
    </>
  );
}
