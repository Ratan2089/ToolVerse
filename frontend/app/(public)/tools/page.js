import Link from "next/link";
import { tools } from "@/data/tools";

export const metadata = {
  title: "All Developer Tools | ToolVerse",
  description:
    "Explore free developer, security, text, and productivity tools on ToolVerse.",
};

export default async function ToolsPage({ searchParams }) {
  const params = await searchParams;
  const search = (params?.search || "").trim();

  const normalizedSearch = search.toLowerCase();

  const filteredTools = normalizedSearch
    ? tools.filter((tool) => {
        const searchableText = [
          tool.title,
          tool.description,
          tool.slug,
          tool.category,
          ...(tool.keywords || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      })
    : tools;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold text-brand-600">
          TOOLVERSE
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          {search ? `Search results for "${search}"` : "All Tools"}
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          {search
            ? `${filteredTools.length} tool${
                filteredTools.length === 1 ? "" : "s"
              } found.`
            : "A collection of fast, free tools for developers, creators, and everyday tasks."}
        </p>
      </div>

      {filteredTools.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold">
            No tools found
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            We couldn't find any tool matching{" "}
            <span className="font-semibold">
              "{search}"
            </span>
            .
          </p>

          <Link
            href="/tools"
            className="mt-6 inline-flex rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            View all tools
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
                  {tool.category}
                </span>

                {tool.featured && (
                  <span className="text-xs font-semibold text-brand-600">
                    Featured
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold group-hover:text-brand-600">
                {tool.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {tool.description}
              </p>

              <div className="mt-5 text-sm font-semibold text-brand-600">
                Open tool →
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}