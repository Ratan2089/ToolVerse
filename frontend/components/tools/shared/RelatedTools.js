import Link from "next/link";
import { tools } from "@/data/tools";

export default function RelatedTools({ currentTool }) {
  const related = tools
    .filter(
      (tool) =>
        tool.slug !== currentTool.slug &&
        tool.category === currentTool.category
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Tools</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-xl border p-4 transition hover:shadow-lg"
          >
            <h3 className="font-semibold">{tool.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}