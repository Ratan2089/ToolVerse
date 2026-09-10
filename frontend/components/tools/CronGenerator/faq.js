const faq = [
  {
    question: "What is a cron expression?",
    answer:
      "A cron expression is a schedule pattern used by Unix and Linux systems to run commands or jobs at specific times. A standard five-field cron expression contains minute, hour, day of month, month, and day of week.",
  },
  {
    question: "What does */5 * * * * mean?",
    answer:
      "*/5 * * * * runs a scheduled job every five minutes.",
  },
  {
    question: "What are the five cron fields?",
    answer:
      "The standard five fields are minute, hour, day of month, month, and day of week, in that order.",
  },
  {
    question: "How do I run a cron job every day at 9 AM?",
    answer:
      "Use 0 9 * * *. This runs at 9:00 AM every day.",
  },
  {
    question: "How do I run a cron job every weekday?",
    answer:
      "A common expression is 0 9 * * 1-5, which runs at 9:00 AM from Monday through Friday.",
  },
  {
    question: "Can I validate a cron expression?",
    answer:
      "Yes. ToolVerse validates the expression and reports whether the cron syntax can be parsed.",
  },
  {
    question: "Can I see the next cron execution times?",
    answer:
      "Yes. After entering a valid cron expression, ToolVerse shows upcoming execution times using your selected timezone.",
  },
  {
    question: "Does the Cron Generator run my cron job?",
    answer:
      "No. The tool only generates, validates, explains, and calculates cron schedules. It does not execute or schedule jobs on a server.",
  },
  {
    question: "Is my cron expression sent to a server?",
    answer:
      "No. Cron expression generation and validation are performed in your browser.",
  },
  {
    question: "What timezone does the tool use?",
    answer:
      "You can select a timezone for calculating upcoming execution times. The default is your browser's local timezone.",
  },
];

export default faq;