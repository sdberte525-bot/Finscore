import type { ProductImage } from "@/lib/commerce/types";
import { photos } from "./media";

/*
 * Campaign photography for editorial slots. The first-drop campaign images live
 * in src/data/media.ts; a null slot falls back to product photography.
 *
 * To use a new photo: add it to media.ts (or put the file in
 * public/images/campaign/) and point the slot at it.
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
  feature: photos.teeGymHook as CampaignImage | null,
  /** "Strength has a purpose" story section. Portrait (4:5). */
  story: photos.lsLocker as CampaignImage | null,
  /** About page. opening: wide (16:9); inspiration: portrait (4:5). */
  aboutOpening: photos.vintageGym as CampaignImage | null,
  aboutInspiration: photos.teeFlatLay as CampaignImage | null,
};
