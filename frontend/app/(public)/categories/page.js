import Link from "next/link";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";

export const metadata = {
  title: "Tool Categories | ToolVerse",
  description:
    "Browse ToolVerse developer, security, text, utility, and business tools by category.",
};

export default function CategoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          TOOLVERSE CATEGORIES
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Browse Tools by Category
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Explore ToolVerse utilities organized by purpose, from developer tools
          and text utilities to security and business tools.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const toolCount = tools.filter(
            (tool) =>
              tool.category.toLowerCase() === category.name.toLowerCase(),
          ).length;

          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl transition-all"
            >
              <div className="mt-6 flex items-center justify-between gap-4">
  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
    {category.name}
  </h2>

  <span className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
    {toolCount} Tools
  </span>
</div>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {category.description}
              </p>

              <div className="mt-6 text-sm font-semibold text-brand-600 dark:text-brand-400">
                Explore Category →
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
