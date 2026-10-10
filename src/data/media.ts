/*
 * Campaign media: every video and campaign photo the site uses, in one place.
 *
 * The files are hosted on Higgsfield's CDN (the account that generated them).
 * To move them (for example to Shopify > Content > Files once the store is
 * connected), upload each file there and replace its URL below; nothing else
 * changes. Remote image hosts must also be listed in next.config.ts.
 *
 * Every frame with a shirt in it was checked against the real product photos.
 */

export type MediaImage = { src: string; alt: string; width: number; height: number };
export type MediaVideo = { src: string; poster: MediaImage; width: number; height: number };

const UPLOADS = "https://d2ol7oe51mr4n9.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea";
const GEN = "https://d8j0ntlcm91z4.cloudfront.net/user_3KW4bOaWnBSh6zRqm3msREW6Jea";

const still = (path: string, alt: string, width: number, height: number): MediaImage => ({ src: `${GEN}/${path}.png`, alt, width, height });
const PORTRAIT = [1536, 2752] as const; // 9:16
const FOUR_FIVE = [1856, 2304] as const; // 4:5
const WIDE = [2752, 1536] as const; // 16:9

export const photos = {
  teeGymHook: still("hf_20261010_205900_7ed455a1-034b-4804-969f-8fe13f3d682d", "The Be Strong & Courageous tee hanging on a hook in an old-school gym at dawn, back print lit by window light", ...FOUR_FIVE),
  lsGymHook: still("hf_20261010_205629_0518490b-d876-4977-b3cd-099391d82dce", "The Through Christ Who Strengthens Me long sleeve hanging in a gym at dawn, back and sleeve prints visible", ...FOUR_FIVE),
  teeRack: still("hf_20261010_212621_57d6c71b-35db-4fcb-9dfa-0e676dd9e1cb", "The Be Strong & Courageous tee on a power-rack hook under a single overhead light", ...PORTRAIT),
  teeRackWide: still("hf_20261010_213116_d0cedd96-15e7-4226-8495-87e7c7e79d8e", "The Be Strong & Courageous tee on a power-rack hook between plate trees in a dark gym", ...WIDE),
  lsLocker: still("hf_20261010_212620_cafbb423-f350-4b28-917d-4bb6963749a6", "The Through Christ long sleeve on a wooden peg in a sunlit 1990s gym locker room", ...PORTRAIT),
  lsLockerWide: still("hf_20261010_213116_97e98abb-1717-4bf1-9984-8fa8250804af", "The Through Christ long sleeve on a wooden peg beside a dumbbell rack in late-afternoon sun", ...WIDE),
  undergroundWide: still("hf_20261010_213116_1248bce1-d491-4851-9dbe-637f09b4a6ee", "An empty underground gym before dawn: a loaded barbell, a power rack and the tee hanging on its hook", ...WIDE),
  underground: still("hf_20261010_212620_750c4eb9-ed79-4fe4-b4d3-062c7b5a0aa7", "An empty underground gym before dawn with a loaded barbell and the tee on the rack", ...PORTRAIT),
  knurling: still("hf_20261010_212621_f8f20d9f-b8f4-449f-a695-90f494d784bf", "Macro of chalk-packed barbell knurling under a hard light", ...PORTRAIT),
  chalk: still("hf_20261010_213115_85834e53-3030-4d96-ad5a-005cf43b611e", "Chalk dust drifting through a beam of window light above a chalk bowl", ...PORTRAIT),
  dumbbells: still("hf_20261010_213116_62aeeaf0-548d-4eb7-be3c-4960c736fb98", "A row of heavy hex dumbbells rim-lit in a dark gym", ...PORTRAIT),
  vintageGym: still("hf_20261010_213116_6064bb01-b50f-4d6f-8227-bc3693a7c7ba", "An empty 1990s bodybuilding gym in golden afternoon light", ...PORTRAIT),
  teeStudioFront: still("hf_20261010_205629_3b400603-3fac-4982-b33c-f90b6c203087", "Front of the Be Strong & Courageous tee: a small thorned cross over the Swolvation wordmark on the chest", ...PORTRAIT),
  teeStudioBack: still("hf_20261010_205629_7bf76921-6476-427b-853c-c7ffcb56441b", "Back of the Be Strong & Courageous tee: a gothic cross between two skulls under Be strong and courageous, Joshua 1:9", ...PORTRAIT),
  lsStudioFront: still("hf_20261010_213116_05a012c2-1d40-4d52-b690-084fe348104b", "Front of the Through Christ long sleeve: a cross and wordmark on the chest, thorned vines down both sleeves", ...PORTRAIT),
  lsStudioBack: still("hf_20261010_213116_960a1f93-1fc4-4f54-bc61-cd7a3a8887df", "Back of the Through Christ long sleeve: a skull on a thorned cross inside an arch of Philippians 4:13", ...PORTRAIT),
  teeFlatLay: { src: "/images/campaign/tee-flat-lay.webp", alt: "The Be Strong & Courageous tee laid flat on a gym floor beside a 45 lb plate and a leather belt", width: 1280, height: 1589 },
  lsFlatLay: { src: "/images/campaign/ls-flat-lay.webp", alt: "The Through Christ long sleeve laid flat on a gym floor beside a plate and a leather belt", width: 1280, height: 1589 },
} satisfies Record<string, MediaImage>;

const poster = (id: string, alt: string, width: number, height: number): MediaImage => ({ src: `${UPLOADS}/${id}.jpg`, alt, width, height });

/** Muted, seamless loops (each plays forward then back, so there's no jump at the seam). */
export const loops = {
  lsDawn: {
    src: `${UPLOADS}/98428e0f-58a6-4d16-aaf8-5859fe8f642f.mp4`,
    poster: poster("239f4b41-ceb4-4353-9d3a-a4a300975cb1", "The Through Christ long sleeve hanging in a gym at dawn", 1080, 1340),
    width: 1080,
    height: 1340,
  },
  teeSweep: {
    src: `${UPLOADS}/9d9eede1-c0e9-4847-affa-f63d81d76c06.mp4`,
    poster: poster("b61273a1-5417-4848-aaec-b5fc084f3988", "A beam of light sweeping across the back print of the Be Strong & Courageous tee", 720, 1290),
    width: 720,
    height: 1290,
  },
  teeTurn: {
    src: `${UPLOADS}/e0c9664b-d124-4af4-927a-e1446cada634.mp4`,
    poster: poster("01c4d1ac-fada-4235-8038-4767b27ab192", "The Be Strong & Courageous tee turning from front to back", 720, 1290),
    width: 720,
    height: 1290,
  },
  lsTurn: {
    src: `${UPLOADS}/4182375c-37d2-4a5f-a9ed-6be7f2005c7c.mp4`,
    poster: poster("913f78ca-e6c0-438a-8f3a-32d4c00bbb73", "The Through Christ long sleeve turning from front to back", 720, 1290),
    width: 720,
    height: 1290,
  },
} satisfies Record<string, MediaVideo>;

/** The launch film, with sound. Vertical for phones, widescreen for larger screens. */
export const film = {
  title: "The Iron Waits",
  vertical: {
    src: `${UPLOADS}/e7f711fe-14ad-4f72-9cd1-90aaab2c1465.mp4`,
    poster: poster("521b21c6-ff69-4f47-b190-f612b6422d06", "The Iron Waits: the tee hanging on a power rack in an empty gym", 1080, 1920),
    width: 1080,
    height: 1920,
  },
  wide: {
    src: `${UPLOADS}/1895bd70-52da-4ed6-8a9b-d2b8049550dd.mp4`,
    poster: poster("01eb8068-2673-4c87-acba-9b048508bf94", "The Iron Waits: the tee hanging on a power rack in an empty gym", 1920, 1080),
    width: 1920,
    height: 1080,
  },
} satisfies Record<string, MediaVideo | string>;
