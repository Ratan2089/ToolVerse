import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { constructMetadata } from "@/lib/seo";
import ToolCard from "@/components/cards/ToolCard";
import SectionHeading from "@/components/shared/SectionHeading";
import Link from "next/link";
import { FiChevronRight, FiGrid } from "react-icons/fi";

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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-8">

        <Link
          href="/"
          className="hover:text-brand-600 transition-colors"
        >
          Home
        </Link>

        <FiChevronRight className="w-3 h-3" />

        <Link
          href="/categories"
          className="hover:text-brand-600 transition-colors"
        >
          Categories
        </Link>

        <FiChevronRight className="w-3 h-3" />

        <span className="font-semibold text-slate-900 dark:text-white">
          {category.name}
        </span>

      </nav>


      {/* Category heading */}
      <SectionHeading
        badge={`${categoryTools.length} Tools`}
        title={`${category.name} Tools`}
        subtitle={category.description}
      />


      {/* Tools */}
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

        <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center">

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            No tools available
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            There are currently no tools in this category.
          </p>

        </div>

      )}


      {/* Other Categories */}
      <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">

        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Explore Other Categories
        </h3>

        <div className="flex flex-wrap gap-2">

          {categories
            .filter((c) => c.slug !== category.slug)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-800 transition-all flex items-center gap-1.5"
              >
                <FiGrid className="w-3.5 h-3.5 text-brand-500" />

                {cat.name}

              </Link>
            ))}

        </div>

      </div>

    </main>
  );
}    