"use client";

import { useState } from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolError from "@/components/tools/shared/ToolError";
import ToolEmptyState from "@/components/tools/shared/ToolEmptyState";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";

import {
  encodeBase64,
  decodeBase64,
} from "./logic";

import faq from "./faq";

export default function Base64Encoder({ tool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
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
      const result =
        mode === "encode"
          ? encodeBase64(input)
          : decodeBase64(input);

      setOutput(result);

      showToast(
        mode === "encode"
          ? "Text encoded successfully."
          : "Base64 decoded successfully."
      );
    } catch (error) {
      setOutput("");
      setError(error.message);
    }
  };

  const handleCopy = async () => {
    if (!output) {
      showToast("There is no output to copy.", "error");
      return;
    }

    const copied = await copyText(output);

    if (copied) {
      showToast("Output copied to clipboard.");
    } else {
      showToast("Unable to copy output.", "error");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
    setError("");

    setMode((currentMode) =>
      currentMode === "encode"
        ? "decode"
        : "encode"
    );
  };

  return (
    <ToolLayout tool={tool} faq={faq}>
      <div className="space-y-6">
        {/* Mode selector */}
        <div className="flex w-fit rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => {
              setMode("encode");
              setOutput("");
              setError("");
            }}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              mode === "encode"
                ? "bg-white shadow-sm dark:bg-slate-800"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Encode
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("decode");
              setOutput("");
              setError("");
            }}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              mode === "decode"
                ? "bg-white shadow-sm dark:bg-slate-800"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Decode
          </button>
        </div>

        {/* Input / Output */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {mode === "encode"
                    ? "Text Input"
                    : "Base64 Input"}
                </h2>

                <p className="text-sm text-slate-500">
                  {mode === "encode"
                    ? "Enter the text you want to encode."
                    : "Enter the Base64 data you want to decode."}
                </p>
              </div>

              {input && (
                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    setError("");
                  }}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 text to decode..."
              }
              spellCheck={false}
              className="min-h-[360px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              aria-label={
                mode === "encode"
                  ? "Text input"
                  : "Base64 input"
              }
            />
          </section>

          {/* Output */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {mode === "encode"
                  ? "Base64 Output"
                  : "Decoded Text"}
              </h2>

              <p className="text-sm text-slate-500">
                The converted result will appear here.
              </p>
            </div>

            {output ? (
              <textarea
                value={output}
                readOnly
                spellCheck={false}
                className="min-h-[360px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none dark:border-slate-700 dark:bg-slate-950"
                aria-label="Conversion output"
              />
            ) : (
              <ToolEmptyState
                title="No output yet"
                description={`Enter ${
                  mode === "encode"
                    ? "text"
                    : "Base64 data"
                } and click ${
                  mode === "encode"
                    ? "Encode"
                    : "Decode"
                }.`}
              />
            )}
          </section>
        </div>

        {/* Error */}
        <ToolError message={error} />

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleConvert}
            className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            {mode === "encode"
              ? "Encode"
              : "Decode"}
          </button>

          <button
            type="button"
            onClick={handleSwap}
            disabled={!input && !output}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Swap
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>

        {/* Output actions */}
        {output && (
          <ToolActions
            supports={{
              copy: true,
              download: false,
              share: false,
              reset: false,
            }}
            onCopy={handleCopy}
          />
        )}

        <ToolToast toast={toast} />
      </div>
    </ToolLayout>
  );
}