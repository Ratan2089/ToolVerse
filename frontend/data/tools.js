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
  "Format, beautify, validate, and minify JSON online for free. Pretty-print JSON, check syntax errors, or compress JSON directly in your browser.",

keywords: [
  "json formatter",
  "json formatter online",
  "online json formatter",
  "json validator",
  "json validator online",
  "json beautifier",
  "json pretty print",
  "pretty print json",
  "json minifier",
  "json minify",
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
  "Encode and decode Base64 text online with UTF-8 support. Convert text to Base64 or decode Base64 strings directly in your browser.",

keywords: [
  "base64 encoder",
  "base64 decoder",
  "base64 encoder online",
  "base64 decoder online",
  "base64 encode",
  "base64 decode",
  "base64 converter",
  "text to base64",
  "base64 to text",
  "utf8 base64 encoder",
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
  "Decode JWT tokens online and inspect JWT headers and payloads instantly. Parse JSON Web Tokens securely in your browser without sending your token to a server.",

keywords: [
  "jwt decoder",
  "jwt decoder online",
  "jwt parser",
  "jwt token decoder",
  "json web token decoder",
  "jwt decode",
  "decode jwt token",
  "jwt payload decoder",
  "jwt header decoder",
  "jwt token parser",
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
  "Generate random UUID v4 identifiers online for free. Create single or multiple UUIDs instantly in your browser.",

keywords: [
  "uuid generator",
  "uuid generator online",
  "uuid v4 generator",
  "random uuid generator",
  "uuid generator bulk",
  "bulk uuid generator",
  "guid generator",
  "random guid generator",
  "uuid v4",
  "generate uuid",
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
  "Generate strong, secure random passwords online for free. Customize password length, uppercase and lowercase letters, numbers, symbols, and more.",

keywords: [
  "password generator",
  "password generator online",
  "strong password generator",
  "secure password generator",
  "random password generator",
  "strong random password",
  "secure random password",
  "online password generator",
  "complex password generator",
  "password creator",
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

title: "Unix Timestamp Converter",

  category: "Developer",

  description:
  "Convert Unix timestamps to readable dates and dates to Unix timestamps online. Supports Unix epoch timestamps in seconds and milliseconds.",

keywords: [
  "timestamp converter",
  "unix timestamp converter",
  "unix time converter",
  "epoch converter",
  "epoch timestamp converter",
  "timestamp to date",
  "date to timestamp",
  "unix timestamp to date",
  "unix time converter online",
  "epoch time converter",
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

title: "Hash Generator - SHA-256, SHA-512 & More",

  category: "Security & Crypto",

 description:
  "Generate SHA-256, SHA-512, SHA-384, and SHA-1 hashes online from text. Calculate cryptographic hashes directly in your browser.",

keywords: [
  "hash generator",
  "hash generator online",
  "sha256 generator",
  "sha256 hash generator",
  "sha512 generator",
  "sha512 hash generator",
  "sha384 generator",
  "sha1 generator",
  "text hash generator",
  "cryptographic hash generator",
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
  "Encode and decode URLs and URL components online using percent encoding. Convert special characters for URLs, query parameters, and web requests.",

keywords: [
  "url encoder",
  "url decoder",
  "url encoder online",
  "url decoder online",
  "url encode",
  "url decode",
  "percent encoding",
  "percent encoder",
  "url component encoder",
  "query parameter encoder",
  "url parser",
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

title: "Case Converter - Uppercase, Lowercase & More",
  category: "Text & Formatting",

  description:
  "Convert text to uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more online.",
  keywords: [
  "case converter",
  "case converter online",
  "text case converter",
  "uppercase converter",
  "lowercase converter",
  "title case converter",
  "sentence case converter",
  "camel case converter",
  "pascal case converter",
  "snake case converter",
  "kebab case converter",
  "text converter",
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

title: "Word Counter - Words, Characters & Reading Time",

  category: "Text & Formatting",

  description:
  "Count words, characters, sentences, paragraphs, lines, and estimated reading time online. Free word and character counter for text, essays, articles, and more.",

keywords: [
  "word counter",
  "word counter online",
  "word count",
  "online word counter",
  "character counter",
  "character count",
  "sentence counter",
  "paragraph counter",
  "line counter",
  "reading time calculator",
  "text analyzer",
  "word count calculator",
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