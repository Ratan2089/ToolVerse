import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/data/tools";
import { getToolComponent } from "@/data/toolComponents";

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const tool = getToolBySlug(slug);

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
      url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tools/${tool.slug}`,
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

  return <ToolComponent tool={tool} />;
}