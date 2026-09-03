"use client";

import { useState } from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";
import ToolError from "@/components/tools/shared/ToolError";
import ToolEmptyState from "@/components/tools/shared/ToolEmptyState";
import ToolToast from "@/components/tools/shared/ToolToast";

import { copyText } from "@/lib/clipboard";

import {
  handleShare as shareTool,
} from "@/lib/toolActions";

import {
  decodeJwt,
  formatJson,
  getJwtStatus,
  getVerificationInputType,
  verifyJwtSignature,
} from "./logic";

import faq from "./faq";


export default function JwtDecoder({
  tool,
}) {
  const [token, setToken] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState(null);

  const [
    verificationValue,
    setVerificationValue,
  ] = useState("");

  const [
    verificationStatus,
    setVerificationStatus,
  ] = useState("not-verified");

  const [
    verificationError,
    setVerificationError,
  ] = useState("");

  const [
    verifying,
    setVerifying,
  ] = useState(false);


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
     DECODE
     ===================================================== */

  const handleDecode = () => {
    setError("");

    setResult(null);

    setVerificationValue("");

    setVerificationStatus(
      "not-verified"
    );

    setVerificationError("");

    try {
      const decoded =
        decodeJwt(token);

      setResult(decoded);

      showToast(
        "JWT decoded successfully. Signature has not been verified yet."
      );
    } catch (error) {
      setError(
        error.message
      );
    }
  };


  /* =====================================================
     VERIFY
     ===================================================== */

  const handleVerify = async () => {
    if (!result) {
      showToast(
        "Decode the JWT first.",
        "error"
      );

      return;
    }

    if (!verificationValue.trim()) {
      showToast(
        "Enter the required secret or public key.",
        "error"
      );

      return;
    }

    setVerifying(true);

    setVerificationError("");

    setVerificationStatus(
      "not-verified"
    );

    try {
      const valid =
        await verifyJwtSignature({
          decodedJwt: result,

          verificationValue,
        });

      if (valid) {
        setVerificationStatus(
          "valid"
        );

        showToast(
          "JWT signature verified successfully."
        );
      } else {
        setVerificationStatus(
          "invalid"
        );

        setVerificationError(
          "The JWT signature is invalid."
        );

        showToast(
          "JWT signature verification failed.",
          "error"
        );
      }
    } catch (error) {
      setVerificationStatus(
        "invalid"
      );

      setVerificationError(
        error.message
      );

      showToast(
        "JWT signature verification failed.",
        "error"
      );
    } finally {
      setVerifying(false);
    }
  };


  /* =====================================================
     COPY
     ===================================================== */

  const handleCopy = async (
    value,
    message
  ) => {
    if (!value) {
      showToast(
        "Nothing to copy.",
        "error"
      );

      return;
    }

    const copied =
      await copyText(value);

    if (copied) {
      showToast(message);
    } else {
      showToast(
        "Unable to copy to clipboard.",
        "error"
      );
    }
  };


  const handleCopyAll = async () => {
    if (!result) {
      showToast(
        "Decode a JWT first.",
        "error"
      );

      return;
    }

    const content = [
      "JWT Header",

      formatJson(
        result.header
      ),

      "",

      "JWT Payload",

      formatJson(
        result.payload
      ),

      "",

      "JWT Signature",

      result.signature,
    ].join("\n");

    await handleCopy(
      content,
      "Decoded JWT copied."
    );
  };


  /* =====================================================
     SHARE
     ===================================================== */

  const handleShare = async () => {
    try {
      const shared =
        await shareTool({
          title:
            "JWT Decoder & Signature Verifier | ToolVerse",

          text:
            "Decode and verify JWT signatures with ToolVerse.",

          url:
            window.location.href,
        });

      if (!shared) {
        showToast(
          "Sharing is not supported on this browser.",
          "error"
        );
      }
    } catch (error) {
      if (
        error?.name !==
        "AbortError"
      ) {
        showToast(
          "Unable to share this tool.",
          "error"
        );
      }
    }
  };


  /* =====================================================
     RESET
     ===================================================== */

  const handleReset = () => {
    setToken("");

    setResult(null);

    setError("");

    setVerificationValue("");

    setVerificationStatus(
      "not-verified"
    );

    setVerificationError("");

    setVerifying(false);

    showToast(
      "JWT decoder reset."
    );
  };


  /* =====================================================
     STATUS
     ===================================================== */

  const status =
    result
      ? getJwtStatus(
          result.payload
        )
      : null;


  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-6">

        {/* =================================================
            TOKEN INPUT
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold">
                JWT Token
              </h2>

              <p className="text-sm text-slate-500">
                Paste a JWT to decode its header and payload.
              </p>
            </div>

            {token && (
              <button
                type="button"
                onClick={() => {
                  setToken("");

                  setResult(null);

                  setError("");

                  setVerificationValue("");

                  setVerificationStatus(
                    "not-verified"
                  );

                  setVerificationError("");
                }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Clear
              </button>
            )}

          </div>

          <textarea
            value={token}
            onChange={(event) => {
              setToken(
                event.target.value
              );

              setError("");

              setResult(null);

              setVerificationStatus(
                "not-verified"
              );

              setVerificationError("");
            }}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            spellCheck={false}
            className="min-h-[200px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
            aria-label="JWT token input"
          />

        </section>


        {/* =================================================
            ERROR
        ================================================= */}

        <ToolError
          message={error}
        />


        {/* =================================================
            PRIMARY ACTIONS
        ================================================= */}

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={handleDecode}
            className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Decode JWT
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Reset
          </button>

        </div>


        {/* =================================================
            RESULT
        ================================================= */}

        {result ? (

          <div className="space-y-6">


            {/* =============================================
                TOKEN INFORMATION
            ============================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h2 className="mb-4 text-lg font-semibold">
                Token Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">


                {/* Algorithm */}

                <InfoCard
                  label="Algorithm"
                  value={
                    result.header.alg ||
                    "Not specified"
                  }
                />


                {/* Token Type */}

                <InfoCard
                  label="Token Type"
                  value={
                    result.header.typ ||
                    "Not specified"
                  }
                />


                {/* Expiration */}

                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">

                  <p className="text-sm text-slate-500">
                    Expiration
                  </p>

                  <p
                    className={`mt-1 font-semibold ${
                      status?.expired
                        ? "text-red-600"
                        : status?.hasExpiration
                          ? "text-green-600"
                          : ""
                    }`}
                  >
                    {!status?.hasExpiration
                      ? "No expiration claim"
                      : status.expired
                        ? "Expired"
                        : "Not expired"}
                  </p>

                  {status?.expiresAt && (
                    <p className="mt-1 text-xs text-slate-500">
                      {status.expiresAt.toLocaleString()}
                    </p>
                  )}

                </div>


                {/* Issued At */}

                <InfoCard
                  label="Issued At"
                  value={
                    status?.issuedAt
                      ? status.issuedAt.toLocaleString()
                      : "Not specified"
                  }
                />


                {/* Not Before */}

                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">

                  <p className="text-sm text-slate-500">
                    Not Before
                  </p>

                  <p
                    className={`mt-1 font-semibold ${
                      status?.notActiveYet
                        ? "text-amber-600"
                        : status?.hasNotBefore
                          ? "text-green-600"
                          : ""
                    }`}
                  >
                    {!status?.hasNotBefore
                      ? "Not specified"
                      : status.notActiveYet
                        ? "Not active yet"
                        : "Active"}
                  </p>

                  {status?.notBefore && (
                    <p className="mt-1 text-xs text-slate-500">
                      {status.notBefore.toLocaleString()}
                    </p>
                  )}

                </div>


                {/* Verification */}

                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">

                  <p className="text-sm text-slate-500">
                    Signature Verification
                  </p>

                  {verificationStatus ===
                    "valid" && (
                    <p className="mt-1 font-semibold text-green-600">
                      ✓ Cryptographically verified
                    </p>
                  )}

                  {verificationStatus ===
                    "invalid" && (
                    <p className="mt-1 font-semibold text-red-600">
                      ✕ Verification failed
                    </p>
                  )}

                  {verificationStatus ===
                    "not-verified" && (
                    <p className="mt-1 font-semibold text-amber-600">
                      Not verified
                    </p>
                  )}

                </div>

              </div>

            </section>


            {/* =============================================
                SIGNATURE VERIFICATION
            ============================================= */}

            <JwtVerifier
              algorithm={
                result.header.alg
              }

              value={
                verificationValue
              }

              setValue={(value) => {
                setVerificationValue(
                  value
                );

                setVerificationStatus(
                  "not-verified"
                );

                setVerificationError("");
              }}

              status={
                verificationStatus
              }

              error={
                verificationError
              }

              verifying={
                verifying
              }

              onVerify={
                handleVerify
              }
            />


            {/* =============================================
                HEADER
            ============================================= */}

            <JwtSection
              title="Header"
              value={formatJson(
                result.header
              )}
              onCopy={() =>
                handleCopy(
                  formatJson(
                    result.header
                  ),
                  "Header copied."
                )
              }
            />


            {/* =============================================
                PAYLOAD
            ============================================= */}

            <JwtSection
              title="Payload"
              value={formatJson(
                result.payload
              )}
              onCopy={() =>
                handleCopy(
                  formatJson(
                    result.payload
                  ),
                  "Payload copied."
                )
              }
            />


            {/* =============================================
                SIGNATURE
            ============================================= */}

            <JwtSection
              title="Signature"
              value={
                result.signature
              }
              onCopy={() =>
                handleCopy(
                  result.signature,
                  "Signature copied."
                )
              }
            />


            {/* =============================================
                GLOBAL ACTIONS
            ============================================= */}

            <ToolActions
              supports={{
                copy: true,
                download: false,
                share: true,
                reset: true,
              }}

              onCopy={
                handleCopyAll
              }

              onShare={
                handleShare
              }

              onReset={
                handleReset
              }
            />

          </div>

        ) : (

          <ToolEmptyState
            title="No decoded token yet"
            description="Enter a JWT and click Decode JWT to inspect its contents."
          />

        )}


        <ToolToast
          toast={toast}
        />

      </div>

    </ToolLayout>
  );
}


/* =========================================================
   INFO CARD
   ========================================================= */

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   JWT VERIFIER
   ========================================================= */

function JwtVerifier({
  algorithm,
  value,
  setValue,
  status,
  error,
  verifying,
  onVerify,
}) {
  const inputType =
    getVerificationInputType(
      algorithm
    );

  if (
    inputType ===
    "unsupported"
  ) {
    return (
      <section className="rounded-2xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">

        <h2 className="text-lg font-semibold">
          Signature Verification
        </h2>

        <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
          Cryptographic verification for{" "}
          <strong>
            {algorithm}
          </strong>{" "}
          is not supported by this tool.
        </p>

      </section>
    );
  }

  const isSecret =
    inputType === "secret";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="mb-5">

        <h2 className="text-lg font-semibold">
          Signature Verification
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Algorithm:{" "}
          <strong>
            {algorithm}
          </strong>
        </p>

      </div>


      {/* Input */}

      <label className="block text-sm font-semibold">

        {isSecret
          ? "HMAC Secret"
          : "Public Key"}

      </label>


      {isSecret ? (

        <input
          type="password"
          value={value}
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
          placeholder="Enter the HMAC secret"
          autoComplete="off"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
        />

      ) : (

        <textarea
          value={value}
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
          placeholder={`-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----`}
          spellCheck={false}
          className="mt-2 min-h-[180px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
        />

      )}


      <p className="mt-2 text-xs text-slate-500">

        {isSecret
          ? "The secret is used locally in your browser for HMAC signature verification."
          : "Use an SPKI PEM public key. The public key is processed locally in your browser."}

      </p>


      {/* Verification error */}

      {error && (

        <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>

      )}


      {/* Verify button + status */}

      <div className="mt-5 flex flex-wrap items-center gap-4">

        <button
          type="button"
          onClick={onVerify}
          disabled={
            !value.trim() ||
            verifying
          }
          className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {verifying
            ? "Verifying..."
            : "Verify Signature"}
        </button>


        {status === "valid" && (

          <span className="font-semibold text-green-600">
            ✓ Signature valid
          </span>

        )}


        {status === "invalid" && (

          <span className="font-semibold text-red-600">
            ✕ Signature invalid
          </span>

        )}


        {status ===
          "not-verified" && (

          <span className="font-semibold text-amber-600">
            Not verified
          </span>

        )}

      </div>

    </section>
  );
}


/* =========================================================
   JWT SECTION
   ========================================================= */

function JwtSection({
  title,
  value,
  onCopy,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Copy
        </button>

      </div>

      <textarea
        value={value}
        readOnly
        spellCheck={false}
        className="min-h-[180px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none dark:border-slate-700 dark:bg-slate-950"
        aria-label={`${title} output`}
      />

    </section>
  );
}