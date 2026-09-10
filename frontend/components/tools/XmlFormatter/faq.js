const faq = [
  {
    question: "What is an XML formatter?",
    answer:
      "An XML formatter is a tool that takes XML markup and adds indentation and line breaks to make the XML structure easier to read and understand.",
  },

  {
    question: "What is an XML validator?",
    answer:
      "An XML validator checks XML markup for syntax errors and verifies that the document is well-formed, including correctly nested and closed elements.",
  },

  {
    question: "How do I format XML online?",
    answer:
      "Paste your XML into the ToolVerse XML Formatter and click Format XML. The tool parses the XML and produces a readable, properly indented version.",
  },

  {
    question: "Can I beautify XML online?",
    answer:
      "Yes. The ToolVerse XML Formatter can beautify XML by adding indentation and line breaks while preserving the XML document structure.",
  },

  {
    question: "Can I minify XML?",
    answer:
      "Yes. The XML Formatter can remove unnecessary whitespace between XML elements to produce a more compact XML document.",
  },

  {
    question: "Does the XML formatter validate XML syntax?",
    answer:
      "Yes. The formatter parses the XML before producing formatted output. Invalid or malformed XML is reported as an error instead of being formatted as valid XML.",
  },

  {
    question: "Can I format XML with attributes?",
    answer:
      "Yes. XML elements containing attributes are supported, and their attributes are preserved when the XML is formatted.",
  },

  {
    question: "Can I format XML containing comments?",
    answer:
      "Yes. XML comments are preserved during formatting when they are part of a valid XML document.",
  },

  {
    question: "Can I format XML containing CDATA?",
    answer:
      "Yes. Valid XML CDATA sections are preserved when the document is formatted.",
  },

  {
    question: "Is my XML sent to a server?",
    answer:
      "No. XML formatting and validation are performed directly in your browser. Your XML does not need to be uploaded to a ToolVerse server.",
  },

  {
    question: "Can I download formatted XML?",
    answer:
      "Yes. After formatting or minifying your XML, you can copy the result or download it as an XML file.",
  },

  {
    question: "Why is my XML showing a syntax error?",
    answer:
      "The XML may contain an unclosed element, incorrectly nested tags, invalid characters, malformed attributes, or another XML syntax problem. The validator reports the parser error so you can correct the document.",
  },
];

export default faq;