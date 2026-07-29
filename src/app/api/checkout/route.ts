import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { CURRENCY, toStripeAmount } from "@/lib/cart/currency";
import {
  getProduct,
  bundlePrice,
  zoneAllowedCountries,
  isZoneId,
  isBundleSize,
} from "@/lib/shipping/zones";

type ReqItem = { productId: string; size: number; quantity: number };

export async function POST(req: NextRequest) {
  let body: { items?: ReqItem[]; zone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const zone = body.zone;
  if (!isZoneId(zone)) {
    return NextResponse.json({ error: "Please choose your postal zone." }, { status: 400 });
  }

  const items = body.items;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Price every line server-side from the zone grid (all-in — postage included).
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const product = getProduct(item.productId);
    if (
      !product ||
      !isBundleSize(item.size) ||
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
        unit_amount: toStripeAmount(bundlePrice(zone, item.size)),
        product_data: {
          name: `${product.name} · ${item.size}-Pack (${item.size} × 350g)`,
          metadata: { productId: product.id, size: String(item.size), sku: product.bundles[item.size].sku, zone },
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
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: allowedCountries },
      allow_promotion_codes: true,
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
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err);
    const message = err instanceof Error ? err.message : "Could not start checkout. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
