// export const tools = [
//   {
//     slug: "json-formatter",
//     title: "JSON Formatter",
//     category: "Developer",
//     description:
//       "Format, validate, beautify, and minify JSON instantly in your browser.",
//     keywords: [
//       "json formatter",
//       "json validator",
//       "json beautifier",
//       "json minifier",
//     ],
//     featured: true,
//     status: "available",
//   },

//   {
//     slug: "jwt-decoder",
//     title: "JWT Decoder",
//     category: "Developer",
//     description:
//       "Decode JWT headers and payloads instantly without sending your token to a server.",
//     keywords: [
//       "jwt decoder",
//       "jwt parser",
//       "json web token decoder",
//     ],
//     featured: true,
//     status: "available",
//   },

//   {
//     slug: "base64-encoder",
//     title: "Base64 Encoder & Decoder",
//     category: "Developer",
//     description:
//       "Encode and decode Base64 text directly in your browser.",
//     keywords: [
//       "base64 encoder",
//       "base64 decoder",
//       "base64 converter",
//     ],
//     featured: true,
//     status: "available",
//   },

//   {
//     slug: "uuid-generator",
//     title: "UUID Generator",
//     category: "Developer",
//     description:
//       "Generate random UUIDs quickly and in bulk.",
//     keywords: [
//       "uuid generator",
//       "uuid v4 generator",
//       "guid generator",
//     ],
//     featured: false,
//     status: "available",
//   },

//   {
//     slug: "password-generator",
//     title: "Password Generator",
//     category: "Security",
//     description:
//       "Generate strong random passwords with customizable security options.",
//     keywords: [
//       "password generator",
//       "strong password generator",
//       "random password",
//     ],
//     featured: true,
//     status: "available",
//   },

//   {
//     slug: "timestamp-converter",
//     title: "Timestamp Converter",
//     category: "Developer",
//     description:
//       "Convert Unix timestamps to dates and dates to Unix timestamps.",
//     keywords: [
//       "timestamp converter",
//       "unix timestamp converter",
//       "epoch converter",
//     ],
//     featured: false,
//     status: "available",
//   },

//   {
//     slug: "url-encoder",
//     title: "URL Encoder & Decoder",
//     category: "Developer",
//     description:
//       "Encode and decode URLs and URL components instantly.",
//     keywords: [
//       "url encoder",
//       "url decoder",
//       "percent encoder",
//       "url encoding",
//     ],
//     featured: false,
//     status: "available",
//   },

//   {
//     slug: "hash-generator",
//     title: "Hash Generator",
//     category: "Security",
//     description:
//       "Generate cryptographic hashes from text using common hashing algorithms.",
//     keywords: [
//       "hash generator",
//       "sha256 generator",
//       "sha1 generator",
//       "md5 generator",
//     ],
//     featured: false,
//     status: "available",
//   },

//   {
//     slug: "word-counter",
//     title: "Word Counter",
//     category: "Text",
//     description:
//       "Count words, characters, paragraphs, and estimated reading time.",
//     keywords: [
//       "word counter",
//       "character counter",
//       "text counter",
//     ],
//     featured: false,
//     status: "available",
//   },

//   {
//     slug: "case-converter",
//     title: "Case Converter",
//     category: "Text",
//     description:
//       "Convert text between uppercase, lowercase, title case, camel case, snake case, and more.",
//     keywords: [
//       "case converter",
//       "uppercase converter",
//       "lowercase converter",
//       "text case converter",
//     ],
//     featured: false,
//     status: "available",
//   },
// ];

// export function getToolBySlug(slug) {
//   return tools.find((tool) => tool.slug === slug);
// }

// export function getToolsByCategory(category) {
//   return tools.filter(
//     (tool) =>
//       tool.category.toLowerCase() === category.toLowerCase()
//   );
// }

// export function getFeaturedTools() {
//   return tools.filter((tool) => tool.featured);
// }

export const tools = [
  {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    category: "Developer",

    description:
      "Format, beautify, minify, and validate JSON instantly in your browser.",

    keywords: [
      "json formatter",
      "json validator",
      "json beautifier",
      "json minifier",
      "format json",
      "validate json",
    ],

    featured: true,

    status: "available",

    supports: {
      copy: true,
      download: true,
      share: true,
      reset: true,
    },
  },
  {
  slug: "base64-encoder",

  title: "Base64 Encoder & Decoder",

  category: "Developer",

  description:
    "Encode and decode Base64 text with UTF-8 support directly in your browser.",

  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 encode",
    "base64 decode",
    "base64 converter",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: false,
    share: true,
    reset: true,
  },
},
{
  slug: "jwt-decoder",

  title: "JWT Decoder",

  category: "Developer",

  description:
    "Decode JWT headers and payloads instantly in your browser without sending your token to a server.",

  keywords: [
    "jwt decoder",
    "jwt decode",
    "json web token decoder",
    "jwt parser",
    "jwt payload decoder",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: false,
    share: true,
    reset: true,
  },
},
{
  slug: "uuid-generator",

  title: "UUID Generator",

  category: "Developer",

  description:
    "Generate secure random UUID v4 identifiers instantly in your browser.",

  keywords: [
    "uuid generator",
    "uuid v4 generator",
    "guid generator",
    "random uuid",
    "uuid validator",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "password-generator",

  title: "Password Generator",

  category: "Security & Crypto",

  description:
    "Generate strong cryptographically secure passwords with customizable length, characters, symbols, and options.",

  keywords: [
    "password generator",
    "strong password generator",
    "secure password generator",
    "random password generator",
    "online password generator",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "timestamp-converter",

  title: "Timestamp Converter",

  category: "Developer",

  description:
    "Convert Unix timestamps to readable dates and dates to Unix timestamps with seconds and milliseconds support.",

  keywords: [
    "timestamp converter",
    "unix timestamp converter",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "hash-generator",

  title: "Hash Generator",

  category: "Security & Crypto",

  description:
    "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text directly in your browser.",

  keywords: [
    "hash generator",
    "sha256 generator",
    "sha512 generator",
    "sha1 generator",
    "sha384 generator",
    "hash verifier",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "url-encoder",

  title: "URL Encoder & Decoder",

  category: "Developer",

  description:
    "Encode, decode, and parse URLs and URL components online using standard browser URL APIs.",

  keywords: [
    "url encoder",
    "url decoder",
    "url encode",
    "url decode",
    "url parser",
    "query parameter parser",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "case-converter",

  title: "Case Converter",

  category: "Text & Formatting",

  description:
    "Convert text between uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more.",

  keywords: [
    "case converter",
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "camel case converter",
    "pascal case converter",
    "snake case converter",
    "kebab case converter",
    "title case converter",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "word-counter",

  title: "Word Counter",

  category: "Text & Formatting",

  description:
    "Count words, characters, sentences, paragraphs, lines, reading time, and more.",

  keywords: [
    "word counter",
    "word count",
    "character counter",
    "character count",
    "sentence counter",
    "paragraph counter",
    "reading time calculator",
    "text analyzer",
  ],

  featured: true,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
];

export function getToolBySlug(slug) {
  return tools.find(
    (tool) => tool.slug === slug
  );
}

export function getToolsByCategory(category) {
  return tools.filter(
    (tool) =>
      tool.category.toLowerCase() ===
      category.toLowerCase()
  );
}

export function getFeaturedTools() {
  return tools.filter(
    (tool) => tool.featured
  );
}