"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";
import { lockScroll } from "@/lib/motion";
import { CloseIcon, SearchIcon } from "./Icons";

const SearchContext = createContext<{ open: () => void } | null>(null);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside <SearchProvider>");
  return ctx;
}

function matches(product: Product, q: string) {
  const text = [product.name, product.description, product.scripture?.reference, product.scripture?.text, ...product.colors.map((c) => c.name), product.category === "tee" ? "short sleeve tee t-shirt" : "long sleeve"]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}

/** Product search in a dialog. The catalog is small, so it searches in the browser. */
export function SearchProvider({ products, children }: { products: Product[]; children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const results = useMemo(() => (query.trim() ? products.filter((p) => matches(p, query)) : products), [products, query]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    lockScroll(isOpen);
  }, [isOpen]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <SearchContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <dialog
        ref={dialog}
        onClose={close}
        onClick={(e) => e.target === dialog.current && close()}
        aria-label="Search products"
        data-lenis-prevent
        className="mx-auto mb-auto mt-0 w-full max-w-none bg-bone p-0 text-ink backdrop:bg-ink/50"
      >
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (results[0]) {
              router.push(`/shop/${results[0].slug}`);
              close();
            }
          }}
          className="gutter flex h-20 items-center gap-4 border-b border-ink/10"
        >
          <SearchIcon className="shrink-0 text-muted" />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            autoFocus
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection"
            className="h-full min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
          />
          <button type="button" onClick={close} className="grid h-11 w-11 place-items-center" aria-label="Close search">
            <CloseIcon />
          </button>
        </form>
        <div className="gutter py-8">
          <p className="caps text-ash" aria-live="polite">
            {query.trim() ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "The first drop"}
          </p>
          {results.length === 0 ? (
            <p className="mt-6 text-lg">
              Nothing matches &ldquo;{query}&rdquo;. Try a product name or a verse, like &ldquo;Joshua&rdquo;.
            </p>
          ) : (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/shop/${p.slug}`} onClick={close} className="group flex items-center gap-4">
                    <span className="relative block aspect-[4/5] w-20 shrink-0 overflow-hidden bg-studio">
                      <Image src={p.images[0].src} alt="" fill sizes="80px" className="object-contain p-1.5" />
                    </span>
                    <span>
                      <span className="link-underline block">{p.name}</span>
                      <span className="mt-1 block text-sm tabular-nums text-ash">{formatPrice(p.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </SearchContext.Provider>
  );
}
