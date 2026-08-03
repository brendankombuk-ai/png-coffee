import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import Footer from "@/components/Footer";
import { site } from "@/data/content";
import { getContactPageData } from "@/lib/cms/adapters";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData();
  const title = data.seoTitle ?? "Contact";
  const description = data.seoDescription ?? data.heroSubtitle;
  return {
    title,
    description,
    openGraph: {
      title: `${title} – ${site.name}`,
      description,
    },
  };
}

export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-void-950">
        <ContactHero title={data.heroTitle} subtitle={data.heroSubtitle} />

        <section className="relative z-10 mx-auto -mt-20 max-w-6xl px-6 sm:-mt-28 sm:px-10">
          <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md lg:grid-cols-2 lg:divide-x lg:divide-white/10">
            <ContactInfo data={data} />
            <ContactForm />
          </div>
        </section>

        <ContactMap embedUrl={data.mapEmbedUrl} />
      </main>
      <Footer />
    </>
  );
}
