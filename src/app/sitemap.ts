import type { MetadataRoute } from "next";
import { portfolioItems } from "@/data/portfolio";
import { tools } from "@/data/tools";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/portfolio", "/tools", "/contact", "/privacy", "/terms"].map(
    (path) => ({
      url: `${siteConfig.url}${path || ""}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/tools" || path === "/portfolio" ? 0.9 : 0.6,
    }),
  );

  const toolRoutes = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: tool.featured ? 0.85 : 0.75,
  }));

  const portfolioRoutes = portfolioItems.map((item) => ({
    url: `${siteConfig.url}/portfolio/${item.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...portfolioRoutes];
}
