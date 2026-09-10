const MAX_JSON_LENGTH = 500000;

function validateInput(input, label) {
  if (!input || !input.trim()) {
    throw new Error(
      `${label} cannot be empty.`
    );
  }

  if (input.length > MAX_JSON_LENGTH) {
    throw new Error(
      `${label} is too large. Maximum length is ${MAX_JSON_LENGTH} characters.`
    );
  }
}

function parseJson(input, label) {
  validateInput(input, label);

  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error(
      `Invalid ${label}: ${
        error?.message ||
        "Unable to parse JSON."
      }`
    );
  }
}

function isObject(value) {
  return (
    value !== null &&
    typeof value === "object"
  );
}

function isPlainObject(value) {
  return (
    isObject(value) &&
    !Array.isArray(value)
  );
}

function valuesAreEqual(a, b) {
  return (
    JSON.stringify(a) ===
    JSON.stringify(b)
  );
}

function formatPath(path, key) {
  if (Array.isArray(path)) {
    return [...path, key];
  }

  return [key];
}

function pathToString(path) {
  if (!path.length) {
    return "$";
  }

  let result = "$";

  for (const part of path) {
    if (
      typeof part === "number" ||
      /^\d+$/.test(String(part))
    ) {
      result += `[${part}]`;
    } else {
      result += `.${part}`;
    }
  }

  return result;
}

function compareValues(
  valueA,
  valueB,
  path,
  result
) {
  if (valuesAreEqual(valueA, valueB)) {
    return;
  }

  // Both plain objects
  if (
    isPlainObject(valueA) &&
    isPlainObject(valueB)
  ) {
    compareObjects(
      valueA,
      valueB,
      path,
      result
    );

    return;
  }

  // Both arrays
  if (
    Array.isArray(valueA) &&
    Array.isArray(valueB)
  ) {
    compareArrays(
      valueA,
      valueB,
      path,
      result
    );

    return;
  }

  // Primitive/type/object change
  result.changed.push({
    path: pathToString(path),
    oldValue: valueA,
    newValue: valueB,
  });
}

function compareObjects(
  objectA,
  objectB,
  path,
  result
) {
  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);

  const keys = new Set([
    ...keysA,
    ...keysB,
  ]);

  for (const key of keys) {
    const nextPath = formatPath(
      path,
      key
    );

    const existsA =
      Object.prototype.hasOwnProperty.call(
        objectA,
        key
      );

    const existsB =
      Object.prototype.hasOwnProperty.call(
        objectB,
        key
      );

    if (!existsA && existsB) {
      result.added.push({
        path: pathToString(nextPath),
        value: objectB[key],
      });

      continue;
    }

    if (existsA && !existsB) {
      result.removed.push({
        path: pathToString(nextPath),
        value: objectA[key],
      });

      continue;
    }

    compareValues(
      objectA[key],
      objectB[key],
      nextPath,
      result
    );
  }
}

function compareArrays(
  arrayA,
  arrayB,
  path,
  result
) {
  const maxLength = Math.max(
    arrayA.length,
    arrayB.length
  );

  for (
    let index = 0;
    index < maxLength;
    index++
  ) {
    const nextPath = formatPath(
      path,
      index
    );

    const existsA =
      index < arrayA.length;

    const existsB =
      index < arrayB.length;

    if (!existsA && existsB) {
      result.added.push({
        path: pathToString(nextPath),
        value: arrayB[index],
      });

      continue;
    }

    if (existsA && !existsB) {
      result.removed.push({
        path: pathToString(nextPath),
        value: arrayA[index],
      });

      continue;
    }

    compareValues(
      arrayA[index],
      arrayB[index],
      nextPath,
      result
    );
  }
}

export function compareJson(
  inputA,
  inputB
) {
  const jsonA = parseJson(
    inputA,
    "JSON A"
  );

  const jsonB = parseJson(
    inputB,
    "JSON B"
  );

  const result = {
    added: [],
    removed: [],
    changed: [],
  };

  compareValues(
    jsonA,
    jsonB,
    [],
    result
  );

  return result;
}

export function jsonDiff(
  inputA,
  inputB
) {
  const result = compareJson(
    inputA,
    inputB
  );

  return JSON.stringify(
    result,
    null,
    2
  );
}

export function validateJsonInputs(
  inputA,
  inputB
) {
  try {
    parseJson(inputA, "JSON A");
    parseJson(inputB, "JSON B");

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

export function getDiffSummary(
  inputA,
  inputB
) {
  const result = compareJson(
    inputA,
    inputB
  );

  return {
    added: result.added.length,
    removed: result.removed.length,
    changed: result.changed.length,
  };
}

export function createDownloadText(
  output
) {
  return `${String(
    output ?? ""
  ).trim()}\n`;
}