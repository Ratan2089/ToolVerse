/*
 * Hash Generator Logic
 *
 * Uses the browser Web Crypto API.
 *
 * Supported:
 * SHA-1
 * SHA-256
 * SHA-384
 * SHA-512
 */

export const HASH_ALGORITHMS = {
  SHA1: {
    id: "SHA-1",
    name: "SHA-1",
    description: "Legacy hash algorithm",
    security: "legacy",
  },

  SHA256: {
    id: "SHA-256",
    name: "SHA-256",
    description: "Secure general-purpose hash",
    security: "recommended",
  },

  SHA384: {
    id: "SHA-384",
    name: "SHA-384",
    description: "Secure SHA-2 hash",
    security: "recommended",
  },

  SHA512: {
    id: "SHA-512",
    name: "SHA-512",
    description: "Secure SHA-2 hash",
    security: "recommended",
  },
};


/* =========================================================
   AVAILABLE ALGORITHMS
   ========================================================= */

export const HASH_ALGORITHM_LIST = [
  HASH_ALGORITHMS.SHA1,
  HASH_ALGORITHMS.SHA256,
  HASH_ALGORITHMS.SHA384,
  HASH_ALGORITHMS.SHA512,
];


/* =========================================================
   TEXT ENCODER
   ========================================================= */

function encodeText(text) {
  if (
    typeof TextEncoder === "undefined"
  ) {
    throw new Error(
      "Text encoding is not supported by this browser."
    );
  }

  return new TextEncoder().encode(
    text
  );
}


/* =========================================================
   ARRAY BUFFER -> HEX
   ========================================================= */

export function bufferToHex(buffer) {
  const bytes =
    new Uint8Array(buffer);

  return Array.from(bytes)
    .map((byte) =>
      byte
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
}


/* =========================================================
   TEXT -> HASH
   ========================================================= */

export async function hashText(
  text,
  algorithm = "SHA-256"
) {
  if (
    typeof text !== "string"
  ) {
    throw new Error(
      "Input must be text."
    );
  }

  if (!algorithm) {
    throw new Error(
      "Please select a hash algorithm."
    );
  }

  const supported =
    HASH_ALGORITHM_LIST.some(
      (item) =>
        item.id === algorithm
    );

  if (!supported) {
    throw new Error(
      "Unsupported hash algorithm."
    );
  }

  if (
    typeof crypto === "undefined" ||
    !crypto.subtle
  ) {
    throw new Error(
      "Web Crypto API is not supported by this browser."
    );
  }

  const encoded =
    encodeText(text);

  const digest =
    await crypto.subtle.digest(
      algorithm,
      encoded
    );

  return bufferToHex(
    digest
  );
}


/* =========================================================
   GENERATE ALL HASHES
   ========================================================= */

export async function hashAll(
  text
) {
  const results = {};

  for (
    const algorithm
    of HASH_ALGORITHM_LIST
  ) {
    results[algorithm.id] =
      await hashText(
        text,
        algorithm.id
      );
  }

  return results;
}


/* =========================================================
   HASH MULTIPLE ALGORITHMS
   ========================================================= */

export async function hashSelected(
  text,
  algorithms
) {
  if (
    !Array.isArray(
      algorithms
    ) ||
    algorithms.length === 0
  ) {
    throw new Error(
      "Select at least one hash algorithm."
    );
  }

  const results = {};

  for (
    const algorithm
    of algorithms
  ) {
    results[algorithm] =
      await hashText(
        text,
        algorithm
      );
  }

  return results;
}


/* =========================================================
   TEXT STATISTICS
   ========================================================= */

export function getTextStatistics(
  text
) {
  const value =
    typeof text === "string"
      ? text
      : "";

  const characters =
    value.length;

  const bytes =
    encodeText(value).length;

  const words =
    value.trim()
      ? value
          .trim()
          .split(/\s+/)
          .length
      : 0;

  return {
    characters,
    bytes,
    words,
  };
}


/* =========================================================
   HASH LENGTH
   ========================================================= */

export function getHashLength(
  algorithm
) {
  switch (algorithm) {
    case "SHA-1":
      return 40;

    case "SHA-256":
      return 64;

    case "SHA-384":
      return 96;

    case "SHA-512":
      return 128;

    default:
      return 0;
  }
}


/* =========================================================
   FORMAT HASH
   ========================================================= */

export function formatHash(
  hash,
  uppercase = false
) {
  if (
    typeof hash !== "string"
  ) {
    return "";
  }

  return uppercase
    ? hash.toUpperCase()
    : hash.toLowerCase();
}


/* =========================================================
   FORMAT HASH RESULTS
   ========================================================= */

export function formatHashResults(
  results,
  uppercase = false
) {
  if (!results) {
    return {};
  }

  const formatted = {};

  Object.entries(results)
    .forEach(
      ([algorithm, hash]) => {
        formatted[algorithm] =
          formatHash(
            hash,
            uppercase
          );
      }
    );

  return formatted;
}


/* =========================================================
   DOWNLOAD TEXT
   ========================================================= */

export function createHashText(
  results
) {
  if (!results) {
    return "";
  }

  return Object.entries(results)
    .map(
      ([algorithm, hash]) =>
        `${algorithm}: ${hash}`
    )
    .join("\n");
}


/* =========================================================
   VERIFY HASH
   ========================================================= */

export async function verifyHash(
  text,
  expectedHash,
  algorithm = "SHA-256"
) {
  if (
    typeof expectedHash !==
    "string"
  ) {
    return false;
  }

  const generated =
    await hashText(
      text,
      algorithm
    );

  return (
    generated.toLowerCase() ===
    expectedHash
      .trim()
      .toLowerCase()
  );
}