import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { CURRENCY, toStripeAmount } from "@/lib/cart/currency";

type CheckoutRequestItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  let body: { items?: CheckoutRequestItem[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = body.items;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
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

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: CURRENCY.toLowerCase(),
          unit_amount: toStripeAmount(item.price),
          product_data: {
            name: item.name,
            metadata: { productId: item.id },
          },
        },
      })),
      // Collect a shipping address — remove if you only sell digital goods,
      // or restrict `allowed_countries` to where you actually ship.
      shipping_address_collection: {
        allowed_countries: ["PG", "AU", "US", "NZ", "GB"],
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
