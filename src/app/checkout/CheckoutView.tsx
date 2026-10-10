"use client";

import Link from "next/link";
import { useState } from "react";
import { CartLines } from "@/components/cart/CartLines";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";

export function CheckoutView({ method }: { method: "shopify" | "stripe" | null }) {
  const enabled = method !== null;
  const { lines, rawLines, subtotal } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: rawLines }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout couldn’t start. Try again in a moment.");
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout couldn’t start.");
      setPending(false);
    }
  }

  return (
    <div data-tone="light" className="gutter min-h-[80vh] bg-bone pb-32 pt-32 md:pt-44">
      <h1 className="display text-[3.5rem] md:text-[6rem]">Checkout</h1>

      {lines.length === 0 ? (
        <div className="mt-10 max-w-md">
          <p className="text-lg">There&rsquo;s nothing to check out yet.</p>
          <Link href="/shop" className="button button-solid mt-8">
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <section className="lg:col-span-7" aria-labelledby="order-title">
            <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
              <h2 id="order-title" className="text-sm text-ash">
                Your order
              </h2>
              <Link href="/bag" className="link-underline text-sm">
                Edit bag
              </Link>
            </div>
            <CartLines readOnly />
          </section>

          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="pay-title">
            <div className="lg:sticky lg:top-28">
              <h2 id="pay-title" className="text-sm text-ash">
                Payment
              </h2>
              <dl className="mt-6 space-y-3 border-t border-ink/15 pt-6 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ash">
                  <dt>Shipping and taxes</dt>
                  <dd>Added on the payment page</dd>
                </div>
              </dl>

              {enabled ? (
                <>
                  <button type="button" onClick={startCheckout} disabled={pending} className="button button-solid mt-8 w-full">
                    {pending ? "Opening secure payment" : "Continue to payment"}
                  </button>
                  <p className="mt-4 text-xs text-ash">
                    You&rsquo;ll enter shipping and payment details on {method === "shopify" ? "Shopify" : "Stripe"}&rsquo;s hosted checkout page.
                  </p>
                </>
              ) : (
                <div className="mt-8 border border-ink/20 p-5 text-sm">
                  <p>Payments aren&rsquo;t connected yet, so orders can&rsquo;t be placed on this site today.</p>
                  <p className="mt-2 text-ash">Your bag is saved on this device. Sign up below to hear the moment checkout opens.</p>
                </div>
              )}

              {error && (
                <p role="alert" className="mt-4 text-sm text-oxblood">
                  {error}
                </p>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
