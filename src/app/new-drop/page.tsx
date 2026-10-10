import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCatalog } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "The first drop",
  description: "The first Swolvation drop: an oversized tee and a long sleeve, each with a large scripture graphic on the back.",
  alternates: { canonical: "/new-drop" },
};

export default async function NewDropPage() {
  const products = await getCatalog();

  return (
    <div>
      <section data-tone="dark" className="gutter bg-ink py-20 text-bone md:py-28">
        <p className="caps text-stone">New drop</p>
        <h1 className="display mt-4 text-[4rem] sm:text-[6rem] lg:text-[8.5rem]">The first drop</h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-[46ch] text-lg leading-relaxed text-stone">
            Purpose in every piece. {products.length === 2 ? "Two" : products.length} designs to start, each with a small logo on the
            front and a large scripture graphic across the back.
          </p>
          <Link href="/size-guide" className="caps link-underline py-2 text-stone hover:text-bone">
            Size guide
          </Link>
        </div>
      </section>
      <section className="gutter bg-bone py-16 md:py-24" aria-label="Products in the first drop">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
