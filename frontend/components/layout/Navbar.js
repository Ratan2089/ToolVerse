"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiGrid,
  FiMenu,
  FiX,
  FiUser,
  FiLayout,
  FiZap,
  FiChevronDown,
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { categories } from "@/data/categories";

export default function Navbar() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      router.push(`/tools?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/tools");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-navbar shadow-sm py-3"
          : "bg-transparent py-4 border-b border-slate-200/40 dark:border-slate-800/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-glow group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/toolverse-logo.png"
                alt="ToolVerse"
                width={40}
                height={40}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Tool<span className="gradient-text">Verse</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">
                Utility SaaS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80">
            <Link
              href="/tools"
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
            >
              All Tools
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdown(true)}
              onMouseLeave={() => setCategoriesDropdown(false)}
            >
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1.5">
                Categories
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${categoriesDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {categoriesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl glass-card shadow-2xl border border-slate-200/80 dark:border-slate-800 z-50"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400">
                          <FiGrid className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <div className="font-semibold">{cat.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {cat.count} tools
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <FiLayout className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 transition-all"
            >
              <FiSearch className="w-4 h-4 text-brand-500 flex-shrink-0" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                aria-label="Search tools"
                className="w-24 sm:w-32 lg:w-40 bg-transparent outline-none border-none text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}

              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-500 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                /
              </kbd>
            </form>

            {/* Theme Switcher */}
            <ThemeToggle />

            {/* Login Placeholder Button */}
            {/* <Link
              href="/dashboard"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow transition-all active:scale-95"
            >
              <FiUser className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link> */}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-navbar border-t border-slate-200/50 dark:border-slate-800 px-4 py-4 mt-2 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>All Tools</span>
                <span className="px-2 py-0.5 text-xs bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-full font-semibold">
                  20+
                </span>
              </Link>

              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-3 pt-2">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-1.5 px-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800 flex gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-xs font-semibold text-white bg-brand-600 rounded-xl"
                >
                  Dashboard / Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
