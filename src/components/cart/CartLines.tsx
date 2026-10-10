"use client";

import Image from "next/image";
import Link from "next/link";
import { maxQuantity } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";

export function CartLines({ compact = false, readOnly = false }: { compact?: boolean; readOnly?: boolean }) {
  const { lines, setQuantity, remove, lastAdded } = useCart();

  return (
    <ul className="divide-y divide-ink/15">
      {lines.map((line) => {
        const image = line.product.images[0];
        return (
          <li
            key={line.variantId}
            className={`grid gap-5 py-6 ${compact ? "grid-cols-[5.5rem_1fr]" : "grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr]"}`}
          >
            <Link href={`/shop/${line.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-studio">
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="128px" className="h-full w-full object-contain p-1.5" />
            </Link>
            <div className="flex min-w-0 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/shop/${line.slug}`} className="link-underline text-sm">
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-xs text-ash">
                    {line.color}, size {line.size}
                  </p>
                  {line.variantId === lastAdded && compact ? (
                    <p className="mt-1 text-xs text-oxblood" role="status">
                      Added to cart
                    </p>
                  ) : null}
                </div>
                <p className="text-sm tabular-nums">{formatPrice(line.lineTotal)}</p>
              </div>
              {readOnly ? (
                <p className="mt-auto pt-4 text-xs text-ash">Quantity {line.quantity}</p>
              ) : (
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-[2px] border border-ink/25 text-sm" role="group" aria-label={`Quantity for ${line.product.name}`}>
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center"
                      onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="w-6 text-center tabular-nums" aria-live="polite">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center disabled:opacity-30"
                      onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                      disabled={line.quantity >= maxQuantity(line.variant)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button type="button" onClick={() => remove(line.variantId)} className="link-underline text-xs text-ash">
                    Remove
                  </button>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
