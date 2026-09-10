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
  DEFAULT_JSON_A,
  DEFAULT_JSON_B,
} from "./config";

import {
  getDiffSummary,
  jsonDiff,
  validateJsonInputs,
} from "./logic";

import faq from "./faq";

export default function JsonDiff({ tool }) {
  const [jsonA, setJsonA] =
    useState(DEFAULT_JSON_A);

  const [jsonB, setJsonB] =
    useState(DEFAULT_JSON_B);

  const [output, setOutput] =
    useState("");

  const [summary, setSummary] =
    useState(null);

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState("");

  const [validationStatus, setValidationStatus] =
    useState(null);

  const handleCompare = () => {
    try {
      setError("");
      setValidationStatus(null);

      const result = jsonDiff(
        jsonA,
        jsonB
      );

      const diffSummary =
        getDiffSummary(
          jsonA,
          jsonB
        );

      setOutput(result);
      setSummary(diffSummary);
    } catch (err) {
      setOutput("");
      setSummary(null);

      setError(
        err?.message ||
          "Unable to compare JSON."
      );
    }
  };

  const handleValidate = () => {
    setError("");
    setValidationStatus(null);

    const result =
      validateJsonInputs(
        jsonA,
        jsonB
      );

    if (result.valid) {
      setValidationStatus({
        valid: true,
        message:
          "Both JSON documents are valid.",
      });

      setToast(
        "JSON validation successful."
      );

      return;
    }

    setOutput("");
    setSummary(null);

    setValidationStatus({
      valid: false,
      message: result.error,
    });

    setError(result.error);
  };

  const handleCopy = async () => {
    if (!output) {
      setToast("Nothing to copy.");
      return;
    }

    const copied =
      await copyText(output);

    setToast(
      copied
        ? "JSON diff copied to clipboard."
        : "Unable to copy JSON diff."
    );
  };

  const handleDownload = () => {
    if (!output) {
      setToast("Nothing to download.");
      return;
    }

    downloadFile(
      output,
      "json-diff.json",
      "application/json"
    );

    setToast(
      "JSON diff downloaded."
    );
  };

  const handleShare = async () => {
    const shared =
      await shareTool({
        title:
          "JSON Diff | ToolVerse",
        text:
          "Compare two JSON documents online with ToolVerse.",
        url: window.location.href,
      });

    if (shared) {
      setToast(
        "Share dialog opened."
      );
    }
  };

  const handleReset = () => {
    setJsonA(DEFAULT_JSON_A);
    setJsonB(DEFAULT_JSON_B);
    setOutput("");
    setSummary(null);
    setError("");
    setToast("");
    setValidationStatus(null);
  };

  const handleExample = () => {
    setJsonA(DEFAULT_JSON_A);
    setJsonB(DEFAULT_JSON_B);
    setOutput("");
    setSummary(null);
    setError("");
    setToast("Example loaded.");
    setValidationStatus(null);
  };

  const handleClear = () => {
    setJsonA("");
    setJsonB("");
    setOutput("");
    setSummary(null);
    setError("");
    setValidationStatus(null);
  };

  const handleJsonAChange = (event) => {
    setJsonA(event.target.value);
    setValidationStatus(null);
    setError("");
  };

  const handleJsonBChange = (event) => {
    setJsonB(event.target.value);
    setValidationStatus(null);
    setError("");
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">

        {/* JSON Inputs */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* JSON A */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="json-a"
                className="text-sm font-medium"
              >
                JSON A
              </label>

              <button
                type="button"
                onClick={handleExample}
                className="text-sm text-blue-600 hover:underline"
              >
                Example
              </button>
            </div>

            <textarea
              id="json-a"
              value={jsonA}
              onChange={handleJsonAChange}
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>

          {/* JSON B */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="json-b"
                className="text-sm font-medium"
              >
                JSON B
              </label>

              <button
                type="button"
                onClick={handleClear}
                className="text-sm text-gray-600 hover:underline dark:text-gray-400"
              >
                Clear
              </button>
            </div>

            <textarea
              id="json-b"
              value={jsonB}
              onChange={handleJsonBChange}
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <ToolError message={error} />
        )}

        {/* Main Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCompare}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Compare JSON
          </button>

          <button
            type="button"
            onClick={handleValidate}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Validate JSON
          </button>
        </div>

        {/* Validation Status */}
        {validationStatus && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              validationStatus.valid
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400"
                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
            }`}
          >
            <div className="font-medium">
              {validationStatus.valid
                ? "✓ Valid JSON"
                : "✕ Invalid JSON"}
            </div>

            <div className="mt-1">
              {validationStatus.message}
            </div>
          </div>
        )}

        {/* Difference Summary */}
        {summary && (
          <div className="grid gap-4 sm:grid-cols-3">

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="text-sm text-gray-500">
                Added
              </div>

              <div className="mt-1 text-2xl font-semibold">
                {summary.added}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="text-sm text-gray-500">
                Removed
              </div>

              <div className="mt-1 text-2xl font-semibold">
                {summary.removed}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="text-sm text-gray-500">
                Changed
              </div>

              <div className="mt-1 text-2xl font-semibold">
                {summary.changed}
              </div>
            </div>

          </div>
        )}

        {/* Difference Result */}
        <div className="space-y-3">
          <label
            htmlFor="json-diff-output"
            className="text-sm font-medium"
          >
            Difference Result
          </label>

          {output ? (
            <textarea
              id="json-diff-output"
              value={output}
              readOnly
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm outline-none dark:border-gray-700 dark:bg-gray-950"
            />
          ) : (
            <div className="min-h-[420px] rounded-lg border border-gray-300 dark:border-gray-700">
              <ToolEmptyState
                message="JSON differences will appear here."
              />
            </div>
          )}
        </div>

        {/* Shared Tool Actions */}
        <ToolActions
          supports={tool?.supports}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onShare={handleShare}
          onReset={handleReset}
        />

        {/* Toast */}
        <ToolToast
          message={toast}
          onClose={() =>
            setToast("")
          }
        />

      </div>
    </ToolLayout>
  );
}