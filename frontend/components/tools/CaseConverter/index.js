"use client";

import {
  useState,
  useMemo,
} from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";

import {
  CASE_TYPES,
  convertCase,
  getTextStatistics,
  createDownloadText,
} from "./logic";

import faq from "./faq";


export default function CaseConverter({
  tool,
}) {
  const [input, setInput] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [selectedCase, setSelectedCase] =
    useState("lowercase");

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState(null);


  /* =====================================================
     TOAST
     ===================================================== */

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
     STATISTICS
     ===================================================== */

  const statistics = useMemo(
    () =>
      getTextStatistics(
        input
      ),
    [input]
  );


  /* =====================================================
     CONVERT
     ===================================================== */

  const handleConvert = () => {
    setError("");

    if (!input) {
      setError(
        "Please enter some text to convert."
      );

      return;
    }

    try {
      const result =
        convertCase(
          input,
          selectedCase
        );

      setOutput(result);

      showToast(
        "Text converted successfully."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to convert text."
      );
    }
  };


  /* =====================================================
     LIVE CASE CHANGE
     ===================================================== */

  const handleCaseChange = (
    caseType
  ) => {
    setSelectedCase(
      caseType
    );

    setError("");

    if (input) {
      try {
        const result =
          convertCase(
            input,
            caseType
          );

        setOutput(result);
      } catch {
        setOutput("");
      }
    }
  };


  /* =====================================================
     COPY
     ===================================================== */

  const handleCopy = async () => {
    if (!output) {
      showToast(
        "Nothing to copy.",
        "error"
      );

      return;
    }

    const copied =
      await copyText(
        output
      );

    if (copied) {
      showToast(
        "Result copied."
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
        "Nothing to download.",
        "error"
      );

      return;
    }

    const content =
      createDownloadText(
        input,
        output,
        selectedCase
      );

    downloadFile(
      content,
      "toolverse-case-converter.txt",
      "text/plain"
    );

    showToast(
      "Result downloaded."
    );
  };


  /* =====================================================
     SWAP
     ===================================================== */

  const handleSwap = () => {
    if (!output) {
      return;
    }

    const previousInput =
      input;

    setInput(output);

    setOutput(
      previousInput
    );

    setError("");

    showToast(
      "Input and output swapped."
    );
  };


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setInput("");

    setOutput("");

    setSelectedCase(
      "lowercase"
    );

    setError("");

    showToast(
      "Case converter reset."
    );
  };


  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >

      <div className="space-y-6">


        {/* =================================================
            MAIN TOOL
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Case Converter
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Convert text into different capitalization styles.
            </p>

          </div>


          {/* =================================================
              CASE OPTIONS
          ================================================= */}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {Object.entries(
              CASE_TYPES
            ).map(
              ([
                type,
                config,
              ]) => (

                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    handleCaseChange(
                      type
                    )
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    selectedCase ===
                    type
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                      : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  }`}
                >

                  <p className="font-semibold">
                    {config.label}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {config.description}
                  </p>

                </button>

              )
            )}

          </div>


          {/* =================================================
              INPUT
          ================================================= */}

          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="case-input"
                className="text-sm font-semibold"
              >
                Input
              </label>

              <div className="flex gap-3 text-xs text-slate-500">

                <span>
                  Characters:{" "}
                  {statistics.characters}
                </span>

                <span>
                  Words:{" "}
                  {statistics.words}
                </span>

                <span>
                  Lines:{" "}
                  {statistics.lines}
                </span>

              </div>

            </div>


            <textarea
              id="case-input"
              value={input}
              onChange={(event) => {
                setInput(
                  event.target.value
                );

                setError("");

                if (
                  event.target.value
                ) {
                  try {
                    setOutput(
                      convertCase(
                        event.target.value,
                        selectedCase
                      )
                    );
                  } catch {
                    setOutput("");
                  }
                } else {
                  setOutput("");
                }
              }}
              placeholder="Enter your text here..."
              rows={8}
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
            />

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                handleConvert
              }
              className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Convert
            </button>


            <button
              type="button"
              onClick={
                handleSwap
              }
              disabled={!output}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Swap
            </button>


            <button
              type="button"
              onClick={
                handleReset
              }
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Reset
            </button>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>

          )}

        </section>


        {/* =================================================
            OUTPUT
        ================================================= */}

        {output && (

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

              <div>

                <h2 className="text-xl font-semibold">
                  Converted Text
                </h2>

                <p className="text-sm text-slate-500">
                  {CASE_TYPES[
                    selectedCase
                  ]?.label}
                </p>

              </div>


              <button
                type="button"
                onClick={
                  handleCopy
                }
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Copy
              </button>

            </div>


            <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-950">
              {output}
            </pre>

          </section>

        )}


        {/* =================================================
            TOOL ACTIONS
        ================================================= */}

        <ToolActions
          supports={{
            copy: Boolean(output),
            download: Boolean(output),
            share: true,
            reset: true,
          }}
          onCopy={
            handleCopy
          }
          onDownload={
            handleDownload
          }
          onReset={
            handleReset
          }
        />


        <ToolToast
          toast={toast}
        />

      </div>

    </ToolLayout>
  );
}