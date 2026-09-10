const config = {
  slug: "sql-formatter",
  title: "SQL Formatter & Beautifier",
  category: "Developer",
  description:
    "Format, beautify, validate, and minify SQL queries online for free. Clean up SQL statements and make complex queries easier to read directly in your browser.",
  keywords: [
    "sql formatter",
    "sql formatter online",
    "sql beautifier",
    "sql beautifier online",
    "sql formatter online free",
    "format sql",
    "format sql online",
    "sql pretty print",
    "pretty print sql",
    "sql minifier",
    "sql minify",
    "minify sql",
    "sql query formatter",
    "sql query beautifier",
    "sql query formatter online",
    "sql parser",
    "sql formatting tool",
    "online sql formatter",
    "sql cleaner",
    "sql beautifier tool",
    "sql formatter tool",
  ],
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
  seo: {
    title: "SQL Formatter & Beautifier Online | Format SQL Queries | ToolVerse",
    description:
      "Format, beautify, and minify SQL queries online for free. Clean up SQL statements and make complex queries easier to read directly in your browser.",
  },
};

export const DEFAULT_SQL = `SELECT u.id, u.name, u.email, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.status = 'active'
  AND u.created_at >= '2026-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 2
ORDER BY order_count DESC
LIMIT 20;`;

export default config;