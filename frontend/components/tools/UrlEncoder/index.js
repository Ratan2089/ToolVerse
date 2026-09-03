"use client";

import { useMemo, useState } from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";

import {
  encodeComponent,
  decodeComponent,
  encodeUri,
  decodeUri,
  parseUrl,
  getTextStatistics,
  createUrlText,
  swapValues,
} from "./logic";

import faq from "./faq";

export default function UrlEncoder({ tool }) {
  const [mode, setMode] = useState(
    "encode-component"
  );

  const [input, setInput] = useState("");

  const [output, setOutput] = useState("");

  const [parsedUrl, setParsedUrl] =
    useState(null);

  const [error, setError] = useState("");

  const [toast, setToast] = useState(null);

  const statistics = useMemo(
    () => getTextStatistics(input),
    [input]
  );

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

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setOutput("");
    setParsedUrl(null);
    setError("");
  };

  const handleProcess = () => {
    setError("");
    setOutput("");
    setParsedUrl(null);

    if (!input.trim()) {
      setError(
        "Please enter some text or a URL."
      );
      return;
    }

    try {
      let result;

      switch (mode) {
        case "encode-component":
          result = encodeComponent(input);
          break;

        case "decode-component":
          result = decodeComponent(input);
          break;

        case "encode-uri":
          result = encodeUri(input);
          break;

        case "decode-uri":
          result = decodeUri(input);
          break;

        case "parse-url": {
          const parsed = parseUrl(input);

          setParsedUrl(parsed);

          result = JSON.stringify(
            parsed,
            null,
            2
          );

          break;
        }

        default:
          throw new Error(
            "Unknown operation."
          );
      }

      setOutput(result);

      showToast(
        "Operation completed successfully."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to process input."
      );
    }
  };

  const handleCopy = async () => {
    if (!output) {
      showToast(
        "Nothing to copy.",
        "error"
      );
      return;
    }

    const copied = await copyText(output);

    if (copied) {
      showToast("Result copied.");
    } else {
      showToast(
        "Unable to copy result.",
        "error"
      );
    }
  };

  const handleDownload = () => {
    if (!output) {
      showToast(
        "Nothing to download.",
        "error"
      );
      return;
    }

    const content = createUrlText(
      input,
      output,
      mode
    );

    downloadFile(
      content,
      "toolverse-url-result.txt",
      "text/plain"
    );

    showToast("Result downloaded.");
  };

  const handleSwap = () => {
    if (!output) {
      return;
    }

    const swapped = swapValues(
      input,
      output
    );

    setInput(swapped.input);
    setOutput(swapped.output);

    setParsedUrl(null);
    setError("");

    showToast(
      "Input and output swapped."
    );
  };

  const handleReset = () => {
    setMode("encode-component");
    setInput("");
    setOutput("");
    setParsedUrl(null);
    setError("");

    showToast(
      "URL encoder reset."
    );
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">

        {/* Main Tool */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              URL Encoder / Decoder
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Encode, decode, and parse URLs directly in your browser.
            </p>
          </div>


          {/* Mode Selection */}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <ModeButton
              active={
                mode ===
                "encode-component"
              }
              onClick={() =>
                handleModeChange(
                  "encode-component"
                )
              }
              title="Encode Component"
              description="Encode text used inside a URL."
            />

            <ModeButton
              active={
                mode ===
                "decode-component"
              }
              onClick={() =>
                handleModeChange(
                  "decode-component"
                )
              }
              title="Decode Component"
              description="Decode percent-encoded text."
            />

            <ModeButton
              active={
                mode ===
                "encode-uri"
              }
              onClick={() =>
                handleModeChange(
                  "encode-uri"
                )
              }
              title="Encode URI"
              description="Encode a complete URI."
            />

            <ModeButton
              active={
                mode ===
                "decode-uri"
              }
              onClick={() =>
                handleModeChange(
                  "decode-uri"
                )
              }
              title="Decode URI"
              description="Decode a complete URI."
            />

            <ModeButton
              active={
                mode ===
                "parse-url"
              }
              onClick={() =>
                handleModeChange(
                  "parse-url"
                )
              }
              title="Parse URL"
              description="Inspect URL components."
            />

          </div>


          {/* Input */}

          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="url-input"
                className="text-sm font-semibold"
              >
                Input
              </label>

              <span className="text-xs text-slate-500">
                {statistics.characters} characters ·{" "}
                {statistics.bytes} bytes
              </span>

            </div>

            <textarea
              id="url-input"
              value={input}
              onChange={(event) => {
                setInput(
                  event.target.value
                );

                setOutput("");
                setParsedUrl(null);
                setError("");
              }}
              placeholder={
                mode === "parse-url"
                  ? "https://example.com/search?q=hello%20world"
                  : "Enter text or URL..."
              }
              rows={7}
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
            />

          </div>


          {/* Buttons */}

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                handleProcess
              }
              className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
            >
              {mode === "parse-url"
                ? "Parse URL"
                : mode.includes("encode")
                  ? "Encode"
                  : "Decode"}
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


          {/* Error */}

          {error && (
            <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}

        </section>


        {/* Result */}

        {output && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

              <div>
                <h2 className="text-xl font-semibold">
                  Result
                </h2>

                <p className="text-sm text-slate-500">
                  Processed locally in your browser.
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

            <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-slate-50 p-4 font-mono text-sm dark:bg-slate-950">
              {output}
            </pre>

          </section>
        )}


        {/* Parsed URL */}

        {parsedUrl && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <h2 className="mb-5 text-xl font-semibold">
              URL Components
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">

              <Detail
                label="Protocol"
                value={
                  parsedUrl.protocol
                }
              />

              <Detail
                label="Origin"
                value={
                  parsedUrl.origin
                }
              />

              <Detail
                label="Host"
                value={
                  parsedUrl.host
                }
              />

              <Detail
                label="Hostname"
                value={
                  parsedUrl.hostname
                }
              />

              <Detail
                label="Port"
                value={
                  parsedUrl.port ||
                  "(default)"
                }
              />

              <Detail
                label="Path"
                value={
                  parsedUrl.pathname
                }
              />

              <Detail
                label="Query"
                value={
                  parsedUrl.query ||
                  "(none)"
                }
              />

              <Detail
                label="Hash"
                value={
                  parsedUrl.hash ||
                  "(none)"
                }
              />

            </div>


            {/* Query Parameters */}

            <div className="mt-6">

              <h3 className="mb-3 font-semibold">
                Query Parameters
              </h3>

              {parsedUrl.parameters.length ===
              0 ? (

                <p className="text-sm text-slate-500">
                  No query parameters found.
                </p>

              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full text-left text-sm">

                    <thead>

                      <tr className="border-b border-slate-200 dark:border-slate-700">

                        <th className="px-3 py-2 font-semibold">
                          Key
                        </th>

                        <th className="px-3 py-2 font-semibold">
                          Value
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {parsedUrl.parameters.map(
                        (
                          parameter,
                          index
                        ) => (

                          <tr
                            key={`${parameter.key}-${index}`}
                            className="border-b border-slate-100 dark:border-slate-800"
                          >

                            <td className="px-3 py-2 font-mono">
                              {parameter.key}
                            </td>

                            <td className="break-all px-3 py-2">
                              {parameter.value}
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>
        )}


        {/* Tool Actions */}

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


/* =========================================================
   MODE BUTTON
   ========================================================= */

function ModeButton({
  active,
  onClick,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition ${
        active
          ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
          : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
      }`}
    >
      <p className="font-semibold">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </button>
  );
}


/* =========================================================
   DETAIL
   ========================================================= */

function Detail({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-all font-mono text-sm">
        {value}
      </p>

    </div>
  );
}