const faq = [
  {
    question:
      "What is URL encoding?",

    answer:
      "URL encoding converts characters that have special meanings in URLs or characters that cannot safely appear in URLs into percent-encoded representations.",
  },

  {
    question:
      "What is percent encoding?",

    answer:
      "Percent encoding represents bytes using a percent sign followed by two hexadecimal characters. For example, a space can commonly be represented as %20.",
  },

  {
    question:
      "What is the difference between encodeURI and encodeURIComponent?",

    answer:
      "encodeURI is designed for complete URIs while encodeURIComponent is designed for individual URI components such as query parameter values.",
  },

  {
    question:
      "When should I use encodeURIComponent?",

    answer:
      "Use encodeURIComponent when encoding individual values that will be inserted into a URL, such as query parameter values.",
  },

  {
    question:
      "Can I decode a URL with this tool?",

    answer:
      "Yes. You can decode URL components or complete encoded URIs.",
  },

  {
    question:
      "Can this tool parse query parameters?",

    answer:
      "Yes. The Parse URL mode displays URL components and extracts query parameters into key-value pairs.",
  },

  {
    question:
      "Does URL encoding encrypt my data?",

    answer:
      "No. URL encoding is not encryption and should not be used to protect sensitive information.",
  },

  {
    question:
      "Is my URL sent to a server?",

    answer:
      "No. URL encoding, decoding, and parsing are performed locally in your browser.",
  },
];

export default faq;