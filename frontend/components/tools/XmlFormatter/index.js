"use client";

import { useState } from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolError from "@/components/tools/shared/ToolError";
import ToolEmptyState from "@/components/tools/shared/ToolEmptyState";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";
import { handleShare } from "@/lib/toolActions";

import {
  DEFAULT_XML,
} from "./config";

import {
  formatXml,
  minifyXml,
  validateXml,
} from "./logic";

import faq from "./faq";

export default function XmlFormatter({ tool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  /* =====================================================
     FORMAT
     ===================================================== */

  const handleFormat = () => {
    setError("");

    try {
      const result = formatXml(input);

      setOutput(result);

      showToast(
        "XML formatted successfully."
      );
    } catch (error) {
      setOutput("");
      setError(
        error?.message ||
          "Unable to format XML."
      );
    }
  };

  /* =====================================================
     MINIFY
     ===================================================== */

  const handleMinify = () => {
    setError("");

    try {
      const result = minifyXml(input);

      setOutput(result);

      showToast(
        "XML minified successfully."
      );
    } catch (error) {
      setOutput("");
      setError(
        error?.message ||
          "Unable to minify XML."
      );
    }
  };

  /* =====================================================
     VALIDATE
     ===================================================== */

  const handleValidate = () => {
    const result =
      validateXml(input);

    if (!result.valid) {
      setError(result.error);
      setOutput("");

      return;
    }

    setError("");

    showToast("Valid XML.");
  };

  /* =====================================================
     COPY
     ===================================================== */

  const handleCopy = async () => {
    if (!output) {
      showToast(
        "There is no output to copy.",
        "error"
      );

      return;
    }

    const copied =
      await copyText(output);

    if (copied) {
      showToast(
        "XML copied to clipboard."
      );
    } else {
      showToast(
        "Unable to copy XML.",
        "error"
      );
    }
  };

  /* =====================================================
     DOWNLOAD
     ===================================================== */

  const handleDownload = () => {
    if (!output) {
      showToast(
        "There is no output to download.",
        "error"
      );

      return;
    }

    downloadFile(
      output,
      "formatted.xml",
      "application/xml"
    );

    showToast(
      "XML downloaded."
    );
  };

  /* =====================================================
     SHARE
     ===================================================== */

  const handleShare = async () => {
    try {
      const shared =
        await handleShare({
          title:
            "XML Formatter & Validator | ToolVerse",
          text:
            "Format, validate, and minify XML online with ToolVerse.",
          url:
            window.location.href,
        });

      if (!shared) {
        showToast(
          "Sharing is not supported on this browser.",
          "error"
        );
      }
    } catch (error) {
      if (
        error?.name !==
        "AbortError"
      ) {
        showToast(
          "Unable to share this tool.",
          "error"
        );
      }
    }
  };

  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");

    showToast(
      "XML formatter reset."
    );
  };

  /* =====================================================
     LOAD EXAMPLE
     ===================================================== */

  const handleLoadExample = () => {
    setInput(DEFAULT_XML);
    setOutput("");
    setError("");

    showToast(
      "Example XML loaded."
    );
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">

        {/* Input / Output */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Input */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-4 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  XML Input
                </h2>

                <p className="text-sm text-slate-500">
                  Paste or type your XML below.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  handleLoadExample
                }
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Example
              </button>

            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(
                  event.target.value
                );

                setError("");
              }}
              placeholder={`<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="1">
    <name>John Doe</name>
  </user>
</users>`}
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              aria-label="XML input"
            />

          </section>

          {/* Output */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-4 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  XML Output
                </h2>

                <p className="text-sm text-slate-500">
                  Your formatted or minified XML appears here.
                </p>
              </div>

              {output && (
                <button
                  type="button"
                  onClick={() =>
                    setOutput("")
                  }
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Clear
                </button>
              )}

            </div>

            {output ? (
              <textarea
                value={output}
                readOnly
                spellCheck={false}
                className="min-h-[420px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none dark:border-slate-700 dark:bg-slate-950"
                aria-label="XML output"
              />
            ) : (
              <ToolEmptyState
                title="No output yet"
                description="Enter XML and choose Format, Minify, or Validate."
              />
            )}

          </section>

        </div>

        {/* Error */}
        <ToolError
          message={error}
        />

        {/* Main Actions */}
        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={handleFormat}
            className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Format XML
          </button>

          <button
            type="button"
            onClick={handleMinify}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Minify
          </button>

          <button
            type="button"
            onClick={handleValidate}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Validate
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Reset
          </button>

        </div>

        {/* Output Actions */}
        {output && (
          <ToolActions
            supports={
              tool?.supports
            }
            onCopy={
              handleCopy
            }
            onDownload={
              handleDownload
            }
            onShare={
              handleShare
            }
            onReset={
              handleReset
            }
          />
        )}

        <ToolToast
          toast={toast}
        />

      </div>
    </ToolLayout>
  );
}