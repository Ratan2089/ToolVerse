const faq = [
  {
    question: "What is an HTTP status code?",
    answer:
      "An HTTP status code is a three-digit response code returned by a web server to indicate the result of an HTTP request. Status codes are grouped into informational, success, redirection, client error, and server error categories.",
  },
  {
    question: "What does HTTP 200 mean?",
    answer:
      "HTTP 200 OK means the request was successfully processed by the server.",
  },
  {
    question: "What does HTTP 201 mean?",
    answer:
      "HTTP 201 Created means the request succeeded and a new resource was created.",
  },
  {
    question: "What does HTTP 301 mean?",
    answer:
      "HTTP 301 Moved Permanently indicates that a resource has permanently moved to another URL.",
  },
  {
    question: "What does HTTP 400 mean?",
    answer:
      "HTTP 400 Bad Request means the server could not process the request because the request was invalid or malformed.",
  },
  {
    question: "What is the difference between 401 and 403?",
    answer:
      "HTTP 401 indicates that authentication is required or invalid, while HTTP 403 indicates that the server understood the request but refuses to authorize access.",
  },
  {
    question: "What does HTTP 404 mean?",
    answer:
      "HTTP 404 Not Found means the requested resource could not be found on the server.",
  },
  {
    question: "What does HTTP 429 mean?",
    answer:
      "HTTP 429 Too Many Requests indicates that the client has sent too many requests within a given period. It is commonly used for API rate limiting.",
  },
  {
    question: "What does HTTP 500 mean?",
    answer:
      "HTTP 500 Internal Server Error indicates that the server encountered an unexpected condition while processing the request.",
  },
  {
    question: "What is the difference between HTTP 502 and 504?",
    answer:
      "HTTP 502 Bad Gateway means a gateway or proxy received an invalid response from an upstream server. HTTP 504 Gateway Timeout means the gateway or proxy did not receive a timely response from the upstream server.",
  },
  {
    question: "What do 4xx HTTP status codes mean?",
    answer:
      "4xx status codes generally indicate that the request cannot be fulfilled because of an issue with the client request, authentication, authorization, or requested resource.",
  },
  {
    question: "What do 5xx HTTP status codes mean?",
    answer:
      "5xx status codes indicate that the server encountered an error or is unable to fulfill an otherwise valid request.",
  },
  {
    question: "Can I use this HTTP status code checker for API development?",
    answer:
      "Yes. You can use it as a quick reference while developing REST APIs, debugging requests, checking response codes, and understanding common HTTP errors.",
  },
  {
    question: "Does this tool send requests to my server?",
    answer:
      "No. This tool is a status-code reference and lookup tool. It does not make HTTP requests to external websites or APIs.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "The status-code lookup and search functionality runs in the browser. No external server request is required to look up the status codes.",
  },
];

export default faq;