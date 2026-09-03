const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

/**
 * Default metadata used by the root layout.
 */
export const DEFAULT_SEO = {
  title: "ToolVerse | Free Developer & Productivity Tools",

  description:
    "Free online developer, security, text, and productivity tools. Fast, simple, and easy to use.",

  openGraph: {
    title: "ToolVerse | Free Developer & Productivity Tools",

    description:
      "Free online developer, security, text, and productivity tools. Fast, simple, and easy to use.",

    url: SITE_URL,

    siteName: "ToolVerse",

    type: "website",
  },

  twitter: {
    card: "summary",

    title: "ToolVerse | Free Developer & Productivity Tools",

    description:
      "Free online developer, security, text, and productivity tools. Fast, simple, and easy to use.",
  },
};


/**
 * Generic metadata builder.
 *
 * Used by:
 * - Tool pages
 * - Category pages
 * - Future static pages
 */
export function constructMetadata({
  title,
  description,
  slug = "",
  keywords = [],
  image = "/og-image.png",
}) {
  const url = slug
    ? `${SITE_URL}/${slug.replace(/^\/+/, "")}`
    : SITE_URL;

 return {
  title,
  description,
  keywords,

  openGraph: {
    title,
    description,
    url,
    siteName: "ToolVerse",
    type: "website",
    images: [
      {
        url: image,
        alt: title,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};
}


/**
 * Tool-specific metadata helper.
 */
export function createToolMetadata(tool) {
  return constructMetadata({
    title: `${tool.title} | ToolVerse`,
    description: tool.description,
    slug: `tools/${tool.slug}`,
    keywords: tool.keywords || [],
  });
}