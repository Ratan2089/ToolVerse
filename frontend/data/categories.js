export const categories = [
  {
    slug: "developer",
    name: "Developer",
    description:
      "Essential tools for software engineers, API builders, and frontend developers.",
    count: 6,
    badge: "POPULAR",
    icon: "FiCode",
    color: "from-indigo-500 to-blue-600",
  },

  {
    slug: "text-formatting",
    name: "Text & Formatting",
    description:
      "Manipulate, clean, analyze, convert, and format text strings instantly.",
    count: 4,
    badge: "ESSENTIAL",
    icon: "FiFileText",
    color: "from-emerald-500 to-teal-600",
  },

  {
    slug: "general-utility",
    name: "General Utility",
    description:
      "Handy day-to-day utilities for productivity, calculation, and quick tasks.",
    count: 4,
    badge: "DAILY",
    icon: "FiTool",
    color: "from-orange-500 to-amber-600",
  },

  {
    slug: "security-crypto",
    name: "Security & Crypto",
    description:
      "Cryptographic hashing, password generators, encoders, and security helpers.",
    count: 3,
    badge: "SECURE",
    icon: "FiShield",
    color: "from-pink-500 to-rose-600",
  },

  {
    slug: "business-math",
    name: "Business & Math",
    description:
      "Calculators, financial estimators, unit converters, and business formulas.",
    count: 3,
    badge: "FINANCE",
    icon: "FiTrendingUp",
    color: "from-purple-500 to-violet-600",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find(
    (category) =>
      category.slug.toLowerCase() === slug.toLowerCase()
  );
}