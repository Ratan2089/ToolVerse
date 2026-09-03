import ToolCard from '@/components/cards/ToolCard';
import { tools } from '@/data/tools';
import { FiGrid } from 'react-icons/fi';

export default function RelatedTools({ currentSlug, category }) {
  // Find tools in the same category excluding current tool
  const related = tools
    .filter((t) => t.slug !== currentSlug && t.category.toLowerCase() === category?.toLowerCase())
    .slice(0, 3);

  // Fallback to top featured if less than 3
  const fallback = tools
    .filter((t) => t.slug !== currentSlug && !related.some((r) => r.slug === t.slug))
    .slice(0, 3 - related.length);

  const displayTools = [...related, ...fallback];

  if (displayTools.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          <FiGrid className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Related Tools You Might Need
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
