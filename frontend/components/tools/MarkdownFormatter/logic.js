/* =========================================================
   MARKDOWN FORMATTER / PREVIEWER LOGIC
========================================================= */

/* =========================================================
   BASIC HELPERS
========================================================= */

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function normalizeLineEndings(markdown) {
  return String(markdown ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

function isBlank(line) {
  return String(line).trim() === "";
}

/* =========================================================
   URL SAFETY
========================================================= */

function isSafeUrl(url) {
  const value = String(url ?? "").trim();

  if (!value) {
    return false;
  }

  /*
   * Relative URLs are allowed.
   */
  if (
    value.startsWith("/") ||
    value.startsWith("./") ||
    value.startsWith("../") ||
    value.startsWith("#")
  ) {
    return true;
  }

  try {
    const parsed = new URL(value);

    return [
      "http:",
      "https:",
      "mailto:",
      "tel:",
    ].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/* =========================================================
   INLINE MARKDOWN
========================================================= */

function renderInline(value) {
  let text = escapeHtml(value);

  /*
   * Protect inline code before other formatting.
   */
  const codeParts = [];

  text = text.replace(
    /`([^`\n]+)`/g,
    (_, code) => {
      const index =
        codeParts.push(
          `<code>${code}</code>`
        ) - 1;

      return `@@INLINE_CODE_${index}@@`;
    }
  );

  /*
   * Images.
   */
  text = text.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, alt, url, title) => {
      if (!isSafeUrl(url)) {
        return alt;
      }

      const titleAttr = title
        ? ` title="${escapeAttribute(title)}"`
        : "";

      return `<img src="${escapeAttribute(
        url
      )}" alt="${escapeAttribute(
        alt
      )}"${titleAttr} loading="lazy" />`;
    }
  );

  /*
   * Links.
   */
  text = text.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, label, url, title) => {
      if (!isSafeUrl(url)) {
        return label;
      }

      const titleAttr = title
        ? ` title="${escapeAttribute(title)}"`
        : "";

      const external =
        /^https?:\/\//i.test(
          url
        );

      return `<a href="${escapeAttribute(
        url
      )}"${titleAttr}${
        external
          ? ' target="_blank" rel="noopener noreferrer"'
          : ""
      }>${label}</a>`;
    }
  );

  /*
   * Bold + italic.
   */
  text = text.replace(
    /\*\*\*([^*\n]+)\*\*\*/g,
    "<strong><em>$1</em></strong>"
  );

  text = text.replace(
    /___([^_\n]+)___/g,
    "<strong><em>$1</em></strong>"
  );

  /*
   * Bold.
   */
  text = text.replace(
    /\*\*([^*\n]+)\*\*/g,
    "<strong>$1</strong>"
  );

  text = text.replace(
    /__([^_\n]+)__/g,
    "<strong>$1</strong>"
  );

  /*
   * Strikethrough.
   */
  text = text.replace(
    /~~([^~\n]+)~~/g,
    "<del>$1</del>"
  );

  /*
   * Italic.
   */
  text = text.replace(
    /(^|[^\*])\*([^*\n]+)\*(?!\*)/g,
    "$1<em>$2</em>"
  );

  text = text.replace(
    /(^|[^_])_([^_\n]+)_(?!_)/g,
    "$1<em>$2</em>"
  );

  /*
   * Hard line breaks.
   */
  text = text.replace(
    / {2,}\n/g,
    "<br />\n"
  );

  /*
   * Restore inline code.
   */
  text = text.replace(
    /@@INLINE_CODE_(\d+)@@/g,
    (_, index) =>
      codeParts[
        Number(index)
      ]
  );

  return text;
}

/* =========================================================
   TABLE DETECTION
========================================================= */

function isTableSeparator(line) {
  const trimmed =
    String(line).trim();

  if (!trimmed.includes("|")) {
    return false;
  }

  const cells =
    trimmed
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) =>
        cell.trim()
      );

  if (!cells.length) {
    return false;
  }

  return cells.every(
    (cell) =>
      /^:?-{3,}:?$/.test(
        cell
      )
  );
}

function splitTableRow(line) {
  let value =
    String(line).trim();

  if (value.startsWith("|")) {
    value = value.slice(1);
  }

  if (value.endsWith("|")) {
    value = value.slice(0, -1);
  }

  return value
    .split("|")
    .map((cell) =>
      cell.trim()
    );
}

function getTableAlignment(cell) {
  const value =
    cell.trim();

  const left =
    value.startsWith(":");

  const right =
    value.endsWith(":");

  if (left && right) {
    return "center";
  }

  if (right) {
    return "right";
  }

  if (left) {
    return "left";
  }

  return null;
}

/* =========================================================
   BLOCK RENDERING
========================================================= */

export function markdownToHtml(markdown) {
  const source =
    normalizeLineEndings(
      markdown
    );

  const lines =
    source.split("\n");

  const output = [];

  let index = 0;

  let paragraph = [];

  let listType = null;

  let listItems = [];

  let inCodeBlock = false;

  let codeLanguage = "";

  let codeLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) {
      return;
    }

    const content =
      paragraph
        .map((line) =>
          renderInline(
            line
          )
        )
        .join("\n");

    output.push(
      `<p>${content}</p>`
    );

    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    const tag =
      listType === "ol"
        ? "ol"
        : "ul";

    output.push(
      `<${tag}>${listItems
        .map(
          (item) =>
            `<li>${item}</li>`
        )
        .join("")}</${tag}>`
    );

    listItems = [];
    listType = null;
  };

  const flushCodeBlock = () => {
    if (!inCodeBlock) {
      return;
    }

    const code =
      escapeHtml(
        codeLines.join(
          "\n"
        )
      );

    const languageClass =
      codeLanguage
        ? ` class="language-${escapeAttribute(
            codeLanguage
          )}"`
        : "";

    output.push(
      `<pre><code${languageClass}>${code}</code></pre>`
    );

    inCodeBlock = false;
    codeLanguage = "";
    codeLines = [];
  };

  while (
    index <
    lines.length
  ) {
    const line =
      lines[index];

    /* -----------------------------------------------------
       FENCED CODE BLOCK
    ----------------------------------------------------- */

    if (inCodeBlock) {
      if (
        /^ {0,3}```/.test(
          line
        )
      ) {
        flushCodeBlock();
      } else {
        codeLines.push(
          line
        );
      }

      index += 1;
      continue;
    }

    const fence =
      line.match(
        /^ {0,3}```\s*([\w+-]*)\s*$/
      );

    if (fence) {
      flushParagraph();
      flushList();

      inCodeBlock = true;
      codeLanguage =
        fence[1] || "";
      codeLines = [];

      index += 1;
      continue;
    }

    /* -----------------------------------------------------
       BLANK
    ----------------------------------------------------- */

    if (isBlank(line)) {
      flushParagraph();
      flushList();

      index += 1;
      continue;
    }

    /* -----------------------------------------------------
       TABLE
    ----------------------------------------------------- */

    if (
      index + 1 <
        lines.length &&
      line.includes("|") &&
      isTableSeparator(
        lines[index + 1]
      )
    ) {
      flushParagraph();
      flushList();

      const headers =
        splitTableRow(
          line
        );

      const separator =
        splitTableRow(
          lines[index + 1]
        );

      const alignments =
        separator.map(
          getTableAlignment
        );

      let tableIndex =
        index + 2;

      const rows = [];

      while (
        tableIndex <
          lines.length &&
        lines[tableIndex].includes(
          "|"
        ) &&
        !isBlank(
          lines[tableIndex]
        )
      ) {
        rows.push(
          splitTableRow(
            lines[tableIndex]
          )
        );

        tableIndex += 1;
      }

      output.push(
        `<div class="markdown-table-wrapper"><table><thead><tr>${headers
          .map(
            (header, cellIndex) => {
              const alignment =
                alignments[
                  cellIndex
                ];

              const style =
                alignment
                  ? ` style="text-align:${alignment}"`
                  : "";

              return `<th${style}>${renderInline(
                header
              )}</th>`;
            }
          )
          .join("")}</tr></thead><tbody>${rows
          .map(
            (row) =>
              `<tr>${headers
                .map(
                  (_, cellIndex) => {
                    const alignment =
                      alignments[
                        cellIndex
                      ];

                    const style =
                      alignment
                        ? ` style="text-align:${alignment}"`
                        : "";

                    return `<td${style}>${renderInline(
                      row[
                        cellIndex
                      ] || ""
                    )}</td>`;
                  }
                )
                .join("")}</tr>`
          )
          .join("")}</tbody></table></div>`
      );

      index =
        tableIndex;
      continue;
    }

    /* -----------------------------------------------------
       HEADINGS
    ----------------------------------------------------- */

    const heading =
      line.match(
        /^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/
      );

    if (heading) {
      flushParagraph();
      flushList();

      const level =
        heading[1].length;

      output.push(
        `<h${level}>${renderInline(
          heading[2]
        )}</h${level}>`
      );

      index += 1;
      continue;
    }

    /* -----------------------------------------------------
       SETEXT HEADINGS
    ----------------------------------------------------- */

    if (
      index + 1 <
        lines.length &&
      !isBlank(line) &&
      /^(=+|-+)\s*$/.test(
        lines[index + 1]
      )
    ) {
      flushParagraph();
      flushList();

      const level =
        /^=/.test(
          lines[index + 1]
        )
          ? 1
          : 2;

      output.push(
        `<h${level}>${renderInline(
          line.trim()
        )}</h${level}>`
      );

      index += 2;
      continue;
    }

    /* -----------------------------------------------------
       HORIZONTAL RULE
    ----------------------------------------------------- */

    if (
      /^ {0,3}((\* *){3,}|(- *){3,}|(_ *){3,})$/.test(
        line.trim()
      )
    ) {
      flushParagraph();
      flushList();

      output.push(
        "<hr />"
      );

      index += 1;
      continue;
    }

    /* -----------------------------------------------------
       BLOCKQUOTE
    ----------------------------------------------------- */

    if (
      /^ {0,3}>\s?/.test(
        line
      )
    ) {
      flushParagraph();
      flushList();

      const quoteLines =
        [];

      while (
        index <
        lines.length
      ) {
        const match =
          lines[index].match(
            /^ {0,3}>\s?(.*)$/
          );

        if (!match) {
          break;
        }

        quoteLines.push(
          match[1]
        );

        index += 1;
      }

      output.push(
        `<blockquote>${markdownToHtml(
          quoteLines.join(
            "\n"
          )
        )}</blockquote>`
      );

      continue;
    }

    /* -----------------------------------------------------
       UNORDERED LIST
    ----------------------------------------------------- */

    const unordered =
      line.match(
        /^ {0,3}[-+*]\s+(.+)$/
      );

    if (unordered) {
      flushParagraph();

      if (
        listType &&
        listType !== "ul"
      ) {
        flushList();
      }

      listType = "ul";

      const item =
        unordered[1];

      const task =
        item.match(
          /^\[([ xX])\]\s+(.*)$/
        );

      if (task) {
        const checked =
          task[1].toLowerCase() ===
          "x";

        listItems.push(
          `<label class="markdown-task"><input type="checkbox" ${
            checked
              ? "checked "
              : ""
          }disabled /> <span>${renderInline(
            task[2]
          )}</span></label>`
        );
      } else {
        listItems.push(
          renderInline(
            item
          )
        );
      }

      index += 1;
      continue;
    }

    /* -----------------------------------------------------
       ORDERED LIST
    ----------------------------------------------------- */

    const ordered =
      line.match(
        /^ {0,3}\d+[.)]\s+(.+)$/
      );

    if (ordered) {
      flushParagraph();

      if (
        listType &&
        listType !== "ol"
      ) {
        flushList();
      }

      listType = "ol";

      listItems.push(
        renderInline(
          ordered[1]
        )
      );

      index += 1;
      continue;
    }

    /* -----------------------------------------------------
       INDENTED CODE
    ----------------------------------------------------- */

    if (
      /^ {4}/.test(
        line
      )
    ) {
      flushParagraph();
      flushList();

      const codeLines =
        [];

      while (
        index <
        lines.length
      ) {
        if (
          /^ {4}/.test(
            lines[index]
          )
        ) {
          codeLines.push(
            lines[index].slice(
              4
            )
          );

          index += 1;
        } else if (
          isBlank(
            lines[index]
          )
        ) {
          codeLines.push("");
          index += 1;
        } else {
          break;
        }
      }

      output.push(
        `<pre><code>${escapeHtml(
          codeLines.join(
            "\n"
          )
        )}</code></pre>`
      );

      continue;
    }

    /* -----------------------------------------------------
       PARAGRAPH
    ----------------------------------------------------- */

    paragraph.push(
      line
    );

    index += 1;
  }

  flushCodeBlock();
  flushParagraph();
  flushList();

  return output.join(
    "\n"
  );
}

/* =========================================================
   MARKDOWN FORMATTING
========================================================= */

export function formatMarkdown(
  markdown
) {
  const source =
    normalizeLineEndings(
      markdown
    );

  const lines =
    source.split("\n");

  const formatted =
    [];

  let previousBlank =
    false;

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    let line =
      lines[index]
        .replace(
          /\t/g,
          "  "
        )
        .replace(
          /[ \t]+$/g,
          ""
        );

    /*
     * Normalize headings.
     */
    const heading =
      line.match(
        /^\s*(#{1,6})\s*(.*?)\s*#*\s*$/
      );

    if (
      heading &&
      heading[2]
    ) {
      line =
        `${heading[1]} ${heading[2].trim()}`;
    }

    /*
     * Normalize unordered lists.
     */
    line =
      line.replace(
        /^(\s*)[+*]\s+/,
        "$1- "
      );

    /*
     * Normalize ordered lists.
     */
    line =
      line.replace(
        /^(\s*)\d+[.)]\s+/,
        "$11. "
      );

    /*
     * Normalize blockquotes.
     */
    line =
      line.replace(
        /^\s*>\s*/,
        "> "
      );

    /*
     * Normalize horizontal rules.
     */
    if (
      /^(\s*)(\* *){3,}$/.test(
        line
      ) ||
      /^(\s*)(_ *){3,}$/.test(
        line
      )
    ) {
      line =
        `${RegExp.$1}---`;
    }

    const blank =
      isBlank(line);

    /*
     * Avoid excessive blank lines.
     */
    if (
      blank &&
      previousBlank
    ) {
      continue;
    }

    formatted.push(
      line
    );

    previousBlank =
      blank;
  }

  /*
   * Normalize fenced code blocks.
   */
  const result =
    formatted
      .join("\n")
      .replace(
        /```([^\n]*)\n/g,
        (_, language) =>
          `\`\`\`${language.trim()}\n`
      )
      .trim();

  return result
    ? `${result}\n`
    : "";
}

/* =========================================================
   MARKDOWN → HTML DOCUMENT
========================================================= */

export function createHtmlDocument(
  markdown
) {
  const body =
    markdownToHtml(
      markdown
    );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Markdown Preview</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #111827;
      background: #ffffff;
    }

    .markdown-preview {
      max-width: 900px;
      margin: 0 auto;
    }

    h1, h2, h3, h4, h5, h6 {
      line-height: 1.25;
      margin-top: 1.5em;
      margin-bottom: 0.6em;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.6rem;
    }

    h3 {
      font-size: 1.3rem;
    }

    p {
      margin: 1em 0;
    }

    a {
      color: #2563eb;
    }

    blockquote {
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 4px solid #d1d5db;
      background: #f9fafb;
      color: #4b5563;
    }

    code {
      padding: 0.15em 0.35em;
      border-radius: 4px;
      background: #f3f4f6;
      font-family: monospace;
    }

    pre {
      overflow-x: auto;
      padding: 16px;
      border-radius: 8px;
      background: #111827;
      color: #f9fafb;
    }

    pre code {
      padding: 0;
      background: transparent;
      color: inherit;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
    }

    th,
    td {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      text-align: left;
    }

    th {
      background: #f3f4f6;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    hr {
      margin: 2em 0;
      border: 0;
      border-top: 1px solid #d1d5db;
    }

    .markdown-task {
      display: inline-flex;
      gap: 8px;
      align-items: center;
    }
  </style>
</head>
<body>
  <main class="markdown-preview">
    ${body}
  </main>
</body>
</html>`;
}

/* =========================================================
   ESCAPE MARKDOWN
========================================================= */

export function escapeMarkdown(
  value
) {
  return String(value ?? "")
    .replace(
      /([\\`*_[\]{}()#+\-.!|>])/g,
      "\\$1"
    );
}

/* =========================================================
   STATISTICS
========================================================= */

export function getMarkdownStats(
  markdown
) {
  const value =
    String(markdown ?? "");

  const lines =
    value
      ? value.split("\n").length
      : 0;

  const characters =
    value.length;

  const charactersNoSpaces =
    value.replace(
      /\s/g,
      ""
    ).length;

  const words =
    value.trim()
      ? value
          .trim()
          .split(/\s+/)
          .length
      : 0;

  const headings =
    (
      value.match(
        /^ {0,3}#{1,6}\s+/gm
      ) || []
    ).length;

  const links =
    (
      value.match(
        /\[[^\]]+\]\([^)]+\)/g
      ) || []
    ).length;

  const codeBlocks =
    (
      value.match(
        /^ {0,3}```/gm
      ) || []
    ).length / 2;

  const listItems =
    (
      value.match(
        /^ {0,3}(?:[-+*]|\d+[.)])\s+/gm
      ) || []
    ).length;

  return {
    lines,
    characters,
    charactersNoSpaces,
    words,
    headings,
    links,
    codeBlocks,
    listItems,
  };
}

/* =========================================================
   COPY CONTENT
========================================================= */

export function createCopyMarkdown(
  markdown
) {
  return formatMarkdown(
    markdown
  );
}

export function createCopyHtml(
  markdown
) {
  return createHtmlDocument(
    markdown
  );
}