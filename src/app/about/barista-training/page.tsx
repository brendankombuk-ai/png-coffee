import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SimpleDetailHero from "@/components/SimpleDetailHero";
import Footer from "@/components/Footer";
import { site, baristaTrainingPage } from "@/data/content";

export const metadata: Metadata = {
  title: baristaTrainingPage.title,
  description: baristaTrainingPage.intro,
  openGraph: {
    title: `${baristaTrainingPage.title} \u2013 ${site.name}`,
    description: baristaTrainingPage.intro,
    images: [{ url: baristaTrainingPage.heroImage }],
  },
};

export default function BaristaTrainingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-void-950">
        <SimpleDetailHero
          title={baristaTrainingPage.title}
          intro={baristaTrainingPage.intro}
          image={baristaTrainingPage.heroImage}
          alt={baristaTrainingPage.heroAlt}
        />
      </main>
      <Footer />
    </>
  );
}
