"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";
import {
  handleShare as shareTool,
} from "@/lib/toolActions";

import config, {
  DEFAULT_MARKDOWN,
} from "./config";

import faq from "./faq";

import {
  createCopyHtml,
  createCopyMarkdown,
  createHtmlDocument,
  escapeMarkdown,
  formatMarkdown,
  getMarkdownStats,
  markdownToHtml,
} from "./logic";

/* =========================================================
   EDITOR TOOLBAR
========================================================= */

function ToolbarButton({
  children,
  onClick,
  title,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      {children}
    </button>
  );
}

/* =========================================================
   STATS
========================================================= */

function Stat({
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </div>

      <div className="mt-1 text-sm font-semibold">
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function MarkdownFormatter({
  tool = config,
}) {
  const [
    markdown,
    setMarkdown,
  ] = useState(
    DEFAULT_MARKDOWN
  );

  const [
    mode,
    setMode,
  ] = useState("split");

  const [
    toast,
    setToast,
  ] = useState("");

  const [
    formatted,
    setFormatted,
  ] = useState(false);

  const html =
    useMemo(
      () =>
        markdownToHtml(
          markdown
        ),
      [markdown]
    );

  const stats =
    useMemo(
      () =>
        getMarkdownStats(
          markdown
        ),
      [markdown]
    );

  /* =======================================================
     TOAST
  ======================================================= */

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer =
      setTimeout(() => {
        setToast("");
      }, 2200);

    return () =>
      clearTimeout(
        timer
      );
  }, [toast]);

  /* =======================================================
     COPY
  ======================================================= */

  const handleCopyMarkdown =
    async () => {
      try {
        await copyText(
          createCopyMarkdown(
            markdown
          )
        );

        setToast(
          "Markdown copied."
        );
      } catch {
        setToast(
          "Unable to copy Markdown."
        );
      }
    };

  const handleCopyHtml =
    async () => {
      try {
        await copyText(
          createCopyHtml(
            markdown
          )
        );

        setToast(
          "HTML copied."
        );
      } catch {
        setToast(
          "Unable to copy HTML."
        );
      }
    };

  /* =======================================================
     FORMAT
  ======================================================= */

  const handleFormat =
    () => {
      const result =
        formatMarkdown(
          markdown
        );

      setMarkdown(
        result
      );

      setFormatted(
        true
      );

      setToast(
        "Markdown formatted."
      );
    };

  /* =======================================================
     ESCAPE
  ======================================================= */

  const handleEscape =
    () => {
      setMarkdown(
        escapeMarkdown(
          markdown
        )
      );

      setToast(
        "Markdown characters escaped."
      );
    };

  /* =======================================================
     DOWNLOAD MARKDOWN
  ======================================================= */

  const handleDownloadMarkdown =
    () => {
      const content =
        formatMarkdown(
          markdown
        );

      downloadFile(
        content,
        "formatted.md",
        "text/markdown"
      );

      setToast(
        "Markdown file downloaded."
      );
    };

  /* =======================================================
     DOWNLOAD HTML
  ======================================================= */

  const handleDownloadHtml =
    () => {
      const content =
        createHtmlDocument(
          markdown
        );

      downloadFile(
        content,
        "markdown-preview.html",
        "text/html"
      );

      setToast(
        "HTML file downloaded."
      );
    };

  /* =======================================================
     SHARE
  ======================================================= */

  const handleShare =
    async () => {
      try {
        const encoded =
          btoa(
            unescape(
              encodeURIComponent(
                markdown
              )
            )
          );

        const url =
          `${window.location.origin}${window.location.pathname}?content=${encodeURIComponent(
            encoded
          )}`;

        await shareTool({
          title:
            "ToolVerse Markdown Formatter",

          text:
            "Markdown document created with ToolVerse.",

          url,
        });

        setToast(
          "Share link created."
        );
      } catch {
        setToast(
          "Unable to share Markdown."
        );
      }
    };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset =
    () => {
      setMarkdown(
        DEFAULT_MARKDOWN
      );

      setFormatted(
        false
      );

      setToast(
        "Markdown reset."
      );
    };

  /* =======================================================
     TOOLBAR INSERT
  ======================================================= */

  const insertText = (
    before,
    after = "",
    placeholder = "text"
  ) => {
    const textarea =
      document.querySelector(
        "#markdown-editor"
      );

    if (!textarea) {
      return;
    }

    const start =
      textarea.selectionStart;

    const end =
      textarea.selectionEnd;

    const selected =
      markdown.slice(
        start,
        end
      );

    const content =
      selected ||
      placeholder;

    const replacement =
      `${before}${content}${after}`;

    const next =
      markdown.slice(
        0,
        start
      ) +
      replacement +
      markdown.slice(
        end
      );

    setMarkdown(
      next
    );

    requestAnimationFrame(
      () => {
        textarea.focus();

        const cursor =
          start +
          replacement.length;

        textarea.setSelectionRange(
          cursor,
          cursor
        );
      }
    );
  };

  /* =======================================================
     HEADING
  ======================================================= */

  const insertHeading =
    () => {
      const textarea =
        document.querySelector(
          "#markdown-editor"
        );

      if (!textarea) {
        return;
      }

      const start =
        textarea.selectionStart;

      const lineStart =
        markdown.lastIndexOf(
          "\n",
          start - 1
        ) + 1;

      const next =
        markdown.slice(
          0,
          lineStart
        ) +
        "# " +
        markdown.slice(
          lineStart
        );

      setMarkdown(
        next
      );

      requestAnimationFrame(
        () => {
          textarea.focus();

          textarea.setSelectionRange(
            start + 2,
            start + 2
          );
        }
      );
    };

  /* =======================================================
     URL SHARE STATE
  ======================================================= */

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const content =
      params.get(
        "content"
      );

    if (!content) {
      return;
    }

    try {
      const decoded =
        decodeURIComponent(
          atob(content)
        );

      if (decoded) {
        setMarkdown(
          decoded
        );
      }
    } catch {
      // Ignore invalid shared content.
    }
  }, []);

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">

        {/* =================================================
            TOP ACTION BAR
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">

          <div className="flex flex-wrap items-center gap-2">

            <ToolbarButton
              onClick={
                handleFormat
              }
              title="Format Markdown"
            >
              Format
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                insertHeading()
              }
              title="Insert heading"
            >
              H1
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                insertText(
                  "**",
                  "**",
                  "bold"
                )
              }
              title="Bold"
            >
              Bold
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                insertText(
                  "*",
                  "*",
                  "italic"
                )
              }
              title="Italic"
            >
              Italic
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                insertText(
                  "`",
                  "`",
                  "code"
                )
              }
              title="Inline code"
            >
              Code
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                insertText(
                  "[",
                  "](https://example.com)",
                  "link"
                )
              }
              title="Link"
            >
              Link
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                insertText(
                  "> ",
                  "",
                  "quote"
                )
              }
              title="Blockquote"
            >
              Quote
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                insertText(
                  "- ",
                  "",
                  "list item"
                )
              }
              title="List item"
            >
              List
            </ToolbarButton>

            <ToolbarButton
              onClick={
                handleEscape
              }
              title="Escape Markdown characters"
            >
              Escape
            </ToolbarButton>

            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setMode(
                    "editor"
                  )
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                  mode ===
                  "editor"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "border border-gray-300 dark:border-gray-600"
                }`}
              >
                Editor
              </button>

              <button
                type="button"
                onClick={() =>
                  setMode(
                    "preview"
                  )
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                  mode ===
                  "preview"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "border border-gray-300 dark:border-gray-600"
                }`}
              >
                Preview
              </button>

              <button
                type="button"
                onClick={() =>
                  setMode(
                    "split"
                  )
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                  mode ===
                  "split"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "border border-gray-300 dark:border-gray-600"
                }`}
              >
                Split
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            EDITOR / PREVIEW
        ================================================= */}

        <section
          className={`grid gap-4 ${
            mode === "split"
              ? "lg:grid-cols-2"
              : "grid-cols-1"
          }`}
        >

          {/* =================================================
              EDITOR
          ================================================= */}

          {(mode ===
            "editor" ||
            mode ===
              "split") && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">

                <div>
                  <h2 className="font-semibold">
                    Markdown
                  </h2>

                  <p className="text-xs text-gray-500">
                    Write or paste Markdown
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    handleCopyMarkdown
                  }
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>

              <textarea
                id="markdown-editor"
                value={
                  markdown
                }
                onChange={(
                  event
                ) =>
                  setMarkdown(
                    event.target
                      .value
                  )
                }
                spellCheck={false}
                className="min-h-[650px] w-full resize-y border-0 bg-gray-50 p-5 font-mono text-sm leading-6 text-gray-900 outline-none dark:bg-gray-950 dark:text-gray-100"
                placeholder="Write Markdown here..."
              />
            </div>
          )}

          {/* =================================================
              PREVIEW
          ================================================= */}

          {(mode ===
            "preview" ||
            mode ===
              "split") && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">

                <div>
                  <h2 className="font-semibold">
                    Preview
                  </h2>

                  <p className="text-xs text-gray-500">
                    Live Markdown rendering
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    handleCopyHtml
                  }
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                >
                  Copy HTML
                </button>
              </div>

              <article className="markdown-preview min-h-[650px] overflow-auto p-6">

                <div
                  className="
                    max-w-none

                    [&_h1]:mb-5
                    [&_h1]:mt-0
                    [&_h1]:text-3xl
                    [&_h1]:font-bold

                    [&_h2]:mb-4
                    [&_h2]:mt-8
                    [&_h2]:text-2xl
                    [&_h2]:font-bold

                    [&_h3]:mb-3
                    [&_h3]:mt-6
                    [&_h3]:text-xl
                    [&_h3]:font-semibold

                    [&_h4]:mt-5
                    [&_h4]:text-lg
                    [&_h4]:font-semibold

                    [&_p]:my-4
                    [&_p]:leading-7

                    [&_a]:font-medium
                    [&_a]:text-blue-600
                    [&_a]:underline
                    [&_a]:underline-offset-2

                    [&_blockquote]:my-5
                    [&_blockquote]:border-l-4
                    [&_blockquote]:border-gray-300
                    [&_blockquote]:bg-gray-50
                    [&_blockquote]:px-4
                    [&_blockquote]:py-2
                    [&_blockquote]:text-gray-600
                    dark:[&_blockquote]:border-gray-600
                    dark:[&_blockquote]:bg-gray-800
                    dark:[&_blockquote]:text-gray-300

                    [&_ul]:my-4
                    [&_ul]:list-disc
                    [&_ul]:pl-6

                    [&_ol]:my-4
                    [&_ol]:list-decimal
                    [&_ol]:pl-6

                    [&_li]:my-1

                    [&_code]:rounded
                    [&_code]:bg-gray-100
                    [&_code]:px-1.5
                    [&_code]:py-0.5
                    [&_code]:font-mono
                    [&_code]:text-sm
                    dark:[&_code]:bg-gray-800

                    [&_pre]:my-5
                    [&_pre]:overflow-x-auto
                    [&_pre]:rounded-xl
                    [&_pre]:bg-gray-950
                    [&_pre]:p-4
                    [&_pre]:text-gray-100

                    [&_pre_code]:bg-transparent
                    [&_pre_code]:p-0
                    [&_pre_code]:text-sm
                    [&_pre_code]:text-gray-100

                    [&_table]:my-5
                    [&_table]:w-full
                    [&_table]:border-collapse

                    [&_th]:border
                    [&_th]:border-gray-300
                    [&_th]:bg-gray-100
                    [&_th]:px-3
                    [&_th]:py-2
                    [&_th]:text-left
                    [&_th]:font-semibold
                    dark:[&_th]:border-gray-600
                    dark:[&_th]:bg-gray-800

                    [&_td]:border
                    [&_td]:border-gray-300
                    [&_td]:px-3
                    [&_td]:py-2
                    dark:[&_td]:border-gray-600

                    [&_hr]:my-8
                    [&_hr]:border-gray-300
                    dark:[&_hr]:border-gray-700

                    [&_img]:my-4
                    [&_img]:max-w-full
                    [&_img]:rounded-xl

                    [&_.markdown-table-wrapper]:my-5
                    [&_.markdown-table-wrapper]:overflow-x-auto

                    [&_.markdown-task]:flex
                    [&_.markdown-task]:items-center
                    [&_.markdown-task]:gap-2
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                      html,
                  }}
                />

              </article>
            </div>
          )}
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50">

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Markdown Statistics
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">

            <Stat
              label="Words"
              value={
                stats.words
              }
            />

            <Stat
              label="Characters"
              value={
                stats.characters
              }
            />

            <Stat
              label="No Spaces"
              value={
                stats.charactersNoSpaces
              }
            />

            <Stat
              label="Lines"
              value={
                stats.lines
              }
            />

            <Stat
              label="Headings"
              value={
                stats.headings
              }
            />

            <Stat
              label="Links"
              value={
                stats.links
              }
            />

            <Stat
              label="Code Blocks"
              value={
                stats.codeBlocks
              }
            />

            <Stat
              label="List Items"
              value={
                stats.listItems
              }
            />

          </div>
        </section>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <ToolActions
          supports={
            tool?.supports
          }
          onCopy={
            handleCopyMarkdown
          }
          onDownload={
            handleDownloadMarkdown
          }
          onShare={
            handleShare
          }
          onReset={
            handleReset
          }
        />

        {/* =================================================
            DOWNLOAD OPTIONS
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">

          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Export Markdown
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Download the formatted Markdown or rendered HTML.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                handleDownloadMarkdown
              }
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Download .md
            </button>

            <button
              type="button"
              onClick={
                handleDownloadHtml
              }
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Download HTML
            </button>

            <button
              type="button"
              onClick={
                handleCopyHtml
              }
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Copy HTML
            </button>

          </div>
        </section>

        {/* =================================================
            FORMAT STATUS
        ================================================= */}

        {formatted && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-300">
            Markdown has been formatted and normalized.
          </div>
        )}

        {/* =================================================
            TOAST
        ================================================= */}

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-gray-900">
            {toast}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}