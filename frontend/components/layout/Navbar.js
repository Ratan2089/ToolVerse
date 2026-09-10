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
  FiLayout,
  FiZap,
  FiChevronDown,
  FiCode,
  FiFileText,
  FiTool,
  FiShield,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";

import { categories } from "@/data/categories";
import { tools } from "@/data/tools";

export default function Navbar() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /*
   * Map the existing category names to the category values
   * used by tools in the registry.
   *
   * Counts are calculated from tools.js.
   * Nothing here is a numeric/hardcoded tool count.
   */
  const CATEGORY_ALIASES = {
    developer: ["developer"],

    "text-formatting": [
      "text & formatting",
      "text formatting",
      "text",
    ],

    "general-utility": [
      "general utility",
      "general",
      "utility",
    ],

    "security-crypto": [
      "security & crypto",
      "security crypto",
      "security",
      "crypto",
    ],

    "business-math": [
      "business & math",
      "business math",
      "business",
      "math",
    ],
  };

  const CATEGORY_ICONS = {
    developer: FiCode,
    "text-formatting": FiFileText,
    "general-utility": FiTool,
    "security-crypto": FiShield,
    "business-math": FiTrendingUp,
  };

  const normalizeCategory = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();

  const getCategoryToolCount = (category) => {
    const aliases = CATEGORY_ALIASES[category.slug] || [
      category.name,
      category.slug,
    ];

    const normalizedAliases = aliases.map(normalizeCategory);

    return tools.filter((tool) => {
      const status = tool.status;

      if (status && status !== "available") {
        return false;
      }

      return normalizedAliases.includes(
        normalizeCategory(tool.category)
      );
    }).length;
  };

  const availableToolCount = tools.filter((tool) => {
    return !tool.status || tool.status === "available";
  }).length;

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      router.push(
        `/tools?search=${encodeURIComponent(query)}`
      );
    } else {
      router.push("/tools");
    }
  };

  const closeMenus = () => {
    setCategoriesDropdown(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Close the mobile menu when switching to desktop.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

          {/* =========================================================
              LOGO
          ========================================================= */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onClick={closeMenus}
          >
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
                Tool
                <span className="gradient-text">
                  Verse
                </span>
              </span>

              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">
                Utility SaaS
              </span>
            </div>
          </Link>

          {/* =========================================================
              DESKTOP NAVIGATION
          ========================================================= */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80">

            {/* All Tools */}
            <Link
              href="/tools"
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
            >
              All Tools
            </Link>

            {/* =====================================================
                CATEGORIES
            ===================================================== */}
            <div
              className="relative"
              onMouseEnter={() =>
                setCategoriesDropdown(true)
              }
              onMouseLeave={() =>
                setCategoriesDropdown(false)
              }
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={categoriesDropdown}
                onClick={() =>
                  setCategoriesDropdown(
                    (current) => !current
                  )
                }
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  categoriesDropdown
                    ? "bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm"
                    : "text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                }`}
              >
                <span>Categories</span>

                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    categoriesDropdown
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {categoriesDropdown && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                    }}
                    transition={{
                      duration: 0.16,
                      ease: "easeOut",
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[440px]"
                  >
                    <div className="rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden">

                      {/* Dropdown Header */}
                      <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70">
                        <div className="flex items-center justify-between">

                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">
                              Browse Categories
                            </div>

                            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                              Find the right tool for your task
                            </div>
                          </div>

                          <Link
                            href="/categories"
                            onClick={() =>
                              setCategoriesDropdown(false)
                            }
                            className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                          >
                            View all
                            <FiArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900 text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                          <FiGrid className="w-3 h-3" />

                          {availableToolCount}{" "}
                          {availableToolCount === 1
                            ? "tool"
                            : "tools"}{" "}
                          available
                        </div>
                      </div>

                      {/* Category Grid */}
                      <div className="p-3 grid grid-cols-2 gap-2">
                        {categories.map((cat, index) => {
                          const Icon =
                            CATEGORY_ICONS[cat.slug] ||
                            FiGrid;

                          const toolCount =
                            getCategoryToolCount(cat);

                          const isLast =
                            index ===
                            categories.length - 1;

                          return (
                            <Link
                              key={cat.slug}
                              href={`/categories/${cat.slug}`}
                              onClick={() =>
                                setCategoriesDropdown(
                                  false
                                )
                              }
                              className={`group relative flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-brand-100 dark:hover:border-brand-900/70 hover:bg-brand-50/70 dark:hover:bg-brand-950/30 transition-all duration-150 ${
                                isLast
                                  ? "col-span-2"
                                  : ""
                              }`}
                            >
                              {/* Icon */}
                              <div className="w-9 h-9 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-800 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-slate-200/70 dark:border-slate-700 group-hover:border-brand-200 dark:group-hover:border-brand-800 transition-all">
                                <Icon className="w-4 h-4" />
                              </div>

                              {/* Text */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                                    {cat.name}
                                  </span>

                                  <FiArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                                </div>

                                <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                  {toolCount}{" "}
                                  {toolCount === 1
                                    ? "tool"
                                    : "tools"}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Dropdown Footer */}
                      <div className="px-4 py-3 border-t border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50">
                        <Link
                          href="/tools"
                          onClick={() =>
                            setCategoriesDropdown(
                              false
                            )
                          }
                          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-slate-800 transition-all"
                        >
                          <FiGrid className="w-3.5 h-3.5" />
                          Browse all {availableToolCount}{" "}
                          tools
                          <FiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <FiLayout className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>

          {/* =========================================================
              RIGHT SIDE
          ========================================================= */}
          <div className="flex items-center gap-2.5">

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 transition-all"
            >
              <FiSearch className="w-4 h-4 text-brand-500 shrink-0" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
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

            {/* Theme */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (current) => !current
                )
              }
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
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

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-4 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">

              {/* All Tools */}
              <Link
                href="/tools"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="p-3.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-900 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FiGrid className="w-4 h-4 text-brand-500" />
                  <span>All Tools</span>
                </div>

                <span className="px-2 py-1 text-[10px] bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-full font-bold border border-brand-100 dark:border-brand-900">
                  {availableToolCount}
                </span>
              </Link>

              {/* Category Heading */}
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 pt-3">
                Categories
              </div>

              {/* Mobile Categories */}
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon =
                    CATEGORY_ICONS[cat.slug] ||
                    FiGrid;

                  const toolCount =
                    getCategoryToolCount(cat);

                  return (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-200 dark:hover:border-brand-900 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-brand-500 shrink-0" />

                        <span className="text-xs font-semibold truncate">
                          {cat.name}
                        </span>
                      </div>

                      <div className="mt-1 ml-6 text-[10px] text-slate-400 dark:text-slate-500">
                        {toolCount}{" "}
                        {toolCount === 1
                          ? "tool"
                          : "tools"}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Dashboard */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex gap-2">
                <Link
                  href="/dashboard"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="flex-1 py-2.5 text-center text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors"
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