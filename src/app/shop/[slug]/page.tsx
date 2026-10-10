import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductForm } from "@/components/product/ProductForm";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Pending } from "@/components/ui/Pending";
import { business } from "@/data/business";
import { categoryLabel } from "@/data/sizeGuide";
import { getCatalog, getProduct } from "@/lib/commerce";
import { isProductAvailable } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCatalog()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  const image = product.images[0];
  return {
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)}.`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title: product.name, description: product.description, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const others = (await getCatalog()).filter((p) => p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => new URL(i.src, business.url).toString()),
    brand: { "@type": "Brand", name: business.name },
    color: product.colors.map((c) => c.name).join(", "),
    offers: {
      "@type": "Offer",
      url: new URL(`/shop/${product.slug}`, business.url).toString(),
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability: isProductAvailable(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  const { shipping, returns } = business;
  const sections = [
    {
      title: "Material",
      body: product.material ? <p>{product.material}</p> : <Pending>Fabric details will be listed here before launch.</Pending>,
    },
    {
      title: "Fit",
      body: product.fit ? (
        <p>{product.fit}</p>
      ) : (
        <p>
          <Pending>Fit notes and measurements are coming soon.</Pending>{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Ask us about sizing
          </Link>
          .
        </p>
      ),
    },
    {
      title: "Care",
      body: product.care ? (
        <ul className="space-y-1">
          {product.care.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : (
        <Pending>Care instructions will be listed here before launch.</Pending>
      ),
    },
    {
      title: "Shipping and returns",
      body: (
        <div className="space-y-2">
          <p>
            {shipping.processingTime ? `Orders ship within ${shipping.processingTime}.` : <Pending>Shipping times will be confirmed before launch.</Pending>}
          </p>
          <p>
            {returns.windowDays ? `Returns accepted within ${returns.windowDays} days of delivery.` : <Pending>Return terms will be confirmed before launch.</Pending>}
          </p>
          <p>
            <Link href="/shipping" className="underline underline-offset-4">
              Shipping
            </Link>
            <span className="text-ash"> and </span>
            <Link href="/returns" className="underline underline-offset-4">
              returns
            </Link>
          </p>
        </div>
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
            <nav aria-label="Breadcrumb" className="text-sm text-ash">
              <ol className="flex flex-wrap gap-2">
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

            <h1 className="display mt-5 text-[2.5rem] leading-[1.05] md:text-[3rem]">{product.name}</h1>
            <div className="mt-3 flex items-baseline justify-between gap-4 text-lg">
              <p className="text-ash">{product.collection}</p>
              <p className="tabular-nums">{formatPrice(product.price)}</p>
            </div>
            {!isProductAvailable(product) && <p className="mt-2 text-[0.9375rem] text-oxblood">Sold out</p>}

            <p className="mt-8 leading-relaxed text-charcoal">{product.description}</p>

            {product.scripture ? (
              <figure className="mt-8 border-l border-ink/20 pl-5">
                <blockquote className="display-italic text-[1.5rem] leading-snug">
                  <p>&ldquo;{product.scripture.text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-2 text-sm text-ash">{product.scripture.reference}, printed on the back</figcaption>
              </figure>
            ) : null}

            <div className="mt-10">
              <ProductForm product={product} />
            </div>

            <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {sections.map((s, i) => (
                <details key={s.title} className="group" open={i === 0}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-[0.9375rem] [&::-webkit-details-marker]:hidden">
                    {s.title}
                    <span aria-hidden="true" className="text-xl leading-none transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="pb-5 text-[0.9375rem] leading-relaxed text-charcoal">{s.body}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="gutter pb-28 pt-24 md:pb-36 md:pt-36" aria-labelledby="related-title">
          <h2 id="related-title" className="display text-[2.5rem] md:text-[3.5rem]">
            You may also like
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" />
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
