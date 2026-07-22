import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import PageIntro from "@/components/PageIntro";
import ImageShowcase from "@/components/ImageShowcase";
import Footer from "@/components/Footer";
import { site, baristaTrainingHero, baristaTrainingImage } from "@/data/content";

export const metadata: Metadata = {
  title: "Barista Training",
  description:
    "PNG Coffee's baristas are trained and qualified in Australia, plus short courses for aspiring baristas passionate about mastering the art of coffee-making.",
  openGraph: {
    title: `Barista Training – ${site.name}`,
    description: "World-class barista training, qualified in Australia, brought home to PNG.",
    images: [
      { url: baristaTrainingImage.src, width: 1600, height: 900, alt: baristaTrainingImage.alt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Barista Training – ${site.name}`,
    description: "World-class barista training, qualified in Australia, brought home to PNG.",
    images: [baristaTrainingImage.src],
  },
};

export default function BaristaTrainingPage() {
  return (
    <>
      <Navbar />
      <TribalBackdrop />
      <main id="main-content" className="relative">
        <PageIntro title={baristaTrainingHero.title} paragraphs={baristaTrainingHero.paragraphs} />
        <ImageShowcase src={baristaTrainingImage.src} alt={baristaTrainingImage.alt} />
      </main>
      <Footer />
    </>
  );
}
