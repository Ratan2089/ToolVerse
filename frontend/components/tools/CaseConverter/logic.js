/* =========================================================
   CASE CONVERTER LOGIC
   ========================================================= */


/* =========================================================
   LOWERCASE
   ========================================================= */

export function toLowerCase(value) {
  return String(value ?? "").toLowerCase();
}


/* =========================================================
   UPPERCASE
   ========================================================= */

export function toUpperCase(value) {
  return String(value ?? "").toUpperCase();
}


/* =========================================================
   SENTENCE CASE
   ========================================================= */

export function toSentenceCase(value) {
  const text = String(value ?? "")
    .toLowerCase();

  return text.replace(
    /(^\s*[a-z])|([.!?]\s+[a-z])/g,
    (match) => match.toUpperCase()
  );
}


/* =========================================================
   TITLE CASE
   ========================================================= */

export function toTitleCase(value) {
  const text = String(value ?? "")
    .toLowerCase();

  return text.replace(
    /\b([a-z])/g,
    (match) => match.toUpperCase()
  );
}


/* =========================================================
   CAMEL CASE
   ========================================================= */

export function toCamelCase(value) {
  const words = splitWords(value);

  if (words.length === 0) {
    return "";
  }

  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
      )
      .join("")
  );
}


/* =========================================================
   PASCAL CASE
   ========================================================= */

export function toPascalCase(value) {
  return splitWords(value)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join("");
}


/* =========================================================
   SNAKE CASE
   ========================================================= */

export function toSnakeCase(value) {
  return splitWords(value)
    .map((word) =>
      word.toLowerCase()
    )
    .join("_");
}


/* =========================================================
   KEBAB CASE
   ========================================================= */

export function toKebabCase(value) {
  return splitWords(value)
    .map((word) =>
      word.toLowerCase()
    )
    .join("-");
}


/* =========================================================
   DOT CASE
   ========================================================= */

export function toDotCase(value) {
  return splitWords(value)
    .map((word) =>
      word.toLowerCase()
    )
    .join(".");
}


/* =========================================================
   CONSTANT CASE
   ========================================================= */

export function toConstantCase(value) {
  return splitWords(value)
    .map((word) =>
      word.toUpperCase()
    )
    .join("_");
}


/* =========================================================
   ALTERNATING CASE
   ========================================================= */

export function toAlternatingCase(value) {
  const text = String(value ?? "");

  let shouldUpper = false;

  return text
    .split("")
    .map((character) => {
      if (!/[a-zA-Z]/.test(character)) {
        return character;
      }

      shouldUpper = !shouldUpper;

      return shouldUpper
        ? character.toUpperCase()
        : character.toLowerCase();
    })
    .join("");
}


/* =========================================================
   INVERSE CASE
   ========================================================= */

export function toInverseCase(value) {
  const text = String(value ?? "");

  return text
    .split("")
    .map((character) => {
      if (
        character >= "a" &&
        character <= "z"
      ) {
        return character.toUpperCase();
      }

      if (
        character >= "A" &&
        character <= "Z"
      ) {
        return character.toLowerCase();
      }

      return character;
    })
    .join("");
}


/* =========================================================
   WORD SPLITTER
   ========================================================= */

export function splitWords(value) {
  const text = String(value ?? "")
    .trim();

  if (!text) {
    return [];
  }

  return text
    .replace(
      /([a-z0-9])([A-Z])/g,
      "$1 $2"
    )
    .replace(
      /([A-Z]+)([A-Z][a-z])/g,
      "$1 $2"
    )
    .replace(
      /[_\-./]+/g,
      " "
    )
    .replace(
      /[^\p{L}\p{N}\s]+/gu,
      " "
    )
    .split(/\s+/)
    .filter(Boolean);
}


/* =========================================================
   CASE CONVERSION MAP
   ========================================================= */

export const CASE_TYPES = {
  lowercase: {
    label: "lowercase",
    description: "Convert all letters to lowercase.",
    convert: toLowerCase,
  },

  uppercase: {
    label: "UPPERCASE",
    description: "Convert all letters to uppercase.",
    convert: toUpperCase,
  },

  sentence: {
    label: "Sentence case",
    description: "Capitalize the beginning of sentences.",
    convert: toSentenceCase,
  },

  title: {
    label: "Title Case",
    description: "Capitalize the first letter of each word.",
    convert: toTitleCase,
  },

  camel: {
    label: "camelCase",
    description: "Convert text to camelCase.",
    convert: toCamelCase,
  },

  pascal: {
    label: "PascalCase",
    description: "Convert text to PascalCase.",
    convert: toPascalCase,
  },

  snake: {
    label: "snake_case",
    description: "Convert text to snake_case.",
    convert: toSnakeCase,
  },

  kebab: {
    label: "kebab-case",
    description: "Convert text to kebab-case.",
    convert: toKebabCase,
  },

  dot: {
    label: "dot.case",
    description: "Convert text to dot.case.",
    convert: toDotCase,
  },

  constant: {
    label: "CONSTANT_CASE",
    description: "Convert text to CONSTANT_CASE.",
    convert: toConstantCase,
  },

  alternating: {
    label: "aLtErNaTiNg CaSe",
    description: "Alternate between uppercase and lowercase letters.",
    convert: toAlternatingCase,
  },

  inverse: {
    label: "InVeRsE CaSe",
    description: "Invert uppercase and lowercase letters.",
    convert: toInverseCase,
  },
};


/* =========================================================
   GET CASE TYPE
   ========================================================= */

export function getCaseType(type) {
  return CASE_TYPES[type] || null;
}


/* =========================================================
   CONVERT
   ========================================================= */

export function convertCase(
  value,
  type
) {
  const caseType =
    getCaseType(type);

  if (!caseType) {
    throw new Error(
      "Invalid case conversion type."
    );
  }

  return caseType.convert(value);
}


/* =========================================================
   TEXT STATISTICS
   ========================================================= */

export function getTextStatistics(value) {
  const text = String(value ?? "");

  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const lines = text
    ? text.split(/\r?\n/).length
    : 0;

  const characters = text.length;

  const charactersNoSpaces =
    text.replace(/\s/g, "").length;

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
  };
}


/* =========================================================
   DOWNLOAD CONTENT
   ========================================================= */

export function createDownloadText(
  input,
  output,
  caseType
) {
  const selected =
    getCaseType(caseType);

  return [
    "ToolVerse Case Converter",
    "=========================",
    "",
    `Conversion: ${
      selected?.label || caseType
    }`,
    "",
    "Input:",
    input,
    "",
    "Output:",
    output,
  ].join("\n");
}