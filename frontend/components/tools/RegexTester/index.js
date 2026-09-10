"use client";

import {
  useState,
} from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";

import {
  DEFAULT_EXAMPLE,
  FLAG_OPTIONS,
} from "./config";

import {
  createDownloadText,
  testRegex,
} from "./logic";

import faq from "./faq";


export default function RegexTester({
  tool,
}) {
  const [pattern, setPattern] =
    useState(
      DEFAULT_EXAMPLE.pattern
    );

  const [text, setText] =
    useState(
      DEFAULT_EXAMPLE.text
    );

  const [selectedFlags, setSelectedFlags] =
    useState(
      DEFAULT_EXAMPLE.flags
    );

  const [allMatches, setAllMatches] =
    useState(true);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState(null);


  /* =====================================================
     FLAGS
     ===================================================== */

  const flags =
    selectedFlags.join("");


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
     FLAG CHANGE
     ===================================================== */

  const toggleFlag = (
    flag
  ) => {
    setSelectedFlags(
      (current) =>
        current.includes(flag)
          ? current.filter(
              (item) =>
                item !== flag
            )
          : [
              ...current,
              flag,
            ]
    );

    setResult(null);
    setError("");
  };


  /* =====================================================
     TEST
     ===================================================== */

  const handleTest = () => {
    setError("");
    setResult(null);

    if (!pattern) {
      setError(
        "Please enter a regular expression."
      );

      return;
    }

    if (!text) {
      setError(
        "Please enter some test text."
      );

      return;
    }

    setLoading(true);

    try {
      const response =
        testRegex({
          pattern,
          flags,
          text,
          allMatches,
        });

      setResult(
        response
      );

      showToast(
        response.matched
          ? `${response.matchCount} match${
              response.matchCount ===
              1
                ? ""
                : "es"
            } found.`
          : "No matches found.",
        response.matched
          ? "success"
          : "error"
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to test the regular expression."
      );
    } finally {
      setLoading(false);
    }
  };


  /* =====================================================
     COPY
     ===================================================== */

  const handleCopy = async () => {
    if (!result) {
      showToast(
        "Nothing to copy.",
        "error"
      );

      return;
    }

    const output =
      JSON.stringify(
        result,
        null,
        2
      );

    const copied =
      await copyText(output);

    showToast(
      copied
        ? "Results copied."
        : "Unable to copy results.",
      copied
        ? "success"
        : "error"
    );
  };


  /* =====================================================
     DOWNLOAD
     ===================================================== */

  const handleDownload = () => {
    if (!result) {
      showToast(
        "Nothing to download.",
        "error"
      );

      return;
    }

    const content =
      createDownloadText({
        pattern,
        flags,
        text,
        allMatches,
        result,
      });

    downloadFile(
      content,
      "toolverse-regex-test.txt",
      "text/plain"
    );

    showToast(
      "Results downloaded."
    );
  };


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setPattern(
      DEFAULT_EXAMPLE.pattern
    );

    setText(
      DEFAULT_EXAMPLE.text
    );

    setSelectedFlags(
      DEFAULT_EXAMPLE.flags
    );

    setAllMatches(true);

    setResult(null);
    setError("");

    showToast(
      "Regex tester reset."
    );
  };


  /* =====================================================
     RENDER
     ===================================================== */

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

          {/* HEADER */}

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Regex Tester
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Test JavaScript regular expressions
              directly in your browser.
            </p>
          </div>


          {/* ENGINE */}

          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">

            <div className="text-sm font-medium">
              Regex Engine
            </div>

            <div className="mt-1 font-medium text-brand-600">
              JavaScript / ECMAScript
            </div>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Native JavaScript RegExp engine
              running directly in your browser.
            </p>

          </div>


          {/* PATTERN */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium">
              Regular Expression
            </label>

            <input
              value={pattern}
              onChange={(event) => {
                setPattern(
                  event.target.value
                );

                setResult(null);
                setError("");
              }}
              placeholder="Enter regex pattern..."
              spellCheck={false}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
            />

          </div>


          {/* FLAGS */}

          <div className="mb-5">

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm font-medium">
                Flags
              </label>

              <span className="font-mono text-xs text-slate-500">
                {flags || "none"}
              </span>

            </div>


            <div className="flex flex-wrap gap-2">

              {FLAG_OPTIONS.map(
                (flag) => {

                  const active =
                    selectedFlags.includes(
                      flag.id
                    );

                  return (
                    <button
                      key={flag.id}
                      type="button"
                      title={
                        flag.title
                      }
                      onClick={() =>
                        toggleFlag(
                          flag.id
                        )
                      }
                      className={`rounded-lg border px-3 py-2 font-mono text-sm transition ${
                        active
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                      }`}
                    >
                      {flag.label}
                    </button>
                  );
                }
              )}

            </div>

          </div>


          {/* ALL MATCHES */}

          <label className="mb-5 flex cursor-pointer items-center gap-3 text-sm">

            <input
              type="checkbox"
              checked={allMatches}
              onChange={(event) => {
                setAllMatches(
                  event.target.checked
                );

                setResult(null);
              }}
              className="h-4 w-4 rounded border-slate-300"
            />

            <span>
              Find all matches
            </span>

          </label>


          {/* TEST TEXT */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium">
              Test String
            </label>

            <textarea
              value={text}
              onChange={(event) => {
                setText(
                  event.target.value
                );

                setResult(null);
                setError("");
              }}
              placeholder="Enter text to test..."
              spellCheck={false}
              rows={9}
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
            />

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">

              <strong>
                Regex error:
              </strong>{" "}

              {error}

            </div>
          )}


          {/* TEST BUTTON */}

          <button
            type="button"
            onClick={
              handleTest
            }
            disabled={loading}
            className="w-full rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Testing..."
              : "Test Regex"}
          </button>

        </section>


        {/* =================================================
            RESULTS
        ================================================= */}

        {result && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <div>

                <h2 className="text-xl font-semibold">
                  Results
                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  {result.matchCount}{" "}
                  match
                  {result.matchCount ===
                  1
                    ? ""
                    : "es"}{" "}
                  found in{" "}
                  {result.executionTime}{" "}
                  ms.

                </p>

              </div>


              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  result.matched
                    ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >

                {result.matched
                  ? "MATCH"
                  : "NO MATCH"}

              </div>

            </div>


            {result.matches.length ===
            0 ? (

              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
                No matches found.
              </div>

            ) : (

              <div className="space-y-4">

                {result.matches.map(
                  (
                    match,
                    index
                  ) => (

                    <div
                      key={`${index}-${match.index}`}
                      className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                    >

                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

                        <span className="text-sm font-semibold">
                          Match{" "}
                          {index + 1}
                        </span>

                        <span className="font-mono text-xs text-slate-500">
                          index:{" "}
                          {match.index}
                        </span>

                      </div>


                      <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-950">

                        <div className="mb-1 text-xs text-slate-500">
                          Matched text
                        </div>

                        <code className="break-all font-mono text-sm">
                          {match.full ||
                            "(empty match)"}
                        </code>

                      </div>


                      {match.captures
                        ?.length >
                        0 && (

                        <div className="mt-3">

                          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Capture Groups
                          </div>

                          <div className="space-y-2">

                            {match.captures.map(
                              (
                                capture,
                                captureIndex
                              ) => (

                                <div
                                  key={`${capture.index}-${captureIndex}`}
                                  className="flex flex-col gap-1 rounded-lg bg-slate-50 p-3 dark:bg-slate-950"
                                >

                                  <span className="text-xs text-slate-500">
                                    Group{" "}
                                    {capture.index}
                                  </span>

                                  <code className="break-all font-mono text-sm">
                                    {capture.value ??
                                      "(undefined)"}
                                  </code>

                                </div>

                              )
                            )}

                          </div>

                        </div>

                      )}

                    </div>

                  )
                )}

              </div>

            )}

          </section>
        )}


        {/* =================================================
            TOOL ACTIONS
        ================================================= */}

        <ToolActions
          supports={{
            copy:
              Boolean(result),

            download:
              Boolean(result),

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