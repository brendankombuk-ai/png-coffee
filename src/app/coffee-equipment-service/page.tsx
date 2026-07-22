import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TribalBackdrop from "@/components/TribalBackdrop";
import PageIntro from "@/components/PageIntro";
import ImageShowcase from "@/components/ImageShowcase";
import Footer from "@/components/Footer";
import { site, equipmentServiceHero, equipmentServiceImage } from "@/data/content";

export const metadata: Metadata = {
  title: "Coffee Equipment Service",
  description:
    "Comprehensive servicing for all coffee equipment, carried out by qualified technicians — trusted by leading hotel groups across PNG.",
  alternates: {
    canonical: "/coffee-equipment-service",
  },
  openGraph: {
    title: `Coffee Equipment Service – ${site.name}`,
    description:
      "Comprehensive servicing for all coffee equipment, carried out by qualified technicians.",
    url: "/coffee-equipment-service",
    images: [
      {
        url: equipmentServiceImage.src,
        width: 1600,
        height: 900,
        alt: equipmentServiceImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Coffee Equipment Service – ${site.name}`,
    description:
      "Comprehensive servicing for all coffee equipment, carried out by qualified technicians.",
    images: [equipmentServiceImage.src],
  },
};

export default function CoffeeEquipmentServicePage() {
  return (
    <>
      <Navbar />
      <TribalBackdrop />
      <main id="main-content" className="relative">
        <PageIntro
          title={equipmentServiceHero.title}
          paragraphs={equipmentServiceHero.paragraphs}
        />
        <ImageShowcase src={equipmentServiceImage.src} alt={equipmentServiceImage.alt} />
      </main>
      <Footer />
    </>
  );
}
