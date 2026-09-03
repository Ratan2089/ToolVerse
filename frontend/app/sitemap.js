import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function sitemap() {
  const staticRoutes = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const categoryRoutes = categories.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...toolRoutes,
  ];
}