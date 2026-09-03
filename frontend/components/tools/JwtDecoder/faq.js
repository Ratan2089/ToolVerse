// const faq = [
//   {
//     question: "What is a JWT?",
//     answer:
//       "JWT stands for JSON Web Token. It is a compact token format commonly used to transmit claims between systems and for authentication and authorization workflows.",
//   },

//   {
//     question: "What does a JWT contain?",
//     answer:
//       "A typical JWT contains three Base64URL-encoded sections: a header, a payload, and a signature. The three sections are separated by periods.",
//   },

//   {
//     question: "Does decoding a JWT verify the token?",
//     answer:
//       "No. Decoding only reads the contents of the token. It does not verify that the signature is valid or that the token was issued by a trusted party.",
//   },

//   {
//     question: "Can I use this tool to decode an expired JWT?",
//     answer:
//       "Yes. The tool can decode an expired JWT and will indicate when the expiration claim is present and has passed.",
//   },

//   {
//     question: "Is my JWT sent to a server?",
//     answer:
//       "No. JWT decoding is performed directly in your browser. The token does not need to be sent to the ToolVerse backend.",
//   },

//   {
//     question: "Should I paste sensitive JWTs into online tools?",
//     answer:
//       "JWTs can contain sensitive information. Although this tool processes tokens locally in your browser, you should still avoid exposing production credentials or tokens unnecessarily.",
//   },
// ];

// export default faq;

const faq = [
  {
    question: "What is a JWT?",

    answer:
      "JWT stands for JSON Web Token. It is a compact token format commonly used to transmit claims between systems and for authentication and authorization.",
  },

  {
    question: "What are the three parts of a JWT?",

    answer:
      "A signed JWT normally contains a header, payload, and signature. These three sections are separated by periods.",
  },

  {
    question: "Does decoding a JWT verify its signature?",

    answer:
      "No. Decoding only reads the token contents. Signature verification is a separate cryptographic operation.",
  },

  {
    question: "Which JWT algorithms can be verified?",

    answer:
      "ToolVerse supports cryptographic verification for supported HMAC, RSA, RSA-PSS, and ECDSA JWT algorithms using the browser's Web Crypto API.",
  },

  {
    question: "What is required to verify an HS256 JWT?",

    answer:
      "HS256 uses a shared secret. You need to provide the same secret that was used to create the JWT signature.",
  },

  {
    question: "What is required to verify an RS256 JWT?",

    answer:
      "RS256 uses asymmetric cryptography. Signature verification requires the corresponding RSA public key.",
  },

  {
    question: "Does an expired JWT have an invalid signature?",

    answer:
      "Not necessarily. A JWT can have a cryptographically valid signature while still being expired. Signature verification and expiration checking are separate checks.",
  },

  {
    question: "Is my JWT sent to the ToolVerse server?",

    answer:
      "No. JWT decoding and cryptographic signature verification are performed locally in your browser.",
  },

  {
    question: "Should I enter production secrets into an online tool?",

    answer:
      "Avoid exposing sensitive production credentials unnecessarily. Although this implementation performs verification locally in the browser, you should still follow your organization's security policies.",
  },
];

export default faq;