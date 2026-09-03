import Link from 'next/link';
import { categories } from '@/data/categories';
import { FiGrid, FiShield, FiZap, FiChevronRight, FiHeart } from 'react-icons/fi';

export default function Sidebar({ currentCategory }) {
  return (
    <aside className="sticky top-24 space-y-6">
      {/* Category Navigation Card */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <FiGrid className="w-4 h-4 text-brand-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Categories
          </h3>
        </div>

        <nav className="space-y-1">
          {categories.map((cat) => {
            const isActive = currentCategory?.toLowerCase() === cat.name.toLowerCase();

            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-500">
                    {cat.count}
                  </span>
                  <FiChevronRight className="w-3 h-3 text-slate-400" />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Privacy Guarantee Widget */}
      <div className="glass-card rounded-2xl p-5 border border-emerald-200/60 dark:border-emerald-950 bg-emerald-50/30 dark:bg-emerald-950/20">
        <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
          <FiShield className="w-5 h-5 shrink-0" />
          <h4 className="text-xs font-bold uppercase tracking-wider">
            Zero Server Logs
          </h4>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          ToolVerse operates on a zero-retention philosophy. Your data stays inside your browser memory.
        </p>
      </div>

      {/* Instant Feedback Callout */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 text-center">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
          <FiZap className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
          Need a Custom Tool?
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
          We add new utility tools every week. Request your favorite tool!
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          <FiHeart className="w-3 h-3 text-rose-400" /> Request Feature
        </a>
      </div>
    </aside>
  );
}
