"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product, Size } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";
import { lockScroll, scroller } from "@/lib/motion";
import { SizeChart } from "./SizeChart";

export function ProductForm({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const variant = product.variants.find((v) => v.size === size);
  const soldOut = product.variants.every((v) => v.inventory <= 0);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (guideOpen && !d.open) d.showModal();
    if (!guideOpen && d.open) d.close();
    lockScroll(guideOpen);
  }, [guideOpen]);

  // Mobile: keep add-to-bag reachable once the main button scrolls away.
  useEffect(() => {
    const el = button.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onAdd() {
    if (!variant) {
      setError(true);
      const options = document.getElementById("size-options");
      if (options) {
        if (scroller.lenis) scroller.lenis.scrollTo(options, { offset: -200 });
        else options.scrollIntoView({ block: "center" });
      }
      return;
    }
    add(product, variant);
  }

  return (
    <div>
      <fieldset aria-describedby={error ? "size-error" : undefined}>
        <div className="flex items-baseline justify-between">
          <legend className="text-sm">
            Size{size ? <span className="text-ash">: {size}</span> : null}
          </legend>
          <button type="button" onClick={() => setGuideOpen(true)} className="link-underline text-sm text-ash">
            Size guide
          </button>
        </div>
        <div id="size-options" className="mt-4 grid grid-cols-6 gap-2">
          {product.variants.map((v) => {
            const out = v.inventory <= 0;
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
                    setError(false);
                  }}
                  className="peer sr-only"
                />
                <span
                  className={`grid h-12 cursor-pointer place-items-center rounded-full border text-sm transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-oxblood peer-disabled:cursor-not-allowed peer-disabled:text-stone peer-disabled:line-through ${
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
          <p id="size-error" role="alert" className="mt-3 text-sm text-oxblood">
            Choose a size to add this to your bag.
          </p>
        )}
      </fieldset>

      <button ref={button} type="button" onClick={onAdd} disabled={soldOut} className="button button-solid mt-6 w-full">
        {soldOut ? "Sold out" : `Add to bag, ${formatPrice(product.price)}`}
      </button>

      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-bone/95 px-5 py-3 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-quint)] lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showBar}
        inert={!showBar}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{product.name}</p>
            <p className="text-xs text-ash">{size ? `Size ${size}` : "No size selected"}</p>
          </div>
          <button type="button" onClick={onAdd} disabled={soldOut} className="button button-solid min-h-11 px-5">
            Add to bag
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setGuideOpen(false)}
        onClick={(e) => e.target === dialog.current && setGuideOpen(false)}
        aria-labelledby="size-guide-title"
        data-lenis-prevent
        className="m-auto w-[min(36rem,calc(100vw-2rem))] bg-bone p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-baseline justify-between">
            <h2 id="size-guide-title" className="fraktur text-[2.5rem]">
              Size guide
            </h2>
            <button type="button" onClick={() => setGuideOpen(false)} className="link-underline text-sm">
              Close
            </button>
          </div>
          <p className="mt-4 text-sm text-charcoal">{product.fit}</p>
          <div className="mt-6">
            <SizeChart />
          </div>
        </div>
      </dialog>
    </div>
  );
}
