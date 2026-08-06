import { NextRequest, NextResponse } from "next/server";
import { paypalFetch, paypalConfigured } from "@/lib/paypal/client";
import { CURRENCY, toPayPalAmount } from "@/lib/cart/currency";
import {
  getProduct,
  bundlePrice,
  getZone,
  isZoneId,
  isBundleSize,
} from "@/lib/shipping/zones";

type ReqItem = { productId: string; size: number; quantity: number };

/**
 * Creates a PayPal order. Every line is priced SERVER-SIDE from the zone grid
 * (all-in USD, postage included) — the client never sends prices, so a tampered
 * cart can't change what's charged.
 */
export async function POST(req: NextRequest) {
  if (!paypalConfigured()) {
    return NextResponse.json(
      { error: "Payments aren’t configured yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: { items?: ReqItem[]; zone?: string; note?: string };
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

  const note =
    typeof body.note === "string" && body.note.trim()
      ? body.note.trim().slice(0, 127)
      : "";

  const paypalItems: Array<Record<string, unknown>> = [];
  let total = 0;

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
    const unit = bundlePrice(zone, item.size);
    total += unit * item.quantity;
    paypalItems.push({
      name: `${product.name} · ${item.size}-Pack`.slice(0, 127),
      description: `${item.size} × 250g · ${getZone(zone).label}`.slice(0, 127),
      sku: product.bundles[item.size].sku,
      unit_amount: { currency_code: CURRENCY, value: toPayPalAmount(unit) },
      quantity: String(item.quantity),
      category: "PHYSICAL_GOODS",
    });
  }

  total = Math.round(total * 100) / 100;
  const totalStr = toPayPalAmount(total);

  const orderBody = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: CURRENCY,
          value: totalStr,
          breakdown: {
            item_total: { currency_code: CURRENCY, value: totalStr },
          },
        },
        items: paypalItems,
        // Zone is stored on the order for reference/reconciliation.
        custom_id: zone,
        ...(note ? { description: note } : {}),
      },
    ],
    application_context: {
      brand_name: "PNG Coffee",
      shipping_preference: "GET_FROM_FILE", // PayPal collects the buyer's address
      user_action: "PAY_NOW",
    },
  };

  try {
    const res = await paypalFetch("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify(orderBody),
    });
    const data = await res.json();
    if (!res.ok || !data?.id) {
      console.error("[paypal create-order] failed:", data);
      return NextResponse.json(
        { error: data?.message || "Could not start PayPal checkout." },
        { status: 502 }
      );
    }
    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("[paypal create-order] error:", err);
    const message = err instanceof Error ? err.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
