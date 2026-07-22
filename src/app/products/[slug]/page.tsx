import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCategoryPage from "@/components/ProductCategoryPage";
import { site } from "@/data/content";
import { getProductCategories, getProductCategoryPageData } from "@/lib/cms/adapters";

type Params = { slug: string };
type PageParams = Promise<Params>;

// New categories added in Strapi after the last build still render on
// request (and get cached) instead of 404ing — see also `revalidate` below.
export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams(): Promise<Params[]> {
  const categories = await getProductCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductCategoryPageData(slug);
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/products/${data.slug}`,
    },
    openGraph: {
      title: `${data.title} – ${site.name}`,
      description: data.description,
      url: `/products/${data.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const data = await getProductCategoryPageData(slug);
  if (!data) notFound();

  return <ProductCategoryPage {...data} />;
}
