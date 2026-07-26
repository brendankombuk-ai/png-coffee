import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SimpleDetailHero from "@/components/SimpleDetailHero";
import Footer from "@/components/Footer";
import { site, equipmentServicePage } from "@/data/content";

export const metadata: Metadata = {
  title: equipmentServicePage.title,
  description: equipmentServicePage.intro,
  openGraph: {
    title: `${equipmentServicePage.title} \u2013 ${site.name}`,
    description: equipmentServicePage.intro,
    images: [{ url: equipmentServicePage.heroImage }],
  },
};

export default function EquipmentServicePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-void-950">
        <SimpleDetailHero
          title={equipmentServicePage.title}
          intro={equipmentServicePage.intro}
          image={equipmentServicePage.heroImage}
          alt={equipmentServicePage.heroAlt}
        />
      </main>
      <Footer />
    </>
  );
}
