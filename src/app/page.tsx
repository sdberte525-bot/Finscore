import { ClosingStatement } from "@/components/home/ClosingStatement";
import { CollectionFeature } from "@/components/home/CollectionFeature";
import { FirstDrop } from "@/components/home/FirstDrop";
import { HomeHero } from "@/components/home/HomeHero";
import { OurStory } from "@/components/home/OurStory";
import { business } from "@/data/business";
import { campaign } from "@/data/campaign";
import { getCatalog } from "@/lib/commerce";
import type { Product, ProductImage } from "@/lib/commerce/types";

function pick(products: Product[], label: string, prefer?: string): ProductImage {
  const ordered = prefer ? [...products].sort((a) => (a.slug === prefer ? -1 : 1)) : products;
  for (const p of ordered) {
    const image = p.images.find((i) => i.label === label);
    if (image) return image;
  }
  return products[0].images[0];
}

export default async function HomePage() {
  const products = await getCatalog();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: business.url,
    slogan: business.tagline,
    ...(business.email ? { email: business.email } : {}),
    ...(business.social.length ? { sameAs: business.social.map((s) => s.href) } : {}),
  };

  return (
    <>
      <HomeHero campaignImage={campaign.hero} productImage={pick(products, "Back", "through-christ")} />
      <FirstDrop products={products} />
      <CollectionFeature campaignImage={campaign.feature} lead={pick(products, "Back", "strong-courageous")} detail={pick(products, "Chest", "strong-courageous")} />
      <OurStory campaignImage={campaign.story} image={pick(products, "Back print", "through-christ")} />
      <ClosingStatement />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
