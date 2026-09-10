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
  DEFAULT_CSV,
} from "./config";

import {
  csvToJson,
  validateCsv,
} from "./logic";

import faq from "./faq";

export default function CsvToJson({ tool }) {
  const [input, setInput] = useState(DEFAULT_CSV);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const handleConvert = () => {
    try {
      setError("");

      const result = csvToJson(input);

      setOutput(result);
    } catch (err) {
      setOutput("");
      setError(
        err?.message ||
          "Unable to convert CSV to JSON."
      );
    }
  };

  const handleValidate = () => {
    const result = validateCsv(input);

    if (result.valid) {
      setError("");
      setToast("CSV is valid.");
    } else {
      setError(result.error);
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) {
      setToast("Nothing to copy.");
      return;
    }

    const copied = await copyText(output);

    setToast(
      copied
        ? "JSON copied to clipboard."
        : "Unable to copy JSON."
    );
  };

  const handleDownload = () => {
    if (!output) {
      setToast("Nothing to download.");
      return;
    }

    downloadFile(
      output,
      "converted.json",
      "application/json"
    );

    setToast("JSON downloaded.");
  };

  const handleShare = async () => {
    const shared = await shareTool({
      title: "CSV to JSON Converter | ToolVerse",
      text:
        "Convert CSV data to JSON online with ToolVerse.",
      url: window.location.href,
    });

    if (shared) {
      setToast("Share dialog opened.");
    }
  };

  const handleReset = () => {
    setInput(DEFAULT_CSV);
    setOutput("");
    setError("");
    setToast("");
  };

  const handleExample = () => {
    setInput(DEFAULT_CSV);
    setOutput("");
    setError("");
    setToast("Example loaded.");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="csv-input"
                className="text-sm font-medium"
              >
                CSV Input
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleExample}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Example
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              id="csv-input"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder={`name,email,role
John Doe,john@example.com,Developer`}
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>

          {/* Output */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="json-output"
                className="text-sm font-medium"
              >
                JSON Output
              </label>
            </div>

            {output ? (
              <textarea
                id="json-output"
                value={output}
                readOnly
                spellCheck={false}
                className="min-h-[420px] w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm outline-none dark:border-gray-700 dark:bg-gray-950"
              />
            ) : (
              <div className="min-h-[420px] rounded-lg border border-gray-300 dark:border-gray-700">
                <ToolEmptyState
                  message="Converted JSON will appear here."
                />
              </div>
            )}
          </div>
        </div>

        {error && (
          <ToolError message={error} />
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleConvert}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Convert to JSON
          </button>

          <button
            type="button"
            onClick={handleValidate}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Validate CSV
          </button>
        </div>

        <ToolActions
          supports={tool?.supports}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onShare={handleShare}
          onReset={handleReset}
        />

        <ToolToast
          message={toast}
          onClose={() => setToast("")}
        />
      </div>
    </ToolLayout>
  );
}