import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";

const MAX_EXPRESSION_LENGTH = 200;

export const FIELD_DEFINITIONS = [
  {
    key: "minute",
    label: "Minute",
    description: "0-59",
    placeholder: "*",
    defaultValue: "*",
  },
  {
    key: "hour",
    label: "Hour",
    description: "0-23",
    placeholder: "*",
    defaultValue: "*",
  },
  {
    key: "dayOfMonth",
    label: "Day of Month",
    description: "1-31",
    placeholder: "*",
    defaultValue: "*",
  },
  {
    key: "month",
    label: "Month",
    description: "1-12",
    placeholder: "*",
    defaultValue: "*",
  },
  {
    key: "dayOfWeek",
    label: "Day of Week",
    description: "0-7",
    placeholder: "*",
    defaultValue: "*",
  },
];

export const PRESETS = [
  {
    label: "Every minute",
    expression: "* * * * *",
  },
  {
    label: "Every 5 minutes",
    expression: "*/5 * * * *",
  },
  {
    label: "Every 15 minutes",
    expression: "*/15 * * * *",
  },
  {
    label: "Every 30 minutes",
    expression: "*/30 * * * *",
  },
  {
    label: "Every hour",
    expression: "0 * * * *",
  },
  {
    label: "Every day at midnight",
    expression: "0 0 * * *",
  },
  {
    label: "Every day at 9 AM",
    expression: "0 9 * * *",
  },
  {
    label: "Every weekday at 9 AM",
    expression: "0 9 * * 1-5",
  },
  {
    label: "Every Monday at 9 AM",
    expression: "0 9 * * 1",
  },
  {
    label: "First day of every month",
    expression: "0 0 1 * *",
  },
  {
    label: "Every Sunday at midnight",
    expression: "0 0 * * 0",
  },
];

function ensureExpression(expression) {
  const value = String(expression ?? "").trim();

  if (!value) {
    throw new Error("Enter a cron expression.");
  }

  if (value.length > MAX_EXPRESSION_LENGTH) {
    throw new Error(
      `Cron expression is too long. Maximum length is ${MAX_EXPRESSION_LENGTH} characters.`
    );
  }

  return value;
}

export function validateCron(expression, timezone) {
  const value = ensureExpression(expression);

  try {
    CronExpressionParser.parse(value, {
      currentDate: new Date(),
      tz: timezone,
    });

    return {
      valid: true,
      message: "Valid cron expression.",
    };
  } catch (error) {
    return {
      valid: false,
      message:
        error?.message ||
        "Invalid cron expression.",
    };
  }
}

export function describeCron(expression) {
  const value = ensureExpression(expression);

  try {
    return cronstrue.toString(value, {
      use24HourTimeFormat: true,
      throwExceptionOnParseError: true,
    });
  } catch (error) {
    throw new Error(
      error?.message ||
        "Unable to describe this cron expression."
    );
  }
}

export function getNextRuns(
  expression,
  timezone,
  count = 10
) {
  const value = ensureExpression(expression);

  const safeCount = Math.min(
    Math.max(Number(count) || 10, 1),
    20
  );

  try {
    const interval = CronExpressionParser.parse(
      value,
      {
        currentDate: new Date(),
        tz: timezone,
      }
    );

    return interval
      .take(safeCount)
      .map((date) => date.toDate());
  } catch (error) {
    throw new Error(
      error?.message ||
        "Unable to calculate upcoming cron runs."
    );
  }
}

export function expressionFromFields(fields) {
  return FIELD_DEFINITIONS.map(
    ({ key }) =>
      String(fields[key] ?? "*").trim() || "*"
  ).join(" ");
}

export function fieldsFromExpression(expression) {
  const parts = String(expression ?? "")
    .trim()
    .split(/\s+/);

  if (parts.length !== 5) {
    return {
      minute: "*",
      hour: "*",
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*",
    };
  }

  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

export function formatDate(date, timezone) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: timezone,
    }
  ).format(date);
}

export function getTimezoneOptions() {
  const supported =
    Intl.supportedValuesOf?.("timeZone");

  if (Array.isArray(supported)) {
    return supported;
  }

  return [
    "UTC",
    "Asia/Kolkata",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Berlin",
    "Asia/Dubai",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];
}

export function createCronSummary(
  expression,
  timezone
) {
  const validation = validateCron(
    expression,
    timezone
  );

  if (!validation.valid) {
    return {
      valid: false,
      description: "",
      nextRuns: [],
      validation,
    };
  }

  return {
    valid: true,
    description: describeCron(expression),
    nextRuns: getNextRuns(
      expression,
      timezone,
      10
    ),
    validation,
  };
}

export function getDownloadContent(
  expression,
  description,
  timezone,
  nextRuns
) {
  const lines = [
    `Cron Expression: ${expression}`,
    `Description: ${description || "N/A"}`,
    `Timezone: ${timezone}`,
    "",
    "Next Runs:",
    ...nextRuns.map(
      (date, index) =>
        `${index + 1}. ${formatDate(
          date,
          timezone
        )}`
    ),
  ];

  return lines.join("\n");
}