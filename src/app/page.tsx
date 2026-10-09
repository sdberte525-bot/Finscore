import { Collection } from "@/components/home/Collection";
import { Community } from "@/components/home/Community";
import { Hero } from "@/components/home/Hero";
import { Plates } from "@/components/home/Plates";
import { Story } from "@/components/home/Story";
import { collaborations, posts } from "@/data/community";
import { plates } from "@/data/gallery";
import { site } from "@/data/site";
import { getProducts } from "@/lib/commerce/catalog";

export default function HomePage() {
  const products = getProducts();
  const prints = products.map(({ slug, name, inkMap, scripture }) => ({ slug, name, inkMap, scripture }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    slogan: site.tagline,
    email: site.email.general,
    sameAs: site.social.map((s) => s.href),
  };

  return (
    <>
      <Hero prints={prints} />
      <Collection products={products} />
      <Story />
      <Plates plates={plates} />
      <Community posts={posts} collaborations={collaborations} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
