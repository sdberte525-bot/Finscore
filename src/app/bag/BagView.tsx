"use client";

import Link from "next/link";
import { CartLines } from "@/components/cart/CartLines";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";

export function BagView() {
  const { lines, subtotal, count } = useCart();

  return (
    <div data-tone="light" className="gutter min-h-[80vh] bg-bone pb-32 pt-32 md:pt-44">
      <h1 className="display text-[3.5rem] md:text-[6rem]">Bag</h1>

      {lines.length === 0 ? (
        <div className="mt-10 max-w-md">
          <p className="text-lg">Your bag is empty.</p>
          <p className="mt-2 text-ash">Pieces you add stay here on this device until you check out.</p>
          <Link href="/shop" className="button button-solid mt-8">
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="border-t border-ink/15 lg:col-span-7">
            <CartLines />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="summary-title">
            <div className="lg:sticky lg:top-28">
              <h2 id="summary-title" className="text-sm text-ash">
                Summary
              </h2>
              <dl className="mt-6 space-y-3 border-t border-ink/15 pt-6 text-sm">
                <div className="flex justify-between">
                  <dt>
                    Subtotal, {count} {count === 1 ? "item" : "items"}
                  </dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ash">
                  <dt>Shipping</dt>
                  <dd>Calculated at checkout</dd>
                </div>
              </dl>
              <Link href="/checkout" className="button button-solid mt-8 w-full">
                Checkout
              </Link>
              <Link href="/shop" className="link-underline mt-5 inline-block text-sm">
                Keep shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
