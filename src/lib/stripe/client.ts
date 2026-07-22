import "server-only";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV !== "test") {
  // Only a console warning, not a thrown error — Stripe's SDK requires a
  // non-empty string to construct at all (even at build/import time, before
  // any route is actually called), so we fall back to an obviously-fake
  // placeholder below. Real checkout attempts will fail with a clear 401
  // from Stripe until a real key is set, instead of crashing the build.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY is not set. Checkout will fail until it's added to .env.local."
  );
}

export const stripe = new Stripe(secretKey || "sk_test_not_configured", {
  apiVersion: "2026-06-24.dahlia",
  typescript: true,
});
