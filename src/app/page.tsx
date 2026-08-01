import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PNGBanner from "@/components/PNGBanner";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import { getHero, getBanner, getFeatureCards, getPageSeo } from "@/lib/cms/adapters";
import { site } from "@/data/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("homepage");
  return {
    title: seo.seoTitle
      ? { absolute: seo.seoTitle }
      : { absolute: `${site.name} — PNG Grown, Shared With The World` },
    description: seo.seoDescription ?? site.description,
    openGraph: {
      title: seo.seoTitle ?? `${site.name} — PNG Grown, Shared With The World`,
      description: seo.seoDescription ?? site.description,
    },
  };
}

export default async function Home() {
  const [hero, banner, featureCards] = await Promise.all([
    getHero(),
    getBanner(),
    getFeatureCards(),
  ]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-void-950">
        <Hero hero={hero} />
        <div className="relative -mt-14 sm:-mt-16">
          <PNGBanner lineOne={banner.lineOne} lineTwo={banner.lineTwo} />
        </div>
        <FeatureCards featureCards={featureCards} />
      </main>
      <Footer />
    </>
  );
}
