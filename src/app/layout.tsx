import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "@/styles/globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { CartProvider } from "@/lib/cart/CartContext";
import CartDrawer from "@/components/CartDrawer";
import JsonLd from "@/components/JsonLd";
import { site, nav, businessAddress } from "@/data/content";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}${nav.logo}`,
  image: `${site.url}${nav.logo}`,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    ...businessAddress,
  },
};

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} \u2014 PNG Grown, Shared With The World`,
    template: `%s \u2013 ${site.name}`,
  },
  description: site.description,
  keywords: [
    "PNG Coffee",
    "Papua New Guinea coffee",
    "highlands coffee",
    "specialty coffee roaster",
    "SwissXpresso PNG",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} \u2014 PNG Grown, Shared With The World`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/our-coffee.jpg",
        width: 1600,
        height: 1200,
        alt: "Freshly brewed PNG Coffee beside roasted beans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} \u2014 PNG Grown, Shared With The World`,
    description: site.description,
    images: ["/images/our-coffee.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <JsonLd data={organizationSchema} />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CartProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
