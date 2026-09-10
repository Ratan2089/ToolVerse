const faq = [
  {
    question: "What is a regex tester?",

    answer:
      "A regex tester is a tool that lets you write a regular expression and test it against sample text to see which parts of the text match.",
  },

  {
    question: "What regex engine does ToolVerse use?",

    answer:
      "The current version of ToolVerse Regex Tester uses the native JavaScript / ECMAScript RegExp engine that runs directly in your browser.",
  },

  {
    question: "Is JavaScript regex the same as Python regex?",

    answer:
      "No. JavaScript and Python use different regular expression implementations and support different syntax and features. This version of ToolVerse focuses on JavaScript / ECMAScript regular expressions.",
  },

  {
    question: "Are my regex patterns sent to a server?",

    answer:
      "No. JavaScript regex testing is performed directly in your browser using the native JavaScript RegExp engine. Your regex pattern and test text do not need to be sent to a ToolVerse server.",
  },

  {
    question: "Can I test capture groups?",

    answer:
      "Yes. ToolVerse Regex Tester displays the full match and numbered capture groups returned by the JavaScript RegExp engine.",
  },

  {
    question: "What JavaScript regex flags are supported?",

    answer:
      "The tester currently supports the JavaScript i, m, s, u, and y flags. The global g flag is handled automatically when Find all matches is enabled.",
  },

  {
    question: "Why does my regular expression show an error?",

    answer:
      "The pattern may contain invalid JavaScript regular expression syntax or an unsupported combination of flags. The tester displays the JavaScript error message so you can correct the pattern.",
  },

  {
    question: "Will ToolVerse support Python, PCRE2, or other regex engines?",

    answer:
      "Additional regex engines are planned for a future version. They can be added through backend execution so each engine can provide its own native regex behavior.",
  },
];

export default faq;