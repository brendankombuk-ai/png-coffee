import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StoryIntro from "@/components/StoryIntro";
import ExploreBanner from "@/components/ExploreBanner";
import MissionSection from "@/components/MissionSection";
import ValueGrid from "@/components/ValueGrid";
import Footer from "@/components/Footer";
import { site } from "@/data/content";
import {
  getStoryIntro,
  getExploreLinks,
  getMissionSection,
  getValueCards,
  getPageSeo,
} from "@/lib/cms/adapters";

const FALLBACK_DESCRIPTION =
  "PNG Coffee's story, mission, and the roastery, training and equipment services behind every cup — PNG grown, shared with the world.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("aboutUs");
  const description = seo.seoDescription ?? FALLBACK_DESCRIPTION;
  return {
    title: seo.seoTitle ?? "About Us",
    description,
    openGraph: {
      title: `${seo.seoTitle ?? "About Us"} – ${site.name}`,
      description,
      images: [{ url: "/images/png.jpg", width: 1600, height: 1465 }],
    },
  };
}

export default async function AboutPage() {
  const [storyIntro, exploreLinks, missionSection, valueCards] = await Promise.all([
    getStoryIntro(),
    getExploreLinks(),
    getMissionSection(),
    getValueCards(),
  ]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-void-950">
        <StoryIntro storyIntro={storyIntro} />
        <ExploreBanner exploreLinks={exploreLinks} />
        <MissionSection missionSection={missionSection} />
        <ValueGrid valueCards={valueCards} />
      </main>
      <Footer />
    </>
  );
}
