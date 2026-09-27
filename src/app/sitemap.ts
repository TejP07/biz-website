import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { serviceAreas } from "@/content/service-areas";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
    { path: "/process", priority: 0.7, changeFrequency: "yearly" },
    { path: "/pricing", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/service-areas", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...serviceAreas.map((a) => ({
      url: absoluteUrl(`/service-areas/${a.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
