const STATUS_CODES = [
  // 1xx Informational
  {
    code: 100,
    name: "Continue",
    category: "Informational",
    description:
      "The server has received the initial part of the request and the client may continue sending the request.",
    useCase:
      "Used when a client sends an Expect: 100-continue request header before sending a request body.",
  },
  {
    code: 101,
    name: "Switching Protocols",
    category: "Informational",
    description:
      "The server is switching to a different protocol as requested by the client.",
    useCase:
      "Commonly associated with protocol upgrades such as WebSocket connections.",
  },
  {
    code: 102,
    name: "Processing",
    category: "Informational",
    description:
      "The server has received and is processing the request but has not completed it.",
    useCase:
      "Used to indicate that a long-running request is still being processed.",
  },
  {
    code: 103,
    name: "Early Hints",
    category: "Informational",
    description:
      "Provides preliminary response headers that can help a client begin preparing resources before the final response.",
    useCase:
      "Can be used to send Link headers for resources that may be needed by the final response.",
  },

  // 2xx Success
  {
    code: 200,
    name: "OK",
    category: "Success",
    description:
      "The request was successfully processed by the server.",
    useCase:
      "Common response for successful GET, POST, PUT, or other HTTP requests.",
  },
  {
    code: 201,
    name: "Created",
    category: "Success",
    description:
      "The request succeeded and resulted in a new resource being created.",
    useCase:
      "Commonly returned after successfully creating a resource through an API.",
  },
  {
    code: 202,
    name: "Accepted",
    category: "Success",
    description:
      "The request has been accepted for processing, but processing may not have completed yet.",
    useCase:
      "Useful for asynchronous operations such as background jobs.",
  },
  {
    code: 203,
    name: "Non-Authoritative Information",
    category: "Success",
    description:
      "The request succeeded, but the returned metadata may differ from the original server response.",
    useCase:
      "Can occur when a transforming proxy or intermediary modifies response information.",
  },
  {
    code: 204,
    name: "No Content",
    category: "Success",
    description:
      "The request succeeded but there is no content to return in the response body.",
    useCase:
      "Often used when an API successfully updates or deletes a resource without returning a body.",
  },
  {
    code: 205,
    name: "Reset Content",
    category: "Success",
    description:
      "The request succeeded and the client should reset the current document or input view.",
    useCase:
      "Can be used after form submission when the client should clear the form.",
  },
  {
    code: 206,
    name: "Partial Content",
    category: "Success",
    description:
      "The server is returning only part of the requested resource.",
    useCase:
      "Commonly used with HTTP range requests for resumable downloads or media streaming.",
  },

  // 3xx Redirection
  {
    code: 300,
    name: "Multiple Choices",
    category: "Redirection",
    description:
      "The requested resource has multiple possible representations or locations.",
    useCase:
      "Allows the client to choose among multiple available representations.",
  },
  {
    code: 301,
    name: "Moved Permanently",
    category: "Redirection",
    description:
      "The requested resource has been permanently moved to another URL.",
    useCase:
      "Commonly used when permanently redirecting an old URL to a new URL.",
  },
  {
    code: 302,
    name: "Found",
    category: "Redirection",
    description:
      "The requested resource is temporarily available at another URL.",
    useCase:
      "Used for temporary redirects.",
  },
  {
    code: 303,
    name: "See Other",
    category: "Redirection",
    description:
      "The client should retrieve the requested resource using another URL.",
    useCase:
      "Often used after a successful POST request to redirect the client to a result page.",
  },
  {
    code: 304,
    name: "Not Modified",
    category: "Redirection",
    description:
      "The resource has not changed since the version stored by the client.",
    useCase:
      "Used with conditional requests to allow clients to reuse cached resources.",
  },
  {
    code: 307,
    name: "Temporary Redirect",
    category: "Redirection",
    description:
      "The resource is temporarily available at another URL while preserving the original HTTP method.",
    useCase:
      "Useful for temporary redirects where the request method must remain unchanged.",
  },
  {
    code: 308,
    name: "Permanent Redirect",
    category: "Redirection",
    description:
      "The resource has permanently moved to another URL while preserving the HTTP method.",
    useCase:
      "Used for permanent redirects where the original HTTP method should be retained.",
  },

  // 4xx Client Errors
  {
    code: 400,
    name: "Bad Request",
    category: "Client Error",
    description:
      "The server cannot process the request because the request is invalid or malformed.",
    useCase:
      "Commonly returned when API request parameters, JSON, or request syntax are invalid.",
  },
  {
    code: 401,
    name: "Unauthorized",
    category: "Client Error",
    description:
      "The request requires valid authentication credentials.",
    useCase:
      "Returned when authentication is missing, invalid, or expired.",
  },
  {
    code: 402,
    name: "Payment Required",
    category: "Client Error",
    description:
      "Reserved for future use and historically associated with payment-related requests.",
    useCase:
      "Some APIs use this status for payment or subscription-related requirements.",
  },
  {
    code: 403,
    name: "Forbidden",
    category: "Client Error",
    description:
      "The server understood the request but refuses to authorize it.",
    useCase:
      "Used when the client is authenticated or recognized but does not have permission.",
  },
  {
    code: 404,
    name: "Not Found",
    category: "Client Error",
    description:
      "The requested resource could not be found on the server.",
    useCase:
      "Commonly returned when a URL or API resource does not exist.",
  },
  {
    code: 405,
    name: "Method Not Allowed",
    category: "Client Error",
    description:
      "The HTTP method used in the request is not supported for the requested resource.",
    useCase:
      "For example, an endpoint may support GET but reject DELETE.",
  },
  {
    code: 406,
    name: "Not Acceptable",
    category: "Client Error",
    description:
      "The server cannot provide a response matching the client's requested representation.",
    useCase:
      "Can occur when Accept headers request unsupported response formats.",
  },
  {
    code: 408,
    name: "Request Timeout",
    category: "Client Error",
    description:
      "The server timed out while waiting for the client to complete the request.",
    useCase:
      "Can occur when a client takes too long to send request data.",
  },
  {
    code: 409,
    name: "Conflict",
    category: "Client Error",
    description:
      "The request conflicts with the current state of the target resource.",
    useCase:
      "Common in APIs when attempting to create or update conflicting resources.",
  },
  {
    code: 410,
    name: "Gone",
    category: "Client Error",
    description:
      "The requested resource is no longer available and is intentionally unavailable.",
    useCase:
      "Useful when a resource has been permanently removed.",
  },
  {
    code: 411,
    name: "Length Required",
    category: "Client Error",
    description:
      "The server requires the request to include a valid Content-Length header.",
    useCase:
      "Returned when the server requires a known request body length.",
  },
  {
    code: 412,
    name: "Precondition Failed",
    category: "Client Error",
    description:
      "One or more request preconditions were not satisfied.",
    useCase:
      "Used with conditional requests involving headers such as If-Match.",
  },
  {
    code: 413,
    name: "Content Too Large",
    category: "Client Error",
    description:
      "The request content is larger than the server is willing or able to process.",
    useCase:
      "Common when uploading a file or request body that exceeds server limits.",
  },
  {
    code: 414,
    name: "URI Too Long",
    category: "Client Error",
    description:
      "The requested URI is longer than the server is willing to interpret.",
    useCase:
      "Can occur when a URL contains an excessively large query string.",
  },
  {
    code: 415,
    name: "Unsupported Media Type",
    category: "Client Error",
    description:
      "The server does not support the media format of the request.",
    useCase:
      "Common when an API expects JSON but receives an unsupported Content-Type.",
  },
  {
    code: 416,
    name: "Range Not Satisfiable",
    category: "Client Error",
    description:
      "The requested range cannot be satisfied for the target resource.",
    useCase:
      "Can occur when requesting an invalid byte range from a file.",
  },
  {
    code: 417,
    name: "Expectation Failed",
    category: "Client Error",
    description:
      "The server cannot meet the requirements specified in the Expect request header.",
    useCase:
      "Associated with failed request expectations.",
  },
  {
    code: 422,
    name: "Unprocessable Content",
    category: "Client Error",
    description:
      "The request is syntactically valid but cannot be processed because its content is semantically invalid.",
    useCase:
      "Frequently used by APIs for validation errors in otherwise valid JSON requests.",
  },
  {
    code: 425,
    name: "Too Early",
    category: "Client Error",
    description:
      "The server is unwilling to risk processing a request that may be replayed.",
    useCase:
      "Can be used as a replay-protection mechanism.",
  },
  {
    code: 426,
    name: "Upgrade Required",
    category: "Client Error",
    description:
      "The client must switch to another protocol before the request can be completed.",
    useCase:
      "Used when the server requires a protocol upgrade.",
  },
  {
    code: 428,
    name: "Precondition Required",
    category: "Client Error",
    description:
      "The server requires the request to be conditional.",
    useCase:
      "Can help prevent lost updates in resource modification requests.",
  },
  {
    code: 429,
    name: "Too Many Requests",
    category: "Client Error",
    description:
      "The client has sent too many requests within a given period.",
    useCase:
      "Commonly used for API rate limiting.",
  },
  {
    code: 431,
    name: "Request Header Fields Too Large",
    category: "Client Error",
    description:
      "The request headers are too large for the server to process.",
    useCase:
      "Can occur when cookies or other request headers become excessively large.",
  },
  {
    code: 451,
    name: "Unavailable For Legal Reasons",
    category: "Client Error",
    description:
      "The requested resource is unavailable because of legal restrictions.",
    useCase:
      "Used when access to content is blocked for legal reasons.",

  },

  // 5xx Server Errors
  {
    code: 500,
    name: "Internal Server Error",
    category: "Server Error",
    description:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
    useCase:
      "General server-side error used when no more specific error is appropriate.",
  },
  {
    code: 501,
    name: "Not Implemented",
    category: "Server Error",
    description:
      "The server does not support the functionality required to fulfill the request.",
    useCase:
      "Returned when a server does not implement the requested method or capability.",
  },
  {
    code: 502,
    name: "Bad Gateway",
    category: "Server Error",
    description:
      "A server acting as a gateway or proxy received an invalid response from an upstream server.",
    useCase:
      "Common with reverse proxies, gateways, CDNs, and load balancers.",
  },
  {
    code: 503,
    name: "Service Unavailable",
    category: "Server Error",
    description:
      "The server is currently unable to handle the request.",
    useCase:
      "Often used during maintenance, overload, or temporary service outages.",
  },
  {
    code: 504,
    name: "Gateway Timeout",
    category: "Server Error",
    description:
      "A gateway or proxy did not receive a timely response from an upstream server.",
    useCase:
      "Common when a backend service takes too long to respond.",
  },
  {
    code: 505,
    name: "HTTP Version Not Supported",
    category: "Server Error",
    description:
      "The server does not support the HTTP version used in the request.",
    useCase:
      "Returned when the requested HTTP protocol version is unsupported.",
  },
  {
    code: 506,
    name: "Variant Also Negotiates",
    category: "Server Error",
    description:
      "The server encountered an internal configuration error during transparent content negotiation.",
    useCase:
      "Usually indicates a server configuration problem.",
  },
  {
    code: 507,
    name: "Insufficient Storage",
    category: "Server Error",
    description:
      "The server cannot store the representation needed to complete the request.",
    useCase:
      "Associated with insufficient server-side storage.",
  },
  {
    code: 508,
    name: "Loop Detected",
    category: "Server Error",
    description:
      "The server detected an infinite loop while processing the request.",
    useCase:
      "Can occur during WebDAV operations involving circular processing.",
  },
  {
    code: 510,
    name: "Not Extended",
    category: "Server Error",
    description:
      "Further extensions to the request are required for the server to fulfill it.",
    useCase:
      "Associated with extension-based HTTP requests.",
  },
  {
    code: 511,
    name: "Network Authentication Required",
    category: "Server Error",
    description:
      "The client needs to authenticate with the network before it can access the requested resource.",
    useCase:
      "Commonly associated with captive portals and network authentication.",
  },
];

export const CATEGORIES = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "Informational",
    label: "1xx Informational",
  },
  {
    key: "Success",
    label: "2xx Success",
  },
  {
    key: "Redirection",
    label: "3xx Redirection",
  },
  {
    key: "Client Error",
    label: "4xx Client Error",
  },
  {
    key: "Server Error",
    label: "5xx Server Error",
  },
];

export function getStatusCodes() {
  return STATUS_CODES;
}

export function getStatusCode(code) {
  const numericCode = Number(code);

  return STATUS_CODES.find(
    (status) => status.code === numericCode
  );
}

export function searchStatusCodes(query, category = "all") {
  const normalizedQuery = String(query ?? "")
    .trim()
    .toLowerCase();

  return STATUS_CODES.filter((status) => {
    const matchesCategory =
      category === "all" ||
      status.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      String(status.code).includes(normalizedQuery) ||
      status.name.toLowerCase().includes(normalizedQuery) ||
      status.category.toLowerCase().includes(normalizedQuery) ||
      status.description
        .toLowerCase()
        .includes(normalizedQuery)
    );
  });
}

export function getCategoryLabel(category) {
  const match = CATEGORIES.find(
    (item) => item.key === category
  );

  return match?.label || "All";
}

export function createStatusSummary(status) {
  if (!status) {
    return "";
  }

  return [
    `HTTP ${status.code} ${status.name}`,
    `Category: ${status.category}`,
    "",
    status.description,
    "",
    `Common use: ${status.useCase}`,
  ].join("\n");
}

export function createDownloadContent(statuses) {
  return statuses
    .map(
      (status) =>
        [
          `HTTP ${status.code} ${status.name}`,
          `Category: ${status.category}`,
          `Description: ${status.description}`,
          `Common use: ${status.useCase}`,
        ].join("\n")
    )
    .join("\n\n");
}