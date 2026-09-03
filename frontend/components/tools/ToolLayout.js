import ToolHeader from './ToolHeader';
import ToolFAQ from './ToolFAQ';
import RelatedTools from './RelatedTools';
import Sidebar from '@/components/layout/Sidebar';

export default function ToolLayout({ tool, children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ToolHeader tool={tool} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Tool Workspace (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-glow">
            {children}
          </div>

          <ToolFAQ faqs={tool.faqs} />
          <RelatedTools currentSlug={tool.slug} category={tool.category} />
          <p className="text-xs text-slate-400 dark:text-slate-500">Last updated: August 21, 2026</p>
        </div>

        {/* Sidebar (1 column) */}
        <div className="lg:col-span-1">
          <Sidebar currentCategory={tool.category} />
        </div>
      </div>
    </div>
  );
}
