import "server-only";
import { getCatalog, provider } from "./index";
import { priceLines } from "./pricing";
import { createShopifyCheckout } from "./shopify";
import type { CartLine } from "./types";

/*
 * Server-side checkout. Prices and availability always come from the catalog,
 * never from the browser.
 *   Shopify connected  -> Shopify hosted checkout
 *   STRIPE_SECRET_KEY  -> Stripe Checkout
 *   neither            -> checkout reports that payments aren't connected
 */

export type CheckoutMethod = "shopify" | "stripe" | null;

export function checkoutMethod(): CheckoutMethod {
  if (provider() === "shopify") return "shopify";
  if (process.env.STRIPE_SECRET_KEY) return "stripe";
  return null;
}

export type CheckoutResult = { ok: true; url: string } | { ok: false; status: number; error: string };

export async function createCheckout(lines: CartLine[], origin: string): Promise<CheckoutResult> {
  const { lines: priced } = priceLines(lines, await getCatalog());
  if (priced.length === 0) {
    return { ok: false, status: 400, error: "Your bag is empty or its items are no longer available." };
  }

  const method = checkoutMethod();
  if (!method) {
    return { ok: false, status: 503, error: "Payments aren’t connected yet. Your bag is saved on this device." };
  }

  try {
    if (method === "shopify") {
      return { ok: true, url: await createShopifyCheckout(priced) };
    }
    return { ok: true, url: await createStripeCheckout(priced, origin) };
  } catch (err) {
    console.error("Checkout failed", err);
    return { ok: false, status: 502, error: "Checkout couldn’t start. Try again in a moment." };
  }
}

async function createStripeCheckout(priced: ReturnType<typeof priceLines>["lines"], origin: string): Promise<string> {
  const body = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/bag`,
  });
  // Ship-to countries, e.g. STRIPE_SHIPPING_COUNTRIES="US,CA". Omit to skip address collection.
  (process.env.STRIPE_SHIPPING_COUNTRIES ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .forEach((c, i) => body.set(`shipping_address_collection[allowed_countries][${i}]`, c));
  priced.forEach((line, i) => {
    body.set(`line_items[${i}][quantity]`, String(line.quantity));
    body.set(`line_items[${i}][price_data][currency]`, line.product.currency.toLowerCase());
    body.set(`line_items[${i}][price_data][unit_amount]`, String(line.product.price));
    body.set(`line_items[${i}][price_data][product_data][name]`, `${line.product.name} (${line.color}, ${line.size})`);
    body.set(`line_items[${i}][price_data][product_data][metadata][sku]`, line.variantId);
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Stripe ${res.status}: ${await res.text()}`);
  const session = (await res.json()) as { url?: string };
  if (!session.url) throw new Error("Stripe returned no checkout URL");
  return session.url;
}
