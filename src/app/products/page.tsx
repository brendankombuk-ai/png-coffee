import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import ProductsHero from "@/components/ProductsHero";
import PurchaseWizard from "@/components/PurchaseWizard";
import ShoppingGuide from "@/components/ShoppingGuide";
import ProductsValueAdded from "@/components/ProductsValueAdded";
import Footer from "@/components/Footer";
import { site } from "@/data/content";
import { getProductsHero, getProductsValueAdded, getPageSeo } from "@/lib/cms/adapters";

const FALLBACK_DESCRIPTION =
  "PNG Coffee from the highlands of Papua New Guinea — Dark and Medium roast, beans or ground, in 250g bags. Buy in 3, 6 or 10-pack bundles.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("ourCoffeePage");
  const description = seo.seoDescription ?? FALLBACK_DESCRIPTION;
  return {
    title: seo.seoTitle ?? "Our Coffee",
    description,
    openGraph: {
      title: `${seo.seoTitle ?? "Our Coffee"} – ${site.name}`,
      description,
    },
  };
}

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
        {/* ── Products section ── */}
        <section aria-label="Our Products">
          <ProductsHero productsHero={productsHero} />
          <ProductsValueAdded productsValueAdded={productsValueAdded} />
        </section>

        {/* ── Section divider ── */}
        <div className="relative z-10 mx-auto max-w-[900px] px-6 sm:px-10">
          <div className="flex items-center gap-4 py-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ember-500/40 to-ember-500/40" />
            <span className="shrink-0 font-display text-[11px] font-bold uppercase tracking-[0.35em] text-ember-400">
              Shop Online
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-ember-500/40 to-ember-500/40" />
          </div>
        </div>

        {/* ── Shopping section ── */}
        <section aria-label="Order Coffee Online">
          <ShoppingGuide />
          <PurchaseWizard />
        </section>
      </main>
      <Footer />
    </>
  );
}
