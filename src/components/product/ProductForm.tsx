"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { useStoreOpen } from "@/components/site/StoreStatus";
import { isVariantAvailable, maxQuantity, type Product, type Size } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";
import { lockScroll, scroller } from "@/lib/motion";
import { SizeChart } from "./SizeChart";

export function ProductForm({ product }: { product: Product }) {
  const { add } = useCart();
  const storeOpen = useStoreOpen();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const cta = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const sizes = product.variants.filter((v) => v.color === color);
  const variant = sizes.find((v) => v.size === size);
  const soldOut = !product.variants.some(isVariantAvailable);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (guideOpen && !d.open) d.showModal();
    if (!guideOpen && d.open) d.close();
    lockScroll(guideOpen);
  }, [guideOpen]);

  // Mobile: keep add-to-cart reachable once the main button scrolls away.
  useEffect(() => {
    const el = cta.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onAdd() {
    if (!variant || !isVariantAvailable(variant)) {
      setError(true);
      const options = document.getElementById("size-options");
      if (options) {
        if (scroller.lenis) scroller.lenis.scrollTo(options, { offset: -200 });
        else options.scrollIntoView({ block: "center" });
      }
      return;
    }
    add(product, variant, quantity);
    setQuantity(1);
  }

  return (
    <div>
      {product.colors.length > 0 && (
        <fieldset className="mb-8">
          <legend className="text-[0.9375rem]">
            Color: <span className="text-ash">{color}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => {
              const selected = c.name === color;
              return (
                <label key={c.name} className="relative cursor-pointer" title={c.name}>
                  <input
                    type="radio"
                    name="color"
                    value={c.name}
                    checked={selected}
                    onChange={() => {
                      setColor(c.name);
                      setSize(null);
                    }}
                    className="peer sr-only"
                  />
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-[2px] border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-oxblood ${
                      selected ? "border-ink" : "border-ink/15 hover:border-ink/40"
                    }`}
                  >
                    <span className="h-7 w-7 rounded-full ring-1 ring-ink/20" style={{ background: c.swatch }} />
                  </span>
                  <span className="sr-only">{c.name}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <fieldset aria-describedby={error ? "size-error" : undefined}>
        <div className="flex items-baseline justify-between">
          <legend className="text-[0.9375rem]">
            Size{size ? <span className="text-ash">: {size}</span> : null}
          </legend>
          <button type="button" onClick={() => setGuideOpen(true)} className="link-underline py-1 text-[0.9375rem] text-ash">
            Size guide
          </button>
        </div>
        <div id="size-options" className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {sizes.map((v) => {
            const out = !isVariantAvailable(v);
            const selected = v.size === size;
            return (
              <label key={v.id} className="relative">
                <input
                  type="radio"
                  name="size"
                  value={v.size}
                  checked={selected}
                  disabled={out}
                  onChange={() => {
                    setSize(v.size);
                    setQuantity((q) => Math.min(q, maxQuantity(v)));
                    setError(false);
                  }}
                  className="peer sr-only"
                />
                <span
                  className={`grid h-12 cursor-pointer place-items-center rounded-[2px] border text-[0.9375rem] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-oxblood peer-disabled:cursor-not-allowed peer-disabled:text-stone peer-disabled:line-through ${
                    selected ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {v.size}
                </span>
                {out && <span className="sr-only">, sold out</span>}
              </label>
            );
          })}
        </div>
        {error && (
          <p id="size-error" role="alert" className="mt-3 text-[0.9375rem] text-oxblood">
            Choose a size to add this to your cart.
          </p>
        )}
      </fieldset>

      {storeOpen ? (
        <div ref={cta} className="mt-6 flex gap-3">
          <div className="flex shrink-0 items-center rounded-[2px] border border-ink/25" role="group" aria-label="Quantity">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="grid h-[3.25rem] w-11 place-items-center text-lg disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              &minus;
            </button>
            <span className="w-6 text-center tabular-nums" aria-live="polite" aria-label={`Quantity ${quantity}`}>
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(variant ? maxQuantity(variant) : 10, q + 1))}
              disabled={variant ? quantity >= maxQuantity(variant) : quantity >= 10}
              className="grid h-[3.25rem] w-11 place-items-center text-lg disabled:opacity-30"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button type="button" onClick={onAdd} disabled={soldOut} className="button button-solid min-w-0 flex-1 text-[0.9375rem]">
            {soldOut ? "Sold out" : `Add to cart, ${formatPrice(product.price * quantity)}`}
          </button>
        </div>
      ) : (
        <div ref={cta} id="notify" className="mt-6 scroll-mt-28 border border-ink/15 bg-plaster/60 p-5">
          <p className="caps text-ash">Coming soon</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal">
            The first drop isn&rsquo;t live yet. Leave your email and we&rsquo;ll tell you the moment {size ? `size ${size}` : "it"} is available.
          </p>
          <div className="mt-4">
            <NewsletterForm
              key={size ?? "any"}
              source={`notify:${product.slug}${size ? `:${size}` : ""}`}
              tone="light"
              cta="Notify me"
              done="Done. You’ll hear from us the moment it drops."
            />
          </div>
        </div>
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-bone/95 px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-quint)] lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showBar}
        inert={!showBar}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.9375rem]">{product.name}</p>
            <p className="text-sm text-ash">{storeOpen ? (size ? `${color}, size ${size}` : "No size selected") : "Coming soon"}</p>
          </div>
          {storeOpen ? (
            <button type="button" onClick={onAdd} disabled={soldOut} className="button button-solid min-h-12 px-6">
              Add to cart
            </button>
          ) : (
            <a href="#notify" className="button button-solid min-h-12 px-6">
              Notify me
            </a>
          )}
        </div>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setGuideOpen(false)}
        onClick={(e) => e.target === dialog.current && setGuideOpen(false)}
        aria-labelledby="size-guide-title"
        data-lenis-prevent
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(38rem,calc(100vw-2rem))] overflow-auto bg-bone p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="size-guide-title" className="display text-[2.25rem]">
              Size guide
            </h2>
            <button type="button" onClick={() => setGuideOpen(false)} className="link-underline py-1 text-[0.9375rem]">
              Close
            </button>
          </div>
          <div className="mt-6">
            <SizeChart
              category={product.category}
              onPick={(s) => {
                setSize(s);
                setError(false);
                setGuideOpen(false);
              }}
            />
          </div>
        </div>
      </dialog>
    </div>
  );
}
