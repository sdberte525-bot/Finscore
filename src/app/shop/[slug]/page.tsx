import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductForm } from "@/components/product/ProductForm";
import { ProductGallery } from "@/components/product/ProductGallery";
import { shippingSummary } from "@/data/info";
import { site } from "@/data/site";
import { getProduct, getProducts, isSoldOut } from "@/lib/commerce/catalog";
import { formatPrice } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const image = product.images[0];
  return {
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)}.`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title: product.name, description: product.description, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  };
}

const categoryLabel = { "long-sleeve": "Long sleeves", tee: "Tees" } as const;

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const others = getProducts().filter((p) => p.slug !== product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => new URL(i.src, site.url).toString()),
    brand: { "@type": "Brand", name: site.name },
    color: product.colorway,
    offers: {
      "@type": "Offer",
      url: new URL(`/shop/${product.slug}`, site.url).toString(),
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability: isSoldOut(product) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  const accordions = [
    { title: "Details", body: <ul className="list-inside list-disc space-y-1 marker:text-stone">{product.details.map((d) => <li key={d}>{d}</li>)}</ul> },
    { title: "Fit", body: <p>{product.fit}</p> },
    { title: "Care", body: <ul className="space-y-1">{product.care.map((c) => <li key={c}>{c}</li>)}</ul> },
    {
      title: "Shipping and returns",
      body: (
        <p>
          {shippingSummary}{" "}
          <Link href="/info/shipping-returns" className="underline underline-offset-4">
            Full policy
          </Link>
        </p>
      ),
    },
  ];

  return (
    <div data-tone="light" className="bg-bone pt-16 md:pt-20">
      <div className="lg:gutter lg:grid lg:grid-cols-12 lg:gap-8 lg:pt-8">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="gutter pt-8 lg:col-span-4 lg:col-start-9 lg:px-0 lg:pt-0">
          <div className="lg:sticky lg:top-28">
            <nav aria-label="Breadcrumb" className="text-xs text-ash">
              <ol className="flex gap-2">
                <li>
                  <Link href="/shop" className="link-underline">
                    Shop
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/shop?category=${product.category}`} className="link-underline">
                    {categoryLabel[product.category]}
                  </Link>
                </li>
              </ol>
            </nav>

            <h1 className="mt-6 text-2xl font-normal leading-tight md:text-[2.25rem]">{product.name}</h1>
            <div className="mt-3 flex items-baseline justify-between text-lg">
              <p className="text-ash">{product.colorway}</p>
              <p className="tabular-nums">{formatPrice(product.price)}</p>
            </div>

            <figure className="mt-10 border-y border-ink/15 py-8">
              <blockquote className="fraktur text-[1.75rem] leading-[1.15] md:text-[2rem]">
                <p>&ldquo;{product.scripture.text}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 text-sm text-ash">{product.scripture.reference}, printed on the back</figcaption>
            </figure>

            <div className="mt-8">
              <ProductForm product={product} />
            </div>

            <p className="mt-10 text-charcoal">{product.description}</p>

            <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
              {accordions.map((a) => (
                <details key={a.title} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm [&::-webkit-details-marker]:hidden">
                    {a.title}
                    <span aria-hidden="true" className="text-lg leading-none transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="pb-5 text-sm leading-relaxed text-charcoal">{a.body}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="gutter pb-32 pt-28 md:pb-40 md:pt-40" aria-labelledby="related-title">
        <h2 id="related-title" className="fraktur text-[2.75rem] md:text-[4rem]">
          Also in Drop 01
        </h2>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:w-2/3 lg:gap-x-8">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" />
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
