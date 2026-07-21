import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PNGBanner from "@/components/PNGBanner";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import { getHero, getBanner, getFeatureCards } from "@/lib/cms/adapters";

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
