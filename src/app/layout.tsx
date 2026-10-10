import type { Metadata, Viewport } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { business } from "@/data/business";
import { getCatalog } from "@/lib/commerce";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: `${business.name}: vintage-inspired gym and lifestyle clothing`, template: `%s | ${business.name}` },
  description: business.description,
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    title: business.name,
    description: business.description,
    images: [{ url: "/images/products/strong-courageous/back.webp", width: 1220, height: 1331, alt: "Swolvation Be Strong & Courageous tee, back" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1a1917",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getCatalog();
  return (
    <html lang="en" className={`${archivo.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide intro-animated elements before first paint, only when JS will animate them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <CartProvider products={products}>
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
