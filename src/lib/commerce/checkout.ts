import "server-only";
import { priceLines } from "./catalog";
import type { CartLine } from "./types";

/*
 * Server-side checkout. Prices always come from the catalog, never from the
 * browser. With STRIPE_SECRET_KEY set this creates a hosted Stripe Checkout
 * Session; without it, checkout reports that payments aren't connected.
 */

export function isCheckoutEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; status: number; error: string };

export async function createCheckout(lines: CartLine[], origin: string): Promise<CheckoutResult> {
  const { lines: priced } = priceLines(lines);
  if (priced.length === 0) {
    return { ok: false, status: 400, error: "Your bag is empty or its items are no longer available." };
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return { ok: false, status: 503, error: "Payments aren't connected yet. Your bag is saved on this device." };
  }

  const body = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/bag`,
    "shipping_address_collection[allowed_countries][0]": "US",
    "shipping_address_collection[allowed_countries][1]": "CA",
    "automatic_tax[enabled]": "false",
  });
  priced.forEach((line, i) => {
    body.set(`line_items[${i}][quantity]`, String(line.quantity));
    body.set(`line_items[${i}][price_data][currency]`, line.product.currency.toLowerCase());
    body.set(`line_items[${i}][price_data][unit_amount]`, String(line.product.price));
    body.set(`line_items[${i}][price_data][product_data][name]`, `${line.product.name} (${line.size})`);
    body.set(`line_items[${i}][price_data][product_data][metadata][sku]`, line.variantId);
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    console.error("Stripe checkout failed", res.status, await res.text());
    return { ok: false, status: 502, error: "Checkout couldn't start. Try again in a moment." };
  }
  const session = (await res.json()) as { url?: string };
  if (!session.url) return { ok: false, status: 502, error: "Checkout couldn't start. Try again in a moment." };
  return { ok: true, url: session.url };
}
