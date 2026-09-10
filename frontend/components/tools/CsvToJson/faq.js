const faq = [
  {
    question: "What is a CSV to JSON converter?",
    answer:
      "A CSV to JSON converter transforms comma-separated values into structured JSON data. The first row is typically used as the JSON object property names.",
  },
  {
    question: "How do I convert CSV to JSON?",
    answer:
      "Paste your CSV data into the input area and click Convert to JSON. ToolVerse parses the CSV rows and columns and generates formatted JSON.",
  },
  {
    question: "Can I convert CSV to JSON online for free?",
    answer:
      "Yes. ToolVerse's CSV to JSON converter works directly in your browser and does not require you to upload your CSV data to a server.",
  },
  {
    question: "Does the converter support CSV values containing commas?",
    answer:
      "Yes. Values enclosed in double quotes can contain commas without being treated as separate columns.",
  },
  {
    question: "Does it support quoted CSV values?",
    answer:
      "Yes. The converter supports standard CSV quoted fields and escaped double quotes.",
  },
  {
    question: "Does it support multiline CSV fields?",
    answer:
      "Yes. Newline characters inside properly quoted CSV fields are supported.",
  },
  {
    question: "What happens if a CSV row has missing columns?",
    answer:
      "Missing columns are represented as empty strings in the resulting JSON object.",
  },
  {
    question: "What happens if a CSV row has extra columns?",
    answer:
      "Extra columns are preserved using generated property names such as column_2, column_3, and so on.",
  },
  {
    question: "Does the first CSV row become JSON keys?",
    answer:
      "Yes. The first non-empty CSV row is treated as the header row and its values become the property names of each JSON object.",
  },
  {
    question: "Is my CSV data uploaded to a server?",
    answer:
      "No. The conversion is performed locally in your browser. Your CSV data is not required to be sent to a server for conversion.",
  },
  {
    question: "Can I download the converted JSON?",
    answer:
      "Yes. After converting the CSV, you can copy the JSON or download it as a JSON file.",
  },
  {
    question: "What happens if my CSV is invalid?",
    answer:
      "The converter displays an error when it detects malformed CSV structure, such as an unterminated quoted field.",
  },
];

export default faq;