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
{
  slug: "regex-tester",

  title: "Regex Tester",

  category: "Developer",

  description:
    "Test and debug regular expressions online with JavaScript, Python, PCRE2, and Go RE2 engines directly in your browser.",

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
    "regex tester javascript",
    "regex tester python",
    "pcre2 tester",
    "re2 tester",
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
  slug: "json-to-csv",
  title: "JSON to CSV Converter",
  category: "Developer",
  description:
    "Convert JSON data to CSV format online with a fast, browser-based JSON to CSV converter.",
  keywords: [
    "json to csv",
    "json to csv converter",
    "convert json to csv",
    "json converter",
    "json csv converter",
    "json to csv online",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "xml-formatter",

  title: "XML Formatter & Validator",

  category: "Developer",

  description:
    "Format, beautify, validate, and minify XML online for free. Pretty-print XML, check XML syntax errors, and clean up XML documents directly in your browser.",

  keywords: [
    "xml formatter",
    "xml formatter online",
    "online xml formatter",
    "xml beautifier",
    "xml beautifier online",
    "xml validator",
    "xml validator online",
    "xml checker",
    "xml syntax checker",
    "xml parser",
    "xml pretty print",
    "pretty print xml",
    "format xml",
    "validate xml",
    "xml minifier",
    "xml minify",
    "minify xml",
    "xml editor",
    "xml viewer",
    "xml formatting tool",
  ],

  featured: false,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "yaml-formatter",

  title: "YAML Formatter & Validator",

  category: "Developer",

  description:
    "Format, beautify, validate, and minify YAML online for free. Pretty-print YAML, check YAML syntax errors, and clean up YAML configuration files directly in your browser.",

  keywords: [
    "yaml formatter",
    "yaml formatter online",
    "online yaml formatter",
    "yaml beautifier",
    "yaml beautifier online",
    "yaml validator",
    "yaml validator online",
    "yaml checker",
    "yaml syntax checker",
    "yaml parser",
    "yaml pretty print",
    "pretty print yaml",
    "format yaml",
    "validate yaml",
    "yaml minifier",
    "yaml minify",
    "minify yaml",
    "yaml editor",
    "yaml viewer",
    "yaml formatting tool",
    "yaml formatter tool",
    "yml formatter",
    "yml validator",
    "yml beautifier",
  ],

  featured: false,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "json-yaml-converter",

  title: "JSON ↔ YAML Converter",

  category: "Developer",

  description:
    "Convert JSON to YAML and YAML to JSON online for free. Transform configuration files, API data, and structured documents between JSON and YAML directly in your browser.",

  keywords: [
    "json yaml converter",
    "json to yaml",
    "yaml to json",
    "json to yaml converter",
    "yaml to json converter",
    "json yaml converter online",
    "json to yaml online",
    "yaml to json online",
    "convert json to yaml",
    "convert yaml to json",
    "json converter",
    "yaml converter",
    "json yaml tool",
    "json to yml",
    "yml to json",
    "json to yml converter",
    "yml to json converter",
    "json yaml conversion",
    "convert json yaml",
    "yaml json converter online",
  ],

  featured: false,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "csv-to-json",
  title: "CSV to JSON Converter",
  category: "Developer",
  description:
    "Convert CSV to JSON online for free. Transform CSV data into structured JSON with support for headers, quoted values, commas, and multiline fields directly in your browser.",
  keywords: [
    "csv to json",
    "csv to json converter",
    "csv json converter",
    "csv to json online",
    "convert csv to json",
    "convert csv json",
    "csv converter",
    "csv parser",
    "csv parser online",
    "csv to json online converter",
    "csv data to json",
    "convert csv file to json",
    "csv json",
    "csv to javascript object",
    "csv to json tool",
    "online csv converter",
    "csv formatter",
    "csv reader",
    "csv data converter",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "sql-formatter",
  title: "SQL Formatter & Beautifier",
  category: "Developer",
  description:
    "Format, beautify, validate, and minify SQL queries online for free. Clean up SQL statements and make complex queries easier to read directly in your browser.",
  keywords: [
    "sql formatter",
    "sql formatter online",
    "sql beautifier",
    "sql beautifier online",
    "sql formatter online free",
    "format sql",
    "format sql online",
    "sql pretty print",
    "pretty print sql",
    "sql minifier",
    "sql minify",
    "minify sql",
    "sql query formatter",
    "sql query beautifier",
    "sql query formatter online",
    "sql parser",
    "sql formatting tool",
    "online sql formatter",
    "sql cleaner",
    "sql beautifier tool",
    "sql formatter tool",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "url-parser",
  title: "URL Parser & Query String Parser",
  category: "Developer",
  description:
    "Parse URLs online for free. Extract protocol, hostname, port, pathname, query parameters, hash, username, password, origin, and other URL components directly in your browser.",
  keywords: [
    "url parser",
    "url parser online",
    "url analyzer",
    "url analyzer online",
    "parse url",
    "parse url online",
    "url query parser",
    "query string parser",
    "query string parser online",
    "url parameter parser",
    "url parameters",
    "url components",
    "url breakdown",
    "url checker",
    "url inspector",
    "url query parameters",
    "parse query string",
    "query parameter parser",
    "url parser tool",
    "online url parser",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "json-diff",
  title: "JSON Diff",
  category: "Developer",
  description:
    "Compare two JSON objects online and find added, removed, and changed values. Detect differences in nested JSON objects and arrays directly in your browser.",
  keywords: [
    "json diff",
    "json diff tool",
    "json compare",
    "json comparison",
    "compare json",
    "compare json online",
    "json difference",
    "json difference checker",
    "json diff online",
    "json compare online",
    "json comparison tool",
    "compare two json files",
    "compare json objects",
    "json object comparison",
    "json changes",
    "json difference checker online",
    "json diff checker",
    "json comparator",
    "online json diff",
    "json compare tool",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "text-diff",
  title: "Text Diff & Compare",
  category: "Developer",
  description:
    "Compare two text files or code snippets online and find added, removed, and changed content. Supports line, word, and character comparison with side-by-side and unified diff views.",
  keywords: [
    "text diff",
    "text diff tool",
    "text compare",
    "text comparison",
    "compare text",
    "compare text online",
    "diff checker",
    "diff tool",
    "online diff tool",
    "text difference checker",
    "text comparison tool",
    "compare two files",
    "file diff",
    "code diff",
    "code compare",
    "code comparison",
    "compare code online",
    "line diff",
    "word diff",
    "character diff",
    "text diff online",
    "online text comparison",
    "diff checker online",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "cron-generator",
  title: "Cron Expression Generator",
  category: "Developer",
  description:
    "Create, validate, explain, and test cron expressions online. Generate cron schedules, view upcoming run times, and understand cron syntax directly in your browser.",
  keywords: [
    "cron generator",
    "cron expression generator",
    "cron generator online",
    "cron expression",
    "cron expression builder",
    "cron builder",
    "cron schedule generator",
    "cron scheduler",
    "cron job generator",
    "crontab generator",
    "crontab generator online",
    "cron parser",
    "cron validator",
    "cron expression validator",
    "cron expression checker",
    "cron expression tester",
    "cron schedule builder",
    "cron syntax",
    "cron schedule",
    "cron job",
    "crontab",
    "cron calculator",
    "cron explainer",
    "cron expression explainer",
    "next cron execution",
    "next cron run",
    "cron next run",
    "cron time calculator",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "http-status-checker",
  title: "HTTP Status Code Checker",
  category: "Developer",
  description:
    "Look up HTTP status codes online and understand their meanings, categories, and common uses. Search and filter HTTP response codes from 100 to 599 directly in your browser.",
  keywords: [
    "http status code checker",
    "http status codes",
    "http status code checker online",
    "http status code list",
    "http status codes list",
    "http response codes",
    "http response status codes",
    "http error codes",
    "http status code lookup",
    "http status code reference",
    "http status checker",
    "http response code checker",
    "http status code meaning",
    "http status code meanings",
    "http codes",
    "http code list",
    "http 200",
    "http 404",
    "http 500",
    "http 502",
    "http 503",
    "http status reference",
    "rest api status codes",
    "api status codes",
    "http client error codes",
    "http server error codes",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "ip-calculator",
  title: "IP / CIDR Calculator",
  category: "Developer",
  description:
    "Calculate IPv4 network details from an IP address and CIDR prefix. Find network address, broadcast address, subnet mask, wildcard mask, usable host range, and address counts online.",
  keywords: [
    "ip calculator",
    "ip address calculator",
    "cidr calculator",
    "ip cidr calculator",
    "subnet calculator",
    "subnet calculator online",
    "ipv4 calculator",
    "ipv4 subnet calculator",
    "cidr calculator online",
    "ip subnet calculator",
    "network calculator",
    "network address calculator",
    "subnet mask calculator",
    "wildcard mask calculator",
    "ip range calculator",
    "ip range checker",
    "cidr checker",
    "cidr calculator ipv4",
    "network address",
    "broadcast address",
    "usable ip range",
    "usable host calculator",
    "subnet mask",
    "wildcard mask",
    "ipv4 subnetting",
    "ip address range",
    "calculate cidr",
    "calculate subnet",
    "calculate subnet mask",
  ],
  featured: false,
  status: "available",
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "color-converter",

  title: "Color Converter",

  category: "Developer",

  description:
    "Convert colors between HEX, RGB, HSL, HSV, HWB, and CMYK online. Pick colors, adjust alpha, generate palettes, check WCAG contrast, and copy CSS color values.",

  keywords: [
    "color converter",
    "color converter online",
    "color picker",
    "online color picker",
    "hex color converter",
    "hex to rgb",
    "rgb to hex",
    "hex to hsl",
    "hsl to hex",
    "rgb to hsl",
    "hsl to rgb",
    "rgb to hsv",
    "hsv to rgb",
    "hwb color",
    "cmyk color converter",
    "hex to cmyk",
    "rgb to cmyk",
    "color code converter",
    "color code checker",
    "css color converter",
    "css color picker",
    "css color codes",
    "hex color picker",
    "rgba color picker",
    "color palette generator",
    "color palette",
    "color shades generator",
    "color tint generator",
    "complementary color",
    "analogous colors",
    "triadic colors",
    "monochromatic colors",
    "color contrast checker",
    "wcag contrast checker",
    "wcag aa",
    "wcag aaa",
    "css color names",
    "color name lookup",
  ],

  featured: false,

  status: "available",

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
},
{
  slug: "markdown-formatter",
  title: "Markdown Formatter & Previewer",
  category: "Developer",
  description:
    "Format, beautify, edit, and preview Markdown online. Convert Markdown to safe HTML, preview headings, lists, tables, code blocks, links, and more.",
  keywords: [
    "markdown formatter",
    "markdown formatter online",
    "markdown beautifier",
    "markdown previewer",
    "markdown preview",
    "markdown editor",
    "markdown editor online",
    "markdown to html",
    "markdown to html converter",
    "markdown viewer",
    "markdown renderer",
    "markdown syntax checker",
    "markdown beautifier online",
    "format markdown",
    "beautify markdown",
    "markdown table generator",
    "markdown live preview",
    "markdown html preview",
    "md formatter",
    "md previewer",
    "md editor",
    "markdown tool",
  ],
  featured: false,
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