const config = {
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
    "markdown code formatter",
    "markdown table generator",
    "markdown live preview",
    "markdown html preview",
    "md formatter",
    "md previewer",
    "md editor",
    "markdown tool",
  ],

  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },

  seo: {
    title:
      "Markdown Formatter & Previewer Online | Markdown to HTML | ToolVerse",

    description:
      "Format and preview Markdown online. Beautify Markdown, render headings, lists, tables, code blocks, links, and convert Markdown to safe HTML.",
  },
};

export const DEFAULT_MARKDOWN = `# Markdown Preview

Welcome to the **ToolVerse Markdown Formatter & Previewer**.

## Features

- Format Markdown
- Live preview
- **Bold text**
- *Italic text*
- \`Inline code\`
- [Links](https://example.com)

### Task List

- [x] Write Markdown
- [x] Preview Markdown
- [ ] Publish document

### Code

\`\`\`javascript
function hello(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Table

| Name | Type | Description |
| --- | --- | --- |
| Markdown | Text | Lightweight markup |
| HTML | Markup | Web document format |
| CSS | Style | Presentation layer |

> Markdown is easy to write and easy to read.

---

**Start editing the Markdown on the left.**
`;

export default config;