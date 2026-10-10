import { ClosingStatement } from "@/components/home/ClosingStatement";
import { CollectionFeature } from "@/components/home/CollectionFeature";
import { FirstAccess } from "@/components/home/FirstAccess";
import { FirstDrop } from "@/components/home/FirstDrop";
import { Follow } from "@/components/home/Follow";
import { HomeHero } from "@/components/home/HomeHero";
import { Marquee } from "@/components/home/Marquee";
import { OurStory } from "@/components/home/OurStory";
import { Scripture } from "@/components/home/Scripture";
import { TurnAround } from "@/components/home/TurnAround";
import { business } from "@/data/business";
import { campaign } from "@/data/campaign";
import { getCatalog } from "@/lib/commerce";
import { isStoreOpen } from "@/lib/commerce/status";
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
  const storeOpen = isStoreOpen();

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
      <HomeHero storeOpen={storeOpen} />
      <Marquee />
      <FirstDrop products={products} />
      <TurnAround products={products} />
      <Scripture products={products} />
      <CollectionFeature campaignImage={campaign.feature} lead={pick(products, "Back", "strong-courageous")} />
      <OurStory campaignImage={campaign.story} image={pick(products, "Back", "through-christ")} />
      <FirstAccess storeOpen={storeOpen} />
      <Follow />
      <ClosingStatement />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
