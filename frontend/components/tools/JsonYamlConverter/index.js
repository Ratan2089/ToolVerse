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
  DEFAULT_JSON,
} from "./config";

import {
  convertJsonYaml,
  getDownloadInfo,
  validateJson,
  validateYaml,
} from "./logic";

import faq from "./faq";

export default function JsonYamlConverter({
  tool,
}) {
  const [direction, setDirection] =
    useState("json-to-yaml");

  const [input, setInput] =
    useState(DEFAULT_JSON);

  const [output, setOutput] =
    useState("");

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState(null);

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
     CONVERT
     ===================================================== */

  const handleConvert = () => {
    setError("");

    try {
      const result =
        convertJsonYaml(
          input,
          direction
        );

      setOutput(result);

      showToast(
        direction === "json-to-yaml"
          ? "JSON converted to YAML."
          : "YAML converted to JSON."
      );
    } catch (error) {
      setOutput("");

      setError(
        error?.message ||
          "Unable to convert input."
      );
    }
  };

  /* =====================================================
     VALIDATE
     ===================================================== */

  const handleValidate = () => {
    const result =
      direction === "json-to-yaml"
        ? validateJson(input)
        : validateYaml(input);

    if (!result.valid) {
      setError(result.error);
      setOutput("");

      return;
    }

    setError("");

    showToast(
      direction === "json-to-yaml"
        ? "Valid JSON."
        : "Valid YAML."
    );
  };

  /* =====================================================
     SWITCH DIRECTION
     ===================================================== */

  const handleDirectionChange = (
    newDirection
  ) => {
    setDirection(newDirection);
    setOutput("");
    setError("");

    if (
      newDirection ===
      "json-to-yaml"
    ) {
      setInput(DEFAULT_JSON);
    } else {
      setInput(`name: ToolVerse
version: 1.0.0
description: Developer toolbox
features:
  - JSON Formatter
  - YAML Formatter
  - XML Formatter
settings:
  theme: dark
  enabled: true
`);
    }
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
        "Result copied to clipboard."
      );
    } else {
      showToast(
        "Unable to copy result.",
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

    const {
      filename,
      mimeType,
    } = getDownloadInfo(
      direction
    );

    downloadFile(
      output,
      filename,
      mimeType
    );

    showToast(
      "Converted file downloaded."
    );
  };

  /* =====================================================
     SHARE
     ===================================================== */

  const handleShare = async () => {
    try {
      const shared =
        await shareTool({
          title:
            "JSON ↔ YAML Converter | ToolVerse",
          text:
            "Convert JSON to YAML or YAML to JSON online with ToolVerse.",
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
      "JSON ↔ YAML converter reset."
    );
  };

  /* =====================================================
     EXAMPLE
     ===================================================== */

  const handleExample = () => {
    if (
      direction ===
      "json-to-yaml"
    ) {
      setInput(DEFAULT_JSON);
    } else {
      setInput(`name: ToolVerse
version: 1.0.0
description: Developer toolbox
features:
  - JSON Formatter
  - YAML Formatter
  - XML Formatter
settings:
  theme: dark
  enabled: true
`);
    }

    setOutput("");
    setError("");

    showToast(
      "Example loaded."
    );
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">

        {/* =================================================
            DIRECTION
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Conversion Type
            </h2>

            <p className="text-sm text-slate-500">
              Choose the format you want to convert.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() =>
                handleDirectionChange(
                  "json-to-yaml"
                )
              }
              className={`rounded-xl border p-4 text-left transition ${
                direction ===
                "json-to-yaml"
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                  : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              <p className="font-semibold">
                JSON → YAML
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Convert JSON data into formatted YAML.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                handleDirectionChange(
                  "yaml-to-json"
                )
              }
              className={`rounded-xl border p-4 text-left transition ${
                direction ===
                "yaml-to-json"
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                  : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              <p className="font-semibold">
                YAML → JSON
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Convert YAML data into formatted JSON.
              </p>
            </button>

          </div>

        </section>

        {/* =================================================
            INPUT / OUTPUT
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Input */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

              <div>
                <h2 className="text-lg font-semibold">
                  {direction ===
                  "json-to-yaml"
                    ? "JSON Input"
                    : "YAML Input"}
                </h2>

                <p className="text-sm text-slate-500">
                  Paste or type your input below.
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={handleExample}
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
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              aria-label={
                direction ===
                "json-to-yaml"
                  ? "JSON input"
                  : "YAML input"
              }
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
                  Converted data appears here.
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
                aria-label="Converted output"
              />
            ) : (
              <ToolEmptyState
                title="No output yet"
                description="Enter valid JSON or YAML and click Convert."
              />
            )}

          </section>

        </div>

        {/* Error */}
        <ToolError
          message={error}
        />

        {/* =================================================
            MAIN ACTIONS
        ================================================= */}

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={handleConvert}
            className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Convert
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

        {/* Shared Actions */}
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