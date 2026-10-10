"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categoryLabel } from "@/data/sizeGuide";
import type { Product } from "@/lib/commerce/types";

/* Filters only offer what the catalog actually contains. */
export function ShopBrowser({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get("category") ?? "";

  const categories = (Object.keys(categoryLabel) as Product["category"][])
    .filter((c) => products.some((p) => p.category === c))
    .sort((a) => (a === "tee" ? -1 : 1));
  const filters = [{ value: "", label: "All products" }, ...categories.map((c) => ({ value: c, label: categoryLabel[c] }))];
  const results = category ? products.filter((p) => p.category === category) : products;

  function select(value: string) {
    router.replace(value ? `${pathname}?category=${value}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
        <nav aria-label="Filter products">
          <ul className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = f.value === category;
              return (
                <li key={f.label}>
                  <button
                    type="button"
                    onClick={() => select(f.value)}
                    aria-pressed={active}
                    className={`caps min-h-11 rounded-[2px] border px-4 transition-colors ${
                      active ? "border-ink bg-ink text-bone" : "border-ink/15 hover:border-ink"
                    }`}
                  >
                    {f.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="text-sm tabular-nums text-ash" aria-live="polite">
          {results.length} {results.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="mt-8">
        {results.length === 0 ? (
          <div className="py-20">
            <p className="text-lg">Nothing in this category yet.</p>
            <Link href="/shop" scroll={false} className="button button-solid mt-6">
              See all products
            </Link>
          </div>
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </>
  );
}
