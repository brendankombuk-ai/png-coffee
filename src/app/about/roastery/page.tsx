import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RoasteryHero from "@/components/RoasteryHero";
import CoffeeShowroom from "@/components/CoffeeShowroom";
import EquipmentGallery from "@/components/EquipmentGallery";
import Footer from "@/components/Footer";
import { site, roasteryPage } from "@/data/content";

export const metadata: Metadata = {
  title: roasteryPage.title,
  description: roasteryPage.intro,
  openGraph: {
    title: `${roasteryPage.title} \u2013 ${site.name}`,
    description: roasteryPage.intro,
    images: [{ url: roasteryPage.heroImage }],
  },
};

export default function RoasteryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative">
        <RoasteryHero
          title={roasteryPage.title}
          intro={roasteryPage.intro}
          image={roasteryPage.heroImage}
          alt={roasteryPage.heroAlt}
        />
        <CoffeeShowroom
          heading={roasteryPage.showroom.heading}
          paragraph={roasteryPage.showroom.paragraph}
          bullets={roasteryPage.showroom.bullets}
          closing={roasteryPage.showroom.closing}
          image={roasteryPage.heroImage}
          alt={roasteryPage.heroAlt}
        />
        <EquipmentGallery items={roasteryPage.gallery} />
      </main>
      <Footer />
    </>
  );
}
