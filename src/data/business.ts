/*
 * Business details. Anything left null renders as "to be confirmed" on the
 * site or is hidden, so nothing is promised before it's decided.
 * Fill these in as they're established; no code changes are needed.
 */

export type SocialLink = { label: string; href: string; handle: string; icon: "instagram" | "tiktok" };

export const business = {
  name: "Swolvation",
  tagline: "Built through adversity.",
  description: "Vintage-inspired training apparel rooted in strength, discipline, and purpose.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Public customer-service address. Hidden while null. */
  email: "swolvation@gmail.com" as string | null,
  /** Registered business name and address, used in the privacy policy and terms. */
  legalName: null as string | null,
  address: null as string | null,
  /** Governing law for the terms, e.g. "the State of Texas". */
  jurisdiction: null as string | null,

  /** Official social accounts, shown in the header menu, footer, homepage and contact page. */
  social: [
    { label: "Instagram", handle: "@swolvation", href: "https://www.instagram.com/swolvation", icon: "instagram" },
    { label: "TikTok", handle: "@swolvation", href: "https://www.tiktok.com/@swolvation", icon: "tiktok" },
  ] as SocialLink[],

  shipping: {
    /** e.g. "the United States and Canada" */
    regions: null as string | null,
    /** e.g. "2 to 4 business days" */
    processingTime: null as string | null,
    /** e.g. "Free on orders over $100, otherwise $8 flat." */
    rates: null as string | null,
    /** e.g. "3 to 7 business days within the US" */
    deliveryEstimate: null as string | null,
  },

  returns: {
    /** e.g. 30 */
    windowDays: null as number | null,
    /** e.g. "Unworn and unwashed, with tags attached." */
    condition: null as string | null,
    /** e.g. "Free size exchanges within the US." */
    exchanges: null as string | null,
    /** e.g. "Refunds go back to the original payment method within 5 business days of receipt." */
    refunds: null as string | null,
  },
};

export const nav = [
  { label: "Shop", href: "/shop" },
  { label: "New drop", href: "/new-drop" },
  { label: "Our story", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
