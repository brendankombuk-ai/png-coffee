import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import ProductsHero from "@/components/ProductsHero";
import ProductCategoryGrid from "@/components/ProductCategoryGrid";
import ProductsValueAdded from "@/components/ProductsValueAdded";
import Footer from "@/components/Footer";
import { site } from "@/data/content";
import {
  getProductsHero,
  getProductCategories,
  getProductsValueAdded,
} from "@/lib/cms/adapters";

export const metadata: Metadata = {
  title: "Our Coffee",
  description:
    "PNG Coffee is grown in the pristine highlands of Papua New Guinea and available as whole beans, ground, drip coffee, and capsules.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: `Our Coffee – ${site.name}`,
    description:
      "PNG Coffee is grown in the pristine highlands of Papua New Guinea and available as whole beans, ground, drip coffee, and capsules.",
    url: "/products",
  },
};

export default async function ProductsPage() {
  const [productsHero, productCategories, productsValueAdded] = await Promise.all([
    getProductsHero(),
    getProductCategories(),
    getProductsValueAdded(),
  ]);

  return (
    <>
      <Navbar />
      <TribalBackdrop src="/images/our-coffee.jpg" />
      <main id="main-content" className="relative">
        <ProductsHero productsHero={productsHero} />
        <ProductCategoryGrid productCategories={productCategories} />
        <ProductsValueAdded productsValueAdded={productsValueAdded} />
      </main>
      <Footer />
    </>
  );
}
