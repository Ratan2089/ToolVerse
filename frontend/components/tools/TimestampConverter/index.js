"use client";

import { useState } from "react";

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
  convertTimestamp,
  convertDate,
  createTimestampText,
  detectTimestampUnit,
  getCurrentTimestamp,
  TIMESTAMP_UNITS,
} from "./logic";

import faq from "./faq";


export default function TimestampConverter({
  tool,
}) {
  const [mode, setMode] =
    useState("timestamp-to-date");

  const [timestamp, setTimestamp] =
    useState("");

  const [timestampUnit, setTimestampUnit] =
    useState(
      TIMESTAMP_UNITS.seconds
    );

  const [dateInput, setDateInput] =
    useState("");

  const [result, setResult] =
    useState(null);

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
     TIMESTAMP -> DATE
     ===================================================== */

  const handleTimestampConversion =
    () => {
      setError("");

      setResult(null);

      try {
        const converted =
          convertTimestamp(
            timestamp,
            timestampUnit
          );

        setResult({
          type:
            "timestamp-to-date",

          ...converted,
        });

        showToast(
          "Timestamp converted successfully."
        );
      } catch (error) {
        setError(
          error.message
        );
      }
    };


  /* =====================================================
     DATE -> TIMESTAMP
     ===================================================== */

  const handleDateConversion =
    () => {
      setError("");

      setResult(null);

      try {
        const converted =
          convertDate(
            dateInput
          );

        setResult({
          type:
            "date-to-timestamp",

          ...converted,
        });

        showToast(
          "Date converted successfully."
        );
      } catch (error) {
        setError(
          error.message
        );
      }
    };


  /* =====================================================
     CURRENT TIME
     ===================================================== */

  const handleCurrentTimestamp =
    () => {
      const current =
        getCurrentTimestamp();

      const result = {
        type:
          "timestamp-to-date",

        input:
          String(
            current.seconds
          ),

        unit:
          TIMESTAMP_UNITS.seconds,

        seconds:
          String(
            current.seconds
          ),

        milliseconds:
          String(
            current.milliseconds
          ),

        date:
          current.date,

        local:
          current.date.toLocaleString(),

        utc:
          current.date.toUTCString(),

        iso:
          current.date.toISOString(),
      };

      setMode(
        "timestamp-to-date"
      );

      setTimestamp(
        String(
          current.seconds
        )
      );

      setTimestampUnit(
        TIMESTAMP_UNITS.seconds
      );

      setResult(
        result
      );

      setError("");

      showToast(
        "Current timestamp loaded."
      );
    };


  /* =====================================================
     USE CURRENT DATE
     ===================================================== */

  const handleCurrentDate =
    () => {
      const now =
        new Date();

      /*
       * datetime-local expects:
       * YYYY-MM-DDTHH:mm
       */

      const year =
        now.getFullYear();

      const month =
        String(
          now.getMonth() + 1
        ).padStart(2, "0");

      const day =
        String(
          now.getDate()
        ).padStart(2, "0");

      const hours =
        String(
          now.getHours()
        ).padStart(2, "0");

      const minutes =
        String(
          now.getMinutes()
        ).padStart(2, "0");

      setMode(
        "date-to-timestamp"
      );

      setDateInput(
        `${year}-${month}-${day}T${hours}:${minutes}`
      );

      setResult(null);

      setError("");

      showToast(
        "Current date and time loaded."
      );
    };


  /* =====================================================
     COPY RESULT
     ===================================================== */

  const handleCopy = async (
    value,
    message
  ) => {
    if (
      value === null ||
      value === undefined
    ) {
      showToast(
        "Nothing to copy.",
        "error"
      );

      return;
    }

    const copied =
      await copyText(
        String(value)
      );

    if (copied) {
      showToast(
        message
      );
    } else {
      showToast(
        "Unable to copy.",
        "error"
      );
    }
  };


  /* =====================================================
     COPY ALL
     ===================================================== */

  const handleCopyAll = async () => {
    if (!result) {
      showToast(
        "Convert a value first.",
        "error"
      );

      return;
    }

    const content =
      createTimestampText(
        result
      );

    await handleCopy(
      content,
      "Timestamp information copied."
    );
  };


  /* =====================================================
     DOWNLOAD
     ===================================================== */

  const handleDownload = () => {
    if (!result) {
      showToast(
        "Convert a value first.",
        "error"
      );

      return;
    }

    const content =
      createTimestampText(
        result
      );

    downloadFile(
      content,
      "toolverse-timestamp.txt",
      "text/plain"
    );

    showToast(
      "Timestamp information downloaded."
    );
  };


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setMode(
      "timestamp-to-date"
    );

    setTimestamp("");

    setTimestampUnit(
      TIMESTAMP_UNITS.seconds
    );

    setDateInput("");

    setResult(null);

    setError("");

    showToast(
      "Timestamp converter reset."
    );
  };


  /* =====================================================
     AUTO DETECT
     ===================================================== */

  const handleDetectUnit = () => {
    const detected =
      detectTimestampUnit(
        timestamp
      );

    if (!detected) {
      showToast(
        "Enter a valid numeric timestamp first.",
        "error"
      );

      return;
    }

    setTimestampUnit(
      detected
    );

    showToast(
      `Detected ${detected}.`
    );
  };


  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >

      <div className="space-y-6">


        {/* =================================================
            CONVERTER
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Timestamp Converter
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Convert Unix timestamps and dates instantly in your browser.
            </p>

          </div>


          {/* =================================================
              MODE
          ================================================= */}

          <div className="mb-6 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => {
                setMode(
                  "timestamp-to-date"
                );

                setResult(null);

                setError("");
              }}
              className={`rounded-xl border p-4 text-left transition ${
                mode ===
                "timestamp-to-date"
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                  : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >

              <p className="font-semibold">
                Timestamp → Date
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Convert Unix timestamp to date and time.
              </p>

            </button>


            <button
              type="button"
              onClick={() => {
                setMode(
                  "date-to-timestamp"
                );

                setResult(null);

                setError("");
              }}
              className={`rounded-xl border p-4 text-left transition ${
                mode ===
                "date-to-timestamp"
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                  : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >

              <p className="font-semibold">
                Date → Timestamp
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Convert a date and time to Unix timestamp.
              </p>

            </button>

          </div>


          {/* =================================================
              TIMESTAMP INPUT
          ================================================= */}

          {mode ===
            "timestamp-to-date" && (

            <div>

              <label
                htmlFor="timestamp"
                className="mb-2 block text-sm font-semibold"
              >
                Unix Timestamp
              </label>


              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  id="timestamp"
                  type="text"
                  inputMode="decimal"
                  value={
                    timestamp
                  }
                  onChange={(event) => {
                    setTimestamp(
                      event.target.value
                    );

                    setResult(null);

                    setError("");
                  }}
                  placeholder="Example: 1756300000"
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
                />

                <button
                  type="button"
                  onClick={
                    handleDetectUnit
                  }
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Auto Detect
                </button>

              </div>


              {/* Unit */}

              <div className="mt-4">

                <p className="mb-2 text-sm font-semibold">
                  Timestamp Unit
                </p>

                <div className="flex flex-wrap gap-3">

                  <label className="flex cursor-pointer items-center gap-2">

                    <input
                      type="radio"
                      name="timestamp-unit"
                      checked={
                        timestampUnit ===
                        TIMESTAMP_UNITS.seconds
                      }
                      onChange={() =>
                        setTimestampUnit(
                          TIMESTAMP_UNITS.seconds
                        )
                      }
                    />

                    <span className="text-sm">
                      Seconds
                    </span>

                  </label>


                  <label className="flex cursor-pointer items-center gap-2">

                    <input
                      type="radio"
                      name="timestamp-unit"
                      checked={
                        timestampUnit ===
                        TIMESTAMP_UNITS.milliseconds
                      }
                      onChange={() =>
                        setTimestampUnit(
                          TIMESTAMP_UNITS.milliseconds
                        )
                      }
                    />

                    <span className="text-sm">
                      Milliseconds
                    </span>

                  </label>

                </div>

              </div>


              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={
                    handleTimestampConversion
                  }
                  className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
                >
                  Convert Timestamp
                </button>

                <button
                  type="button"
                  onClick={
                    handleCurrentTimestamp
                  }
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Use Current Timestamp
                </button>

              </div>

            </div>
          )}


          {/* =================================================
              DATE INPUT
          ================================================= */}

          {mode ===
            "date-to-timestamp" && (

            <div>

              <label
                htmlFor="date-input"
                className="mb-2 block text-sm font-semibold"
              >
                Date & Time
              </label>

              <input
                id="date-input"
                type="datetime-local"
                value={
                  dateInput
                }
                onChange={(event) => {
                  setDateInput(
                    event.target.value
                  );

                  setResult(null);

                  setError("");
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              />


              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={
                    handleDateConversion
                  }
                  className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
                >
                  Convert Date
                </button>

                <button
                  type="button"
                  onClick={
                    handleCurrentDate
                  }
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Use Current Date & Time
                </button>

              </div>

            </div>
          )}


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
            RESULT
        ================================================= */}

        {result && (

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <div>

                <h2 className="text-xl font-semibold">
                  Conversion Result
                </h2>

                <p className="text-sm text-slate-500">
                  Converted locally in your browser.
                </p>

              </div>


              <button
                type="button"
                onClick={
                  handleCopyAll
                }
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Copy All
              </button>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">


              <ResultCard
                label="Unix Seconds"
                value={
                  result.seconds
                }
                onCopy={() =>
                  handleCopy(
                    result.seconds,
                    "Unix seconds copied."
                  )
                }
              />


              <ResultCard
                label="Unix Milliseconds"
                value={
                  result.milliseconds
                }
                onCopy={() =>
                  handleCopy(
                    result.milliseconds,
                    "Unix milliseconds copied."
                  )
                }
              />


              <ResultCard
                label="Local Time"
                value={
                  result.local
                }
                onCopy={() =>
                  handleCopy(
                    result.local,
                    "Local time copied."
                  )
                }
              />


              <ResultCard
                label="UTC"
                value={
                  result.utc
                }
                onCopy={() =>
                  handleCopy(
                    result.utc,
                    "UTC time copied."
                  )
                }
              />


              <ResultCard
                label="ISO 8601"
                value={
                  result.iso
                }
                onCopy={() =>
                  handleCopy(
                    result.iso,
                    "ISO timestamp copied."
                  )
                }
              />


              <ResultCard
  label="Date"
  value={
    result.date instanceof Date
      ? result.date.toLocaleString()
      : String(result.date ?? "")
  }
  onCopy={() =>
    handleCopy(
      result.date instanceof Date
        ? result.date.toLocaleString()
        : String(result.date ?? ""),
      "Date copied."
    )
  }
/>

            </div>

          </section>

        )}


        {/* =================================================
            ACTIONS
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


/* =========================================================
   RESULT CARD
   ========================================================= */

function ResultCard({
  label,
  value,
  onCopy,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">

      <div className="mb-2 flex items-center justify-between gap-3">

        <p className="text-sm font-semibold text-slate-500">
          {label}
        </p>

        <button
          type="button"
          onClick={onCopy}
          className="text-xs font-semibold hover:underline"
        >
          Copy
        </button>

      </div>

      <p className="break-words font-mono text-sm">
        {value}
      </p>

    </div>
  );
}