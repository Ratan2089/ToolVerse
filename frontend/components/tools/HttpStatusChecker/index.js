"use client";

import { useMemo, useState } from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolError from "@/components/tools/shared/ToolError";
import ToolEmptyState from "@/components/tools/shared/ToolEmptyState";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";
import { handleShare as shareTool } from "@/lib/toolActions";

import {
  CATEGORIES,
  createDownloadContent,
  createStatusSummary,
  getStatusCode,
  getStatusCodes,
  searchStatusCodes,
} from "./logic";

import { DEFAULT_STATUS_CODE } from "./config";

import faq from "./faq";

const STATUS_CODES = getStatusCodes();

const categoryClasses = {
  Informational:
    "border-blue-200 bg-blue-50 text-blue-700",
  Success:
    "border-green-200 bg-green-50 text-green-700",
  Redirection:
    "border-amber-200 bg-amber-50 text-amber-700",
  "Client Error":
    "border-orange-200 bg-orange-50 text-orange-700",
  "Server Error":
    "border-red-200 bg-red-50 text-red-700",
};

function StatusBadge({ category }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        categoryClasses[category] ||
        "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {category}
    </span>
  );
}

function StatusCard({
  status,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(status.code)}
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xl font-bold text-gray-900">
            {status.code}
          </div>

          <div className="mt-1 text-sm font-semibold text-gray-800">
            {status.name}
          </div>
        </div>

        <StatusBadge category={status.category} />
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
        {status.description}
      </p>
    </button>
  );
}

function StatusDetails({
  status,
  onCopy,
  onDownload,
}) {
  if (!status) {
    return null;
  }

  const summary = createStatusSummary(status);

  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {status.code}
            </span>

            <StatusBadge category={status.category} />
          </div>

          <h2 className="mt-2 text-xl font-bold text-gray-900">
            {status.name}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCopy(summary)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Copy
          </button>

          <button
            type="button"
            onClick={() => onDownload(status)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Download
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {status.description}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Common use
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {status.useCase}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HttpStatusChecker({ tool }) {
  const [code, setCode] = useState(
    DEFAULT_STATUS_CODE
  );

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("all");

  const [selectedCode, setSelectedCode] =
    useState(Number(DEFAULT_STATUS_CODE));

  const [error, setError] = useState("");

  const [toast, setToast] = useState("");

  const selectedStatus = useMemo(
    () => getStatusCode(selectedCode),
    [selectedCode]
  );

  const filteredStatuses = useMemo(
    () =>
      searchStatusCodes(
        search,
        category
      ),
    [search, category]
  );

  const handleLookup = () => {
    setError("");
    setToast("");

    const value = String(code).trim();

    if (!value) {
      setError("Enter an HTTP status code.");
      return;
    }

    if (!/^\d{3}$/.test(value)) {
      setError(
        "Enter a valid three-digit HTTP status code."
      );
      return;
    }

    const numericCode = Number(value);

    const status = getStatusCode(
      numericCode
    );

    if (!status) {
      setError(
        `HTTP ${numericCode} is not available in the current reference.`
      );
      return;
    }

    setSelectedCode(numericCode);
  };

  const handleCopy = async (text) => {
    try {
      await copyText(text);
      setToast("Copied to clipboard.");
    } catch {
      setToast("Unable to copy.");
    }
  };

  const handleDownload = (status) => {
    const content =
      createStatusSummary(status);

    downloadFile(
      content,
      `http-${status.code}.txt`,
      "text/plain"
    );

    setToast("Downloaded.");
  };

  const handleCopyAll = async () => {
    const content =
      createDownloadContent(
        filteredStatuses
      );

    await handleCopy(content);
  };

  const handleDownloadAll = () => {
    const content =
      createDownloadContent(
        filteredStatuses
      );

    downloadFile(
      content,
      "http-status-codes.txt",
      "text/plain"
    );

    setToast("HTTP status codes downloaded.");
  };

  const handleSelect = (statusCode) => {
    setSelectedCode(statusCode);
    setCode(String(statusCode));
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleExample = () => {
    setCode("404");
    setSelectedCode(404);
    setSearch("");
    setCategory("all");
    setError("");
  };

  const handleClear = () => {
    setCode("");
    setSelectedCode(null);
    setError("");
    setSearch("");
    setCategory("all");
  };

  const handleReset = () => {
    setCode(DEFAULT_STATUS_CODE);
    setSelectedCode(
      Number(DEFAULT_STATUS_CODE)
    );
    setSearch("");
    setCategory("all");
    setError("");
    setToast("");
  };

  const handleShare = async () => {
    const shared = await shareTool({
      title:
        "HTTP Status Code Checker | ToolVerse",
      text:
        selectedStatus
          ? `HTTP ${selectedStatus.code} ${selectedStatus.name} — ${selectedStatus.description}`
          : "Look up HTTP status codes with ToolVerse.",
      url: window.location.href,
    });

    if (shared) {
      setToast("Share dialog opened.");
    }
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">
        {/* Lookup */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label
                htmlFor="status-code"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                HTTP Status Code
              </label>

              <input
                id="status-code"
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleLookup();
                  }
                }}
                placeholder="e.g. 404"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleLookup}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              >
                Check Status
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4">
              <ToolError message={error} />
            </div>
          )}
        </section>

        {/* Selected status */}
        {selectedStatus ? (
          <StatusDetails
            status={selectedStatus}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        ) : (
          <ToolEmptyState
            title="No status code selected"
            description="Enter an HTTP status code or select one from the reference below."
          />
        )}

        {/* Search and filters */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="status-search"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Search HTTP Status Codes
              </label>

              <input
                id="status-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by code, name, category, or description..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((item) => {
                const active =
                  category === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setCategory(item.key)
                    }
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <span className="text-sm text-gray-500">
                Showing{" "}
                <strong className="text-gray-700">
                  {filteredStatuses.length}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-700">
                  {STATUS_CODES.length}
                </strong>{" "}
                status codes
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyAll}
                  disabled={
                    filteredStatuses.length === 0
                  }
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Copy Results
                </button>

                <button
                  type="button"
                  onClick={handleDownloadAll}
                  disabled={
                    filteredStatuses.length === 0
                  }
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Download Results
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Status grid */}
        {filteredStatuses.length > 0 ? (
          <section>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStatuses.map(
                (status) => (
                  <StatusCard
                    key={status.code}
                    status={status}
                    selected={
                      selectedCode ===
                      status.code
                    }
                    onSelect={
                      handleSelect
                    }
                  />
                )
              )}
            </div>
          </section>
        ) : (
          <ToolEmptyState
            title="No matching status codes"
            description="Try another status code, name, category, or search term."
          />
        )}

        {/* Common codes */}
        <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <h2 className="text-lg font-bold text-gray-900">
            Common HTTP Status Codes
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              200,
              201,
              204,
              301,
              302,
              304,
              400,
              401,
              403,
              404,
              405,
              408,
              409,
              429,
              500,
              502,
              503,
              504,
            ].map((statusCode) => {
              const status =
                getStatusCode(
                  statusCode
                );

              if (!status) {
                return null;
              }

              return (
                <button
                  key={statusCode}
                  type="button"
                  onClick={() =>
                    handleSelect(
                      statusCode
                    )
                  }
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm font-semibold text-gray-700 hover:border-blue-400 hover:text-blue-600"
                >
                  {statusCode}
                </button>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <ToolActions
          supports={tool?.supports}
          onCopy={() =>
            selectedStatus &&
            handleCopy(
              createStatusSummary(
                selectedStatus
              )
            )
          }
          onDownload={() =>
            selectedStatus &&
            handleDownload(
              selectedStatus
            )
          }
          onShare={handleShare}
          onReset={handleReset}
        />

        {/* Secondary actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExample}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Example
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>

        {toast && (
          <ToolToast
            message={toast}
            onClose={() => setToast("")}
          />
        )}
      </div>
    </ToolLayout>
  );
}