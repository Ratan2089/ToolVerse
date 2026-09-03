"use client";

import { useMemo, useState } from "react";

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
  generatePasswords,
  getCharacterPoolSize,
  getPasswordStrength,
  passwordsToText,
} from "./logic";

import faq from "./faq";


export default function PasswordGenerator({
  tool,
}) {
  const [length, setLength] =
    useState(16);

  const [count, setCount] =
    useState(1);

  const [lowercase, setLowercase] =
    useState(true);

  const [uppercase, setUppercase] =
    useState(true);

  const [numbers, setNumbers] =
    useState(true);

  const [symbols, setSymbols] =
    useState(true);

  const [
    excludeAmbiguous,
    setExcludeAmbiguous,
  ] = useState(false);

  const [
    customCharacters,
    setCustomCharacters,
  ] = useState("");

  const [passwords, setPasswords] =
    useState([]);

  const [
    showPasswords,
    setShowPasswords,
  ] = useState(true);

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
     CHARACTER POOL
     ===================================================== */

  const characterPoolSize =
    useMemo(
      () =>
        getCharacterPoolSize({
          lowercase,
          uppercase,
          numbers,
          symbols,
          excludeAmbiguous,
          customCharacters,
        }),
      [
        lowercase,
        uppercase,
        numbers,
        symbols,
        excludeAmbiguous,
        customCharacters,
      ]
    );


  /* =====================================================
     GENERATE
     ===================================================== */

  const handleGenerate = () => {
    try {
      const generated =
        generatePasswords({
          length,
          count,
          lowercase,
          uppercase,
          numbers,
          symbols,
          excludeAmbiguous,
          customCharacters,
        });

      setPasswords(
        generated
      );

      showToast(
        `${generated.length} password${
          generated.length > 1
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
     STRENGTH
     ===================================================== */

  const getStrength =
    (password) =>
      getPasswordStrength(
        password,
        characterPoolSize
      );


  /* =====================================================
     COPY ONE
     ===================================================== */

  const handleCopy = async (
    password
  ) => {
    const copied =
      await copyText(
        password
      );

    if (copied) {
      showToast(
        "Password copied."
      );
    } else {
      showToast(
        "Unable to copy password.",
        "error"
      );
    }
  };


  /* =====================================================
     COPY ALL
     ===================================================== */

  const handleCopyAll = async () => {
    if (!passwords.length) {
      showToast(
        "Generate passwords first.",
        "error"
      );

      return;
    }

    const copied =
      await copyText(
        passwordsToText(
          passwords
        )
      );

    if (copied) {
      showToast(
        "All passwords copied."
      );
    } else {
      showToast(
        "Unable to copy passwords.",
        "error"
      );
    }
  };


  /* =====================================================
     DOWNLOAD
     ===================================================== */

 const handleDownload = () => {
  if (!passwords.length) {
    showToast(
      "Generate passwords first.",
      "error"
    );

    return;
  }

  downloadFile(
    passwordsToText(passwords),
    "toolverse-passwords.txt",
    "text/plain;charset=utf-8"
  );

  showToast(
    "Passwords downloaded."
  );
};


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setLength(16);

    setCount(1);

    setLowercase(true);

    setUppercase(true);

    setNumbers(true);

    setSymbols(true);

    setExcludeAmbiguous(false);

    setCustomCharacters("");

    setPasswords([]);

    setShowPasswords(true);

    showToast(
      "Password generator reset."
    );
  };


  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >

      <div className="space-y-6">


        {/* =================================================
            GENERATOR SETTINGS
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Password Generator
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Generate cryptographically secure passwords locally in your browser.
            </p>

          </div>


          {/* Length and quantity */}

          <div className="grid gap-5 sm:grid-cols-2">


            <div>

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password-length"
                  className="text-sm font-semibold"
                >
                  Password Length
                </label>

                <span className="font-mono text-sm font-semibold">
                  {length}
                </span>

              </div>

              <input
                id="password-length"
                type="range"
                min="4"
                max="128"
                value={length}
                onChange={(event) =>
                  setLength(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="w-full"
              />

              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>4</span>
                <span>128</span>
              </div>

            </div>


            <div>

              <label
                htmlFor="password-count"
                className="mb-2 block text-sm font-semibold"
              >
                Number of Passwords
              </label>

              <input
                id="password-count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(event) => {
                  const value =
                    Number(
                      event.target.value
                    );

                  setCount(
                    Number.isFinite(value)
                      ? Math.min(
                          100,
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

          </div>


          {/* Character types */}

          <div className="mt-6">

            <p className="mb-3 text-sm font-semibold">
              Character Types
            </p>

            <div className="grid gap-3 sm:grid-cols-2">


              <Option
                label="Lowercase letters"
                checked={lowercase}
                onChange={
                  setLowercase
                }
              />

              <Option
                label="Uppercase letters"
                checked={uppercase}
                onChange={
                  setUppercase
                }
              />

              <Option
                label="Numbers"
                checked={numbers}
                onChange={
                  setNumbers
                }
              />

              <Option
                label="Symbols"
                checked={symbols}
                onChange={
                  setSymbols
                }
              />

              <Option
                label="Exclude ambiguous characters (I, l, 1, O, 0, o)"
                checked={
                  excludeAmbiguous
                }
                onChange={
                  setExcludeAmbiguous
                }
              />

            </div>

          </div>


          {/* Custom characters */}

          <div className="mt-6">

            <label
              htmlFor="custom-characters"
              className="mb-2 block text-sm font-semibold"
            >
              Custom Characters
            </label>

            <input
              id="custom-characters"
              type="text"
              value={
                customCharacters
              }
              onChange={(event) =>
                setCustomCharacters(
                  event.target.value
                )
              }
              placeholder="Example: @#$%abc"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional characters that should be included in the password character pool.
            </p>

          </div>


          {/* Pool information */}

          <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">

              <span>
                Character pool:{" "}
                <strong>
                  {characterPoolSize}
                </strong>
              </span>

              <span>
                Maximum entropy at current length:{" "}
                <strong>
                  {characterPoolSize
                    ? (
                        length *
                        Math.log2(
                          characterPoolSize
                        )
                      ).toFixed(1)
                    : "0"}{" "}
                  bits
                </strong>
              </span>

            </div>

          </div>


          {/* Buttons */}

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                handleGenerate
              }
              className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Generate Password
              {count > 1
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

        {passwords.length > 0 && (

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <div>

                <h2 className="text-xl font-semibold">
                  Generated Passwords
                </h2>

                <p className="text-sm text-slate-500">
                  {passwords.length} password
                  {passwords.length !== 1
                    ? "s"
                    : ""}
                </p>

              </div>


              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords(
                      !showPasswords
                    )
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {showPasswords
                    ? "Hide"
                    : "Show"}
                </button>

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


            <div className="space-y-3">

              {passwords.map(
                (
                  password,
                  index
                ) => {

                  const strength =
                    getStrength(
                      password
                    );

                  return (
                    <div
                      key={`${index}-${password}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950"
                    >

                      <div className="flex items-center gap-3">

                        <span className="w-8 shrink-0 text-sm text-slate-400">
                          {index + 1}
                        </span>

                        <code
                          className={`min-w-0 flex-1 break-all font-mono text-sm ${
                            showPasswords
                              ? ""
                              : "select-none blur-sm"
                          }`}
                        >
                          {showPasswords
                            ? password
                            : "••••••••••••••••"}
                        </code>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              password
                            )
                          }
                          className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-800"
                        >
                          Copy
                        </button>

                      </div>


                      {/* Strength */}

                      <div className="mt-3 flex items-center gap-3">

                        <div className="flex gap-1">

                          {Array.from(
                            {
                              length: 5,
                            },
                            (_, strengthIndex) => (

                              <span
                                key={
                                  strengthIndex
                                }
                                className={`h-2 w-8 rounded-full ${
                                  strengthIndex <
                                  strength.score
                                    ? strength.score <=
                                      2
                                      ? "bg-red-500"
                                      : strength.score ===
                                          3
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    : "bg-slate-200 dark:bg-slate-700"
                                }`}
                              />

                            )
                          )}

                        </div>

                        <span className="text-xs font-semibold">
                          {strength.label}
                        </span>

                        <span className="text-xs text-slate-500">
                          {strength.entropy.toFixed(
                            1
                          )} bits
                        </span>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </section>

        )}


        {/* =================================================
            ACTIONS
        ================================================= */}

        <ToolActions
          supports={{
            copy:
              passwords.length > 0,

            download:
              passwords.length > 0,

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
   OPTION COMPONENT
   ========================================================= */

function Option({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(
            event.target.checked
          )
        }
        className="h-4 w-4"
      />

      <span className="text-sm">
        {label}
      </span>

    </label>
  );
}