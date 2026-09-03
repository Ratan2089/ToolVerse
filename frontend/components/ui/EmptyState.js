import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import Button from './Button';

export default function EmptyState({
  title = 'No tools found',
  description = 'Try adjusting your search terms or select another category.',
  onReset,
  icon: Icon = FiSearch,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl glass-card border border-dashed border-slate-300 dark:border-slate-800 my-8">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/80 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {onReset && (
        <Button variant="outline" size="sm" icon={FiRefreshCw} onClick={onReset}>
          Reset Search Filters
        </Button>
      )}
    </div>
  );
}
