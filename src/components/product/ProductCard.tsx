"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { isProductAvailable, isVariantAvailable, type Product } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product, priority = false, sizes }: { product: Product; priority?: boolean; sizes: string }) {
  const { add } = useCart();
  const [quickOpen, setQuickOpen] = useState(false);
  const image = product.images[0];
  const available = isProductAvailable(product);
  // Quick add only makes sense when there's no colour to choose.
  const quickAdd = available && product.colors.length === 1;

  return (
    <article className="group">
      <div data-reveal-tile className="relative aspect-[4/5] overflow-hidden bg-plaster">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0 block" aria-label={product.name} tabIndex={-1}>
          <div data-reveal-image className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] pointer-fine:group-hover:scale-[1.03]">
            <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
            {product.hoverImage ? (
              <Image
                src={product.hoverImage.src}
                alt=""
                fill
                sizes={sizes}
                className="object-cover opacity-0 transition-opacity duration-700 ease-[var(--ease-out-quint)] pointer-fine:group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        {!available && (
          <span className="absolute left-3 top-3 rounded-full bg-bone/90 px-3 py-1 text-xs text-charcoal">Sold out</span>
        )}

        {quickAdd && (
          <div
            className={`absolute inset-x-3 bottom-3 z-10 transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] ${
              quickOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 pointer-fine:group-hover:pointer-events-auto pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between gap-3 rounded-full bg-bone/95 py-1.5 pl-5 pr-1.5 backdrop-blur-md">
              <span className="text-sm text-charcoal">Add</span>
              <ul className="flex gap-0.5" aria-label={`Add ${product.name} to bag, choose a size`}>
                {product.variants.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      disabled={!isVariantAvailable(v)}
                      onClick={() => {
                        add(product, v);
                        setQuickOpen(false);
                      }}
                      className="grid h-10 min-w-10 place-items-center rounded-full px-1.5 text-sm transition-colors hover:bg-ink hover:text-bone disabled:text-stone disabled:line-through disabled:hover:bg-transparent"
                      aria-label={`Size ${v.size}${isVariantAvailable(v) ? "" : ", sold out"}`}
                    >
                      {v.size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base leading-snug">
            <Link href={`/shop/${product.slug}`} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <ul className="flex gap-1.5" aria-label="Colors">
              {product.colors.map((c) => (
                <li key={c.name}>
                  <span
                    className="block h-3.5 w-3.5 rounded-full ring-1 ring-ink/25 ring-offset-1 ring-offset-bone"
                    style={{ background: c.swatch }}
                    title={c.name}
                  />
                  <span className="sr-only">{c.name}</span>
                </li>
              ))}
            </ul>
            <span className="text-sm text-ash">
              {product.colors.length === 1 ? product.colors[0].name : `${product.colors.length} colors`}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <p className="text-base tabular-nums">{formatPrice(product.price)}</p>
          {quickAdd && (
            <button
              type="button"
              onClick={() => setQuickOpen((v) => !v)}
              aria-expanded={quickOpen}
              className="py-1 text-sm text-ash underline underline-offset-4 pointer-fine:hidden"
            >
              {quickOpen ? "Close" : "Quick add"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
