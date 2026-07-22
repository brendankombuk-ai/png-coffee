import type { MetadataRoute } from "next";
import { site } from "@/data/content";
import { getProductCategories } from "@/lib/cms/adapters";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/png", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/value-added", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/the-roastery", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/barista-training", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/coffee-equipment-service", priority: 0.6, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getProductCategories();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${site.url}/products/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries];
}
