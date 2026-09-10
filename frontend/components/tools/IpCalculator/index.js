"use client";

import { useState } from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolError from "@/components/tools/shared/ToolError";
import ToolEmptyState from "@/components/tools/shared/ToolEmptyState";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";
import { handleShare as shareTool } from "@/lib/toolActions";

import {
  DEFAULT_IP,
  DEFAULT_CIDR,
} from "./config";

import {
  calculateSubnet,
  CIDR_PRESETS,
  createDownloadContent,
  validateIPv4CIDR,
} from "./logic";

import faq from "./faq";

function ResultCard({
  label,
  value,
  mono = true,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </div>

      <div
        className={`mt-2 break-all text-base font-semibold text-gray-900 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default function IpCalculator({
  tool,
}) {
  const [ip, setIp] =
    useState(DEFAULT_IP);

  const [cidr, setCidr] =
    useState(DEFAULT_CIDR);

  const [result, setResult] =
    useState(() =>
      calculateSubnet(
        DEFAULT_IP,
        DEFAULT_CIDR
      )
    );

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState("");

  const handleCalculate = () => {
    setError("");
    setToast("");

    const validation =
      validateIPv4CIDR(
        ip,
        cidr
      );

    if (!validation.valid) {
      setError(
        validation.message
      );
      setResult(null);
      return;
    }

    try {
      const calculated =
        calculateSubnet(
          ip,
          cidr
        );

      setResult(calculated);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to calculate subnet."
      );

      setResult(null);
    }
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }

    try {
      await copyText(
        createDownloadContent(
          result
        )
      );

      setToast(
        "IP calculation copied."
      );
    } catch {
      setToast(
        "Unable to copy."
      );
    }
  };

  const handleDownload = () => {
    if (!result) {
      return;
    }

    downloadFile(
      createDownloadContent(
        result
      ),
      `ip-calculation-${result.cidrNotation.replace(
        "/",
        "-"
      )}.txt`,
      "text/plain"
    );

    setToast(
      "Calculation downloaded."
    );
  };

  const handleShare = async () => {
    const shared =
      await shareTool({
        title:
          "IP / CIDR Calculator | ToolVerse",

        text: result
          ? `Calculate IPv4 subnet information for ${result.cidrNotation} with ToolVerse.`
          : "Calculate IPv4 and CIDR network information with ToolVerse.",

        url: window.location.href,
      });

    if (shared) {
      setToast(
        "Share dialog opened."
      );
    }
  };

  const handlePreset = (
    presetCidr
  ) => {
    setCidr(presetCidr);
    setError("");

    try {
      const calculated =
        calculateSubnet(
          ip,
          presetCidr
        );

      setResult(calculated);
    } catch {
      setResult(null);
    }
  };

  const handleExample = () => {
    const exampleIp =
      "192.168.1.10";

    const exampleCidr =
      "24";

    setIp(exampleIp);
    setCidr(exampleCidr);
    setError("");

    setResult(
      calculateSubnet(
        exampleIp,
        exampleCidr
      )
    );
  };

  const handleClear = () => {
    setIp("");
    setCidr("");
    setResult(null);
    setError("");
    setToast("");
  };

  const handleReset = () => {
    setIp(DEFAULT_IP);
    setCidr(DEFAULT_CIDR);
    setError("");
    setToast("");

    setResult(
      calculateSubnet(
        DEFAULT_IP,
        DEFAULT_CIDR
      )
    );
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">
        {/* Input */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_180px_auto] md:items-end">
            <div>
              <label
                htmlFor="ip-address"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                IPv4 Address
              </label>

              <input
                id="ip-address"
                type="text"
                inputMode="decimal"
                value={ip}
                onChange={(event) => {
                  setIp(
                    event.target.value
                  );
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    handleCalculate();
                  }
                }}
                placeholder="192.168.1.10"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="cidr-prefix"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                CIDR Prefix
              </label>

              <div className="flex items-center">
                <span className="rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 font-mono text-gray-500">
                  /
                </span>

                <input
                  id="cidr-prefix"
                  type="number"
                  min="0"
                  max="32"
                  value={cidr}
                  onChange={(event) => {
                    setCidr(
                      event.target.value
                    );
                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      handleCalculate();
                    }
                  }}
                  placeholder="24"
                  className="w-full rounded-r-lg border border-gray-300 px-3 py-3 font-mono outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={
                handleCalculate
              }
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Calculate
            </button>
          </div>

          {error && (
            <div className="mt-4">
              <ToolError
                message={error}
              />
            </div>
          )}
        </section>

        {/* Result */}
        {result ? (
          <>
            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Calculated Network
                  </p>

                  <h2 className="mt-1 font-mono text-2xl font-bold text-gray-900">
                    {result.cidrNotation}
                  </h2>
                </div>

                <span className="inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                  {result.addressType}
                </span>
              </div>
            </section>

            {/* Main results */}
            <section>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard
                  label="Network Address"
                  value={
                    result.networkAddress
                  }
                />

                <ResultCard
                  label="Broadcast Address"
                  value={
                    result.broadcastAddress
                  }
                />

                <ResultCard
                  label="Subnet Mask"
                  value={
                    result.subnetMask
                  }
                />

                <ResultCard
                  label="Wildcard Mask"
                  value={
                    result.wildcardMask
                  }
                />

                <ResultCard
                  label="First Usable IP"
                  value={
                    result.firstUsableIp
                  }
                />

                <ResultCard
                  label="Last Usable IP"
                  value={
                    result.lastUsableIp
                  }
                />

                <ResultCard
                  label="Total Addresses"
                  value={
                    result.totalAddresses.toLocaleString()
                  }
                />

                <ResultCard
                  label="Usable Hosts"
                  value={
                    result.usableHostCount.toLocaleString()
                  }
                />

                <ResultCard
                  label="CIDR Prefix"
                  value={`/${result.prefix}`}
                />
              </div>
            </section>

            {/* Binary */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Binary Representation
              </h2>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    IP Address
                  </div>

                  <div className="overflow-x-auto rounded-lg bg-gray-900 p-3 font-mono text-sm text-gray-100">
                    {result.ipBinary}
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Subnet Mask
                  </div>

                  <div className="overflow-x-auto rounded-lg bg-gray-900 p-3 font-mono text-sm text-gray-100">
                    {result.subnetMaskBinary}
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Network Address
                  </div>

                  <div className="overflow-x-auto rounded-lg bg-gray-900 p-3 font-mono text-sm text-gray-100">
                    {result.networkBinary}
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Broadcast Address
                  </div>

                  <div className="overflow-x-auto rounded-lg bg-gray-900 p-3 font-mono text-sm text-gray-100">
                    {result.broadcastBinary}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <ToolEmptyState
            title="No calculation yet"
            description="Enter an IPv4 address and CIDR prefix to calculate the network details."
          />
        )}

        {/* CIDR presets */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Common CIDR Prefixes
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CIDR_PRESETS.map(
              (preset) => (
                <button
                  key={preset.cidr}
                  type="button"
                  onClick={() =>
                    handlePreset(
                      preset.cidr
                    )
                  }
                  className={`rounded-lg border p-3 text-left transition ${
                    cidr ===
                    preset.cidr
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                  }`}
                >
                  <div className="font-mono font-bold text-gray-900">
                    /{preset.cidr}
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    {preset.description}
                  </div>
                </button>
              )
            )}
          </div>
        </section>

        {/* Actions */}
        <ToolActions
          supports={tool?.supports}
          onCopy={handleCopy}
          onDownload={
            handleDownload
          }
          onShare={handleShare}
          onReset={handleReset}
        />

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
            onClose={() =>
              setToast("")
            }
          />
        )}
      </div>
    </ToolLayout>
  );
}