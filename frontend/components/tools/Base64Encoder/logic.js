function bytesToBase64(bytes) {
  let binary = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);

    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

export function encodeBase64(value) {
  if (!value) {
    throw new Error("Please enter text to encode.");
  }

  const encoder = new TextEncoder();

  const bytes = encoder.encode(value);

  return bytesToBase64(bytes);
}

export function decodeBase64(value) {
  if (!value || !value.trim()) {
    throw new Error("Please enter Base64 text to decode.");
  }

  const normalized = value.replace(/\s/g, "");

  try {
    const bytes = base64ToBytes(normalized);

    const decoder = new TextDecoder("utf-8", {
      fatal: true,
    });

    return decoder.decode(bytes);
  } catch {
    throw new Error(
      "Invalid Base64 input or invalid UTF-8 data."
    );
  }
}