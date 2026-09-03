"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiCpu,
  FiGlobe,
  FiArrowRight,
  FiCode,
  FiGrid,
  FiTerminal,
} from "react-icons/fi";
import ToolCard from "@/components/cards/ToolCard";
import CategoryCard from "@/components/cards/CategoryCard";
import FeatureCard from "@/components/cards/FeatureCard";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/shared/SearchBar";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [heroSearch, setHeroSearch] = useState("");
  const router = useRouter();

  const handleHeroSearchSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const query = heroSearch.trim();

    if (!query) {
      router.push("/tools");
      return;
    }

    router.push(`/tools?search=${encodeURIComponent(query)}`);
  };

  const quickPills = [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "QR Code Generator", slug: "qr-code-generator" },
    { name: "Password Generator", slug: "password-generator" },
  ];

  return (
    <div className="space-y-24 py-8 sm:py-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span>10+ Free Tools — No Sign-Up Required</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Every Developer & Utility Tool,{" "}
            <span className="gradient-text">Instant & Private.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Format JSON, decode JWTs, generate secure passwords, design QR
            codes, and run conversions directly in your browser.
          </p>

          {/* Interactive Search Bar Container */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="pt-4 max-w-2xl mx-auto"
          >
            <SearchBar
              value={heroSearch}
              onChange={setHeroSearch}
              onClear={() => setHeroSearch("")}
              onSubmit={handleHeroSearchSubmit}
              size="lg"
              placeholder="Search 20+ tools (e.g. JSON, JWT, QR Code, Password)..."
            />

            {/* Popular Quick Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 mt-4 text-xs">
              <span className="text-slate-400 font-semibold">Popular:</span>
              {quickPills.map((pill) => (
                <Link
                  key={pill.slug}
                  href={`/tools/${pill.slug}`}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-brand-950 hover:text-brand-600 dark:hover:text-brand-400 text-slate-600 dark:text-slate-300 font-medium border border-slate-200/60 dark:border-slate-800 transition-all"
                >
                  {pill.name}
                </Link>
              ))}
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/tools">
              <Button size="lg" icon={FiArrowRight} iconPosition="right">
                Explore All Tools
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" icon={FiGrid}>
                Browse Categories
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* POPULAR TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Utilities"
          title="Popular Developer & Daily Tools"
          subtitle="Hand-picked, high-frequency tools used by developers every day."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {tools
            .filter((tool) => tool.featured)
            .slice(0, 6)
            .map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
        </div>

        <div className="text-center mt-10">
          <div className="flex justify-center mt-10">
            <Link href="/tools">
              <Button
                variant="outline"
                size="lg"
                icon={FiArrowRight}
                iconPosition="right"
                className="border-2 border-brand-500 dark:border-brand-400 px-7 py-3 rounded-2xl font-bold shadow-sm hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:border-brand-600 dark:hover:border-brand-300 hover:shadow-md transition-all"
              >
                View Complete Tool Catalog ({tools.length} Tools)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Organized Workspaces"
          title="Browse Tools by Category"
          subtitle="From code formatting to business calculators, find what you need in seconds."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => {
            const toolCount = tools.filter(
              (tool) =>
                tool.category?.toLowerCase() === cat.name?.toLowerCase(),
            ).length;

            return (
              <CategoryCard
                key={cat.slug}
                category={{
                  ...cat,
                  count: toolCount,
                }}
              />
            );
          })}
        </div>
      </section>

      {/* FEATURES SHOWCASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-glow">
          <SectionHeading
            badge="Platform Philosophy"
            title="Why Engineers & Teams Trust ToolVerse"
            subtitle="Built from the ground up for maximum speed, privacy, and frictionless developer experience."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <FeatureCard
              title="Instant Execution"
              description="No accounts, no paywalls, no delays. Click any tool and get your formatted result in under 10 milliseconds."
              icon={FiZap}
              color="text-amber-500"
            />
            <FeatureCard
              title="100% In-Browser Privacy"
              description="Your confidential JSON payloads, tokens, and code snippets never reach a backend server. Everything executes client-side."
              icon={FiShield}
              color="text-emerald-500"
            />
            <FeatureCard
              title="SEO & Keyboard Native"
              description="Press '/' anytime to focus search. Every tool has its own dedicated permalink, structured metadata, and fast layout."
              icon={FiTerminal}
              color="text-brand-500"
            />
          </div>
        </div>
      </section>

      {/* CONVERSION CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-cyan text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white">
              <FiZap className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to boost your productivity?
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Start formatting, decoding, generating, and converting with zero
              friction today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tools">
                <button className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors shadow-lg active:scale-95 text-sm">
                  Launch All Tools Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
