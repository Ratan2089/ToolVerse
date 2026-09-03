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
  formatJson,
  minifyJson,
  validateJson,
} from "./logic";

import faq from "./faq";

export default function JsonFormatter({ tool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleFormat = () => {
    setError("");

    try {
      const result = formatJson(input);

      setOutput(result);

      showToast("JSON formatted successfully.");
    } catch (error) {
      setOutput("");
      setError(error.message);
    }
  };

  const handleMinify = () => {
    setError("");

    try {
      const result = minifyJson(input);

      setOutput(result);

      showToast("JSON minified successfully.");
    } catch (error) {
      setOutput("");
      setError(error.message);
    }
  };

  const handleValidate = () => {
    const result = validateJson(input);

    if (!result.valid) {
      setError(result.error);
      setOutput("");

      return;
    }

    setError("");

    showToast("Valid JSON.");
  };

  const handleCopy = async () => {
    if (!output) {
      showToast("There is no output to copy.", "error");
      return;
    }

    const copied = await copyText(output);

    if (copied) {
      showToast("JSON copied to clipboard.");
    } else {
      showToast("Unable to copy JSON.", "error");
    }
  };

  const handleDownload = () => {
    if (!output) {
      showToast("There is no output to download.", "error");
      return;
    }

    downloadFile(
      output,
      "formatted.json",
      "application/json"
    );

    showToast("JSON downloaded.");
  };

  const handleShare = async () => {
    try {
      const shared = await handleShare({
        title: "JSON Formatter | ToolVerse",
        text: "Format and validate JSON with ToolVerse.",
        url: window.location.href,
      });

      if (!shared) {
        showToast(
          "Sharing is not supported on this browser.",
          "error"
        );
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        showToast("Unable to share this tool.", "error");
      }
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");

    showToast("JSON formatter reset.");
  };

  return (
    <ToolLayout tool={tool} faq={faq}>
      <div className="space-y-6">
        {/* Input / Output */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  JSON Input
                </h2>

                <p className="text-sm text-slate-500">
                  Paste or type your JSON below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInput("")}
                disabled={!input}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Clear
              </button>
            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              placeholder={`{
  "name": "ToolVerse",
  "type": "developer-tool"
}`}
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              aria-label="JSON input"
            />
          </section>

          {/* Output */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Output
                </h2>

                <p className="text-sm text-slate-500">
                  Your processed JSON appears here.
                </p>
              </div>

              {output && (
                <button
                  type="button"
                  onClick={() => setOutput("")}
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
                aria-label="JSON output"
              />
            ) : (
              <ToolEmptyState
                title="No output yet"
                description="Enter JSON and choose Format, Minify, or Validate."
              />
            )}
          </section>
        </div>

        {/* Error */}
        <ToolError message={error} />

        {/* Main Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleFormat}
            className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Format JSON
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
            supports={tool?.supports}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onShare={handleShare}
            onReset={handleReset}
          />
        )}

        <ToolToast toast={toast} />
      </div>
    </ToolLayout>
  );
}