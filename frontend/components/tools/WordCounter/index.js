"use client";

import {
  useMemo,
  useState,
} from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";

import {
  analyzeText,
  createDownloadText,
} from "./logic";

import faq from "./faq";


export default function WordCounter({
  tool,
}) {
  const [input, setInput] =
    useState("");

  const [toast, setToast] =
    useState(null);


  /* =====================================================
     ANALYSIS
     ===================================================== */

  const analysis = useMemo(
    () =>
      analyzeText(input),
    [input]
  );


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
     COPY
     ===================================================== */

  const handleCopy = async () => {
    if (!input) {
      showToast(
        "Nothing to copy.",
        "error"
      );

      return;
    }

    const copied =
      await copyText(input);

    if (copied) {
      showToast(
        "Text copied."
      );
    } else {
      showToast(
        "Unable to copy text.",
        "error"
      );
    }
  };


  /* =====================================================
     DOWNLOAD
     ===================================================== */

  const handleDownload = () => {
    if (!input) {
      showToast(
        "Nothing to download.",
        "error"
      );

      return;
    }

    const content =
      createDownloadText(
        input,
        analysis
      );

    downloadFile(
      content,
      "toolverse-word-analysis.txt",
      "text/plain"
    );

    showToast(
      "Analysis downloaded."
    );
  };


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setInput("");

    showToast(
      "Word counter reset."
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
              Word Counter
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Analyze your text instantly in your browser.
            </p>

          </div>


          <textarea
            id="word-counter-input"
            value={input}
            onChange={(event) =>
              setInput(
                event.target.value
              )
            }
            placeholder="Type or paste your text here..."
            rows={12}
            className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
          />


          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

            <span>
              {analysis.wordCount} words
            </span>

            <span>
              {analysis.characterCount} characters
            </span>

            <span>
              {analysis.sentenceCount} sentences
            </span>

            <span>
              {analysis.paragraphCount} paragraphs
            </span>

          </div>


          <div className="mt-5">

            <button
              type="button"
              onClick={
                handleReset
              }
              disabled={!input}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Reset
            </button>

          </div>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section>

          <h2 className="mb-4 text-xl font-semibold">
            Text Statistics
          </h2>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


            <StatCard
              label="Words"
              value={
                analysis.wordCount
              }
            />

            <StatCard
              label="Characters"
              value={
                analysis.characterCount
              }
            />

            <StatCard
              label="Characters Without Spaces"
              value={
                analysis.charactersWithoutSpaces
              }
            />

            <StatCard
              label="Unique Words"
              value={
                analysis.uniqueWordCount
              }
            />

            <StatCard
              label="Sentences"
              value={
                analysis.sentenceCount
              }
            />

            <StatCard
              label="Paragraphs"
              value={
                analysis.paragraphCount
              }
            />

            <StatCard
              label="Lines"
              value={
                analysis.lineCount
              }
            />

            <StatCard
              label="Average Word Length"
              value={
                analysis.averageWordLength
              }
            />

          </div>

        </section>


        {/* =================================================
            TIME ESTIMATES
        ================================================= */}

        <section className="grid gap-4 sm:grid-cols-2">

          <InfoCard
            title="Estimated Reading Time"
            value={`${analysis.readingTime} minute${
              analysis.readingTime === 1
                ? ""
                : "s"
            }`}
            description="Based on approximately 200 words per minute."
          />

          <InfoCard
            title="Estimated Speaking Time"
            value={`${analysis.speakingTime} minute${
              analysis.speakingTime === 1
                ? ""
                : "s"
            }`}
            description="Based on approximately 130 words per minute."
          />

        </section>


        {/* =================================================
            WORD INFORMATION
        ================================================= */}

        <section className="grid gap-4 sm:grid-cols-2">

          <InfoCard
            title="Longest Word"
            value={
              analysis.longestWord ||
              "—"
            }
            description={
              analysis.longestWord
                ? `${analysis.longestWord.length} characters`
                : "No words found."
            }
          />

          <InfoCard
            title="Shortest Word"
            value={
              analysis.shortestWord ||
              "—"
            }
            description={
              analysis.shortestWord
                ? `${analysis.shortestWord.length} characters`
                : "No words found."
            }
          />

        </section>


        {/* =================================================
            FREQUENCY
        ================================================= */}

        {analysis.topWords.length >
          0 && (

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <h2 className="mb-4 text-xl font-semibold">
              Most Frequent Words
            </h2>


            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead>

                  <tr className="border-b border-slate-200 dark:border-slate-700">

                    <th className="px-3 py-3 font-semibold">
                      #
                    </th>

                    <th className="px-3 py-3 font-semibold">
                      Word
                    </th>

                    <th className="px-3 py-3 font-semibold">
                      Frequency
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {analysis.topWords.map(
                    (
                      item,
                      index
                    ) => (

                      <tr
                        key={`${item.word}-${index}`}
                        className="border-b border-slate-100 dark:border-slate-800"
                      >

                        <td className="px-3 py-3 text-slate-500">
                          {index + 1}
                        </td>

                        <td className="px-3 py-3 font-mono">
                          {item.word}
                        </td>

                        <td className="px-3 py-3">
                          {item.count}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>

        )}


        {/* =================================================
            ACTIONS
        ================================================= */}

        <ToolActions
          supports={{
            copy: Boolean(input),
            download: Boolean(input),
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


/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   INFO CARD
   ========================================================= */

function InfoCard({
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 break-words text-2xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}