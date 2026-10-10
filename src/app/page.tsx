import { BrandIntro } from "@/components/home/BrandIntro";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Collection } from "@/components/home/Collection";
import { Editorial } from "@/components/home/Editorial";
import { Hero } from "@/components/home/Hero";
import { PhotoHero } from "@/components/home/PhotoHero";
import { business } from "@/data/business";
import { campaign, heroPrints } from "@/data/campaign";
import { getCatalog } from "@/lib/commerce";

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
      {campaign.hero ? <PhotoHero image={campaign.hero} /> : <Hero prints={heroPrints} />}
      <Collection products={products} />
      <Editorial />
      <BrandIntro />
      <ClosingCta product={products.find((p) => p.colors.some((c) => c.name === "White")) ?? products[0]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
