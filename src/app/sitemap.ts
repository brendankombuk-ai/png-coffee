import type { MetadataRoute } from "next";
import { site } from "@/data/content";
import { getProductCategories } from "@/lib/cms/adapters";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/png", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/png/heart-of-papua-new-guinea", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/value-added", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/the-roastery", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/barista-training", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/coffee-equipment-service", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getProductCategories().catch(() => []);

  const categoryRoutes = categories.map((cat) => ({
    url: `${site.url}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...categoryRoutes,
  ];
}
