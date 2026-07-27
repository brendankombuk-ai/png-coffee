import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { CURRENCY, toStripeAmount } from "@/lib/cart/currency";
import { shippingQuote } from "@/lib/shipping/zones";

type CheckoutRequestItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  let body: { items?: CheckoutRequestItem[]; countryCode?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = body.items;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // A shipping destination is required — the shipping fee is priced by zone,
  // so we need to know the country before creating the session.
  const countryCode =
    typeof body.countryCode === "string" ? body.countryCode.trim().toUpperCase() : "";
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    return NextResponse.json(
      { error: "Please choose a shipping destination before checking out." },
      { status: 400 }
    );
  }

  // Recompute prices/quantities are numeric and sane server-side — never
  // trust amounts sent from the browser for anything that touches money.
  for (const item of items) {
    if (
      typeof item.id !== "string" ||
      typeof item.name !== "string" ||
      typeof item.price !== "number" ||
      item.price <= 0 ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0 ||
      item.quantity > 99
    ) {
      return NextResponse.json({ error: "Invalid item in cart." }, { status: 400 });
    }
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  // Compute the shipping fee server-side from the destination + total packet
  // count. Never trust a fee sent by the browser.
  const totalPackets = items.reduce((sum, item) => sum + item.quantity, 0);
  const { zone, fee: shippingFeeAmount } = shippingQuote(countryCode, totalPackets);

  const productLineItems = items.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: CURRENCY.toLowerCase(),
      unit_amount: toStripeAmount(item.price),
      product_data: {
        name: item.name,
        metadata: { productId: item.id },
      },
    },
  }));

  const shippingLineItem = {
    quantity: 1,
    price_data: {
      currency: CURRENCY.toLowerCase(),
      unit_amount: toStripeAmount(shippingFeeAmount),
      product_data: {
        name: `Shipping — Zone ${zone} (${totalPackets} ${
          totalPackets === 1 ? "packet" : "packets"
        })`,
        metadata: { shipping: "true", zone: String(zone), countryCode },
      },
    },
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items:
        shippingFeeAmount > 0 ? [...productLineItems, shippingLineItem] : productLineItems,
      // Lock address collection to the destination the customer chose, so the
      // address they enter matches the zone we charged shipping for.
      shipping_address_collection: {
        allowed_countries: [
          countryCode as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry,
        ],
      },
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
