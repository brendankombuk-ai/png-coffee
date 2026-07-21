import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import TourismHero from "@/components/TourismHero";
import TourismCardGrid from "@/components/TourismCardGrid";
import Footer from "@/components/Footer";
import { site } from "@/data/content";
import { getPngTourism, getTourismCards } from "@/lib/cms/adapters";

export const metadata: Metadata = {
  title: "Papua New Guinea",
  description:
    "Discover Papua New Guinea — breathtaking landscapes, over 800 languages, the Kokoda Track, Mount Wilhelm, coral reefs, and birds of paradise.",
  openGraph: {
    title: `Papua New Guinea – ${site.name}`,
    description:
      "Discover Papua New Guinea — breathtaking landscapes, cultural diversity, the Kokoda Track, Mount Wilhelm, coral reefs, and birds of paradise.",
  },
};

export default async function PNGPage() {
  const [pngTourism, tourismCards] = await Promise.all([getPngTourism(), getTourismCards()]);

  return (
    <>
      <Navbar />
      <TribalBackdrop src="/backgrounds/png-portrait.jpg" />
      <main id="main-content" className="relative">
        <TourismHero pngTourism={pngTourism} />
        <TourismCardGrid tourismCards={tourismCards} />
      </main>
      <Footer />
    </>
  );
}
