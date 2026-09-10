const MAX_CSV_LENGTH = 500000;

function validateInput(input) {
  if (!input || !input.trim()) {
    throw new Error("Please enter CSV data to convert.");
  }

  if (input.length > MAX_CSV_LENGTH) {
    throw new Error(
      `CSV input is too large. Maximum length is ${MAX_CSV_LENGTH} characters.`
    );
  }
}

function normalizeLineEndings(input) {
  return input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function parseCsvRows(input) {
  validateInput(input);

  const csv = normalizeLineEndings(input);

  const rows = [];
  let row = [];
  let field = "";
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    if (insideQuotes) {
      if (char === '"') {
        // Escaped quote: ""
        if (csv[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          insideQuotes = false;
        }
      } else {
        field += char;
      }

      continue;
    }

    if (char === '"') {
      insideQuotes = true;
      continue;
    }

    if (char === ",") {
      row.push(field);
      field = "";
      continue;
    }

    if (char === "\n") {
      row.push(field);
      rows.push(row);

      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (insideQuotes) {
    throw new Error(
      "Invalid CSV: Unterminated quoted field."
    );
  }

  // Add final field/row.
  row.push(field);

  if (row.length > 1 || row[0] !== "") {
    rows.push(row);
  }

  return rows;
}

function removeEmptyRows(rows) {
  return rows.filter((row) =>
    row.some((value) => value.trim() !== "")
  );
}

function createUniqueHeaders(headers) {
  const used = new Map();

  return headers.map((header, index) => {
    let key = header.trim();

    if (!key) {
      key = `column_${index + 1}`;
    }

    const count = used.get(key) || 0;
    used.set(key, count + 1);

    if (count === 0) {
      return key;
    }

    return `${key}_${count + 1}`;
  });
}

export function parseCsv(input) {
  const rows = removeEmptyRows(parseCsvRows(input));

  if (rows.length === 0) {
    throw new Error("CSV does not contain any data.");
  }

  if (rows.length === 1) {
    throw new Error(
      "CSV must contain a header row and at least one data row."
    );
  }

  const headers = createUniqueHeaders(rows[0]);

  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const object = {};

    headers.forEach((header, index) => {
      object[header] = row[index] ?? "";
    });

    // Preserve extra columns.
    if (row.length > headers.length) {
      for (let i = headers.length; i < row.length; i++) {
        object[`column_${i + 1}`] = row[i];
      }
    }

    return object;
  });
}

export function csvToJson(input) {
  const data = parseCsv(input);

  return JSON.stringify(data, null, 2);
}

export function validateCsv(input) {
  try {
    parseCsv(input);

    return {
      valid: true,
      error: "",
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error?.message ||
        "Invalid CSV data.",
    };
  }
}

export function createDownloadText(output) {
  return `${String(output ?? "").trim()}\n`;
}