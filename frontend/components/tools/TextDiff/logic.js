import {
  diffArrays,
  diffChars,
  diffLines,
  diffWordsWithSpace,
  createTwoFilesPatch,
} from "diff";

const MAX_TEXT_LENGTH = 500000;

function validateInput(input, label) {
  if (input.length > MAX_TEXT_LENGTH) {
    throw new Error(
      `${label} is too large. Maximum length is ${MAX_TEXT_LENGTH} characters.`
    );
  }
}

function normalizeLine(value, options = {}) {
  let result = String(value);

  if (options.ignoreTrailingSpaces) {
    result = result.replace(/[ \t]+$/g, "");
  }

  if (options.ignoreWhitespace) {
    result = result.replace(/\s+/g, " ").trim();
  }

  if (options.ignoreCase) {
    result = result.toLowerCase();
  }

  return result;
}

function splitLines(input) {
  return String(input)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n");
}

function filterBlankLines(lines, options) {
  if (!options.ignoreBlankLines) {
    return lines;
  }

  return lines.filter(
    (line) => line.trim() !== ""
  );
}

function compareLineArrays(
  originalLines,
  modifiedLines,
  options
) {
  const oldLines = filterBlankLines(
    originalLines,
    options
  );

  const newLines = filterBlankLines(
    modifiedLines,
    options
  );

  const changes = diffArrays(
    oldLines,
    newLines,
    {
      comparator: (left, right) =>
        normalizeLine(
          left,
          options
        ) ===
        normalizeLine(
          right,
          options
        ),
    }
  );

  return changes;
}

function expandLineChanges(changes) {
  const rows = [];

  let oldLineNumber = 1;
  let newLineNumber = 1;

  for (const change of changes) {
    const lines = change.value;

    for (const line of lines) {
      if (change.added) {
        rows.push({
          type: "added",
          oldLine: null,
          newLine: newLineNumber,
          oldText: "",
          newText: line,
        });

        newLineNumber += 1;
        continue;
      }

      if (change.removed) {
        rows.push({
          type: "removed",
          oldLine: oldLineNumber,
          newLine: null,
          oldText: line,
          newText: "",
        });

        oldLineNumber += 1;
        continue;
      }

      rows.push({
        type: "unchanged",
        oldLine: oldLineNumber,
        newLine: newLineNumber,
        oldText: line,
        newText: line,
      });

      oldLineNumber += 1;
      newLineNumber += 1;
    }
  }

  return rows;
}

function calculateStats(rows) {
  const added = rows.filter(
    (row) => row.type === "added"
  ).length;

  const removed = rows.filter(
    (row) => row.type === "removed"
  ).length;

  const unchanged = rows.filter(
    (row) => row.type === "unchanged"
  ).length;

  return {
    added,
    removed,
    changed: Math.min(
      added,
      removed
    ),
    unchanged,
  };
}

function buildUnifiedRows(rows) {
  return rows.map((row) => ({
    ...row,
    prefix:
      row.type === "added"
        ? "+"
        : row.type === "removed"
          ? "-"
          : " ",
  }));
}

function getInlineDiff(
  oldText,
  newText,
  mode,
  options
) {
  const ignoreCase =
    Boolean(options.ignoreCase);

  let changes;

  if (mode === "word") {
    changes = diffWordsWithSpace(
      oldText,
      newText,
      {
        ignoreCase,
      }
    );
  } else {
    changes = diffChars(
      oldText,
      newText,
      {
        ignoreCase,
      }
    );
  }

  return changes;
}

function buildInlinePairs(
  rows,
  mode,
  options
) {
  const result = [];

  let index = 0;

  while (index < rows.length) {
    const current = rows[index];

    if (
      current.type === "removed" &&
      rows[index + 1]?.type === "added"
    ) {
      const next = rows[index + 1];

      result.push({
        type: "changed",
        oldLine: current.oldLine,
        newLine: next.newLine,
        oldText: current.oldText,
        newText: next.newText,
        inline: getInlineDiff(
          current.oldText,
          next.newText,
          mode,
          options
        ),
      });

      index += 2;
      continue;
    }

    if (
      current.type === "added" &&
      rows[index + 1]?.type === "removed"
    ) {
      const next = rows[index + 1];

      result.push({
        type: "changed",
        oldLine: next.oldLine,
        newLine: current.newLine,
        oldText: next.oldText,
        newText: current.newText,
        inline: getInlineDiff(
          next.oldText,
          current.newText,
          mode,
          options
        ),
      });

      index += 2;
      continue;
    }

    result.push({
      ...current,
      inline: null,
    });

    index += 1;
  }

  return result;
}

export function compareText(
  original,
  modified,
  options = {}
) {
  validateInput(
    original,
    "Original text"
  );

  validateInput(
    modified,
    "Modified text"
  );

  const originalLines =
    splitLines(original);

  const modifiedLines =
    splitLines(modified);

  if (
    options.diffType === "word" ||
    options.diffType === "character"
  ) {
    const lineChanges =
      compareLineArrays(
        originalLines,
        modifiedLines,
        options
      );

    const rows =
      expandLineChanges(
        lineChanges
      );

    const inlineRows =
      buildInlinePairs(
        rows,
        options.diffType ===
          "word"
          ? "word"
          : "character",
        options
      );

    return {
      rows,
      inlineRows,
      stats: calculateStats(
        rows
      ),
      originalLineCount:
        originalLines.length,
      modifiedLineCount:
        modifiedLines.length,
    };
  }

  const lineChanges =
    compareLineArrays(
      originalLines,
      modifiedLines,
      options
    );

  const rows =
    expandLineChanges(
      lineChanges
    );

  return {
    rows,
    inlineRows: rows.map(
      (row) => ({
        ...row,
        inline: null,
      })
    ),
    stats: calculateStats(
      rows
    ),
    originalLineCount:
      originalLines.length,
    modifiedLineCount:
      modifiedLines.length,
  };
}

export function createUnifiedDiff(
  original,
  modified,
  options = {}
) {
  const result = compareText(
    original,
    modified,
    {
      ...options,
      diffType: "line",
    }
  );

  return result.rows
    .map(
      (row) =>
        `${row.prefix}${row.type === "added" ? row.newText : row.oldText}`
    )
    .join("\n");
}

export function createPatch(
  original,
  modified,
  options = {}
) {
  validateInput(
    original,
    "Original text"
  );

  validateInput(
    modified,
    "Modified text"
  );

  return createTwoFilesPatch(
    "original.txt",
    "modified.txt",
    original,
    modified,
    "",
    "",
    {
      context: 3,
    }
  );
}

export function createDownloadText(
  output
) {
  return `${String(
    output ?? ""
  ).trim()}\n`;
}

export function createComparisonOutput(
  original,
  modified,
  options = {}
) {
  return compareText(
    original,
    modified,
    options
  );
}

export function getDownloadContent(
  original,
  modified,
  options,
  format
) {
  if (format === "patch") {
    return createPatch(
      original,
      modified,
      options
    );
  }

  if (format === "diff") {
    return createUnifiedDiff(
      original,
      modified,
      options
    );
  }

  return createUnifiedDiff(
    original,
    modified,
    options
  );
}