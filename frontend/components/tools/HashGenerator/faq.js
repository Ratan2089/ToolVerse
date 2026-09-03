const faq = [
  {
    question:
      "What is a hash?",

    answer:
      "A cryptographic hash is a fixed-length value generated from input data using a hash algorithm. The same input produces the same hash when the same algorithm is used.",
  },

  {
    question:
      "What is SHA-256?",

    answer:
      "SHA-256 is a member of the SHA-2 family of cryptographic hash algorithms and produces a 256-bit hash value, normally represented as 64 hexadecimal characters.",
  },

  {
    question:
      "What is SHA-512?",

    answer:
      "SHA-512 is a SHA-2 cryptographic hash algorithm that produces a 512-bit hash value, normally represented as 128 hexadecimal characters.",
  },

  {
    question:
      "Is SHA-1 secure?",

    answer:
      "SHA-1 is considered legacy for modern security applications because practical collision attacks exist. It should not be selected for new security-sensitive designs.",
  },

  {
    question:
      "Can a hash be reversed?",

    answer:
      "Cryptographic hash functions are designed to be one-way functions. A hash is not intended to be decrypted back into its original input. However, weak or predictable inputs can sometimes be discovered through guessing or dictionary attacks.",
  },

  {
    question:
      "Does changing one character change the hash?",

    answer:
      "Yes. Cryptographic hash functions have an avalanche effect, meaning that a small change in the input generally produces a substantially different hash.",
  },

  {
    question:
      "Are my inputs uploaded to a server?",

    answer:
      "No. Hash generation in this tool is performed locally in your browser using the Web Crypto API.",
  },

  {
    question:
      "What is the difference between a hash and encryption?",

    answer:
      "Encryption is designed to allow authorized parties to recover the original data using a key. Cryptographic hashing is designed as a one-way transformation and is primarily used for integrity checks and other security applications.",
  },

  {
    question:
      "Can I verify an existing hash?",

    answer:
      "Yes. Enter the original text, select the algorithm, paste the expected hash, and use the Hash Verifier to compare the generated hash with the expected value.",
  },
];

export default faq;