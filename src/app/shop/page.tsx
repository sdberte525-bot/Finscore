import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/commerce/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Drop 01, the Scripture Series: heavyweight long sleeves and tees with distressed scripture prints.",
  alternates: { canonical: "/shop" },
};

const filters = [
  { label: "All", value: undefined },
  { label: "Long sleeves", value: "long-sleeve" },
  { label: "Tees", value: "tee" },
] as const;

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const all = getProducts();
  const products = category ? all.filter((p) => p.category === category) : all;

  return (
    <div data-tone="light" className="gutter min-h-[80vh] bg-bone pb-32 pt-32 md:pb-44 md:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-8 border-b border-ink/15 pb-8">
        <div>
          <h1 className="fraktur text-[3.5rem] md:text-[6rem]">Shop</h1>
          <p className="mt-4 max-w-[44ch] text-ash md:text-lg">Drop 01, the Scripture Series. Three pieces, three verses.</p>
        </div>
        <nav aria-label="Filter by category">
          <ul className="flex gap-6 text-sm">
            {filters.map((f) => {
              const active = f.value === category || (!f.value && !category);
              return (
                <li key={f.label}>
                  <Link
                    href={f.value ? `/shop?category=${f.value}` : "/shop"}
                    aria-current={active ? "page" : undefined}
                    className={`link-underline py-1 ${active ? "" : "text-ash"}`}
                    scroll={false}
                  >
                    {f.label}
                    <span className="ml-1.5 tabular-nums text-ash">
                      {f.value ? all.filter((p) => p.category === f.value).length : all.length}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {products.length === 0 ? (
        <div className="py-24">
          <p className="text-lg">Nothing in this category yet.</p>
          <Link href="/shop" className="button button-solid mt-6">
            See all pieces
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 3} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" />
          ))}
        </div>
      )}
    </div>
  );
}
