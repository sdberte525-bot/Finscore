"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useStoreOpen } from "@/components/site/StoreStatus";
import { cardVideo, isProductAvailable, isVariantAvailable, type Product } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product, priority = false, sizes }: { product: Product; priority?: boolean; sizes: string }) {
  const { add } = useCart();
  const storeOpen = useStoreOpen();
  const [quickOpen, setQuickOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const front = product.images[0];
  const turn = cardVideo(product);
  const available = isProductAvailable(product);
  const quickAdd = storeOpen && available && product.colors.length === 1;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      v.currentTime = 0;
      v.play().catch(() => {});
    } else v.pause();
  }, [playing]);

  return (
    <article className="group" onPointerEnter={(e) => e.pointerType === "mouse" && setPlaying(true)} onPointerLeave={(e) => e.pointerType === "mouse" && setPlaying(false)}>
      <div data-reveal-tile className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0 block" aria-label={product.name} tabIndex={-1}>
          <div data-reveal-image className="absolute inset-0">
            <Image
              src={front.src}
              alt={front.alt}
              fill
              sizes={sizes}
              priority={priority}
              quality={90}
              className={`${front.fit === "contain" ? "object-contain p-[6%]" : "object-cover"} transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] pointer-fine:group-hover:scale-[1.03]`}
            />
            {turn?.video ? (
              <video
                ref={video}
                src={playing || ready ? turn.video : undefined}
                poster={turn.src}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                onPlaying={() => setReady(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing && ready ? "opacity-100" : "opacity-0"}`}
              />
            ) : null}
          </div>
        </Link>

        {!available && <span className="absolute left-3 top-3 rounded-[2px] bg-bone/90 px-3 py-1 text-xs text-charcoal">Sold out</span>}
        {!storeOpen && <span className="absolute left-3 top-3 rounded-[2px] bg-ink/80 px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-bone backdrop-blur-md">Coming soon</span>}

        {turn?.video && (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-pressed={playing}
            className="absolute right-3 top-3 z-10 min-h-10 rounded-[2px] bg-bone/90 px-4 text-sm text-charcoal backdrop-blur-md pointer-fine:hidden"
          >
            {playing ? "Stop" : "Turn"}
          </button>
        )}

        {quickAdd && (
          <div
            className={`absolute inset-x-3 bottom-3 z-10 transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] ${
              quickOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 pointer-fine:group-hover:pointer-events-auto pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between gap-3 rounded-[2px] bg-bone/95 py-1.5 pl-5 pr-1.5 backdrop-blur-md">
              <span className="text-sm text-charcoal">Add</span>
              <ul className="flex gap-0.5" aria-label={`Add ${product.name} to cart, choose a size`}>
                {product.variants.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      disabled={!isVariantAvailable(v)}
                      onClick={() => {
                        add(product, v);
                        setQuickOpen(false);
                      }}
                      className="grid h-10 min-w-10 place-items-center rounded-[2px] px-1.5 text-sm transition-colors hover:bg-ink hover:text-bone disabled:text-stone disabled:line-through disabled:hover:bg-transparent"
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
                  <span className="block h-3.5 w-3.5 rounded-full ring-1 ring-ink/25 ring-offset-1 ring-offset-bone" style={{ background: c.swatch }} title={c.name} />
                  <span className="sr-only">{c.name}</span>
                </li>
              ))}
            </ul>
            <span className="text-sm text-ash">
              {product.colors.length === 1 ? product.colors[0].name : `${product.colors.length} colors`}
              {", "}
              {product.category === "tee" ? "oversized tee" : "long sleeve"}
            </span>
          </div>
          {product.scripture ? <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-ash">{product.scripture.reference}</p> : null}
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
