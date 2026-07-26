import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ValueDetailHero from "@/components/ValueDetailHero";
import ValueDetailBody from "@/components/ValueDetailBody";
import Footer from "@/components/Footer";
import { site } from "@/data/content";
import { getValueCards, getValueCardDetail } from "@/lib/cms/adapters";

type Params = { slug: string };
type PageParams = Promise<Params>;

// New value cards added in Strapi after the last build still render on
// request (and get cached) instead of 404ing — see also `revalidate` below.
export const dynamicParams = true;
export const revalidate = 60;

// "roastery", "barista-training" and "equipment-service" now have their
// own dedicated route folders (bespoke page designs) and are excluded here
// so this catch-all doesn't try to statically generate the same paths.
// "value-added" links straight to /products and isn't linked from
// anywhere, but is left reachable here as a harmless fallback for any old
// bookmarks/links.
const DEDICATED_ROUTE_SLUGS = new Set(["roastery", "barista-training", "equipment-service"]);

export async function generateStaticParams(): Promise<Params[]> {
  const cards = await getValueCards();
  return cards
    .filter((c) => !DEDICATED_ROUTE_SLUGS.has(c.slug))
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getValueCardDetail(slug);
  if (!detail) return {};
  return {
    title: detail.title,
    description: detail.intro,
    openGraph: {
      title: `${detail.title} \u2013 ${site.name}`,
      description: detail.intro,
      images: [{ url: detail.image }],
    },
  };
}

export default async function ValueCardDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const [detail, allCards] = await Promise.all([
    getValueCardDetail(slug),
    getValueCards(),
  ]);
  if (!detail) notFound();

  const others = allCards.filter((c) => c.slug !== slug);

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-void-950">
        <ValueDetailHero
          image={detail.image}
          alt={detail.alt}
          eyebrow={detail.eyebrow}
          title={detail.title}
          intro={detail.intro}
        />
        <ValueDetailBody paragraphs={detail.paragraphs} highlights={detail.highlights} />

        {others.length > 0 && (
          <section className="relative z-10 border-t border-white/10 px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
                Keep Exploring
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {others.map((c) => (
                  <a
                    key={c.slug}
                    href={`/about/${c.slug}`}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white/80 transition-colors duration-300 hover:border-ember-400 hover:bg-ember-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-200"
                  >
                    {c.title}
                  </a>
                ))}
                <a
                  href="/about"
                  className="rounded-full bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white/60 transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-200"
                >
                  ← Back To About
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
