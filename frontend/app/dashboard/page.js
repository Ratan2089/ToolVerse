'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { 
  FiLayout, 
  FiBookmark, 
  FiKey, 
  FiActivity, 
  FiZap, 
  FiArrowRight, 
  FiCode
} from 'react-icons/fi';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-glow">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="brand">Account Dashboard</Badge>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
              Free Tier Active
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome back, Creator 👋
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Authentication and cloud save features will launch in Phase 2.
          </p>
        </div>

        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow transition-all active:scale-95 whitespace-nowrap"
        >
          <FiZap className="w-4 h-4" />
          Browse All Tools
        </Link>
      </div>

      {/* Grid of Dashboard Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect={false} className="space-y-4">
          <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 w-fit">
            <FiBookmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Saved Tools</h3>
            <p className="text-xs text-slate-500 mt-1">
              Pin your most frequently used tools to your dashboard home for 1-click access.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-400">
            Placeholder · Launching Phase 2
          </div>
        </Card>

        <Card hoverEffect={false} className="space-y-4">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 w-fit">
            <FiKey className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">API Keys & Tokens</h3>
            <p className="text-xs text-slate-500 mt-1">
              Access ToolVerse programmatic APIs for JSON formatting, JWT verification, and QR code generation.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-400">
            Placeholder · Launching Phase 2
          </div>
        </Card>

        <Card hoverEffect={false} className="space-y-4">
          <div className="p-3 rounded-2xl bg-accent-cyan/10 text-accent-cyan w-fit">
            <FiActivity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Execution Metrics</h3>
            <p className="text-xs text-slate-500 mt-1">
              Track your local browser executions, converted payloads, and bandwidth saved.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-400">
            Placeholder · Launching Phase 2
          </div>
        </Card>
      </div>

      {/* Quick Access Featured Tools */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FiCode className="w-5 h-5 text-brand-500" />
          Quick Launch Favorites
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'JSON Formatter', slug: 'json-formatter', desc: 'Format and validate JSON' },
            { title: 'JWT Decoder', slug: 'jwt-decoder', desc: 'Inspect JWT tokens' },
            { title: 'QR Code Generator', slug: 'qr-code-generator', desc: 'Custom QR vectors' },
            { title: 'Password Generator', slug: 'password-generator', desc: 'Strong random passwords' },
          ].map((item) => (
            <Link key={item.slug} href={`/tools/${item.slug}`}>
              <Card className="hover:border-brand-500/50 p-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{item.desc}</p>
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                  Open Tool <FiArrowRight className="w-3 h-3" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
