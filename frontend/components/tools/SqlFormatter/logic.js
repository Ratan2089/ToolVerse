import { format } from "sql-formatter";

const MAX_SQL_LENGTH = 500000;

function validateInput(input) {
  if (!input || !input.trim()) {
    throw new Error("Please enter SQL to format.");
  }

  if (input.length > MAX_SQL_LENGTH) {
    throw new Error(
      `SQL input is too large. Maximum length is ${MAX_SQL_LENGTH} characters.`
    );
  }
}

export function formatSql(input) {
  validateInput(input);

  try {
    return format(input, {
      language: "sql",
      tabWidth: 2,
      useTabs: false,
      keywordCase: "upper",
      identifierCase: "preserve",
      functionCase: "preserve",
      dataTypeCase: "upper",
      logicalOperatorNewline: "before",
      expressionWidth: 80,
    }).trim();
  } catch (error) {
    throw new Error(
      `Unable to format SQL: ${
        error?.message || "Invalid SQL syntax."
      }`
    );
  }
}

export function minifySql(input) {
  validateInput(input);

  try {
    return format(input, {
      language: "sql",
      tabWidth: 2,
      useTabs: false,
      keywordCase: "upper",
      identifierCase: "preserve",
      functionCase: "preserve",
      dataTypeCase: "upper",
      logicalOperatorNewline: "before",
      expressionWidth: Number.MAX_SAFE_INTEGER,
    })
      .replace(/\s+/g, " ")
      .trim();
  } catch (error) {
    throw new Error(
      `Unable to minify SQL: ${
        error?.message || "Invalid SQL syntax."
      }`
    );
  }
}

export function validateSql(input) {
  try {
    formatSql(input);

    return {
      valid: true,
      error: "",
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error?.message ||
        "Unable to process SQL.",
    };
  }
}

export function createDownloadText(output) {
  return `${String(output ?? "").trim()}\n`;
}