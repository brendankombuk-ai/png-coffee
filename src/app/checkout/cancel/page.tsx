import Link from "next/link";
import { XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Checkout Cancelled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative flex min-h-screen flex-col items-center justify-center bg-void-950 px-6 text-center"
      >
        <XCircle className="mb-6 h-16 w-16 text-white/40" strokeWidth={1.5} />
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
          Checkout Cancelled
        </h1>
        <p className="mt-4 max-w-md text-white/70">
          No charge was made. Your cart is still saved whenever you&rsquo;re
          ready to try again.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white/85 transition-colors hover:border-ember-400/60 hover:text-ember-200"
        >
          Back to Products
        </Link>
      </main>
      <Footer />
    </>
  );
}
