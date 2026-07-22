import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import ProductsValueAdded from "@/components/ProductsValueAdded";
import Footer from "@/components/Footer";
import { site, productsValueAdded } from "@/data/content";

export const metadata: Metadata = {
  title: "Value Added",
  description: productsValueAdded.intro,
  alternates: {
    canonical: "/value-added",
  },
  openGraph: {
    title: `Value Added – ${site.name}`,
    description: productsValueAdded.intro,
    url: "/value-added",
    images: [
      {
        url: "/images/about-values/value-added.jpg",
        width: 1600,
        height: 1200,
        alt: "Roasted coffee beans, ground coffee, and packaged value-added coffee products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Value Added – ${site.name}`,
    description: productsValueAdded.intro,
    images: ["/images/about-values/value-added.jpg"],
  },
};

export default function ValueAddedPage() {
  return (
    <>
      <Navbar />
      <TribalBackdrop />
      <main id="main-content" className="relative pt-[60px] sm:pt-[80px]">
        <ProductsValueAdded productsValueAdded={productsValueAdded} titleAs="h1" />
      </main>
      <Footer />
    </>
  );
}
