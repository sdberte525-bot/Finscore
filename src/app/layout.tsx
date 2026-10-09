import type { Metadata, Viewport } from "next";
import { Archivo, Cinzel, UnifrakturMaguntia } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { site } from "@/data/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["500"], variable: "--font-cinzel", display: "swap" });
const fraktur = UnifrakturMaguntia({ subsets: ["latin"], weight: "400", variable: "--font-fraktur", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: heavyweight gym clothing with scripture prints`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/images/products/strengthened-long-sleeve/composite.jpg", width: 1470, height: 1838, alt: "Strengthened Long Sleeve" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1a1917",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${cinzel.variable} ${fraktur.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide intro-animated elements before first paint, only when JS will animate them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <CartProvider>
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
