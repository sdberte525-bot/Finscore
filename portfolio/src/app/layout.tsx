import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { person } from "@/data/profile";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: person.name,
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  keywords: [
    "Salvatore Berte",
    "finance",
    "applied economics",
    "fixed income",
    "investment research",
    "asset management",
    "Boston College",
    "Stonehill College",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: person.name,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    firstName: "Salvatore",
    lastName: "Berte",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#14263d",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  email: `mailto:${person.email}`,
  sameAs: [person.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Boca Raton", addressRegion: "FL", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Stonehill College" },
  ],
  affiliation: { "@type": "CollegeOrUniversity", name: "Boston College" },
  knowsAbout: [
    "Fixed income securities",
    "Monetary policy",
    "Macroeconomic research",
    "Investment analysis",
    "Econometrics",
    "Financial modeling",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plex.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets reveal animations hide content only when script is running to show it again. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
