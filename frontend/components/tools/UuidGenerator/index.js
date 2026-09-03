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
  generateUuids,
  formatUuidList,
  isValidUuid,
  getUuidVersion,
  getUuidVariant,
  createUuidText,
} from "./logic";

import faq from "./faq";


export default function UuidGenerator({
  tool,
}) {
  const [quantity, setQuantity] =
    useState(1);

  const [uppercase, setUppercase] =
    useState(false);

  const [removeHyphens, setRemoveHyphens] =
    useState(false);

  const [uuids, setUuids] =
    useState([]);

  const [validationInput, setValidationInput] =
    useState("");

  const [validationResult, setValidationResult] =
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
     GENERATE
     ===================================================== */

  const handleGenerate = () => {
    try {
      const generated =
        generateUuids(quantity);

      const formatted =
        formatUuidList(
          generated,
          {
            uppercase,
            removeHyphens,
          }
        );

      setUuids(formatted);

      showToast(
        `${formatted.length} UUID${
          formatted.length > 1
            ? "s"
            : ""
        } generated successfully.`
      );
    } catch (error) {
      showToast(
        error.message,
        "error"
      );
    }
  };


  /* =====================================================
     COPY ONE UUID
     ===================================================== */

  const handleCopyUuid = async (
    uuid
  ) => {
    const copied =
      await copyText(uuid);

    if (copied) {
      showToast(
        "UUID copied."
      );
    } else {
      showToast(
        "Unable to copy UUID.",
        "error"
      );
    }
  };


  /* =====================================================
     COPY ALL
     ===================================================== */

  const handleCopyAll = async () => {
    if (!uuids.length) {
      showToast(
        "Generate UUIDs first.",
        "error"
      );

      return;
    }

    const copied =
      await copyText(
        createUuidText(uuids)
      );

    if (copied) {
      showToast(
        "All UUIDs copied."
      );
    } else {
      showToast(
        "Unable to copy UUIDs.",
        "error"
      );
    }
  };


  /* =====================================================
     DOWNLOAD
     ===================================================== */

 const handleDownload = () => {
  if (!uuids.length) {
    showToast(
      "Generate UUIDs first.",
      "error"
    );

    return;
  }

  downloadFile(
    createUuidText(uuids),
    "toolverse-uuids.txt",
    "text/plain"
  );

  showToast(
    "UUIDs downloaded."
  );
};


  /* =====================================================
     VALIDATE UUID
     ===================================================== */

  const handleValidate = () => {
    const value =
      validationInput.trim();

    if (!value) {
      setValidationResult(null);

      return;
    }

    const valid =
      isValidUuid(value);

    if (!valid) {
      setValidationResult({
        valid: false,
      });

      return;
    }

    setValidationResult({
      valid: true,

      version:
        getUuidVersion(value),

      variant:
        getUuidVariant(value),

      uuidV4:
        value.length === 36
          ? value.charAt(14) === "4"
          : false,
    });
  };


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setQuantity(1);

    setUppercase(false);

    setRemoveHyphens(false);

    setUuids([]);

    setValidationInput("");

    setValidationResult(null);

    showToast(
      "UUID generator reset."
    );
  };


  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >

      <div className="space-y-6">


        {/* =================================================
            GENERATOR
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              UUID Generator
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Generate secure random UUID v4 identifiers instantly in your browser.
            </p>

          </div>


          {/* Quantity */}

          <div className="grid gap-5 md:grid-cols-3">


            <div>

              <label
                htmlFor="uuid-quantity"
                className="mb-2 block text-sm font-semibold"
              >
                Number of UUIDs
              </label>

              <input
                id="uuid-quantity"
                type="number"
                min="1"
                max="1000"
                value={quantity}
                onChange={(event) => {
                  const value =
                    Number(
                      event.target.value
                    );

                  setQuantity(
                    Number.isFinite(value)
                      ? Math.min(
                          1000,
                          Math.max(
                            1,
                            value
                          )
                        )
                      : 1
                  );
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              />

            </div>


            {/* Case */}

            <div>

              <p className="mb-2 text-sm font-semibold">
                Letter Case
              </p>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">

                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(event) =>
                    setUppercase(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm">
                  Uppercase
                </span>

              </label>

            </div>


            {/* Hyphens */}

            <div>

              <p className="mb-2 text-sm font-semibold">
                Format
              </p>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">

                <input
                  type="checkbox"
                  checked={removeHyphens}
                  onChange={(event) =>
                    setRemoveHyphens(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm">
                  Remove hyphens
                </span>

              </label>

            </div>

          </div>


          {/* Generate */}

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                handleGenerate
              }
              className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Generate UUID
              {quantity > 1
                ? "s"
                : ""}
            </button>

            <button
              type="button"
              onClick={
                handleReset
              }
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Reset
            </button>

          </div>

        </section>


        {/* =================================================
            RESULTS
        ================================================= */}

        {uuids.length > 0 && (

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <div>

                <h2 className="text-xl font-semibold">
                  Generated UUIDs
                </h2>

                <p className="text-sm text-slate-500">
                  {uuids.length} UUID
                  {uuids.length !== 1
                    ? "s"
                    : ""} generated
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


            <div className="space-y-2">

              {uuids.map(
                (uuid, index) => (

                  <div
                    key={`${uuid}-${index}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950"
                  >

                    <span className="w-8 shrink-0 text-sm text-slate-400">
                      {index + 1}
                    </span>

                    <code className="min-w-0 flex-1 break-all font-mono text-sm">
                      {uuid}
                    </code>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyUuid(
                          uuid
                        )
                      }
                      className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-800"
                    >
                      Copy
                    </button>

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* =================================================
            UUID VALIDATOR
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              UUID Validator
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Check whether a UUID is correctly formatted.
            </p>

          </div>


          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="text"
              value={
                validationInput
              }
              onChange={(event) => {
                setValidationInput(
                  event.target.value
                );

                setValidationResult(
                  null
                );
              }}
              placeholder="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
            />

            <button
              type="button"
              onClick={
                handleValidate
              }
              className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Validate
            </button>

          </div>


          {validationResult && (

            <div
              className={`mt-4 rounded-xl border p-4 ${
                validationResult.valid
                  ? "border-green-300 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                  : "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
              }`}
            >

              {validationResult.valid ? (

                <div>

                  <p className="font-semibold text-green-700 dark:text-green-300">
                    ✓ Valid UUID
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">

                    <Info
                      label="Version"
                      value={
                        `UUID v${validationResult.version}`
                      }
                    />

                    <Info
                      label="Variant"
                      value={
                        validationResult.variant
                      }
                    />

                    <Info
                      label="Format"
                      value="Standard UUID"
                    />

                  </div>

                </div>

              ) : (

                <p className="font-semibold text-red-700 dark:text-red-300">
                  ✕ Invalid UUID
                </p>

              )}

            </div>

          )}

        </section>


        {/* =================================================
            TOOL ACTIONS
        ================================================= */}

        <ToolActions
          supports={{
            copy: uuids.length > 0,
            download: uuids.length > 0,
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
   INFO COMPONENT
   ========================================================= */

function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-lg bg-white/60 p-3 dark:bg-slate-900/50">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}