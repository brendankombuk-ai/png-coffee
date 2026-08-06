import { NextRequest, NextResponse } from "next/server";
import { paypalFetch, paypalConfigured } from "@/lib/paypal/client";

/**
 * Captures (finalises payment on) a PayPal order the buyer has approved.
 * Called by the PayPal button's onApprove handler with the order ID.
 */
export async function POST(req: NextRequest) {
  if (!paypalConfigured()) {
    return NextResponse.json(
      { error: "Payments aren’t configured yet." },
      { status: 503 }
    );
  }

  let body: { orderID?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderID = body.orderID;
  if (!orderID || typeof orderID !== "string") {
    return NextResponse.json({ error: "Missing order ID." }, { status: 400 });
  }

  try {
    const res = await paypalFetch(
      `/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,
      { method: "POST" }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("[paypal capture-order] failed:", data);
      return NextResponse.json(
        { error: data?.message || "Payment could not be completed." },
        { status: 502 }
      );
    }
    return NextResponse.json({ status: data?.status, id: data?.id });
  } catch (err) {
    console.error("[paypal capture-order] error:", err);
    const message = err instanceof Error ? err.message : "Could not complete payment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
