const config = {
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

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },

  seo: {
    title: "XML Formatter & Validator Online | Pretty Print & Minify XML",

    description:
      "Format, beautify, validate, and minify XML online. Pretty-print XML, check syntax errors, and clean up XML documents directly in your browser.",
  },
};

export const DEFAULT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="1">
    <name>John Doe</name>
    <email>john@example.com</email>
    <role>Developer</role>
  </user>
  <user id="2">
    <name>Sarah Smith</name>
    <email>sarah@example.com</email>
    <role>Designer</role>
  </user>
</users>`;

export default config;