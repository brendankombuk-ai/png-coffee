import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeartOfPngGrid from "@/components/HeartOfPngGrid";
import Footer from "@/components/Footer";
import { site, heartOfPngPage } from "@/data/content";

export const metadata: Metadata = {
  title: "The Heart of Papua New Guinea",
  description:
    "A tapestry of tradition — the diversity, art, ceremonies, kastom, and spirituality of Papua New Guinea's people.",
  openGraph: {
    title: `The Heart of Papua New Guinea – ${site.name}`,
    description:
      "A tapestry of tradition — the diversity, art, ceremonies, kastom, and spirituality of Papua New Guinea's people.",
  },
};

export default function HeartOfPngPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative bg-[radial-gradient(ellipse_at_top,#1a0d08,#020101_65%)]"
      >
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-14 pt-[120px] text-center sm:px-10 sm:pt-[140px]">
          <h1 className="font-display text-2xl font-extrabold uppercase leading-snug tracking-wide text-white sm:text-3xl md:text-[34px]">
            {heartOfPngPage.title}
          </h1>
        </section>

        <HeartOfPngGrid cards={heartOfPngPage.cards} />
      </main>
      <Footer />
    </>
  );
}
