import { notFound } from "next/navigation";

import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";

import { constructMetadata } from "@/lib/seo";

import ToolCard from "@/components/cards/ToolCard";
import SectionHeading from "@/components/shared/SectionHeading";

import Link from "next/link";

import {
  FiChevronRight,
  FiGrid,
  FiArrowLeft,
} from "react-icons/fi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const category = categories.find(
    (c) =>
      c.slug.toLowerCase() ===
      resolvedParams.category.toLowerCase()
  );

  if (!category) {
    return constructMetadata({
      title: "Category Not Found | ToolVerse",
      description: "The requested tool category does not exist.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${category.name} Tools | Free Online Utilities`,
    description: category.description,
    slug: `categories/${category.slug}`,
  });
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;

  const category = categories.find(
    (c) =>
      c.slug.toLowerCase() ===
      resolvedParams.category.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const categoryTools = getToolsByCategory(category.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <Link
          href="/"
          className="hover:text-brand-600 dark:hover:text-white transition-colors"
        >
          Home
        </Link>

        <FiChevronRight className="w-3 h-3 text-slate-400" />

        <Link
          href="/categories"
          className="hover:text-brand-600 dark:hover:text-white transition-colors"
        >
          Categories
        </Link>

        <FiChevronRight className="w-3 h-3 text-slate-400" />

        <span className="text-slate-900 dark:text-white font-semibold">
          {category.name}
        </span>
      </nav>

      {/* Category Header */}
      <section>
        <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-8 sm:p-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wide">
                <FiGrid className="w-3.5 h-3.5" />
                Tool Category
              </div>

              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {category.name} Tools
              </h1>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {category.description}
              </p>
            </div>

            <div className="shrink-0">
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800/80 px-5 py-4 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {categoryTools.length}
                </div>

                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Available Tools
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tools */}
      <section>
        <SectionHeading
          badge={category.name}
          title={`Explore ${category.name} Tools`}
          subtitle="Choose a tool below to get started instantly."
        />

        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {categoryTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40 p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <FiGrid className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
              No tools in this category yet
            </h2>

            <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 dark:text-slate-400">
              Tools will appear here as they are added to the{" "}
              {category.name} category.
            </p>

            <Link
              href="/tools"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
            >
              Browse All Tools
              <FiArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        )}
      </section>

      {/* Other Categories */}
      <section className="pt-10 border-t border-slate-200/60 dark:border-slate-800">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Explore Other Categories
        </h2>

        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-brand-950 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/60 dark:border-slate-800 transition-all flex items-center gap-1.5"
              >
                <FiGrid className="w-3.5 h-3.5 text-brand-500" />
                <span>{cat.name}</span>
              </Link>
            ))}
        </div>
      </section>

    </div>
  );
}