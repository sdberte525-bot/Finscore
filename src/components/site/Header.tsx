"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { business, nav } from "@/data/business";
import { lockScroll } from "@/lib/motion";
import { CartIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { useSearch } from "./Search";

/** Sticky store header: wordmark, primary navigation, search and cart. */
export function Header() {
  const pathname = usePathname();
  const { count, open: openCart } = useCart();
  const { open: openSearch } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/shop" ? pathname === "/shop" || pathname.startsWith("/shop/") : pathname === href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-50 border-b bg-bone/95 backdrop-blur-md transition-colors duration-200 ${
          scrolled || menuOpen ? "border-ink/10" : "border-transparent"
        }`}
      >
        <div className="gutter grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[4.5rem]">
          <div className="flex items-center">
            <button
              type="button"
              className="-ml-2.5 grid h-11 w-11 place-items-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="caps link-underline py-1" aria-current={isActive(item.href) ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link href="/" className="wordmark text-[1.375rem] md:text-[1.625rem]" aria-label="Swolvation, home">
            Swolvation
          </Link>

          <div className="-mr-2.5 flex items-center justify-end gap-1">
            <button type="button" onClick={openSearch} className="grid h-11 w-11 place-items-center" aria-label="Search">
              <SearchIcon />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center"
              aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full bg-ink px-1 text-[0.6875rem] font-semibold tabular-nums text-bone">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between bg-bone px-5 pb-10 pt-6 transition-[opacity,transform] duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="display flex min-h-16 items-center justify-between text-[2rem]"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-xl text-muted">
                    &#8594;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-4 text-[0.9375rem] text-ash">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/faq">FAQ</Link>
            <Link href="/shipping">Shipping</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/size-guide">Size guide</Link>
          </div>
          <p>{business.tagline}</p>
        </div>
      </div>
    </>
  );
}
