import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/data/tools";
import { getToolComponent } from "@/data/toolComponents";

import { BreadcrumbStructuredData } from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const tool = getToolBySlug(slug);

  console.log(
    "APP_URL_CONFIGURED:",
    process.env.NEXT_PUBLIC_APP_URL ===
      "https://toolverse-dev.vercel.app"
  );

  if (!tool) {
    return {
      title: "Tool Not Found | ToolVerse",
      description: "The requested tool could not be found.",
    };
  }

  return {
    title: `${tool.title} | ToolVerse`,

    description: tool.description,

    keywords: tool.keywords,

    openGraph: {
      title: `${tool.title} | ToolVerse`,

      description: tool.description,

      url: `${
        process.env.NEXT_PUBLIC_APP_URL ||
        "https://toolverse-dev.vercel.app"
      }/tools/${tool.slug}`,

      siteName: "ToolVerse",

      type: "website",
    },

    twitter: {
      card: "summary",

      title: `${tool.title} | ToolVerse`,

      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;

  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = getToolComponent(slug);

  if (!ToolComponent) {
    notFound();
  }

  return (
    <>
      <BreadcrumbStructuredData tool={tool} />

      <ToolComponent tool={tool} />
    </>
  );
}