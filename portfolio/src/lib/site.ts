import { research } from "@/data/research";

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteTitle = "Salvatore Berte | Finance & Applied Economics";
export const siteDescription =
  "Explore the professional background of Salvatore Berte, a finance and applied economics professional focused on fixed income, investment research, and financial markets.";

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#selected-work", label: "Selected Work" },
  ...(research.length > 0 ? [{ href: "#research", label: "Research" }] : []),
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
