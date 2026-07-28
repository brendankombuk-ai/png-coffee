import type { MetadataRoute } from "next";
import { site } from "@/data/content";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/png", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/value-added", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/the-roastery", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/barista-training", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/coffee-equipment-service", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
