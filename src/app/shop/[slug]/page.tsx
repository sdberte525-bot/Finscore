import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
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
    ...(product.features?.length
      ? [
          {
            title: "Details",
            body: (
              <ul className="list-disc space-y-1 pl-5 marker:text-muted">
                {product.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
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
    <div className="bg-bone pb-4 lg:pt-8">
      <div className="lg:gutter lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="gutter pt-8 lg:col-span-4 lg:col-start-9 lg:px-0 lg:pt-0">
          <div className="lg:sticky lg:top-24">
            <nav aria-label="Breadcrumb" className="text-sm text-ash">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href="/" className="link-underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
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

            <p className="caps mt-6 text-ash">Swolvation</p>
            <h1 className="display mt-2 text-[2.75rem] md:text-[3.5rem]">{product.name}</h1>
            <p className="mt-3 text-xl tabular-nums">{formatPrice(product.price)}</p>
            {!isProductAvailable(product) && <p className="mt-2 text-[0.9375rem] text-oxblood">Sold out</p>}

            <p className="mt-6 leading-relaxed text-charcoal">{product.description}</p>

            {product.scripture ? (
              <figure className="mt-6 border-l-2 border-ink pl-4">
                <blockquote className="text-lg italic leading-snug">
                  <p>&ldquo;{product.scripture.text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-2 text-sm text-ash">{product.scripture.reference}, printed on the back</figcaption>
              </figure>
            ) : null}

            <div className="mt-8">
              <ProductForm product={product} />
            </div>

            <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {sections.map((s, i) => (
                <details key={s.title} className="group" open={i === 0}>
                  <summary className="caps flex min-h-14 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
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
        <section className="gutter mt-20 border-t border-ink/10 pb-24 pt-16 md:mt-28 md:pb-32 md:pt-20" aria-labelledby="related-title">
          <h2 id="related-title" className="display text-[2.5rem] md:text-[3.5rem]">
            Complete the drop
          </h2>
          <div className="mt-10">
            <ProductGrid products={others} priorityCount={0} />
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
