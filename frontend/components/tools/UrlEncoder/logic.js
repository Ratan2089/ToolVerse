export function encodeComponent(value) {
  return encodeURIComponent(value);
}

export function decodeComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    throw new Error("Invalid URL encoded input.");
  }
}

export function encodeUri(value) {
  return encodeURI(value);
}

export function decodeUri(value) {
  try {
    return decodeURI(value);
  } catch {
    throw new Error("Invalid encoded URI.");
  }
}

export function parseUrl(value) {
  if (!value.trim()) {
    throw new Error("Please enter a URL.");
  }

  let url;

  try {
    url = new URL(value.trim());
  } catch {
    throw new Error(
      "Invalid URL. Please enter a complete URL such as https://example.com"
    );
  }

  const parameters = Array.from(
    url.searchParams.entries()
  ).map(([key, value]) => ({
    key,
    value,
  }));

  return {
    href: url.href,
    protocol: url.protocol,
    username: url.username,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    origin: url.origin,
    query: url.search
      ? url.search.substring(1)
      : "",
    parameters,
  };
}

export function getTextStatistics(value) {
  const text = value || "";

  return {
    characters: text.length,
    bytes: new TextEncoder().encode(text).length,
  };
}

export function createUrlText(
  input,
  output,
  operation
) {
  return [
    "ToolVerse URL Encoder / Decoder",
    "================================",
    "",
    `Operation: ${operation}`,
    "",
    "Input:",
    input,
    "",
    "Output:",
    output,
  ].join("\n");
}

export function swapValues(
  input,
  output
) {
  return {
    input: output || "",
    output: input || "",
  };
}