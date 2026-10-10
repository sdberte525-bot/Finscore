"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/format";
import { lockScroll } from "@/lib/motion";
import { useCart } from "./CartProvider";
import { CartLines } from "./CartLines";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, count } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const pathname = usePathname();

  useEffect(() => close(), [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    lockScroll(isOpen);
    if (!isOpen) {
      if (opener.current instanceof HTMLElement) opener.current.focus();
      return;
    }
    opener.current = document.activeElement;
    panel.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen} inert={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        tabIndex={-1}
        data-lenis-prevent
        className={`absolute inset-y-0 right-0 flex w-full max-w-[28rem] flex-col bg-bone outline-none transition-transform duration-700 ease-[var(--ease-out-quint)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 md:h-20 md:px-8">
          <h2 id="bag-title" className="text-sm">
            Bag <span className="tabular-nums text-ash">({count})</span>
          </h2>
          <button type="button" onClick={close} className="link-underline py-1 text-sm">
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 md:px-8">
            <p className="display text-[2.75rem]">Your bag is empty.</p>
            <p className="max-w-[30ch] text-ash">Pieces you add will stay here on this device until you check out.</p>
            <Link href="/shop" onClick={close} className="button button-solid">
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 md:px-8">
              <CartLines compact />
            </div>
            <div className="border-t border-ink/15 px-6 pb-8 pt-6 md:px-8">
              <dl className="flex items-baseline justify-between text-sm">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </dl>
              <p className="mt-1 text-xs text-ash">Shipping and taxes are calculated at checkout.</p>
              <div className="mt-6 grid gap-3">
                <Link href="/checkout" onClick={close} className="button button-solid w-full">
                  Checkout
                </Link>
                <Link href="/bag" onClick={close} className="button w-full">
                  View bag
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
