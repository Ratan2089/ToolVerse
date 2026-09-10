const faq = [
  {
    question:
      "What is a Markdown formatter?",
    answer:
      "A Markdown formatter cleans up Markdown source text and makes its structure easier to read and maintain. It can normalize headings, lists, spacing, code blocks, tables, and other Markdown elements.",
  },

  {
    question:
      "What is a Markdown previewer?",
    answer:
      "A Markdown previewer renders Markdown as formatted content so you can see how headings, lists, links, tables, code blocks, quotes, and other elements will appear.",
  },

  {
    question:
      "Can I convert Markdown to HTML?",
    answer:
      "Yes. ToolVerse renders supported Markdown syntax as HTML and lets you copy or download the generated HTML.",
  },

  {
    question:
      "Does the Markdown formatter support code blocks?",
    answer:
      "Yes. Fenced code blocks using triple backticks are supported, including optional language labels such as javascript, json, css, html, and bash.",
  },

  {
    question:
      "Can I create Markdown tables?",
    answer:
      "Yes. Markdown tables using the standard pipe and separator syntax are supported and rendered in the preview.",
  },

  {
    question:
      "Can I use Markdown links?",
    answer:
      "Yes. Standard Markdown links such as [ToolVerse](https://example.com) are supported.",
  },

  {
    question:
      "Is the Markdown preview safe?",
    answer:
      "The preview renderer escapes raw HTML and only generates HTML from the supported Markdown syntax. This prevents user-entered HTML from being directly executed as page markup.",
  },

  {
    question:
      "Can I download my Markdown?",
    answer:
      "Yes. You can download the formatted Markdown as a .md file or download the rendered result as an HTML file.",
  },

  {
    question:
      "Does the tool send my Markdown to a server?",
    answer:
      "The formatter and preview are designed to process the Markdown in your browser. Your Markdown does not need to be uploaded to a remote server for formatting or previewing.",
  },
];

export default faq;