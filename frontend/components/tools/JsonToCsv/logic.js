const MAX_JSON_LENGTH = 500000;

function validateInput(input) {
  if (!input || !input.trim()) {
    throw new Error("Please enter JSON data.");
  }

  if (input.length > MAX_JSON_LENGTH) {
    throw new Error(
      `JSON input is too large. Maximum length is ${MAX_JSON_LENGTH} characters.`
    );
  }
}

function escapeCsvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  let stringValue;

  if (typeof value === "object") {
    stringValue = JSON.stringify(value);
  } else {
    stringValue = String(value);
  }

  if (
    stringValue.includes('"') ||
    stringValue.includes(",") ||
    stringValue.includes("\n") ||
    stringValue.includes("\r")
  ) {
    stringValue = `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function getHeaders(rows) {
  const headers = [];
  const seen = new Set();

  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      continue;
    }

    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        headers.push(key);
      }
    }
  }

  return headers;
}

function convertRowsToCsv(rows, headers) {
  const csvRows = [];

  csvRows.push(headers.map(escapeCsvValue).join(","));

  for (const row of rows) {
    const values = headers.map((header) => {
      return escapeCsvValue(row?.[header]);
    });

    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

export function convertJsonToCsv(input) {
  validateInput(input);

  let data;

  try {
    data = JSON.parse(input);
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${error.message}`
    );
  }

  if (!Array.isArray(data)) {
    throw new Error(
      "JSON must be an array of objects. Example: [{\"name\":\"John\",\"age\":25}]"
    );
  }

  if (data.length === 0) {
    throw new Error("The JSON array is empty.");
  }

  const invalidRow = data.find(
    (row) =>
      row === null ||
      typeof row !== "object" ||
      Array.isArray(row)
  );

  if (invalidRow) {
    throw new Error(
      "Each item in the JSON array must be an object."
    );
  }

  const headers = getHeaders(data);

  if (headers.length === 0) {
    throw new Error(
      "No properties were found in the JSON objects."
    );
  }

  const csv = convertRowsToCsv(data, headers);

  return {
    valid: true,
    rowCount: data.length,
    columnCount: headers.length,
    headers,
    csv,
  };
}

export function createDownloadText(csv) {
  return csv;
}