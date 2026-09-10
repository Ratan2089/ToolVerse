const faq = [
  {
    question: "What is a JSON diff tool?",
    answer:
      "A JSON diff tool compares two JSON documents and identifies properties or values that were added, removed, or changed.",
  },
  {
    question: "How do I compare two JSON objects?",
    answer:
      "Paste the first JSON document into JSON A, paste the second document into JSON B, and click Compare JSON.",
  },
  {
    question: "Can I compare JSON online for free?",
    answer:
      "Yes. ToolVerse's JSON Diff tool lets you compare JSON documents directly in your browser for free.",
  },
  {
    question: "Does JSON Diff support nested objects?",
    answer:
      "Yes. The comparison recursively checks nested objects and reports differences using their property paths.",
  },
  {
    question: "Does JSON Diff support arrays?",
    answer:
      "Yes. Arrays are compared recursively and differences in array values, additions, removals, and changes are reported.",
  },
  {
    question: "What types of JSON changes can it detect?",
    answer:
      "The tool can identify added properties, removed properties, changed values, and type changes.",
  },
  {
    question: "Can it compare numbers and strings?",
    answer:
      "Yes. JSON values such as strings, numbers, booleans, null values, arrays, and objects can be compared.",
  },
  {
    question: "What happens if one JSON property is removed?",
    answer:
      "The property is reported as a removed value and its original value is included in the comparison result.",
  },
  {
    question: "What happens if a new JSON property is added?",
    answer:
      "The property is reported as an added value and its new value is included in the comparison result.",
  },
  {
    question: "Does JSON Diff modify my JSON?",
    answer:
      "No. The original JSON inputs are not modified. The tool only compares the parsed JSON values.",
  },
  {
    question: "Is my JSON data uploaded to a server?",
    answer:
      "No. JSON comparison is performed locally in your browser.",
  },
  {
    question: "Can I copy the JSON diff result?",
    answer:
      "Yes. You can copy the generated comparison result to your clipboard.",
  },
  {
    question: "Can I download the JSON diff?",
    answer:
      "Yes. The comparison result can be downloaded as a JSON file.",
  },
];

export default faq;