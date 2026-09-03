const faq = [
  {
    question:
      "What is a Unix timestamp?",

    answer:
      "A Unix timestamp represents a point in time as the number of seconds that have elapsed since January 1, 1970 at 00:00:00 UTC, also known as the Unix epoch.",
  },

  {
    question:
      "What is the difference between seconds and milliseconds?",

    answer:
      "A Unix timestamp in seconds represents elapsed seconds since the Unix epoch, while a millisecond timestamp represents elapsed milliseconds. Millisecond timestamps are therefore typically much larger numbers.",
  },

  {
    question:
      "What is the Unix epoch?",

    answer:
      "The Unix epoch is January 1, 1970 at 00:00:00 UTC. Unix timestamps use this point as their reference time.",
  },

  {
    question:
      "Can Unix timestamps be negative?",

    answer:
      "Yes. Negative Unix timestamps can represent dates before the Unix epoch.",
  },

  {
    question:
      "What is ISO 8601?",

    answer:
      "ISO 8601 is an international standard for representing dates and times. A common format is YYYY-MM-DDTHH:mm:ss.sssZ, where Z represents UTC.",
  },

  {
    question:
      "Does this timestamp converter use my local timezone?",

    answer:
      "Date input is interpreted according to the browser's local timezone, while the result also provides UTC and ISO 8601 representations.",
  },

  {
    question:
      "Can I convert milliseconds to a date?",

    answer:
      "Yes. Select Milliseconds as the timestamp unit and enter the Unix timestamp.",
  },

  {
    question:
      "Can I convert a date to Unix milliseconds?",

    answer:
      "Yes. The Date to Timestamp mode provides both Unix seconds and Unix milliseconds.",
  },

  {
    question:
      "Are my timestamps sent to a server?",

    answer:
      "No. Timestamp conversion is performed locally in your browser and does not require a backend API.",
  },
];

export default faq;