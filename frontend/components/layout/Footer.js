import Link from 'next/link';
import { 
  FiZap, 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiShield, 
  FiHeart,
  FiCode
} from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shadow-glow">
                <FiZap className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Tool<span className="gradient-text">Verse</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Every utility tool you need in one lightning-fast, privacy-first platform. Built for developers, designers, and creators worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full w-fit border border-emerald-200 dark:border-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>All Systems Operational (100% Uptime)</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/tools/json-formatter" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/jwt-decoder" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  JWT Decoder
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-code-generator" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/password-generator" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/markdown-previewer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Markdown Editor
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/categories/developer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Developer Utilities
                </Link>
              </li>
              <li>
                <Link href="/categories/text" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Text & Formatters
                </Link>
              </li>
              <li>
                <Link href="/categories/utility" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  General Utilities
                </Link>
              </li>
              <li>
                <Link href="/categories/security" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Security & Crypto
                </Link>
              </li>
              <li>
                <Link href="/categories/business" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Business Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform / Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Platform & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/tools" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Browse All Tools
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-500">
                <FiShield className="w-3.5 h-3.5 text-brand-500" />
                <span>Zero Server Logs (Privacy First)</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 hover:text-brand-600 dark:hover:text-white transition-all">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 hover:text-brand-600 dark:hover:text-white transition-all">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 hover:text-brand-600 dark:hover:text-white transition-all">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ToolVerse Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>and Next.js 15</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
