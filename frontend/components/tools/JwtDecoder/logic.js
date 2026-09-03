/*
 * JWT Decoder + Signature Verification
 *
 * Supported algorithms:
 * HS256, HS384, HS512
 * RS256, RS384, RS512
 * PS256, PS384, PS512
 * ES256, ES384, ES512
 *
 * Verification is performed locally using Web Crypto API.
 */


/* =========================================================
   BASE64URL UTILITIES
   ========================================================= */

function base64UrlToBytes(value) {
  if (!value || typeof value !== "string") {
    throw new Error("JWT section is empty.");
  }

  // JWT Base64URL should only contain these characters.
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error("Invalid Base64URL encoding.");
  }

  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padding =
    "=".repeat((4 - (base64.length % 4)) % 4);

  try {
    const binary = atob(base64 + padding);

    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
  } catch {
    throw new Error("Invalid Base64URL encoding.");
  }
}


function decodeBase64UrlText(value) {
  const bytes = base64UrlToBytes(value);

  try {
    return new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);
  } catch {
    throw new Error(
      "Invalid UTF-8 data in JWT."
    );
  }
}


/* =========================================================
   JWT DECODING
   ========================================================= */

function parseJsonSection(
  encodedSection,
  sectionName
) {
  const decoded =
    decodeBase64UrlText(encodedSection);

  try {
    return JSON.parse(decoded);
  } catch {
    throw new Error(
      `Invalid JSON in JWT ${sectionName}.`
    );
  }
}


export function decodeJwt(token) {
  if (!token || !token.trim()) {
    throw new Error(
      "Please enter a JWT."
    );
  }

  const normalizedToken =
    token.trim();

  const parts =
    normalizedToken.split(".");

  if (parts.length !== 3) {
    throw new Error(
      "Invalid JWT structure. A signed JWT must contain three sections separated by dots."
    );
  }

  const [
    encodedHeader,
    encodedPayload,
    encodedSignature,
  ] = parts;

  if (!encodedHeader) {
    throw new Error(
      "JWT header is missing."
    );
  }

  if (!encodedPayload) {
    throw new Error(
      "JWT payload is missing."
    );
  }

  if (!encodedSignature) {
    throw new Error(
      "JWT signature is missing."
    );
  }

  const header =
    parseJsonSection(
      encodedHeader,
      "header"
    );

  const payload =
    parseJsonSection(
      encodedPayload,
      "payload"
    );

  if (
    !header ||
    typeof header !== "object" ||
    Array.isArray(header)
  ) {
    throw new Error(
      "JWT header must be a JSON object."
    );
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    throw new Error(
      "JWT payload must be a JSON object."
    );
  }

  if (!header.alg) {
    throw new Error(
      "JWT header does not specify an algorithm."
    );
  }

  return {
    header,
    payload,

    signature:
      encodedSignature,

    encodedHeader,

    encodedPayload,

    signingInput:
      `${encodedHeader}.${encodedPayload}`,
  };
}

export function formatJson(value) {
  return JSON.stringify(value, null, 2);
}


/* =========================================================
   JWT CLAIMS
   ========================================================= */

export function getJwtStatus(payload) {
  const now =
    Math.floor(Date.now() / 1000);

  const hasExpiration =
    typeof payload?.exp === "number";

  const hasIssuedAt =
    typeof payload?.iat === "number";

  const hasNotBefore =
    typeof payload?.nbf === "number";

  return {
    hasExpiration,

    expired:
      hasExpiration &&
      now >= payload.exp,

    expiresAt:
      hasExpiration
        ? new Date(payload.exp * 1000)
        : null,

    hasIssuedAt,

    issuedAt:
      hasIssuedAt
        ? new Date(payload.iat * 1000)
        : null,

    hasNotBefore,

    notActiveYet:
      hasNotBefore &&
      now < payload.nbf,

    notBefore:
      hasNotBefore
        ? new Date(payload.nbf * 1000)
        : null,
  };
}


/* =========================================================
   ALGORITHM CONFIGURATION
   ========================================================= */

const HMAC_ALGORITHMS = {
  HS256: "SHA-256",
  HS384: "SHA-384",
  HS512: "SHA-512",
};

const RSA_ALGORITHMS = {
  RS256: "SHA-256",
  RS384: "SHA-384",
  RS512: "SHA-512",
};

const RSA_PSS_ALGORITHMS = {
  PS256: {
    hash: "SHA-256",
    saltLength: 32,
  },

  PS384: {
    hash: "SHA-384",
    saltLength: 48,
  },

  PS512: {
    hash: "SHA-512",
    saltLength: 64,
  },
};

const ECDSA_ALGORITHMS = {
  ES256: {
    hash: "SHA-256",
    curve: "P-256",
    coordinateLength: 32,
  },

  ES384: {
    hash: "SHA-384",
    curve: "P-384",
    coordinateLength: 48,
  },

  ES512: {
    hash: "SHA-512",
    curve: "P-521",
    coordinateLength: 66,
  },
};


/* =========================================================
   ALGORITHM HELPERS
   ========================================================= */

export function getAlgorithmFamily(
  algorithm
) {
  if (HMAC_ALGORITHMS[algorithm]) {
    return "hmac";
  }

  if (RSA_ALGORITHMS[algorithm]) {
    return "rsa";
  }

  if (RSA_PSS_ALGORITHMS[algorithm]) {
    return "rsa-pss";
  }

  if (ECDSA_ALGORITHMS[algorithm]) {
    return "ecdsa";
  }

  return "unsupported";
}


export function getVerificationInputType(
  algorithm
) {
  const family =
    getAlgorithmFamily(algorithm);

  if (family === "hmac") {
    return "secret";
  }

  if (
    family === "rsa" ||
    family === "rsa-pss" ||
    family === "ecdsa"
  ) {
    return "public-key";
  }

  return "unsupported";
}


/* =========================================================
   PEM PUBLIC KEY
   ========================================================= */

function pemToArrayBuffer(pem) {
  if (!pem || !pem.trim()) {
    throw new Error(
      "Please enter a public key."
    );
  }

  const normalized =
    pem.trim();

  if (
    !normalized.includes(
      "-----BEGIN PUBLIC KEY-----"
    )
  ) {
    throw new Error(
      "Please provide an SPKI public key in PEM format."
    );
  }

  if (
    !normalized.includes(
      "-----END PUBLIC KEY-----"
    )
  ) {
    throw new Error(
      "Public key PEM ending is missing."
    );
  }

  const base64 =
    normalized
      .replace(
        "-----BEGIN PUBLIC KEY-----",
        ""
      )
      .replace(
        "-----END PUBLIC KEY-----",
        ""
      )
      .replace(/\s/g, "");

  if (!base64) {
    throw new Error(
      "Public key is empty."
    );
  }

  try {
    const binary =
      atob(base64);

    const bytes =
      new Uint8Array(
        binary.length
      );

    for (
      let i = 0;
      i < binary.length;
      i++
    ) {
      bytes[i] =
        binary.charCodeAt(i);
    }

    return bytes.buffer;
  } catch {
    throw new Error(
      "Public key contains invalid Base64 data."
    );
  }
}


/* =========================================================
   HMAC VERIFICATION
   ========================================================= */

async function verifyHmac(
  algorithm,
  signingInput,
  signature,
  secret
) {
  if (!secret) {
    throw new Error(
      "Please enter the HMAC secret."
    );
  }

  const hash =
    HMAC_ALGORITHMS[algorithm];

  const encoder =
    new TextEncoder();

  const key =
    await crypto.subtle.importKey(
      "raw",

      encoder.encode(secret),

      {
        name: "HMAC",

        hash: {
          name: hash,
        },
      },

      false,

      ["verify"]
    );

  return crypto.subtle.verify(
    {
      name: "HMAC",
    },

    key,

    base64UrlToBytes(signature),

    encoder.encode(signingInput)
  );
}


/* =========================================================
   RSA PKCS#1 v1.5 VERIFICATION
   ========================================================= */

async function verifyRsa(
  algorithm,
  signingInput,
  signature,
  publicKey
) {
  const hash =
    RSA_ALGORITHMS[algorithm];

  const key =
    await crypto.subtle.importKey(
      "spki",

      pemToArrayBuffer(publicKey),

      {
        name:
          "RSASSA-PKCS1-v1_5",

        hash: {
          name: hash,
        },
      },

      false,

      ["verify"]
    );

  return crypto.subtle.verify(
    {
      name:
        "RSASSA-PKCS1-v1_5",
    },

    key,

    base64UrlToBytes(signature),

    new TextEncoder().encode(
      signingInput
    )
  );
}


/* =========================================================
   RSA-PSS VERIFICATION
   ========================================================= */

async function verifyRsaPss(
  algorithm,
  signingInput,
  signature,
  publicKey
) {
  const config =
    RSA_PSS_ALGORITHMS[algorithm];

  const key =
    await crypto.subtle.importKey(
      "spki",

      pemToArrayBuffer(publicKey),

      {
        name: "RSA-PSS",

        hash: {
          name: config.hash,
        },
      },

      false,

      ["verify"]
    );

  return crypto.subtle.verify(
    {
      name: "RSA-PSS",

      saltLength:
        config.saltLength,
    },

    key,

    base64UrlToBytes(signature),

    new TextEncoder().encode(
      signingInput
    )
  );
}


/* =========================================================
   ECDSA JOSE -> DER
   ========================================================= */

function trimInteger(bytes) {
  let offset = 0;

  while (
    offset < bytes.length - 1 &&
    bytes[offset] === 0
  ) {
    offset++;
  }

  let result =
    bytes.slice(offset);

  // DER INTEGER must be positive.
  if (result[0] & 0x80) {
    const prefixed =
      new Uint8Array(
        result.length + 1
      );

    prefixed[0] = 0;

    prefixed.set(
      result,
      1
    );

    result = prefixed;
  }

  return result;
}


function encodeDerLength(length) {
  if (length < 128) {
    return Uint8Array.of(length);
  }

  const bytes = [];

  let value = length;

  while (value > 0) {
    bytes.unshift(
      value & 0xff
    );

    value >>= 8;
  }

  return Uint8Array.of(
    0x80 | bytes.length,
    ...bytes
  );
}


function joseSignatureToDer(
  signature,
  coordinateLength
) {
  const bytes =
    base64UrlToBytes(signature);

  if (
    bytes.length !==
    coordinateLength * 2
  ) {
    throw new Error(
      "Invalid ECDSA JWT signature length."
    );
  }

  const r =
    trimInteger(
      bytes.slice(
        0,
        coordinateLength
      )
    );

  const s =
    trimInteger(
      bytes.slice(
        coordinateLength
      )
    );

  const rLength =
    encodeDerLength(r.length);

  const sLength =
    encodeDerLength(s.length);

  const rPart =
    new Uint8Array(
      1 +
        rLength.length +
        r.length
    );

  rPart[0] = 0x02;

  rPart.set(
    rLength,
    1
  );

  rPart.set(
    r,
    1 + rLength.length
  );

  const sPart =
    new Uint8Array(
      1 +
        sLength.length +
        s.length
    );

  sPart[0] = 0x02;

  sPart.set(
    sLength,
    1
  );

  sPart.set(
    s,
    1 + sLength.length
  );

  const sequenceLength =
    rPart.length +
    sPart.length;

  const sequenceLengthBytes =
    encodeDerLength(
      sequenceLength
    );

  const der =
    new Uint8Array(
      1 +
        sequenceLengthBytes.length +
        sequenceLength
    );

  der[0] = 0x30;

  der.set(
    sequenceLengthBytes,
    1
  );

  der.set(
    rPart,
    1 + sequenceLengthBytes.length
  );

  der.set(
    sPart,
    1 +
      sequenceLengthBytes.length +
      rPart.length
  );

  return der;
}


/* =========================================================
   ECDSA VERIFICATION
   ========================================================= */

async function verifyEcdsa(
  algorithm,
  signingInput,
  signature,
  publicKey
) {
  const config =
    ECDSA_ALGORITHMS[algorithm];

  const key =
    await crypto.subtle.importKey(
      "spki",

      pemToArrayBuffer(publicKey),

      {
        name: "ECDSA",

        namedCurve:
          config.curve,
      },

      false,

      ["verify"]
    );

  const derSignature =
    joseSignatureToDer(
      signature,
      config.coordinateLength
    );

  return crypto.subtle.verify(
    {
      name: "ECDSA",

      hash: {
        name: config.hash,
      },
    },

    key,

    derSignature,

    new TextEncoder().encode(
      signingInput
    )
  );
}


/* =========================================================
   MAIN SIGNATURE VERIFICATION
   ========================================================= */

export async function verifyJwtSignature({
  decodedJwt,
  verificationValue,
}) {
  if (!decodedJwt) {
    throw new Error(
      "Decode the JWT before verifying its signature."
    );
  }

  const algorithm =
    decodedJwt.header?.alg;

  if (!algorithm) {
    throw new Error(
      "JWT algorithm is missing."
    );
  }

  if (algorithm === "none") {
    throw new Error(
      'JWTs using alg "none" are not supported for signature verification.'
    );
  }

  if (!decodedJwt.signature) {
    throw new Error(
      "JWT signature is missing."
    );
  }

  if (
    getAlgorithmFamily(
      algorithm
    ) === "unsupported"
  ) {
    throw new Error(
      `The ${algorithm} algorithm is not supported for cryptographic verification.`
    );
  }

  try {
    if (
      HMAC_ALGORITHMS[algorithm]
    ) {
      return await verifyHmac(
        algorithm,

        decodedJwt.signingInput,

        decodedJwt.signature,

        verificationValue
      );
    }

    if (
      RSA_ALGORITHMS[algorithm]
    ) {
      return await verifyRsa(
        algorithm,

        decodedJwt.signingInput,

        decodedJwt.signature,

        verificationValue
      );
    }

    if (
      RSA_PSS_ALGORITHMS[algorithm]
    ) {
      return await verifyRsaPss(
        algorithm,

        decodedJwt.signingInput,

        decodedJwt.signature,

        verificationValue
      );
    }

    if (
      ECDSA_ALGORITHMS[algorithm]
    ) {
      return await verifyEcdsa(
        algorithm,

        decodedJwt.signingInput,

        decodedJwt.signature,

        verificationValue
      );
    }

    throw new Error(
      `Unsupported JWT algorithm: ${algorithm}`
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message
    ) {
      throw error;
    }

    throw new Error(
      "JWT signature verification failed."
    );
  }
}