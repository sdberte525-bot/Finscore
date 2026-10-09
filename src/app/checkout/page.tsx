import type { Metadata } from "next";
import { isCheckoutEnabled } from "@/lib/commerce/checkout";
import { CheckoutView } from "./CheckoutView";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return <CheckoutView enabled={isCheckoutEnabled()} />;
}
