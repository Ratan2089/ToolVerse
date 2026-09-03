/*
 * Timestamp Converter
 *
 * Supports:
 * Unix seconds
 * Unix milliseconds
 * Date/time -> Unix timestamp
 * Unix timestamp -> Date/time
 *
 * All conversion happens locally in the browser.
 */


/* =========================================================
   CONSTANTS
   ========================================================= */

export const TIMESTAMP_UNITS = {
  seconds: "seconds",
  milliseconds: "milliseconds",
};


/* =========================================================
   CURRENT TIMESTAMP
   ========================================================= */

export function getCurrentTimestamp() {
  const now = Date.now();

  return {
    milliseconds: now,

    seconds: Math.floor(now / 1000),

    date: new Date(now),
  };
}


/* =========================================================
   TIMESTAMP -> DATE
   ========================================================= */

export function timestampToDate(
  value,
  unit = TIMESTAMP_UNITS.seconds
) {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  ) {
    throw new Error(
      "Please enter a Unix timestamp."
    );
  }

  const input =
    String(value).trim();

  /*
   * Allow negative timestamps.
   *
   * Examples:
   * -1
   * 0
   * 1756300000
   */

  if (
    !/^-?\d+(\.\d+)?$/.test(input)
  ) {
    throw new Error(
      "Timestamp must contain only numbers."
    );
  }

  const numericValue =
    Number(input);

  if (
    !Number.isFinite(
      numericValue
    )
  ) {
    throw new Error(
      "Timestamp is too large or invalid."
    );
  }

  let milliseconds;

  if (
    unit === TIMESTAMP_UNITS.seconds
  ) {
    milliseconds =
      numericValue * 1000;
  } else if (
    unit ===
    TIMESTAMP_UNITS.milliseconds
  ) {
    milliseconds =
      numericValue;
  } else {
    throw new Error(
      "Invalid timestamp unit."
    );
  }

  if (
    !Number.isFinite(
      milliseconds
    )
  ) {
    throw new Error(
      "Timestamp is outside the supported range."
    );
  }

  const date =
    new Date(milliseconds);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    throw new Error(
      "Invalid timestamp. The resulting date is outside the supported range."
    );
  }

  return date;
}


/* =========================================================
   DATE -> TIMESTAMP
   ========================================================= */

export function dateToTimestamp(
  value
) {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  ) {
    throw new Error(
      "Please enter a date and time."
    );
  }

  const input =
    String(value).trim();

  const date =
    new Date(input);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    throw new Error(
      "Invalid date or time."
    );
  }

  return {
    date,

    milliseconds:
      date.getTime(),

    seconds:
      Math.floor(
        date.getTime() / 1000
      ),
  };
}


/* =========================================================
   DATE INFORMATION
   ========================================================= */

export function getDateInformation(
  date
) {
  if (
    !(date instanceof Date) ||
    Number.isNaN(
      date.getTime()
    )
  ) {
    throw new Error(
      "Invalid Date object."
    );
  }

  return {
    local:
      date.toLocaleString(),

    utc:
      date.toUTCString(),

    iso:
      date.toISOString(),

    date:
      date.toLocaleDateString(),

    time:
      date.toLocaleTimeString(),

    milliseconds:
      date.getTime(),

    seconds:
      Math.floor(
        date.getTime() / 1000
      ),
  };
}


/* =========================================================
   FORMAT TIMESTAMP RESULT
   ========================================================= */

export function formatTimestampResult(
  date
) {
  const information =
    getDateInformation(date);

  return {
    local: information.local,

    utc: information.utc,

    iso: information.iso,

    date: information.date,

    time: information.time,

    milliseconds:
      String(
        information.milliseconds
      ),

    seconds:
      String(
        information.seconds
      ),
  };
}


/* =========================================================
   CONVERT TIMESTAMP
   ========================================================= */

export function convertTimestamp(
  value,
  unit
) {
  const date =
    timestampToDate(
      value,
      unit
    );

  return {
    input:
      String(value).trim(),

    unit,

    date,

    ...formatTimestampResult(
      date
    ),
  };
}


/* =========================================================
   CONVERT DATE
   ========================================================= */

export function convertDate(
  value
) {
  const result =
    dateToTimestamp(
      value
    );

  return {
    input:
      String(value).trim(),

    date:
      result.date,

    seconds:
      String(
        result.seconds
      ),

    milliseconds:
      String(
        result.milliseconds
      ),

    ...formatTimestampResult(
      result.date
    ),
  };
}


/* =========================================================
   CREATE DOWNLOAD TEXT
   ========================================================= */

export function createTimestampText(
  result
) {
  if (!result) {
    return "";
  }

  const lines = [
    "Timestamp Conversion",
    "====================",
    "",
    `Input: ${result.input}`,
    `Unit: ${result.unit || "Date/Time"}`,
    "",
    `Unix Seconds: ${result.seconds}`,
    `Unix Milliseconds: ${result.milliseconds}`,
    "",
    `Local Time: ${result.local}`,
    `UTC: ${result.utc}`,
    `ISO 8601: ${result.iso}`,
  ];

  return lines.join("\n");
}


/* =========================================================
   FORMAT FOR DISPLAY
   ========================================================= */

export function formatTimestamp(
  timestamp
) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(timestamp);
}


/* =========================================================
   DETECT TIMESTAMP UNIT
   ========================================================= */

export function detectTimestampUnit(
  value
) {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  ) {
    return null;
  }

  const input =
    String(value).trim();

  if (
    !/^-?\d+(\.\d+)?$/.test(input)
  ) {
    return null;
  }

  const numericValue =
    Number(input);

  if (
    !Number.isFinite(
      numericValue
    )
  ) {
    return null;
  }

  /*
   * This is only a convenience heuristic.
   *
   * Unix seconds currently generally have
   * 10 digits while milliseconds generally
   * have 13 digits.
   *
   * We don't use this to perform the actual
   * conversion because the user can explicitly
   * select the unit.
   */

  const absoluteValue =
    Math.abs(numericValue);

  if (
    absoluteValue >= 1e12
  ) {
    return TIMESTAMP_UNITS.milliseconds;
  }

  return TIMESTAMP_UNITS.seconds;
}