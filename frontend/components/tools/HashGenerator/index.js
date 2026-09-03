"use client";

import {
  useMemo,
  useState,
} from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolToast from "@/components/tools/shared/ToolToast";

import {
  copyText,
} from "@/lib/clipboard";

import {
  downloadFile,
} from "@/lib/download";

import {
  HASH_ALGORITHM_LIST,
  hashSelected,
  getHashLength,
  getTextStatistics,
  formatHashResults,
  createHashText,
  verifyHash,
} from "./logic";

import faq from "./faq";


export default function HashGenerator({
  tool,
}) {
  const [text, setText] =
    useState("");

  const [selectedAlgorithms, setSelectedAlgorithms] =
    useState([
      "SHA-256",
    ]);

  const [uppercase, setUppercase] =
    useState(false);

  const [results, setResults] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [verifyAlgorithm, setVerifyAlgorithm] =
    useState("SHA-256");

  const [expectedHash, setExpectedHash] =
    useState("");

  const [verificationResult, setVerificationResult] =
    useState(null);

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

  const statistics =
    useMemo(
      () =>
        getTextStatistics(
          text
        ),
      [text]
    );


  /* =====================================================
     TOGGLE ALGORITHM
     ===================================================== */

  const toggleAlgorithm = (
    algorithm
  ) => {
    setSelectedAlgorithms(
      (current) => {
        if (
          current.includes(
            algorithm
          )
        ) {
          return current.filter(
            (item) =>
              item !== algorithm
          );
        }

        return [
          ...current,
          algorithm,
        ];
      }
    );

    setResults({});
  };


  /* =====================================================
     SELECT ALL
     ===================================================== */

  const selectAllAlgorithms =
    () => {
      setSelectedAlgorithms(
        HASH_ALGORITHM_LIST.map(
          (algorithm) =>
            algorithm.id
        )
      );

      setResults({});
    };


  /* =====================================================
     GENERATE
     ===================================================== */

  const handleGenerate =
    async () => {
      setError("");

      setVerificationResult(
        null
      );

      if (!text) {
        setError(
          "Please enter some text to hash."
        );

        return;
      }

      if (
        selectedAlgorithms.length ===
        0
      ) {
        setError(
          "Select at least one hash algorithm."
        );

        return;
      }

      try {
        setLoading(true);

        const generated =
          await hashSelected(
            text,
            selectedAlgorithms
          );

        const formatted =
          formatHashResults(
            generated,
            uppercase
          );

        setResults(
          formatted
        );

        showToast(
          "Hash generated successfully."
        );
      } catch (error) {
        setError(
          error.message ||
            "Unable to generate hash."
        );
      } finally {
        setLoading(false);
      }
    };


  /* =====================================================
     COPY INDIVIDUAL HASH
     ===================================================== */

  const handleCopyHash =
    async (
      hash,
      algorithm
    ) => {
      const copied =
        await copyText(
          hash
        );

      if (copied) {
        showToast(
          `${algorithm} hash copied.`
        );
      } else {
        showToast(
          "Unable to copy hash.",
          "error"
        );
      }
    };


  /* =====================================================
     COPY ALL
     ===================================================== */

  const handleCopyAll =
    async () => {
      if (
        Object.keys(results)
          .length === 0
      ) {
        showToast(
          "Generate a hash first.",
          "error"
        );

        return;
      }

      const copied =
        await copyText(
          createHashText(
            results
          )
        );

      if (copied) {
        showToast(
          "All hashes copied."
        );
      } else {
        showToast(
          "Unable to copy hashes.",
          "error"
        );
      }
    };


  /* =====================================================
     DOWNLOAD
     ===================================================== */

  const handleDownload =
    () => {
      if (
        Object.keys(results)
          .length === 0
      ) {
        showToast(
          "Generate a hash first.",
          "error"
        );

        return;
      }

      downloadFile(
        createHashText(
          results
        ),
        "toolverse-hashes.txt",
        "text/plain"
      );

      showToast(
        "Hashes downloaded."
      );
    };


  /* =====================================================
     VERIFY HASH
     ===================================================== */

  const handleVerify =
    async () => {
      setVerificationResult(
        null
      );

      if (!text) {
        showToast(
          "Enter text first.",
          "error"
        );

        return;
      }

      if (!expectedHash.trim()) {
        showToast(
          "Enter the expected hash.",
          "error"
        );

        return;
      }

      try {
        const valid =
          await verifyHash(
            text,
            expectedHash,
            verifyAlgorithm
          );

        setVerificationResult(
          valid
        );

        showToast(
          valid
            ? "Hash matches."
            : "Hash does not match.",
          valid
            ? "success"
            : "error"
        );
      } catch (error) {
        showToast(
          error.message ||
            "Unable to verify hash.",
          "error"
        );
      }
    };


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset =
    () => {
      setText("");

      setSelectedAlgorithms([
        "SHA-256",
      ]);

      setUppercase(false);

      setResults({});

      setError("");

      setExpectedHash("");

      setVerificationResult(
        null
      );

      setVerifyAlgorithm(
        "SHA-256"
      );

      showToast(
        "Hash generator reset."
      );
    };


  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >

      <div className="space-y-6">


        {/* =================================================
            INPUT
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Hash Generator
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Generate secure cryptographic hashes directly in your browser.
            </p>

          </div>


          <label
            htmlFor="hash-input"
            className="mb-2 block text-sm font-semibold"
          >
            Text to Hash
          </label>

          <textarea
            id="hash-input"
            value={text}
            onChange={(event) => {
              setText(
                event.target.value
              );

              setResults({});

              setVerificationResult(
                null
              );

              setError("");
            }}
            placeholder="Enter text to generate a hash..."
            rows={7}
            className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
          />


          {/* Statistics */}

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

            <span>
              Characters:{" "}
              <strong>
                {statistics.characters}
              </strong>
            </span>

            <span>
              UTF-8 bytes:{" "}
              <strong>
                {statistics.bytes}
              </strong>
            </span>

            <span>
              Words:{" "}
              <strong>
                {statistics.words}
              </strong>
            </span>

          </div>

        </section>


        {/* =================================================
            ALGORITHMS
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

            <div>

              <h2 className="text-xl font-semibold">
                Hash Algorithms
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select one or more algorithms.
              </p>

            </div>


            <button
              type="button"
              onClick={
                selectAllAlgorithms
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Select All
            </button>

          </div>


          <div className="grid gap-3 sm:grid-cols-2">

            {HASH_ALGORITHM_LIST.map(
              (algorithm) => (

                <label
                  key={
                    algorithm.id
                  }
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    selectedAlgorithms.includes(
                      algorithm.id
                    )
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                      : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  }`}
                >

                  <div className="flex items-start gap-3">

                    <input
                      type="checkbox"
                      checked={selectedAlgorithms.includes(
                        algorithm.id
                      )}
                      onChange={() =>
                        toggleAlgorithm(
                          algorithm.id
                        )
                      }
                      className="mt-1 h-4 w-4"
                    />

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="font-semibold">
                          {algorithm.name}
                        </span>

                        {algorithm.security ===
                          "legacy" && (
                          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                            Legacy
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {algorithm.description}
                      </p>

                      <p className="mt-2 font-mono text-xs text-slate-400">
                        {getHashLength(
                          algorithm.id
                        )} hexadecimal characters
                      </p>

                    </div>

                  </div>

                </label>

              )
            )}

          </div>


          {/* Case */}

          <label className="mt-5 flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={uppercase}
              onChange={(event) => {
                setUppercase(
                  event.target.checked
                );

                if (
                  Object.keys(
                    results
                  ).length
                ) {
                  setResults(
                    formatHashResults(
                      results,
                      event.target.checked
                    )
                  );
                }
              }}
              className="h-4 w-4"
            />

            <span className="text-sm font-semibold">
              Use uppercase hexadecimal output
            </span>

          </label>


          {/* Buttons */}

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                handleGenerate
              }
              disabled={loading}
              className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Generating..."
                : "Generate Hash"}
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


          {error && (

            <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>

          )}

        </section>


        {/* =================================================
            RESULTS
        ================================================= */}

        {Object.keys(results)
          .length > 0 && (

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <div>

                <h2 className="text-xl font-semibold">
                  Hash Results
                </h2>

                <p className="text-sm text-slate-500">
                  Generated locally using the Web Crypto API.
                </p>

              </div>


              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={
                    handleCopyAll
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Copy All
                </button>

                <button
                  type="button"
                  onClick={
                    handleDownload
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Download
                </button>

              </div>

            </div>


            <div className="space-y-4">

              {Object.entries(
                results
              ).map(
                ([
                  algorithm,
                  hash,
                ]) => (

                  <div
                    key={
                      algorithm
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950"
                  >

                    <div className="mb-2 flex flex-wrap items-center justify-between gap-3">

                      <div>

                        <span className="font-semibold">
                          {algorithm}
                        </span>

                        <span className="ml-2 text-xs text-slate-500">
                          {getHashLength(
                            algorithm
                          )}{" "}
                          characters
                        </span>

                      </div>


                      <button
                        type="button"
                        onClick={() =>
                          handleCopyHash(
                            hash,
                            algorithm
                          )
                        }
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-800"
                      >
                        Copy
                      </button>

                    </div>


                    <code className="block break-all rounded-lg bg-white p-3 font-mono text-xs dark:bg-slate-900">
                      {hash}
                    </code>

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* =================================================
            HASH VERIFIER
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Hash Verifier
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Compare generated hash output with an expected hash.
            </p>

          </div>


          <div className="grid gap-4 sm:grid-cols-3">


            <div>

              <label
                htmlFor="verify-algorithm"
                className="mb-2 block text-sm font-semibold"
              >
                Algorithm
              </label>

              <select
                id="verify-algorithm"
                value={
                  verifyAlgorithm
                }
                onChange={(event) => {
                  setVerifyAlgorithm(
                    event.target.value
                  );

                  setVerificationResult(
                    null
                  );
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              >

                {HASH_ALGORITHM_LIST.map(
                  (algorithm) => (

                    <option
                      key={
                        algorithm.id
                      }
                      value={
                        algorithm.id
                      }
                    >
                      {algorithm.name}
                    </option>

                  )
                )}

              </select>

            </div>


            <div className="sm:col-span-2">

              <label
                htmlFor="expected-hash"
                className="mb-2 block text-sm font-semibold"
              >
                Expected Hash
              </label>

              <input
                id="expected-hash"
                type="text"
                value={
                  expectedHash
                }
                onChange={(event) => {
                  setExpectedHash(
                    event.target.value
                  );

                  setVerificationResult(
                    null
                  );
                }}
                placeholder="Paste the expected hash..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              />

            </div>

          </div>


          <button
            type="button"
            onClick={
              handleVerify
            }
            className="mt-5 rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Verify Hash
          </button>


          {verificationResult !==
            null && (

            <div
              className={`mt-4 rounded-xl border p-4 ${
                verificationResult
                  ? "border-green-300 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                  : "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
              }`}
            >

              <p className="font-semibold">

                {verificationResult
                  ? "✓ Hash matches"
                  : "✕ Hash does not match"}

              </p>

            </div>

          )}

        </section>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <ToolActions
          supports={{
            copy:
              Object.keys(
                results
              ).length > 0,

            download:
              Object.keys(
                results
              ).length > 0,

            share: true,

            reset: true,
          }}

          onCopy={
            handleCopyAll
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