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

import config, { DEFAULT_JSON } from "./config";
import faq from "./faq";

import {
  convertJsonToCsv,
} from "./logic";

export default function JsonToCsv({ tool = config }) {
  const [input, setInput] = useState(DEFAULT_JSON);
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

  const handleConvert = () => {
    setError("");

    try {
      const result = convertJsonToCsv(input);

      setOutput(result.csv);

      showToast("JSON converted to CSV successfully.");
    } catch (error) {
      setOutput("");
      setError(error.message);
    }
  };

  const handleCopy = async () => {
    if (!output) {
      showToast("There is no CSV output to copy.", "error");
      return;
    }

    const copied = await copyText(output);

    if (copied) {
      showToast("CSV copied to clipboard.");
    } else {
      showToast("Unable to copy CSV.", "error");
    }
  };

  const handleDownload = () => {
    if (!output) {
      showToast("There is no CSV output to download.", "error");
      return;
    }

    downloadFile(
      output,
      "converted.csv",
      "text/csv;charset=utf-8"
    );

    showToast("CSV downloaded.");
  };

  const handleShare = async () => {
    try {
      const shared = await shareTool({
        title: "JSON to CSV Converter | ToolVerse",
        text: "Convert JSON data to CSV with ToolVerse.",
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
    setInput(DEFAULT_JSON);
    setOutput("");
    setError("");

    showToast("JSON to CSV converter reset.");
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
                  Paste an array of JSON objects below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInput(DEFAULT_JSON);
                  setError("");
                }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Example
              </button>
            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              placeholder={`[
  {
    "name": "John",
    "age": 25,
    "city": "Delhi"
  }
]`}
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
                  CSV Output
                </h2>

                <p className="text-sm text-slate-500">
                  Your converted CSV appears here.
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
                aria-label="CSV output"
              />
            ) : (
              <ToolEmptyState
                title="No output yet"
                description="Enter JSON and choose Convert to CSV."
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
            onClick={handleConvert}
            className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Convert to CSV
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