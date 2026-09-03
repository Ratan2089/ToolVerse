"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  FiCode,
  FiKey,
  FiGrid,
  FiLock,
  FiFileText,
  FiGitCommit,
  FiTerminal,
  FiCpu,
  FiHash,
  FiShield,
  FiDatabase,
  FiAlignLeft,
  FiRefreshCw,
  FiLayers,
  FiSliders,
  FiEye,
  FiSend,
  FiDollarSign,
  FiBriefcase,
  FiTrendingUp,
  FiClock,
  FiLink,
  FiArrowRight,
} from "react-icons/fi";

const iconMap = {
  FiCode,
  FiKey,
  FiGrid,
  FiLock,
  FiFileText,
  FiGitCommit,
  FiTerminal,
  FiCpu,
  FiHash,
  FiShield,
  FiDatabase,
  FiAlignLeft,
  FiRefreshCw,
  FiLayers,
  FiSliders,
  FiEye,
  FiSend,
  FiDollarSign,
  FiBriefcase,
  FiTrendingUp,
  FiClock,
  FiLink,
};

export default function ToolCard({ tool }) {
  const IconComponent = iconMap[tool.icon] || FiCode;

  return (
    <Link href={`/tools/${tool.slug}`} className="block group">
      <Card className="h-full flex flex-col justify-between relative overflow-hidden group-hover:border-brand-500/40">
        <div>
          {/* Top Badges & Icon Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500/10 via-indigo-500/10 to-accent-cyan/10 dark:from-brand-950 dark:via-indigo-950 dark:to-slate-800 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1.5">
              {tool.featured && <Badge variant="brand">Featured</Badge>}
              {tool.popular && <Badge variant="accent">Popular</Badge>}
            </div>
          </div>

          {/* Title & Category */}
          <div className="mb-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {tool.category}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
              {tool.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {tool.description}
          </p>
        </div>

        {/* Footer / Launch */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-end text-xs">
          <span className="flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
            Open tool <FiArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
