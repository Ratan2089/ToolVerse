const faq = [
  {
    question: "What is a JSON to CSV converter?",
    answer:
      "A JSON to CSV converter transforms structured JSON data into CSV format so it can be opened and processed by spreadsheet applications and other data tools.",
  },
  {
    question: "What JSON format does this converter support?",
    answer:
      "The converter works with JSON arrays containing objects. Each object becomes a row and the object properties become CSV columns.",
  },
  {
    question: "Can I convert JSON to CSV online?",
    answer:
      "Yes. ToolVerse JSON to CSV Converter runs directly in your browser and converts your JSON data into CSV without requiring a separate application.",
  },
  {
    question: "How are missing JSON properties handled?",
    answer:
      "If an object does not contain a property that exists in other objects, the corresponding CSV cell is left empty.",
  },
  {
    question: "How does the converter handle commas and quotes?",
    answer:
      "CSV values containing commas, double quotes, or line breaks are automatically escaped and wrapped in double quotes when necessary.",
  },
  {
    question: "Are my JSON data sent to a server?",
    answer:
      "No. The conversion is performed directly in your browser. Your JSON data does not need to be sent to a ToolVerse server.",
  },
  {
    question: "Can I download the generated CSV?",
    answer:
      "Yes. After converting the JSON, you can download the generated CSV file directly from the tool.",
  },
  {
    question: "Can I convert nested JSON to CSV?",
    answer:
      "The current version is designed primarily for arrays of objects with simple values. Advanced nested-object flattening can be added in a future version.",
  },
];

export default faq;