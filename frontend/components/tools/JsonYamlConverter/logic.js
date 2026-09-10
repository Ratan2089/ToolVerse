import {
  parse,
  stringify,
} from "yaml";

const MAX_INPUT_LENGTH = 500000;

/* =========================================================
   INPUT VALIDATION
   ========================================================= */

function validateInput(input) {
  if (!input || !input.trim()) {
    throw new Error(
      "Please enter JSON or YAML to convert."
    );
  }

  if (input.length > MAX_INPUT_LENGTH) {
    throw new Error(
      `Input is too large. Maximum length is ${MAX_INPUT_LENGTH} characters.`
    );
  }
}

/* =========================================================
   JSON PARSER
   ========================================================= */

function parseJson(input) {
  validateInput(input);

  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${
        error?.message ||
        "Unable to parse JSON."
      }`
    );
  }
}

/* =========================================================
   YAML PARSER
   ========================================================= */

function parseYaml(input) {
  validateInput(input);

  try {
    return parse(input);
  } catch (error) {
    throw new Error(
      `Invalid YAML: ${
        error?.message ||
        "Unable to parse YAML."
      }`
    );
  }
}

/* =========================================================
   JSON → YAML
   ========================================================= */

export function jsonToYaml(input) {
  const data = parseJson(input);

  return stringify(data, {
    indent: 2,
    lineWidth: 0,
    collectionStyle: "block",
  }).trim();
}

/* =========================================================
   YAML → JSON
   ========================================================= */

export function yamlToJson(input) {
  const data = parseYaml(input);

  return JSON.stringify(
    data,
    null,
    2
  );
}

/* =========================================================
   VALIDATE JSON
   ========================================================= */

export function validateJson(input) {
  try {
    parseJson(input);

    return {
      valid: true,
      error: "",
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error?.message ||
        "Invalid JSON.",
    };
  }
}

/* =========================================================
   VALIDATE YAML
   ========================================================= */

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
        "Invalid YAML.",
    };
  }
}

/* =========================================================
   GENERIC CONVERSION
   ========================================================= */

export function convertJsonYaml(
  input,
  direction
) {
  if (direction === "json-to-yaml") {
    return jsonToYaml(input);
  }

  if (direction === "yaml-to-json") {
    return yamlToJson(input);
  }

  throw new Error(
    "Invalid conversion direction."
  );
}

/* =========================================================
   DOWNLOAD
   ========================================================= */

export function getDownloadInfo(
  direction
) {
  if (direction === "json-to-yaml") {
    return {
      filename: "converted.yaml",
      mimeType: "application/yaml",
    };
  }

  return {
    filename: "converted.json",
    mimeType: "application/json",
  };
}