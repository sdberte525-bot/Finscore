"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { nav } from "@/data/site";
import { lockScroll } from "@/lib/motion";

/**
 * Fixed header that takes the tone of whatever section sits under it:
 * sections mark themselves with data-tone="dark" or "light".
 */
export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [tone, setTone] = useState<"dark" | "light">("light");
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const probe = 32;
      const sections = document.querySelectorAll<HTMLElement>("[data-tone]");
      let next: "dark" | "light" = "light";
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) next = el.dataset.tone === "dark" ? "dark" : "light";
      }
      setTone(next);
      const y = window.scrollY;
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const dark = tone === "dark" || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>
      <header
        className={`gutter fixed inset-x-0 top-0 z-50 transition-[transform,color] duration-500 ease-[var(--ease-out-quint)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${dark ? "text-bone" : "text-ink"}`}
      >
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Link href="/" className="wordmark text-[0.8125rem] md:text-sm" aria-label="Swolvation, home">
            Swolvation
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-9 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline py-1"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6 text-sm">
            <button type="button" onClick={open} className="link-underline py-1" aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}>
              Bag <span className="tabular-nums">({count})</span>
            </button>
            <button
              type="button"
              className="py-1 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`gutter fixed inset-0 z-40 flex flex-col justify-between bg-ink pb-10 pt-28 text-bone transition-[clip-path] duration-700 ease-[var(--ease-in-out-quart)] md:hidden ${
          menuOpen ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMenuOpen(false)} className="fraktur block py-1 text-[3.25rem]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-stone">Old iron. Older faith.</p>
      </div>
    </>
  );
}
