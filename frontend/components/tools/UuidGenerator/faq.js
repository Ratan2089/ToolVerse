const faq = [
  {
    question: "What is a UUID?",

    answer:
      "UUID stands for Universally Unique Identifier. It is a 128-bit identifier commonly used to uniquely identify objects, records, resources, and entities in software systems.",
  },

  {
    question: "What is UUID v4?",

    answer:
      "UUID version 4 is a randomly generated UUID. ToolVerse uses the browser's cryptographically secure random UUID implementation to generate UUID v4 values.",
  },

  {
    question: "How many UUIDs can I generate?",

    answer:
      "You can generate up to 1,000 UUIDs in a single operation.",
  },

  {
    question: "Are the generated UUIDs unique?",

    answer:
      "UUID v4 provides a very large random identifier space, making accidental collisions extremely unlikely when generated using a cryptographically secure random source.",
  },

  {
    question: "Can I generate UUIDs without an internet connection?",

    answer:
      "Yes. UUID generation happens locally in your browser using the Web Crypto API.",
  },

  {
    question: "What is the difference between UUID and GUID?",

    answer:
      "GUID is a term commonly associated with Microsoft's implementation of globally unique identifiers. In modern software development, UUID and GUID are often used interchangeably for similar identifier formats.",
  },

  {
    question: "Can I validate an existing UUID?",

    answer:
      "Yes. The UUID Validator checks whether the supplied value follows the standard UUID format and reports its UUID version and variant when valid.",
  },

  {
    question: "Is my generated UUID sent to a server?",

    answer:
      "No. UUID generation and validation are performed locally in your browser.",
  },
];

export default faq;