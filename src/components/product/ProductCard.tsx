"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";
import { canDistort, enter, leave } from "./hoverDistort";

export function ProductCard({ product, priority = false, sizes }: { product: Product; priority?: boolean; sizes: string }) {
  const { add } = useCart();
  const tile = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const image = product.images[0];
  const soldOut = product.variants.every((v) => v.inventory <= 0);

  const onEnter = async () => {
    if (!tile.current || !canDistort()) return;
    const ok = await enter(tile.current, image.src, product.hoverImage.src);
    setWebgl(ok);
  };
  const onLeave = () => tile.current && leave(tile.current);

  return (
    <article className="group">
      <div
        ref={tile}
        data-reveal-tile
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className="relative aspect-[4/5] overflow-hidden bg-plaster"
      >
        <Link href={`/shop/${product.slug}`} className="absolute inset-0 block" aria-label={product.name} tabIndex={-1}>
          <div data-reveal-image className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
            <Image
              src={product.hoverImage.src}
              alt=""
              fill
              sizes={sizes}
              className={`object-cover transition-opacity duration-700 ${
                webgl ? "opacity-0" : "opacity-0 group-hover:opacity-100"
              }`}
            />
          </div>
        </Link>

        {!soldOut && (
          <div
            className={`absolute inset-x-3 bottom-3 z-10 transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] ${
              quickOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 pointer-fine:group-hover:pointer-events-auto pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between gap-3 rounded-full bg-bone/90 py-1.5 pl-5 pr-1.5 backdrop-blur-md">
              <span className="text-xs text-ash">Quick add</span>
              <ul className="flex gap-0.5" aria-label={`Add ${product.name} to bag`}>
                {product.variants.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      disabled={v.inventory <= 0}
                      onClick={() => {
                        add(product, v);
                        setQuickOpen(false);
                      }}
                      className="grid h-9 min-w-9 place-items-center rounded-full px-1.5 text-xs transition-colors hover:bg-ink hover:text-bone disabled:text-stone disabled:line-through disabled:hover:bg-transparent"
                      aria-label={`Size ${v.size}${v.inventory <= 0 ? ", sold out" : ""}`}
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
        <div>
          <h3 className="text-[0.9375rem] leading-snug">
            <Link href={`/shop/${product.slug}`} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-ash">
            {product.colorway}
            <span className="sr-only">. Back print: {product.scripture.reference}</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-[0.9375rem] tabular-nums">{soldOut ? "Sold out" : formatPrice(product.price)}</p>
          {!soldOut && (
            <button
              type="button"
              onClick={() => setQuickOpen((v) => !v)}
              aria-expanded={quickOpen}
              className="text-xs text-ash underline underline-offset-4 pointer-fine:hidden"
            >
              {quickOpen ? "Close" : "Quick add"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
