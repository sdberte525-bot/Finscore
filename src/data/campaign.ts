import type { ProductImage } from "@/lib/commerce/types";

/*
 * Campaign photography. Every slot below is null until real, licensed
 * photography is available; a null slot renders as a quiet placeholder marked
 * "Campaign photography coming soon", so nothing stands in for the real shoot.
 *
 * To add a photo: put the file in public/images/campaign/, then set the slot to
 *   { src: "/images/campaign/hero.jpg", alt: "…", width: 2400, height: 1600 }
 * Use files at least 2400px on the long edge for full-width slots.
 *
 * Art direction for the shoot (from the brand brief): natural, cinematic light;
 * neutral, slightly warm grade with subtle film character; real gyms and simple
 * architecture; athletes, not influencers; full-length, detail and studio frames.
 */

export type CampaignImage = ProductImage;

export const campaign = {
  /**
   * Full-bleed homepage hero. Suggested: landscape, an athlete in a Swolvation
   * piece in an old-school weight room, space on the left or bottom for type.
   * While null, the hero prints the garment artwork instead.
   */
  hero: null as CampaignImage | null,

  /** Homepage editorial section. lead: tall portrait (4:5); wide: landscape (3:2). */
  editorialLead: null as CampaignImage | null,
  editorialWide: null as CampaignImage | null,

  /** About page. opening: wide (16:9) environment shot; inspiration: portrait (4:5). */
  aboutOpening: null as CampaignImage | null,
  aboutInspiration: null as CampaignImage | null,
};

/** Back prints the artwork hero cycles through (white-on-black ink maps from `npm run images`). */
export const heroPrints = [
  {
    slug: "through-christ",
    name: "Through Christ Who Strengthens Me",
    label: "Philippians 4:13",
    alt: "Back print of the Through Christ Who Strengthens Me long sleeve: a thorned cross and skull inside an arch of lettering",
    ink: "/images/ink/through-christ.png",
  },
  {
    slug: "strong-courageous",
    name: "Be Strong & Courageous",
    label: "Joshua 1:9",
    alt: "Back print of the Be Strong & Courageous tee: a gothic cross between two skulls",
    ink: "/images/ink/strong-courageous.png",
  },
  {
    slug: "though-i-fall",
    name: "Though I Fall, I Will Rise",
    label: "Micah 7:8",
    alt: "Back print of the Though I Fall, I Will Rise long sleeve: a knight kneeling beneath a thorned cross",
    ink: "/images/ink/though-i-fall.png",
  },
];
