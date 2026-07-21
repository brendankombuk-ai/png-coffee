import type { Metadata } from "next";

import "@/styles/globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { site } from "@/data/content";

const archivo = { variable: "--font-display" };
const inter = { variable: "--font-body" };

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pngcoffee.com"),
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
  openGraph: {
    title: `${site.name} \u2014 PNG Grown, Shared With The World`,
    description: site.description,
    url: "https://www.pngcoffee.com",
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
