'use client';

import { cn } from '@/lib/utils';

export default function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  icon: Icon,
  error = '',
  id,
  ...props
}) {
  return (
    <div className="w-full space-y-1">
      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm',
            Icon ? 'pl-10 pr-4' : 'px-4',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-500 px-1 font-medium">{error}</p>}
    </div>
  );
}
