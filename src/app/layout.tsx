import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { EmailPopup } from "@/components/site/EmailPopup";
import { StoreStatusProvider } from "@/components/site/StoreStatus";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SearchProvider } from "@/components/site/Search";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { business } from "@/data/business";
import { getCatalog } from "@/lib/commerce";
import { isStoreOpen } from "@/lib/commerce/status";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-shoulders",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
  adjustFontFallback: false,
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
    images: [{ url: "/images/campaign/tee-flat-lay.webp", width: 1280, height: 1589, alt: "The Swolvation Be Strong & Courageous tee laid flat on a gym floor" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getCatalog();
  const storeOpen = isStoreOpen();
  return (
    <html lang="en" className={`${archivo.variable} ${shoulders.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide intro-animated elements before first paint, only when JS will animate them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <StoreStatusProvider open={storeOpen}>
          <CartProvider products={products}>
            <SearchProvider products={products}>
              <SmoothScroll />
              <AnnouncementBar open={storeOpen} />
              <Header />
              <main id="main">{children}</main>
              <Footer />
              <CartDrawer />
              <EmailPopup />
            </SearchProvider>
          </CartProvider>
        </StoreStatusProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
