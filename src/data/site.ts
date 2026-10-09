/*
 * Brand details used across the site. Social handles and email addresses are
 * placeholders until the accounts are live.
 */

export const site = {
  name: "Swolvation",
  tagline: "Old iron. Older faith.",
  description:
    "Heavyweight gym clothing with scripture prints and old-school bodybuilding roots. Drop 01, the Scripture Series, is out now.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  founded: 2026,
  email: {
    general: "hello@swolvation.com",
    community: "community@swolvation.com",
    collabs: "collabs@swolvation.com",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/swolvation", handle: "@swolvation" },
    { label: "TikTok", href: "https://tiktok.com/@swolvation", handle: "@swolvation" },
    { label: "YouTube", href: "https://youtube.com/@swolvation", handle: "@swolvation" },
  ],
} as const;

export const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Story", href: "/#story" },
  { label: "Plates", href: "/#plates" },
  { label: "Community", href: "/#community" },
] as const;
