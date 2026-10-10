"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { isProductAvailable, type Product } from "@/lib/commerce/types";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "long-sleeve", label: "Long sleeves" },
  { value: "tee", label: "Tees" },
] as const;

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "name", label: "Name, A to Z" },
] as const;

export function ShopBrowser({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = params.get("category") ?? "";
  const collection = params.get("collection") ?? "";
  const color = params.get("color") ?? "";
  const inStock = params.get("available") === "1";
  const sort = params.get("sort") ?? "featured";

  const collections = useMemo(() => [...new Set(products.map((p) => p.collection))], [products]);
  const colors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.swatch)));
    return [...map].map(([name, swatch]) => ({ name, swatch }));
  }, [products]);

  const results = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!collection || p.collection === collection) &&
        (!color || p.colors.some((c) => c.name === color)) &&
        (!inStock || isProductAvailable(p)),
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => a.featuredRank - b.featuredRank);
    return sorted;
  }, [products, category, collection, color, inStock, sort]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const filtered = Boolean(category || collection || color || inStock);

  return (
    <>
      <div className="mt-12 flex flex-col gap-6 border-y border-ink/15 py-5 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Category">
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = c.value === category;
              return (
                <li key={c.label}>
                  <button
                    type="button"
                    onClick={() => update("category", c.value)}
                    aria-pressed={active}
                    className={`min-h-11 rounded-full border px-5 text-[0.9375rem] transition-colors ${
                      active ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink"
                    }`}
                  >
                    {c.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          {collections.length > 1 && (
            <label className="flex items-center gap-2 text-[0.9375rem]">
              <span className="text-ash">Collection</span>
              <select
                id="filter-collection"
                value={collection}
                onChange={(e) => update("collection", e.target.value)}
                className="min-h-11 rounded-full border border-ink/20 bg-transparent px-4"
              >
                <option value="">All</option>
                {collections.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          )}

          {colors.length > 1 && (
            <fieldset className="flex items-center gap-2">
              <legend className="sr-only">Color</legend>
              <span aria-hidden="true" className="text-[0.9375rem] text-ash">
                Color
              </span>
              {colors.map((c) => {
                const active = c.name === color;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => update("color", active ? "" : c.name)}
                    aria-pressed={active}
                    aria-label={c.name}
                    title={c.name}
                    className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${active ? "border-ink" : "border-transparent hover:border-ink/30"}`}
                  >
                    <span className="h-5 w-5 rounded-full ring-1 ring-ink/25" style={{ background: c.swatch }} />
                  </button>
                );
              })}
            </fieldset>
          )}

          <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[0.9375rem]">
            <input
              id="filter-available"
              type="checkbox"
              checked={inStock}
              onChange={(e) => update("available", e.target.checked ? "1" : "")}
              className="h-4 w-4 accent-ink"
            />
            In stock only
          </label>

          <label className="flex items-center gap-2 text-[0.9375rem]">
            <span className="text-ash">Sort</span>
            <select
              id="sort"
              value={sort}
              onChange={(e) => update("sort", e.target.value === "featured" ? "" : e.target.value)}
              className="min-h-11 rounded-full border border-ink/20 bg-transparent px-4"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-ash" aria-live="polite">
        {results.length} {results.length === 1 ? "piece" : "pieces"}
        {filtered ? (
          <Link href="/shop" scroll={false} className="ml-5 underline underline-offset-4">
            Clear filters
          </Link>
        ) : null}
      </p>

      {results.length === 0 ? (
        <div className="py-20">
          <p className="text-lg">Nothing matches those filters.</p>
          <Link href="/shop" scroll={false} className="button button-solid mt-6">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {results.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 3} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" />
          ))}
        </div>
      )}
    </>
  );
}
