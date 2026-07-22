"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";
import AnimatedBackground from "./AnimatedBackground";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import { site, type ProductCategoryPageData } from "@/data/content";

/**
 * Shared template for every /products/[slug] page. Takes title, description
 * and products through props so the same component can later be driven by
 * a CMS, JSON file, or API response instead of the static data map.
 */
export default function ProductCategoryPage({
  slug,
  title,
  description,
  products,
  background,
}: ProductCategoryPageData) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Our Coffee", item: `${site.url}/products` },
      { "@type": "ListItem", position: 3, name: title, item: `${site.url}/products/${slug}` },
    ],
  };

  const pricedProducts = products.filter((p) => p.price > 0);
  const productListSchema = pricedProducts.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: pricedProducts.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: product.name,
            description: product.description,
            ...(product.image ? { image: `${site.url}${product.image}` } : {}),
            offers: {
              "@type": "Offer",
              price: product.price.toFixed(2),
              priceCurrency: process.env.NEXT_PUBLIC_CURRENCY || "USD",
              availability: "https://schema.org/InStock",
              url: `${site.url}/products/${slug}`,
            },
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {productListSchema && <JsonLd data={productListSchema} />}
      <Navbar />
      <AnimatedBackground {...(background ? { src: background } : {})} />
      <main id="main-content" className="relative">
        {/* ============ HERO TITLE ============ */}
        <section className="relative z-10 mx-auto flex min-h-[46vh] max-w-[1400px] flex-col items-center justify-center px-6 pb-12 pt-[140px] text-center sm:px-10 sm:pt-[160px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[900px]"
          >
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
              {title}
            </h1>
            {description && (
              <p className="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-white/85 sm:text-lg">
                {description}
              </p>
            )}
          </motion.div>
        </section>

        {/* ============ PRODUCT GRID ============ */}
        <ProductGrid products={products} categorySlug={slug} />
      </main>
      <Footer />
    </>
  );
}
