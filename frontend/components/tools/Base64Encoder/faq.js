const faq = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 is an encoding method that represents binary data using a set of 64 characters. It is commonly used for representing data in text-based formats.",
  },

  {
    question: "What is the difference between encoding and encryption?",
    answer:
      "Base64 is an encoding format, not encryption. Anyone can decode Base64 data, so it should not be used to protect sensitive information.",
  },

  {
    question: "Can I encode Unicode text?",
    answer:
      "Yes. ToolVerse supports UTF-8 text, including Unicode characters and languages such as Hindi, Arabic, Chinese, and other non-Latin scripts.",
  },

  {
    question: "Can I decode Base64 text?",
    answer:
      "Yes. Select Decode, enter valid Base64 data, and the decoded UTF-8 text will be displayed.",
  },

  {
    question: "Is my data uploaded to a server?",
    answer:
      "No. Encoding and decoding are performed directly in your browser. Your input is not sent to the ToolVerse backend.",
  },

  {
    question: "Is the Base64 encoder free?",
    answer:
      "Yes. The Base64 Encoder and Decoder is available for free on ToolVerse.",
  },
];

export default faq;