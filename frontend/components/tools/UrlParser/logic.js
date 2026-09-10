const MAX_URL_LENGTH = 500000;

function validateInput(input) {
  if (!input || !input.trim()) {
    throw new Error("Please enter a URL to parse.");
  }

  if (input.length > MAX_URL_LENGTH) {
    throw new Error(
      `URL input is too large. Maximum length is ${MAX_URL_LENGTH} characters.`
    );
  }
}

function parseQueryParameters(url) {
  const parameters = {};

  url.searchParams.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(parameters, key)) {
      if (Array.isArray(parameters[key])) {
        parameters[key].push(value);
      } else {
        parameters[key] = [
          parameters[key],
          value,
        ];
      }
    } else {
      parameters[key] = value;
    }
  });

  return parameters;
}

export function parseUrl(input) {
  validateInput(input);

  const value = input.trim();

  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error(
      "Invalid URL. Please enter a complete and valid URL, such as https://example.com/path?query=value."
    );
  }

  return {
    href: url.href,
    protocol: url.protocol,
    username: url.username,
    password: url.password,
    hostname: url.hostname,
    port: url.port,
    host: url.host,
    origin: url.origin,
    pathname: url.pathname,
    search: url.search,
    query: url.search
      ? url.search.slice(1)
      : "",
    queryParameters: parseQueryParameters(url),
    hash: url.hash,
    fragment: url.hash
      ? url.hash.slice(1)
      : "",
  };
}

export function urlToJson(input) {
  const parsed = parseUrl(input);

  return JSON.stringify(
    parsed,
    null,
    2
  );
}

export function validateUrl(input) {
  try {
    parseUrl(input);

    return {
      valid: true,
      error: "",
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error?.message ||
        "Invalid URL.",
    };
  }
}

export function createDownloadText(output) {
  return `${String(output ?? "").trim()}\n`;
}