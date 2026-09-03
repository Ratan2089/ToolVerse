'use client';

import Link from 'next/link';
import { FiHome, FiSearch, FiAlertTriangle } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/80 text-rose-500 flex items-center justify-center mb-6 shadow-glow border border-rose-200 dark:border-rose-900">
        <FiAlertTriangle className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">
        Error 404
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
        Tool Page Not Found
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
        The tool or category page you are looking for might have been moved, renamed, or does not exist in our registry.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow transition-all active:scale-95"
        >
          <FiHome className="w-4 h-4" />
          Back to Homepage
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
        >
          <FiSearch className="w-4 h-4" />
          Browse All Tools
        </Link>
      </div>
    </div>
  );
}
