"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { ZoneId } from "@/lib/shipping/zones";
import type { CartItem } from "@/lib/cart/types";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

type Props = {
  zone: ZoneId;
  items: CartItem[];
  note: string;
  onSuccess?: () => void;
};

/**
 * PayPal Smart Buttons. Creates the order on our server (server-side pricing),
 * lets PayPal handle payment + the buyer's shipping address, then captures and
 * sends the buyer to the order-confirmation page.
 */
export default function PayPalCheckout({ zone, items, note, onSuccess }: Props) {
  const [error, setError] = useState<string | null>(null);

  if (!CLIENT_ID) {
    return (
      <p className="mt-4 text-xs text-ember-300">
        PayPal isn’t configured yet — set NEXT_PUBLIC_PAYPAL_CLIENT_ID.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <PayPalScriptProvider
        options={{ clientId: CLIENT_ID, currency: "USD", intent: "capture" }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "pill", label: "paypal" }}
          createOrder={async () => {
            setError(null);
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                zone,
                note,
                items: items.map((i) => ({
                  productId: i.productId,
                  size: i.size,
                  quantity: i.quantity,
                })),
              }),
            });
            const data = await res.json();
            if (!res.ok || !data.id) {
              throw new Error(data.error || "Could not start PayPal checkout.");
            }
            return data.id as string;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            });
            const result = await res.json();
            if (
              !res.ok ||
              (result.status !== "COMPLETED" && result.status !== "APPROVED")
            ) {
              throw new Error(result.error || "Payment could not be completed.");
            }
            onSuccess?.();
            window.location.href = "/checkout/success";
          }}
          onError={(err) => {
            console.error("[paypal] button error:", err);
            setError("Something went wrong with PayPal. Please try again.");
          }}
          onCancel={() => setError(null)}
        />
      </PayPalScriptProvider>
      {error && <p className="mt-3 text-xs text-ember-300">{error}</p>}
    </div>
  );
}
