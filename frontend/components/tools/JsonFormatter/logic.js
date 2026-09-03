export function validateJson(value) {
  if (!value || !value.trim()) {
    return {
      valid: false,
      error: "Please enter JSON to validate.",
    };
  }

  try {
    JSON.parse(value);

    return {
      valid: true,
      error: null,
    };
  } catch (error) {
    return {
      valid: false,
      error: getJsonErrorMessage(error),
    };
  }
}

export function formatJson(value, indentation = 2) {
  if (!value || !value.trim()) {
    throw new Error("Please enter JSON to format.");
  }

  try {
    const parsed = JSON.parse(value);

    return JSON.stringify(parsed, null, indentation);
  } catch (error) {
    throw new Error(getJsonErrorMessage(error));
  }
}

export function minifyJson(value) {
  if (!value || !value.trim()) {
    throw new Error("Please enter JSON to minify.");
  }

  try {
    const parsed = JSON.parse(value);

    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error(getJsonErrorMessage(error));
  }
}

function getJsonErrorMessage(error) {
  if (!error?.message) {
    return "Invalid JSON.";
  }

  return `Invalid JSON: ${error.message}`;
}