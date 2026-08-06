import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";

/**
 * Verifies and handles Stripe webhook events.
 *
 * Right now this only logs successful payments — there's no order database
 * yet (that's part of the larger e-commerce backend, a separate piece of
 * work from "connect Stripe checkout"). When that's built, this is where
 * you'd create the Order record in Strapi, decrement stock, and trigger the
 * order-confirmation email.
 *
 * Set this route's URL (https://yourdomain.com/api/stripe/webhook) in the
 * Stripe Dashboard under Developers -> Webhooks, subscribed to at least
 * `checkout.session.completed`. Copy the "Signing secret" it gives you into
 * STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook signature or secret missing." },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  let event;
  try {
    // Cloudflare Workers verify signatures with async Web Crypto (SubtleCrypto).
    // The synchronous constructEvent() relies on Node's crypto and throws on
    // the Workers runtime, so we use the async variant plus a SubtleCrypto
    // provider. Verification behaviour is otherwise identical.
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );
  } catch (err) {
    console.error("[stripe webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log(
        `[stripe webhook] Payment received: ${session.id}, amount ${session.amount_total} ${session.currency}, customer ${session.customer_details?.email ?? "unknown"}`
      );
      // TODO once the order backend exists: create an Order entry in
      // Strapi from `session`, decrement Product stock, send the order
      // confirmation email.
      break;
    }
    case "checkout.session.expired": {
      console.log(`[stripe webhook] Checkout session expired: ${event.data.object.id}`);
      break;
    }
    default:
      // Unhandled event types are expected — Stripe sends many event
      // types; we only act on the ones listed above.
      break;
  }

  return NextResponse.json({ received: true });
}
