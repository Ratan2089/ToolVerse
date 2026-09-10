const faq = [
  {
    question: "What is a URL parser?",
    answer:
      "A URL parser breaks a URL into its individual components, such as protocol, hostname, port, pathname, query parameters, and fragment.",
  },
  {
    question: "How do I parse a URL online?",
    answer:
      "Paste a complete URL into the URL Parser and click Parse URL. ToolVerse extracts the URL components and displays them in a structured format.",
  },
  {
    question: "What information can a URL parser extract?",
    answer:
      "A URL parser can extract the protocol, username, password, hostname, port, pathname, search string, query parameters, hash, origin, and complete URL.",
  },
  {
    question: "What are URL query parameters?",
    answer:
      "Query parameters are key-value pairs that appear after the question mark in a URL. For example, ?page=2&sort=price contains the parameters page and sort.",
  },
  {
    question: "Can I parse query strings separately?",
    answer:
      "Yes. The parser extracts query parameters and displays them as structured key-value data.",
  },
  {
    question: "Does the URL parser decode query parameters?",
    answer:
      "Yes. URLSearchParams is used to interpret URL query parameters, so percent-encoded parameter values are represented in decoded form.",
  },
  {
    question: "Can it detect the URL protocol?",
    answer:
      "Yes. The parser extracts protocols such as HTTP and HTTPS from the URL.",
  },
  {
    question: "Can it extract the port number?",
    answer:
      "Yes. If a URL explicitly contains a port, the parser displays it separately.",
  },
  {
    question: "Can it parse URL fragments?",
    answer:
      "Yes. The URL fragment, also called the hash, is extracted separately from the rest of the URL.",
  },
  {
    question: "Can I copy the parsed URL information?",
    answer:
      "Yes. The parsed result can be copied to your clipboard.",
  },
  {
    question: "Can I download the parsed URL information?",
    answer:
      "Yes. You can download the parsed result as a JSON file.",
  },
  {
    question: "Is my URL sent to a server?",
    answer:
      "No. URL parsing is performed locally in your browser. The URL does not need to be uploaded to a server.",
  },
  {
    question: "What happens if I enter an invalid URL?",
    answer:
      "The parser displays an error when the browser URL parser cannot interpret the provided value as a valid URL.",
  },
];

export default faq;