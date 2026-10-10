import type { Metadata } from "next";
import { Suspense } from "react";
import { getCatalog } from "@/lib/commerce";
import { ShopBrowser } from "./ShopBrowser";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Swolvation long sleeves and oversized tees: vintage-inspired gym clothing made for everyday wear.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getCatalog();

  return (
    <div data-tone="light" className="gutter min-h-[80vh] bg-bone pb-28 pt-32 md:pb-40 md:pt-40">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <h1 className="display text-[3.25rem] md:col-span-6 md:text-[5rem]">Shop</h1>
        <p className="max-w-[44ch] text-charcoal md:col-span-5 md:col-start-8 md:justify-self-end md:text-right">
          Vintage-inspired long sleeves and tees, made to be worn in the gym and everywhere else.
        </p>
      </div>
      <Suspense fallback={<div className="mt-12 h-96" aria-hidden="true" />}>
        <ShopBrowser products={products} />
      </Suspense>
    </div>
  );
}
