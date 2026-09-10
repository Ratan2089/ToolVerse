"use client";

import { useState } from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolError from "@/components/tools/shared/ToolError";
import ToolEmptyState from "@/components/tools/shared/ToolEmptyState";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";
import { handleShare as shareTool } from "@/lib/toolActions";

import {
  DEFAULT_YAML,
} from "./config";

import {
  formatYaml,
  minifyYaml,
  validateYaml,
} from "./logic";

import faq from "./faq";

export default function YamlFormatter({ tool }) {
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

  const handleFormat = () => {
    setError("");

    try {
      const result = formatYaml(input);

      setOutput(result);

      showToast(
        "YAML formatted successfully."
      );
    } catch (error) {
      setOutput("");
      setError(
        error?.message ||
          "Unable to format YAML."
      );
    }
  };

  const handleMinify = () => {
    setError("");

    try {
      const result = minifyYaml(input);

      setOutput(result);

      showToast(
        "YAML minified successfully."
      );
    } catch (error) {
      setOutput("");
      setError(
        error?.message ||
          "Unable to minify YAML."
      );
    }
  };

  const handleValidate = () => {
    const result =
      validateYaml(input);

    if (!result.valid) {
      setError(result.error);
      setOutput("");

      return;
    }

    setError("");

    showToast("Valid YAML.");
  };

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
        "YAML copied to clipboard."
      );
    } else {
      showToast(
        "Unable to copy YAML.",
        "error"
      );
    }
  };

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
      "formatted.yaml",
      "application/yaml"
    );

    showToast("YAML downloaded.");
  };

  const handleShare = async () => {
    try {
      const shared =
        await shareTool({
          title:
            "YAML Formatter & Validator | ToolVerse",
          text:
            "Format, validate, and minify YAML online with ToolVerse.",
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

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");

    showToast(
      "YAML formatter reset."
    );
  };

  const handleLoadExample = () => {
    setInput(DEFAULT_YAML);
    setOutput("");
    setError("");

    showToast(
      "Example YAML loaded."
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

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  YAML Input
                </h2>

                <p className="text-sm text-slate-500">
                  Paste or type your YAML below.
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={handleLoadExample}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Example
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    setError("");
                  }}
                  disabled={!input}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Clear
                </button>

              </div>
            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(
                  event.target.value
                );
                setError("");
              }}
              placeholder={`name: ToolVerse
version: 1.0.0
features:
  - JSON Formatter
  - YAML Formatter`}
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              aria-label="YAML input"
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
                  Your formatted YAML appears here.
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
                aria-label="YAML output"
              />
            ) : (
              <ToolEmptyState
                title="No output yet"
                description="Enter YAML and choose Format, Minify, or Validate."
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
            Format YAML
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

        {/* Tool Actions */}
        <ToolActions
          supports={{
            copy: Boolean(output),
            download: Boolean(output),
            share: true,
            reset: true,
          }}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onShare={handleShare}
          onReset={handleReset}
        />

        <ToolToast
          toast={toast}
        />

      </div>
    </ToolLayout>
  );
}