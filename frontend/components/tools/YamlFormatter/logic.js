import {
  parseDocument,
  stringify,
} from "yaml";

const MAX_YAML_LENGTH = 500000;

function validateInput(input) {
  if (!input || !input.trim()) {
    throw new Error("Please enter YAML to format.");
  }

  if (input.length > MAX_YAML_LENGTH) {
    throw new Error(
      `YAML input is too large. Maximum length is ${MAX_YAML_LENGTH} characters.`
    );
  }
}

function getParserError(document) {
  if (!document?.errors?.length) {
    return null;
  }

  const error = document.errors[0];

  let message =
    error?.message ||
    "Invalid YAML syntax.";

  const position = error?.linePos?.[0];

  if (position) {
    message += ` (line ${position.line}, column ${position.col})`;
  }

  return message;
}

function parseYaml(input) {
  validateInput(input);

  const document = parseDocument(input, {
    strict: true,
  });

  const parserError = getParserError(document);

  if (parserError) {
    throw new Error(`Invalid YAML: ${parserError}`);
  }

  return document;
}

/**
 * Format YAML using block-style collections.
 */
export function formatYaml(input) {
  const document = parseYaml(input);

  return document
    .toString({
      indent: 2,
      indentSeq: true,
      lineWidth: 0,
      collectionStyle: "block",
    })
    .trim();
}

/**
 * Produce a compact flow-style YAML representation.
 *
 * This is intentionally called "minify" rather than attempting
 * to remove every whitespace character, because whitespace can
 * be meaningful in YAML.
 */
export function minifyYaml(input) {
  const document = parseYaml(input);

  return document
    .toString({
      indent: 2,
      lineWidth: 0,
      collectionStyle: "flow",
      flowCollectionPadding: false,
    })
    .trim();
}

/**
 * Validate YAML without producing formatted output.
 */
export function validateYaml(input) {
  try {
    parseYaml(input);

    return {
      valid: true,
      error: "",
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error?.message ||
        "Invalid YAML syntax.",
    };
  }
}

/**
 * Create downloadable YAML content.
 */
export function createDownloadText(output) {
  return `${String(output ?? "").trim()}\n`;
}