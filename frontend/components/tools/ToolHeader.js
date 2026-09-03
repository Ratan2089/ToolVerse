import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { FiChevronRight, FiShield, FiZap, FiCode } from 'react-icons/fi';

export default function ToolHeader({ tool }) {
  return (
    <div className="space-y-4 mb-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-white transition-colors">
          Home
        </Link>
        <FiChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/tools" className="hover:text-brand-600 dark:hover:text-white transition-colors">
          Tools
        </Link>
        <FiChevronRight className="w-3 h-3 text-slate-400" />
        <Link
          href={`/categories/${tool.category.toLowerCase()}`}
          className="hover:text-brand-600 dark:hover:text-white transition-colors capitalize"
        >
          {tool.category}
        </Link>
        <FiChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[200px]">
          {tool.title}
        </span>
      </nav>

      {/* Main Title & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="brand">{tool.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
              <FiShield className="w-3.5 h-3.5" /> 100% In-Browser Privacy
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              ⚡ {tool.usageCount} uses
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {tool.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
    </div>
  );
}
