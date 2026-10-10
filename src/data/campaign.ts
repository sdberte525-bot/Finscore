import type { ProductImage } from "@/lib/commerce/types";

/*
 * Campaign photography. Each slot is null until real, licensed photography is
 * available. While a slot is null the section shows product photography from
 * src/data/products.ts instead, so nothing stands in for the real shoot.
 *
 * To add a photo: put the file in public/images/campaign/, then set the slot to
 *   { src: "/images/campaign/hero.jpg", alt: "…", width: 2400, height: 1600 }
 * Use files at least 2400px on the long edge for full-width slots.
 *
 * Art direction for the shoot: natural, cinematic light; neutral, slightly warm
 * grade with subtle film character; real gyms and simple architecture;
 * athletes, not influencers; full-length, detail and studio frames.
 */

export type CampaignImage = ProductImage;

export const campaign = {
  /** Homepage hero. Landscape, at least 2400px wide, with calm space on the left for the headline. */
  hero: null as CampaignImage | null,
  /** "More than what you wear" feature. Portrait (4:5). */
  feature: null as CampaignImage | null,
  /** "Strength has a purpose" story section. Portrait (4:5). */
  story: null as CampaignImage | null,
  /** About page. opening: wide (16:9); inspiration: portrait (4:5). */
  aboutOpening: null as CampaignImage | null,
  aboutInspiration: null as CampaignImage | null,
};
