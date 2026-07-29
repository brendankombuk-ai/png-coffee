import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import ProductsHero from "@/components/ProductsHero";
import CoffeeProductGrid from "@/components/CoffeeProductGrid";
import ProductsValueAdded from "@/components/ProductsValueAdded";
import Footer from "@/components/Footer";
import { site } from "@/data/content";
import { getProductsHero, getProductsValueAdded } from "@/lib/cms/adapters";

export const metadata: Metadata = {
  title: "Our Coffee",
  description:
    "PNG Coffee from the highlands of Papua New Guinea — Dark and Medium roast, beans or ground, in 250g bags. Buy in 3, 6 or 10-pack bundles.",
  openGraph: {
    title: `Our Coffee – ${site.name}`,
    description:
      "PNG Coffee from the highlands of Papua New Guinea — Dark and Medium roast, beans or ground, in 250g bags.",
  },
};

export default async function ProductsPage() {
  const [productsHero, productsValueAdded] = await Promise.all([
    getProductsHero(),
    getProductsValueAdded(),
  ]);

  return (
    <>
      <Navbar />
      <TribalBackdrop src="/images/our-coffee.jpg" />
      <main id="main-content" className="relative">
        <ProductsHero productsHero={productsHero} />
        <CoffeeProductGrid />
        <ProductsValueAdded productsValueAdded={productsValueAdded} />
      </main>
      <Footer />
    </>
  );
}
