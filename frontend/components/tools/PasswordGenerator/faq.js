const faq = [
  {
    question:
      "How does the password generator work?",

    answer:
      "The password generator creates random passwords using the browser's Web Crypto API. Password generation happens locally in your browser.",
  },

  {
    question:
      "Are the generated passwords secure?",

    answer:
      "Passwords are generated using a cryptographically secure random number generator provided by the browser. However, password security also depends on how and where the generated password is used.",
  },

  {
    question:
      "What is a strong password?",

    answer:
      "A strong password is generally long, difficult to guess, and not based on predictable personal information or common words. Longer randomly generated passwords generally provide more possible combinations.",
  },

  {
    question:
      "How long should my password be?",

    answer:
      "There is no single length that works for every situation, but longer passwords generally provide more resistance to guessing attacks. Use the password requirements of the service you are signing up for.",
  },

  {
    question:
      "What does password entropy mean?",

    answer:
      "Password entropy is an estimate of the uncertainty or randomness in a password. The estimate increases with password length and the size of the character set used to generate it.",
  },

  {
    question:
      "What are ambiguous characters?",

    answer:
      "Ambiguous characters are characters that can be visually confused with one another, such as uppercase I, lowercase l, and the number 1. Excluding them can make passwords easier to read or manually transcribe.",
  },

  {
    question:
      "Are my generated passwords sent to a server?",

    answer:
      "No. Password generation is performed locally in your browser and does not require a backend API.",
  },

  {
    question:
      "Can I generate multiple passwords?",

    answer:
      "Yes. You can generate multiple passwords in a single operation and copy or download the resulting list.",
  },

  {
    question:
      "Should I use the same generated password for multiple accounts?",

    answer:
      "No. Use a unique password for each account. Reusing a password can allow a compromise of one service to affect other accounts.",
  },
];

export default faq;