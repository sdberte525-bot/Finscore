import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

/** Product grid that sizes its columns to the catalog: two large cards, three, or four across. */
export function ProductGrid({ products, priorityCount = 2 }: { products: Product[]; priorityCount?: number }) {
  const few = products.length <= 2;
  const columns = few ? "sm:grid-cols-2" : products.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";
  const sizes = few ? "(min-width: 640px) 48vw, 92vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw";

  return (
    <div className={`grid gap-x-5 gap-y-12 md:gap-x-8 ${columns}`}>
      {products.map((product, i) => (
        <ProductCard key={product.slug} product={product} priority={i < priorityCount} sizes={sizes} />
      ))}
    </div>
  );
}
