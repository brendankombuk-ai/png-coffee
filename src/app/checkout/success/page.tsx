import type { Metadata } from "next";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessContent />;
}
