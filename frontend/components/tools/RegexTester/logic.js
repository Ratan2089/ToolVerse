/* =========================================================
   TOOLVERSE REGEX TESTER

   V1:
   - JavaScript / ECMAScript

   Future:
   - Python / backend
   - PCRE2 / backend
   - Go / RE2 / backend
   - Rust / backend
   - Java / backend
   - .NET / backend
   - Ruby / backend
   - Perl / backend
   - C++ / backend
   ========================================================= */

const MAX_PATTERN_LENGTH = 5000;

const MAX_TEXT_LENGTH = 100000;

/* =========================================================
   VALIDATION
   ========================================================= */

function validateInput(pattern, text) {
  if (!pattern) {
    throw new Error(
      "Please enter a regular expression."
    );
  }

  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new Error(
      `Regex pattern is too long. Maximum length is ${MAX_PATTERN_LENGTH} characters.`
    );
  }

  if (text.length > MAX_TEXT_LENGTH) {
    throw new Error(
      `Test text is too long. Maximum length is ${MAX_TEXT_LENGTH} characters.`
    );
  }
}

/* =========================================================
   JAVASCRIPT / ECMASCRIPT
   ========================================================= */

function testJavaScript(
  pattern,
  flags,
  text,
  allMatches
) {
  /*
   * When "Find all matches" is enabled,
   * JavaScript requires the global flag.
   */
  const finalFlags = allMatches
    ? `${flags}g`
    : flags;

  /*
   * Prevent duplicate flags.
   */
  const uniqueFlags = [
    ...new Set(finalFlags.split("")),
  ].join("");

  /*
   * Creating RegExp here allows JavaScript
   * to throw its native syntax error.
   */
  const regex = new RegExp(
    pattern,
    uniqueFlags
  );

  const matches = [];

  /* ---------------------------------------------------------
     FIND ALL MATCHES
     --------------------------------------------------------- */

  if (allMatches) {
    for (const match of text.matchAll(regex)) {
      matches.push(
        normalizeJavaScriptMatch(match)
      );
    }
  }

  /* ---------------------------------------------------------
     FIND FIRST MATCH
     --------------------------------------------------------- */

  else {
    const match = regex.exec(text);

    if (match) {
      matches.push(
        normalizeJavaScriptMatch(match)
      );
    }
  }

  return matches;
}

/* =========================================================
   NORMALIZE JAVASCRIPT MATCH
   ========================================================= */

function normalizeJavaScriptMatch(match) {
  return {
    full: match[0],

    index: match.index ?? 0,

    length: match[0].length,

    captures: Array.from(
      match.slice(1),
      (value, index) => ({
        index: index + 1,

        name: null,

        value: value ?? null,
      })
    ),
  };
}

/* =========================================================
   COMMON TEST FUNCTION
   ========================================================= */

export function testRegex({
  pattern,
  flags = "",
  text = "",
  allMatches = true,
}) {
  validateInput(
    pattern,
    text
  );

  const started =
    performance.now();

  const matches =
    testJavaScript(
      pattern,
      flags,
      text,
      allMatches
    );

  return {
    valid: true,

    engine:
      "JavaScript / ECMAScript",

    matched:
      matches.length > 0,

    matchCount:
      matches.length,

    matches,

    executionTime:
      Number(
        (
          performance.now() -
          started
        ).toFixed(2)
      ),
  };
}

/* =========================================================
   DOWNLOAD
   ========================================================= */

export function createDownloadText({
  pattern,
  flags,
  text,
  allMatches,
  result,
}) {
  const lines = [
    "ToolVerse Regex Tester",
    "======================",
    "",

    "Engine: JavaScript / ECMAScript",

    `Pattern: ${pattern}`,

    `Flags: ${
      flags || "(none)"
    }`,

    `All matches: ${
      allMatches
        ? "Yes"
        : "No"
    }`,

    "",

    "Test text:",

    text,

    "",

    `Valid regex: ${
      result.valid
        ? "Yes"
        : "No"
    }`,

    `Matched: ${
      result.matched
        ? "Yes"
        : "No"
    }`,

    `Match count: ${
      result.matchCount
    }`,

    `Execution time: ${
      result.executionTime
    } ms`,

    "",

    "Matches:",
  ];

  result.matches.forEach(
    (match, index) => {
      lines.push(
        `${index + 1}. "${match.full}" at index ${match.index}`
      );

      match.captures?.forEach(
        (capture) => {
          lines.push(
            `   Group ${
              capture.index
            }: ${
              capture.value ??
              "(undefined)"
            }`
          );
        }
      );
    }
  );

  return lines.join(
    "\n"
  );
}