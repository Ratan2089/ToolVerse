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

import { DEFAULT_URL } from "./config";

import {
  parseUrl,
  urlToJson,
  validateUrl,
} from "./logic";

import faq from "./faq";

export default function UrlParser({ tool }) {
  const [input, setInput] =
    useState(DEFAULT_URL);

  const [output, setOutput] =
    useState("");

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState("");

  const handleParse = () => {
    try {
      setError("");

      const result = urlToJson(input);

      setOutput(result);
    } catch (err) {
      setOutput("");

      setError(
        err?.message ||
          "Unable to parse URL."
      );
    }
  };

  const handleValidate = () => {
    const result = validateUrl(input);

    if (result.valid) {
      setError("");
      setToast("URL is valid.");
    } else {
      setOutput("");
      setError(result.error);
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
        ? "Parsed URL copied to clipboard."
        : "Unable to copy parsed URL."
    );
  };

  const handleDownload = () => {
    if (!output) {
      setToast("Nothing to download.");
      return;
    }

    downloadFile(
      output,
      "parsed-url.json",
      "application/json"
    );

    setToast("Parsed URL downloaded.");
  };

  const handleShare = async () => {
    const shared = await shareTool({
      title:
        "URL Parser | ToolVerse",
      text:
        "Parse URLs and query parameters online with ToolVerse.",
      url: window.location.href,
    });

    if (shared) {
      setToast("Share dialog opened.");
    }
  };

  const handleReset = () => {
    setInput(DEFAULT_URL);
    setOutput("");
    setError("");
    setToast("");
  };

  const handleExample = () => {
    setInput(DEFAULT_URL);
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
        {/* URL Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="url-input"
              className="text-sm font-medium"
            >
              URL Input
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
                className="text-sm text-gray-600 hover:underline dark:text-gray-400"
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            id="url-input"
            value={input}
            onChange={(event) =>
              setInput(
                event.target.value
              )
            }
            placeholder="https://example.com/path?key=value#section"
            spellCheck={false}
            rows={5}
            className="w-full resize-y rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        {/* Error */}
        {error && (
          <ToolError message={error} />
        )}

        {/* Main actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleParse}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Parse URL
          </button>

          <button
            type="button"
            onClick={handleValidate}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Validate URL
          </button>
        </div>

        {/* Output */}
        <div className="space-y-3">
          <label
            htmlFor="url-output"
            className="text-sm font-medium"
          >
            Parsed URL
          </label>

          {output ? (
            <textarea
              id="url-output"
              value={output}
              readOnly
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm outline-none dark:border-gray-700 dark:bg-gray-950"
            />
          ) : (
            <div className="min-h-[420px] rounded-lg border border-gray-300 dark:border-gray-700">
              <ToolEmptyState
                message="Parsed URL information will appear here."
              />
            </div>
          )}
        </div>

        {/* Shared actions */}
        <ToolActions
          supports={tool?.supports}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onShare={handleShare}
          onReset={handleReset}
        />

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