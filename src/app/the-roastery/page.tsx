import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import PageIntro from "@/components/PageIntro";
import CoffeeShowroomPanel from "@/components/CoffeeShowroomPanel";
import EquipmentShowcaseRow from "@/components/EquipmentShowcaseRow";
import Footer from "@/components/Footer";
import { site, roasteryHero, coffeeShowroom, roasteryEquipment } from "@/data/content";

export const metadata: Metadata = {
  title: "The Roastery",
  description:
    "Inside PNG Coffee's state-of-the-art roastery at Gabaka Street, Gordon, Port Moresby — custom blends, micro-lots, and a showroom of professional coffee equipment.",
  openGraph: {
    title: `The Roastery – ${site.name}`,
    description:
      "Inside PNG Coffee's state-of-the-art roastery at Gabaka Street, Gordon, Port Moresby.",
    images: [{ url: coffeeShowroom.image, width: 1600, height: 1200, alt: coffeeShowroom.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `The Roastery – ${site.name}`,
    description:
      "Inside PNG Coffee's state-of-the-art roastery at Gabaka Street, Gordon, Port Moresby.",
    images: [coffeeShowroom.image],
  },
};

export default function TheRoasteryPage() {
  return (
    <>
      <Navbar />
      <TribalBackdrop />
      <main id="main-content" className="relative">
        <PageIntro title={roasteryHero.title} paragraphs={roasteryHero.paragraphs} />
        <CoffeeShowroomPanel showroom={coffeeShowroom} />
        <EquipmentShowcaseRow equipment={roasteryEquipment} />
      </main>
      <Footer />
    </>
  );
}
