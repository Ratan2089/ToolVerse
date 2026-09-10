const config = {
  slug: "regex-tester",

  title: "Regex Tester",

  category: "Developer",

  description:
    "Test and debug JavaScript regular expressions online with a fast, browser-based regex tester.",

  keywords: [
    "regex tester",
    "regex tester online",
    "regular expression tester",
    "regex checker",
    "regex validator",
    "regex debugger",
    "online regex tester",
    "regular expression checker",
    "regex test",
    "test regex",
    "javascript regex tester",
    "javascript regular expression tester",
    "regex tester javascript",
  ],

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },

  seo: {
    title:
      "Regex Tester Online | JavaScript Regular Expression Tester",

    description:
      "Test and debug JavaScript regular expressions online. Check matches, capture groups, indexes, flags, and regex errors directly in your browser.",
  },
};

export const REGEX_ENGINE = {
  id: "javascript",

  name: "JavaScript / ECMAScript",

  description:
    "Native JavaScript RegExp engine running directly in your browser.",
};

export const FLAG_OPTIONS = [
  {
    id: "i",
    label: "i",
    title: "Ignore case",
  },

  {
    id: "m",
    label: "m",
    title: "Multiline",
  },

  {
    id: "s",
    label: "s",
    title: "Dot matches newline",
  },

  {
    id: "u",
    label: "u",
    title: "Unicode",
  },

  {
    id: "y",
    label: "y",
    title: "Sticky",
  },
];

export const DEFAULT_EXAMPLE = {
  pattern: String.raw`\b[A-Z][a-z]+\b`,

  text:
    "Hello World from ToolVerse. Regex testing is useful for Developers.",

  flags: [],
};

export default config;