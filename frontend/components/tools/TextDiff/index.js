"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolError from "@/components/tools/shared/ToolError";
import ToolEmptyState from "@/components/tools/shared/ToolEmptyState";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";
import { handleShare as shareTool } from "@/lib/toolActions";

import {
  DEFAULT_MODIFIED,
  DEFAULT_ORIGINAL,
} from "./config";

import {
  compareText,
  createPatch,
  createUnifiedDiff,
} from "./logic";

import faq from "./faq";

import styles from "./TextDiff.module.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("markdown", markdown);

const LANGUAGE_OPTIONS = [
  { value: "auto", label: "Auto Detect" },
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "HTML / XML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "sql", label: "SQL" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
];

const EXTENSION_LANGUAGE_MAP = {
  txt: "plaintext",
  text: "plaintext",

  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",

  ts: "typescript",
  tsx: "typescript",

  json: "json",

  html: "xml",
  htm: "xml",
  xml: "xml",

  css: "css",

  py: "python",

  java: "java",

  sql: "sql",

  yaml: "yaml",
  yml: "yaml",

  md: "markdown",
  markdown: "markdown",

  diff: "plaintext",
  patch: "plaintext",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlightCode(value, language) {
  const text = String(value ?? "");

  if (!text) {
    return "";
  }

  if (!language || language === "plaintext") {
    return escapeHtml(text);
  }

  try {
    if (language === "auto") {
      return hljs.highlightAuto(text).value;
    }

    if (hljs.getLanguage(language)) {
      return hljs.highlight(text, {
        language,
        ignoreIllegals: true,
      }).value;
    }
  } catch {
    // Fall back to plain text if syntax highlighting fails.
  }

  return escapeHtml(text);
}

function getFileExtension(fileName) {
  const name = String(fileName || "");
  const lastDot = name.lastIndexOf(".");

  if (lastDot === -1) {
    return "";
  }

  return name.slice(lastDot + 1).toLowerCase();
}

function getLanguageFromFile(fileName) {
  const extension = getFileExtension(fileName);

  return EXTENSION_LANGUAGE_MAP[extension] || "plaintext";
}

function countLines(value) {
  if (!value) {
    return 0;
  }

  return String(value).split(/\r\n|\r|\n/).length;
}

function countCharacters(value) {
  return Array.from(String(value ?? "")).length;
}

function buildLineNumbers(value) {
  const count = Math.max(countLines(value), 1);

  return Array.from(
    { length: count },
    (_, index) => index + 1
  );
}

function findSearchMatches(result, query) {
  const search = String(query || "").trim().toLowerCase();

  if (!search || !result) {
    return [];
  }

  const matches = [];

  result.rows.forEach((row, index) => {
    const text = `${row.oldText || ""}\n${row.newText || ""}`;

    if (text.toLowerCase().includes(search)) {
      matches.push(index);
    }
  });

  return matches;
}

function InlineDiff({ changes }) {
  if (!changes) {
    return null;
  }

  return (
    <>
      {changes.map((change, index) => {
        const value = change.value;

        if (change.added) {
          return (
            <span
              key={`added-${index}`}
              className={styles.inlineAdded}
            >
              {value}
            </span>
          );
        }

        if (change.removed) {
          return (
            <span
              key={`removed-${index}`}
              className={styles.inlineRemoved}
            >
              {value}
            </span>
          );
        }

        return (
          <span key={`unchanged-${index}`}>
            {value}
          </span>
        );
      })}
    </>
  );
}

function HighlightedText({
  value,
  language,
}) {
  const html = useMemo(
    () => highlightCode(value, language),
    [value, language]
  );

  return (
    <code
      dangerouslySetInnerHTML={{
        __html: html || "&nbsp;",
      }}
    />
  );
}

function CodeEditor({
  value,
  onChange,
  title,
  language,
  onLanguageDetected,
}) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] =
    useState(false);

  const lineNumbers = useMemo(
    () => buildLineNumbers(value),
    [value]
  );

  const highlightedHtml = useMemo(
    () => highlightCode(value, language),
    [value, language]
  );

  const handlePaste = async () => {
    try {
      const text =
        await navigator.clipboard.readText();

      onChange(text);
    } catch {
      textareaRef.current?.focus();
    }
  };

  const handleFile = async (file) => {
    if (!file) {
      return;
    }

    try {
      const text = await file.text();

      onChange(text);

      const detectedLanguage =
        getLanguageFromFile(file.name);

      if (detectedLanguage !== "plaintext") {
        onLanguageDetected?.(
          detectedLanguage
        );
      }
    } catch {
      // The parent comparison will handle
      // invalid/unsupported content.
    }
  };

  const handleFileChange = async (event) => {
    const file =
      event.target.files?.[0];

    await handleFile(file);

    event.target.value = "";
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    const file =
      event.dataTransfer.files?.[0];

    await handleFile(file);
  };

  return (
    <div className={styles.editorPanel}>
      <div className={styles.editorHeader}>
        <div className={styles.editorTitle}>
          {title}
        </div>

        <div className={styles.editorActions}>
          <button
            type="button"
            className={styles.editorButton}
            onClick={handlePaste}
          >
            Paste
          </button>

          <button
            type="button"
            className={styles.editorButton}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            Upload File
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className={styles.fileInput}
            accept=".txt,.text,.js,.jsx,.mjs,.cjs,.ts,.tsx,.json,.html,.htm,.xml,.css,.py,.java,.sql,.yaml,.yml,.md,.markdown,.diff,.patch"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div
        className={`${styles.editorShell} ${
          dragActive
            ? styles.dropActive
            : ""
        }`}
        onDragEnter={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (
            event.currentTarget ===
            event.target
          ) {
            setDragActive(false);
          }
        }}
        onDrop={handleDrop}
      >
        <div className={styles.editorGutter}>
          {lineNumbers.map((number) => (
            <div
              key={number}
              className={styles.gutterLine}
            >
              {number}
            </div>
          ))}
        </div>

        <div className={styles.editorViewport}>
          <pre
            className={styles.editorHighlight}
            aria-hidden="true"
          >
            <code
              dangerouslySetInnerHTML={{
                __html:
                  highlightedHtml ||
                  "&nbsp;",
              }}
            />
          </pre>

          <textarea
            ref={textareaRef}
            className={styles.editorTextarea}
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label={title}
          />
        </div>
      </div>

      <div className={styles.editorHint}>
        {countLines(value)} lines ·{" "}
        {countCharacters(value)} characters ·
        Drag & drop a supported file here
      </div>
    </div>
  );
}

function UnifiedDiffView({
  rows,
  searchMatches,
  currentSearchIndex,
}) {
  if (!rows?.length) {
    return (
      <div className={styles.emptyState}>
        No differences to display.
      </div>
    );
  }

  return (
    <div className={styles.diffContainer}>
      <div className={styles.unifiedHeader}>
        Unified Diff
      </div>

      <table className={styles.diffTable}>
        <tbody>
          {rows.map((row, index) => {
            const isMatch =
              searchMatches.includes(index);

            const isCurrent =
              searchMatches[
                currentSearchIndex
              ] === index;

            let rowClass =
              styles.rowUnchanged;

            if (row.type === "added") {
              rowClass = styles.rowAdded;
            }

            if (row.type === "removed") {
              rowClass = styles.rowRemoved;
            }

            if (row.type === "changed") {
              rowClass = styles.rowChanged;
            }

            const matchClass =
              isCurrent
                ? styles.searchMatchCurrent
                : isMatch
                  ? styles.searchMatch
                  : "";

            const prefix =
              row.type === "added"
                ? "+"
                : row.type === "removed"
                  ? "-"
                  : " ";

            const lineNumber =
              row.type === "added"
                ? row.newLine
                : row.oldLine;

            return (
              <tr
                key={`${index}-${row.oldLine}-${row.newLine}`}
                className={`${styles.diffRow} ${rowClass}`}
              >
                <td
                  className={styles.lineNumber}
                >
                  {lineNumber ?? ""}
                </td>

                <td
                  className={`${styles.diffContent} ${matchClass}`}
                >
                  <span>{prefix}</span>

                  {row.inline ? (
                    <InlineDiff
                      changes={row.inline}
                    />
                  ) : (
                    row.type === "added"
                      ? row.newText
                      : row.oldText
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SideBySideView({
  rows,
  language,
}) {
  const pairs = [];

  let index = 0;

  while (index < rows.length) {
    const current = rows[index];

    if (
      current.type === "removed" &&
      rows[index + 1]?.type === "added"
    ) {
      const next = rows[index + 1];

      pairs.push({
        type: "changed",
        oldLine: current.oldLine,
        newLine: next.newLine,
        oldText: current.oldText,
        newText: next.newText,
        inline: next.inline || null,
      });

      index += 2;
      continue;
    }

    pairs.push({
      ...current,
      inline: null,
    });

    index += 1;
  }

  return (
    <div className={styles.diffContainer}>
      <div className={styles.sideBySide}>
        <div className={styles.sideColumn}>
          <div className={styles.sideHeader}>
            Original
          </div>

          {pairs.map((row, rowIndex) => {
            const rowClass =
              row.type === "removed"
                ? styles.sideRemoved
                : row.type === "changed"
                  ? styles.sideChanged
                  : row.type === "added"
                    ? styles.sideEmpty
                    : "";

            return (
              <div
                key={`old-${rowIndex}`}
                className={`${styles.sideRow} ${rowClass}`}
              >
                <div
                  className={
                    styles.sideLineNumber
                  }
                >
                  {row.oldLine ?? ""}
                </div>

                <div
                  className={
                    styles.sideContent
                  }
                >
                  {row.oldLine ? (
                    row.inline ? (
                      <InlineDiff
                        changes={row.inline.filter(
                          (change) =>
                            !change.added
                        )}
                      />
                    ) : (
                      <HighlightedText
                        value={
                          row.oldText
                        }
                        language={
                          language
                        }
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.sideColumn}>
          <div className={styles.sideHeader}>
            Modified
          </div>

          {pairs.map((row, rowIndex) => {
            const rowClass =
              row.type === "added"
                ? styles.sideAdded
                : row.type === "changed"
                  ? styles.sideChanged
                  : row.type === "removed"
                    ? styles.sideEmpty
                    : "";

            return (
              <div
                key={`new-${rowIndex}`}
                className={`${styles.sideRow} ${rowClass}`}
              >
                <div
                  className={
                    styles.sideLineNumber
                  }
                >
                  {row.newLine ?? ""}
                </div>

                <div
                  className={
                    styles.sideContent
                  }
                >
                  {row.newLine ? (
                    row.inline ? (
                      <InlineDiff
                        changes={row.inline.filter(
                          (change) =>
                            !change.removed
                        )}
                      />
                    ) : (
                      <HighlightedText
                        value={
                          row.newText
                        }
                        language={
                          language
                        }
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TextDiff({
  tool,
}) {
  const [original, setOriginal] =
    useState(DEFAULT_ORIGINAL);

  const [modified, setModified] =
    useState(DEFAULT_MODIFIED);

  const [diffType, setDiffType] =
    useState("line");

  const [language, setLanguage] =
    useState("auto");

  const [
    ignoreWhitespace,
    setIgnoreWhitespace,
  ] = useState(false);

  const [ignoreCase, setIgnoreCase] =
    useState(false);

  const [
    ignoreBlankLines,
    setIgnoreBlankLines,
  ] = useState(false);

  const [
    ignoreTrailingSpaces,
    setIgnoreTrailingSpaces,
  ] = useState(false);

  const [view, setView] =
    useState("side-by-side");

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState("");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [searchIndex, setSearchIndex] =
    useState(0);

  const searchMatches = useMemo(
    () =>
      findSearchMatches(
        result,
        searchQuery
      ),
    [result, searchQuery]
  );

  useEffect(() => {
    if (
      searchMatches.length === 0
    ) {
      setSearchIndex(0);
      return;
    }

    if (
      searchIndex >=
      searchMatches.length
    ) {
      setSearchIndex(0);
    }
  }, [
    searchMatches,
    searchIndex,
  ]);

  const handleCompare = () => {
    try {
      setError("");

      const comparison =
        compareText(
          original,
          modified,
          {
            diffType,
            ignoreWhitespace,
            ignoreCase,
            ignoreBlankLines,
            ignoreTrailingSpaces,
          }
        );

      setResult(comparison);
      setSearchIndex(0);
    } catch (comparisonError) {
      setResult(null);

      setError(
        comparisonError?.message ||
          "Unable to compare the text."
      );
    }
  };

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setResult(null);
    setError("");
    setSearchQuery("");
    setSearchIndex(0);
  };

  const handleReset = () => {
    setOriginal(DEFAULT_ORIGINAL);
    setModified(DEFAULT_MODIFIED);
    setDiffType("line");
    setLanguage("auto");
    setIgnoreWhitespace(false);
    setIgnoreCase(false);
    setIgnoreBlankLines(false);
    setIgnoreTrailingSpaces(false);
    setView("side-by-side");
    setResult(null);
    setError("");
    setSearchQuery("");
    setSearchIndex(0);
  };

  const handleSwap = () => {
    const currentOriginal =
      original;

    setOriginal(modified);
    setModified(currentOriginal);
    setResult(null);
    setError("");
  };

  const handleCopy = async () => {
    try {
      const diff =
        createUnifiedDiff(
          original,
          modified,
          {
            diffType: "line",
            ignoreWhitespace,
            ignoreCase,
            ignoreBlankLines,
            ignoreTrailingSpaces,
          }
        );

      await copyText(diff);

      setToast("Diff copied.");
    } catch {
      setError(
        "Unable to copy the diff."
      );
    }
  };

  const handleDownload = (
    format = "diff"
  ) => {
    try {
      let content;
      let fileName;
      let mimeType;

      if (format === "txt") {
        content = `${original}\n\n===== MODIFIED =====\n\n${modified}`;
        fileName = "text-comparison.txt";
        mimeType = "text/plain";
      } else if (
        format === "patch"
      ) {
        content = createPatch(
          original,
          modified
        );
        fileName = "text-comparison.patch";
        mimeType = "text/x-patch";
      } else {
        content =
          createUnifiedDiff(
            original,
            modified,
            {
              diffType: "line",
              ignoreWhitespace,
              ignoreCase,
              ignoreBlankLines,
              ignoreTrailingSpaces,
            }
          );

        fileName = "text-comparison.diff";
        mimeType = "text/plain";
      }

      downloadFile(
        content,
        fileName,
        mimeType
      );

      setToast(
        `Downloaded ${fileName}.`
      );
    } catch {
      setError(
        "Unable to download the diff."
      );
    }
  };

  const handleShare = async () => {
    try {
      const shared =
        await shareTool({
          title:
            "Text Diff & Compare | ToolVerse",
          text:
            "Compare text and code with ToolVerse.",
          url:
            window.location.href,
        });

      if (shared) {
        setToast("Share opened.");
      }
    } catch {
      setError(
        "Unable to share this tool."
      );
    }
  };

  const handlePreviousChange = () => {
    if (!searchMatches.length) {
      return;
    }

    setSearchIndex(
      (current) =>
        current === 0
          ? searchMatches.length - 1
          : current - 1
    );
  };

  const handleNextChange = () => {
    if (!searchMatches.length) {
      return;
    }

    setSearchIndex(
      (current) =>
        current ===
        searchMatches.length - 1
          ? 0
          : current + 1
    );
  };

  const handleOriginalChange = (
    value
  ) => {
    setOriginal(value);
    setResult(null);
  };

  const handleModifiedChange = (
    value
  ) => {
    setModified(value);
    setResult(null);
  };

  const handleSearchChange = (
    event
  ) => {
    setSearchQuery(
      event.target.value
    );
    setSearchIndex(0);
  };

  const handleLanguageChange = (
    event
  ) => {
    setLanguage(
      event.target.value
    );
  };

  const stats = result?.stats;

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className={styles.tool}>
        <div className={styles.editorGrid}>
          <CodeEditor
            title="Original"
            value={original}
            onChange={
              handleOriginalChange
            }
            language={language}
            onLanguageDetected={
              setLanguage
            }
          />

          <CodeEditor
            title="Modified"
            value={modified}
            onChange={
              handleModifiedChange
            }
            language={language}
            onLanguageDetected={
              setLanguage
            }
          />
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <span
              className={
                styles.controlLabel
              }
            >
              Diff Type
            </span>

            <select
              className={styles.select}
              value={diffType}
              onChange={(event) =>
                setDiffType(
                  event.target.value
                )
              }
            >
              <option value="line">
                Line
              </option>

              <option value="word">
                Word
              </option>

              <option value="character">
                Character
              </option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <span
              className={
                styles.controlLabel
              }
            >
              Language
            </span>

            <select
              className={styles.select}
              value={language}
              onChange={
                handleLanguageChange
              }
            >
              {LANGUAGE_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label
              className={
                styles.checkboxLabel
              }
            >
              <input
                type="checkbox"
                className={
                  styles.checkbox
                }
                checked={
                  ignoreWhitespace
                }
                onChange={(event) =>
                  setIgnoreWhitespace(
                    event.target
                      .checked
                  )
                }
              />
              Ignore whitespace
            </label>

            <label
              className={
                styles.checkboxLabel
              }
            >
              <input
                type="checkbox"
                className={
                  styles.checkbox
                }
                checked={ignoreCase}
                onChange={(event) =>
                  setIgnoreCase(
                    event.target.checked
                  )
                }
              />
              Ignore case
            </label>

            <label
              className={
                styles.checkboxLabel
              }
            >
              <input
                type="checkbox"
                className={
                  styles.checkbox
                }
                checked={
                  ignoreBlankLines
                }
                onChange={(event) =>
                  setIgnoreBlankLines(
                    event.target
                      .checked
                  )
                }
              />
              Ignore blank lines
            </label>

            <label
              className={
                styles.checkboxLabel
              }
            >
              <input
                type="checkbox"
                className={
                  styles.checkbox
                }
                checked={
                  ignoreTrailingSpaces
                }
                onChange={(event) =>
                  setIgnoreTrailingSpaces(
                    event.target
                      .checked
                  )
                }
              />
              Ignore trailing spaces
            </label>
          </div>

          <button
            type="button"
            className={styles.swapButton}
            onClick={handleSwap}
          >
            Swap
          </button>

          <button
            type="button"
            className={
              styles.compareButton
            }
            onClick={handleCompare}
          >
            Compare
          </button>
        </div>

        {error && (
          <div className="mt-4">
            <ToolError
              message={error}
            />
          </div>
        )}

        {result && stats && (
          <>
            <div className={styles.statsGrid}>
              <div
                className={
                  styles.statCard
                }
              >
                <div
                  className={
                    styles.statLabel
                  }
                >
                  Added
                </div>

                <div
                  className={
                    styles.statValue
                  }
                >
                  {stats.added}
                </div>
              </div>

              <div
                className={
                  styles.statCard
                }
              >
                <div
                  className={
                    styles.statLabel
                  }
                >
                  Removed
                </div>

                <div
                  className={
                    styles.statValue
                  }
                >
                  {stats.removed}
                </div>
              </div>

              <div
                className={
                  styles.statCard
                }
              >
                <div
                  className={
                    styles.statLabel
                  }
                >
                  Changed
                </div>

                <div
                  className={
                    styles.statValue
                  }
                >
                  {stats.changed}
                </div>
              </div>

              <div
                className={
                  styles.statCard
                }
              >
                <div
                  className={
                    styles.statLabel
                  }
                >
                  Original Lines
                </div>

                <div
                  className={
                    styles.statValue
                  }
                >
                  {
                    result.originalLineCount
                  }
                </div>
              </div>

              <div
                className={
                  styles.statCard
                }
              >
                <div
                  className={
                    styles.statLabel
                  }
                >
                  Modified Lines
                </div>

                <div
                  className={
                    styles.statValue
                  }
                >
                  {
                    result.modifiedLineCount
                  }
                </div>
              </div>
            </div>

            <div
              className={
                styles.resultSection
              }
            >
              <div
                className={
                  styles.resultHeader
                }
              >
                <div
                  className={
                    styles.resultTitle
                  }
                >
                  Comparison Result
                </div>

                <div
                  className={
                    styles.viewToggle
                  }
                >
                  <button
                    type="button"
                    className={`${styles.viewButton} ${
                      view ===
                      "side-by-side"
                        ? styles.viewButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      setView(
                        "side-by-side"
                      )
                    }
                  >
                    Side-by-side
                  </button>

                  <button
                    type="button"
                    className={`${styles.viewButton} ${
                      view === "unified"
                        ? styles.viewButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      setView(
                        "unified"
                      )
                    }
                  >
                    Unified
                  </button>
                </div>
              </div>

              <div
                className={
                  styles.searchBar
                }
              >
                <input
                  type="search"
                  className={
                    styles.searchInput
                  }
                  placeholder="Search in diff..."
                  value={searchQuery}
                  onChange={
                    handleSearchChange
                  }
                />

                <div
                  className={
                    styles.searchCount
                  }
                >
                  {searchQuery
                    ? `${searchMatches.length ? searchIndex + 1 : 0} of ${searchMatches.length}`
                    : "Search"}
                </div>

                <button
                  type="button"
                  className={
                    styles.searchButton
                  }
                  onClick={
                    handlePreviousChange
                  }
                  disabled={
                    !searchMatches.length
                  }
                >
                  Previous
                </button>

                <button
                  type="button"
                  className={
                    styles.searchButton
                  }
                  onClick={
                    handleNextChange
                  }
                  disabled={
                    !searchMatches.length
                  }
                >
                  Next
                </button>
              </div>

              {view ===
              "unified" ? (
                <UnifiedDiffView
                  rows={result.rows}
                  searchMatches={
                    searchMatches
                  }
                  currentSearchIndex={
                    searchIndex
                  }
                />
              ) : (
                <SideBySideView
                  rows={
                    result.inlineRows
                  }
                  language={language}
                />
              )}

              <div
                className={
                  styles.downloadSection
                }
              >
                <button
                  type="button"
                  className={
                    styles.downloadButton
                  }
                  onClick={() =>
                    handleDownload(
                      "txt"
                    )
                  }
                >
                  Download TXT
                </button>

                <button
                  type="button"
                  className={
                    styles.downloadButton
                  }
                  onClick={() =>
                    handleDownload(
                      "diff"
                    )
                  }
                >
                  Download DIFF
                </button>

                <button
                  type="button"
                  className={
                    styles.downloadButton
                  }
                  onClick={() =>
                    handleDownload(
                      "patch"
                    )
                  }
                >
                  Download PATCH
                </button>
              </div>
            </div>
          </>
        )}

        {!result && !error && (
          <div className="mt-6">
            <ToolEmptyState
              title="Compare your text"
              description="Enter or upload the original and modified content, then click Compare to see the differences."
            />
          </div>
        )}

        <div className="mt-6">
          <ToolActions
            supports={tool?.supports}
            onCopy={handleCopy}
            onDownload={() =>
              handleDownload("diff")
            }
            onShare={handleShare}
            onReset={handleReset}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={styles.editorButton}
            onClick={handleClear}
          >
            Clear
          </button>

          <button
            type="button"
            className={styles.editorButton}
            onClick={() => {
              setOriginal(
                DEFAULT_ORIGINAL
              );
              setModified(
                DEFAULT_MODIFIED
              );
              setResult(null);
              setError("");
            }}
          >
            Example
          </button>
        </div>

        {toast && (
          <ToolToast
            message={toast}
            onClose={() =>
              setToast("")
            }
          />
        )}
      </div>
    </ToolLayout>
  );
}