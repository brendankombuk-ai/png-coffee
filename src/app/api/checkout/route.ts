import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { CURRENCY, toStripeAmount } from "@/lib/cart/currency";
import {
  bundlePrice,
  isBundleTier,
  isZone,
  zoneAllowedCountries,
} from "@/lib/shipping/zones";

type CheckoutRequestItem = {
  id: string;
  name: string;
  bundleTier: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  let body: { items?: CheckoutRequestItem[]; zone?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Zone is required — it determines the all-in bundle price and the countries
  // the customer is allowed to ship to.
  const zone = body.zone;
  if (!isZone(zone)) {
    return NextResponse.json(
      { error: "Please choose your postal zone before checking out." },
      { status: 400 }
    );
  }

  const items = body.items;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Validate each line and price it SERVER-SIDE from the zone + bundle tier —
  // never trust an amount sent from the browser for anything touching money.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    if (
      typeof item.id !== "string" ||
      typeof item.name !== "string" ||
      !isBundleTier(item.bundleTier) ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0 ||
      item.quantity > 99
    ) {
      return NextResponse.json({ error: "Invalid item in cart." }, { status: 400 });
    }
    line_items.push({
      quantity: item.quantity,
      price_data: {
        currency: CURRENCY.toLowerCase(),
        unit_amount: toStripeAmount(bundlePrice(zone, item.bundleTier)),
        product_data: {
          name: item.name,
          metadata: { productId: item.id, bundleTier: String(item.bundleTier), zone: String(zone) },
        },
      },
    });
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;
  const allowedCountries = zoneAllowedCountries(
    zone
  ) as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      // Bundle prices already include EMS postage, so no separate shipping line.
      shipping_address_collection: { allowed_countries: allowedCountries },
      // Voucher / coupon support (Stripe promotion codes).
      allow_promotion_codes: true,
      // Optional order note from the customer.
      custom_fields: [
        {
          key: "ordernote",
          label: { type: "custom", custom: "Add a message about your order (optional)" },
          type: "text",
          optional: true,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Could not start checkout. Please try again in a moment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
