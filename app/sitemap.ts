import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";
import { blogPosts } from "./data/blogPosts";
import { getAllServiceSlugs } from "./data/servicesCatalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/book", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/why", priority: 0.7, changeFrequency: "monthly" },
    { path: "/team", priority: 0.6, changeFrequency: "monthly" },
    { path: "/testimonials", priority: 0.6, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.6, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
    { path: "/career", priority: 0.6, changeFrequency: "monthly" },
    { path: "/partnership", priority: 0.6, changeFrequency: "monthly" },
    { path: "/feedback", priority: 0.5, changeFrequency: "monthly" },
    { path: "/vmgo", priority: 0.5, changeFrequency: "yearly" },
    { path: "/history", priority: 0.5, changeFrequency: "yearly" },
    { path: "/timeline", priority: 0.5, changeFrequency: "yearly" },
    { path: "/glossary", priority: 0.5, changeFrequency: "monthly" },
    { path: "/video", priority: 0.5, changeFrequency: "monthly" },
    { path: "/message", priority: 0.4, changeFrequency: "yearly" },
    { path: "/calendar", priority: 0.4, changeFrequency: "monthly" },
    { path: "/d", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/refund", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie", priority: 0.3, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  const serviceEntries: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const parsed = new Date(post.date);
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
