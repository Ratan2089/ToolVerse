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

import { DEFAULT_CRON } from "./config";
import faq from "./faq";

import {
  FIELD_DEFINITIONS,
  PRESETS,
  createCronSummary,
  expressionFromFields,
  fieldsFromExpression,
  formatDate,
  getDownloadContent,
  getTimezoneOptions,
} from "./logic";

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-1 text-xs text-gray-500">
        {label}
      </div>

      <div className="text-base font-bold text-gray-900">
        {value}
      </div>
    </div>
  );
}

export default function CronGenerator({ tool }) {
  const initialFields =
    fieldsFromExpression(DEFAULT_CRON);

  const browserTimezone =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";

  const [expression, setExpression] =
    useState(DEFAULT_CRON);

  const [fields, setFields] =
    useState(initialFields);

  const [timezone, setTimezone] =
    useState(browserTimezone || "UTC");

  const [description, setDescription] =
    useState("");

  const [nextRuns, setNextRuns] =
    useState([]);

  const [validation, setValidation] =
    useState(null);

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState("");

  const [showPresets, setShowPresets] =
    useState(false);

  const timezoneOptions = useMemo(
    () => getTimezoneOptions(),
    []
  );

  const handleExpressionChange = (value) => {
    setExpression(value);

    setFields(
      fieldsFromExpression(value)
    );

    setValidation(null);
    setDescription("");
    setNextRuns([]);
    setError("");
  };

  const handleFieldChange = (key, value) => {
    const nextFields = {
      ...fields,
      [key]: value,
    };

    const nextExpression =
      expressionFromFields(nextFields);

    setFields(nextFields);
    setExpression(nextExpression);

    setValidation(null);
    setDescription("");
    setNextRuns([]);
    setError("");
  };

  const handleGenerate = () => {
    try {
      setError("");

      const result = createCronSummary(
        expression,
        timezone
      );

      setValidation(result.validation);

      if (!result.valid) {
        setDescription("");
        setNextRuns([]);

        setError(
          result.validation.message
        );

        return;
      }

      setDescription(result.description);
      setNextRuns(result.nextRuns);
    } catch (err) {
      const message =
        err?.message ||
        "Unable to process cron expression.";

      setValidation({
        valid: false,
        message,
      });

      setDescription("");
      setNextRuns([]);
      setError(message);
    }
  };

  const handlePreset = (presetExpression) => {
    handleExpressionChange(
      presetExpression
    );

    setShowPresets(false);
  };

  const handleCopy = async () => {
    const success =
      await copyText(expression);

    setToast(
      success
        ? "Cron expression copied."
        : "Unable to copy cron expression."
    );
  };

  const handleCopyDescription =
    async () => {
      if (!description) {
        return;
      }

      const success =
        await copyText(description);

      setToast(
        success
          ? "Description copied."
          : "Unable to copy description."
      );
    };

  const handleDownload = () => {
    const content =
      getDownloadContent(
        expression,
        description,
        timezone,
        nextRuns
      );

    downloadFile(
      content,
      "cron-schedule.txt",
      "text/plain"
    );

    setToast(
      "Cron schedule downloaded."
    );
  };

  const handleShare = async () => {
    const shared = await shareTool({
      title:
        "Cron Expression Generator | ToolVerse",
      text:
        "Create, validate, and explain cron expressions with ToolVerse.",
      url: window.location.href,
    });

    setToast(
      shared
        ? "Share dialog opened."
        : "Unable to share this page."
    );
  };

  const handleReset = () => {
    setExpression(DEFAULT_CRON);

    setFields(
      fieldsFromExpression(
        DEFAULT_CRON
      )
    );

    setDescription("");
    setNextRuns([]);
    setValidation(null);
    setError("");
    setToast("");
  };

  const handleClear = () => {
    setExpression("");

    setFields({
      minute: "*",
      hour: "*",
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*",
    });

    setDescription("");
    setNextRuns([]);
    setValidation(null);
    setError("");
  };

  const handleExample = () => {
    handleExpressionChange(
      "0 9 * * 1-5"
    );
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="w-full space-y-6">

        {/* Cron Expression Builder */}
        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Cron Expression
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Build a standard five-field Unix cron
                expression.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExample}
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              Example
            </button>
          </div>

          {/* Main Expression Input */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={expression}
              onChange={(event) =>
                handleExpressionChange(
                  event.target.value
                )
              }
              placeholder="*/5 * * * *"
              spellCheck={false}
              aria-label="Cron expression"
              className="min-h-12 min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-900 px-4 py-3 font-mono text-sm tracking-wide text-white outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={handleGenerate}
              className="min-h-12 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Generate
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            <code className="font-mono">
              minute hour day-of-month month day-of-week
            </code>
          </div>

          {/* Individual Fields */}
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
            {FIELD_DEFINITIONS.map(
              (field) => (
                <div
                  key={field.key}
                  className="min-w-0"
                >
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    {field.label}
                  </label>

                  <input
                    value={fields[field.key]}
                    onChange={(event) =>
                      handleFieldChange(
                        field.key,
                        event.target.value
                      )
                    }
                    placeholder={
                      field.placeholder
                    }
                    spellCheck={false}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-mono text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <span className="mt-1 block text-[11px] text-gray-400">
                    {field.description}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Builder Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setShowPresets(
                  (value) => !value
                )
              }
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              {showPresets
                ? "Hide Presets"
                : "Common Presets"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear
            </button>
          </div>

          {/* Presets */}
          {showPresets && (
            <div className="mt-4 grid gap-2 border-t border-gray-200 pt-4 md:grid-cols-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.expression}
                  type="button"
                  onClick={() =>
                    handlePreset(
                      preset.expression
                    )
                  }
                  className="flex min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-left hover:border-gray-300 hover:bg-white"
                >
                  <span className="text-xs text-gray-700">
                    {preset.label}
                  </span>

                  <code className="font-mono text-[11px] text-gray-500">
                    {preset.expression}
                  </code>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Timezone */}
        <section className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label
              htmlFor="cron-timezone"
              className="text-xs font-semibold text-gray-700"
            >
              Timezone
            </label>

            <select
              id="cron-timezone"
              value={timezone}
              onChange={(event) => {
                setTimezone(
                  event.target.value
                );

                setDescription("");
                setNextRuns([]);
              }}
              className="min-h-9 max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {!timezoneOptions.includes(
                timezone
              ) && (
                <option value={timezone}>
                  {timezone}
                </option>
              )}

              {timezoneOptions.map(
                (zone) => (
                  <option
                    key={zone}
                    value={zone}
                  >
                    {zone}
                  </option>
                )
              )}
            </select>
          </div>

          <p className="text-xs text-gray-500">
            Upcoming runs are calculated using
            the selected timezone.
          </p>
        </section>

        {/* Validation */}
        {validation && (
          <div
            className={
              validation.valid
                ? "flex flex-col gap-1 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                : "flex flex-col gap-1 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            }
          >
            <strong>
              {validation.valid
                ? "Valid cron expression"
                : "Invalid cron expression"}
            </strong>

            <span>
              {validation.message}
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <ToolError message={error} />
        )}

        {/* Description */}
        {description && (
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Cron Description
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {description}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  handleCopyDescription
                }
                className="inline-flex min-h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Copy Description
              </button>
            </div>
          </section>
        )}

        {/* Next Runs */}
        {nextRuns.length > 0 && (
          <section className="space-y-3">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Next Cron Runs
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Next {nextRuns.length} scheduled
                executions in {timezone}.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              {nextRuns.map(
                (date, index) => (
                  <div
                    key={`${date.toISOString()}-${index}`}
                    className="grid min-h-12 grid-cols-[48px_minmax(0,1fr)] border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-center bg-gray-50 text-xs font-semibold text-gray-500">
                      {index + 1}
                    </div>

                    <div className="flex items-center px-4 py-3 font-mono text-xs text-gray-800">
                      {formatDate(
                        date,
                        timezone
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!description &&
          !error &&
          nextRuns.length === 0 && (
            <ToolEmptyState
              title="Generate a cron schedule"
              description="Enter a cron expression and click Generate to validate it, understand what it means, and see the next scheduled runs."
            />
          )}

        {/* Basic Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Fields"
            value="5"
          />

          <StatCard
            label="Format"
            value="Unix Cron"
          />

          <StatCard
            label="Runs shown"
            value={
              nextRuns.length || "—"
            }
          />
        </div>

        {/* Shared Tool Actions */}
        <ToolActions
          supports={tool?.supports}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onShare={handleShare}
          onReset={handleReset}
        />

        <ToolToast
          message={toast}
          onClose={() =>
            setToast("")
          }
        />
      </div>
    </ToolLayout>
  );
}