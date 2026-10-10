import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCatalog } from "@/lib/commerce";
import { ShopBrowser } from "./ShopBrowser";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Swolvation: vintage-inspired oversized tees and long sleeves with faith-inspired graphics.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getCatalog();

  return (
    <div className="gutter min-h-[80vh] bg-bone pb-24 pt-12 md:pb-32 md:pt-16">
      <nav aria-label="Breadcrumb" className="text-sm text-ash">
        <ol className="flex gap-2">
          <li>
            <Link href="/" className="link-underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Shop</li>
        </ol>
      </nav>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <h1 className="display text-[3.5rem] md:text-[6rem]">Shop all</h1>
        <p className="max-w-[40ch] text-charcoal md:text-right">Vintage-inspired training apparel rooted in strength, discipline, and purpose.</p>
      </div>
      <Suspense fallback={<div className="mt-10 h-96" aria-hidden="true" />}>
        <ShopBrowser products={products} />
      </Suspense>
    </div>
  );
}
