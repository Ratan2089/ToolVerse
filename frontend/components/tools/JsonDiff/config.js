const config = {
  slug: "json-diff",
  title: "JSON Diff",
  category: "Developer",
  description:
    "Compare two JSON objects online and find added, removed, and changed values. Detect differences in nested JSON objects and arrays directly in your browser.",
  keywords: [
    "json diff",
    "json diff tool",
    "json compare",
    "json comparison",
    "compare json",
    "compare json online",
    "json difference",
    "json difference checker",
    "json diff online",
    "json compare online",
    "json comparison tool",
    "compare two json files",
    "compare json objects",
    "json object comparison",
    "json changes",
    "json difference checker online",
    "json diff checker",
    "json comparator",
    "online json diff",
    "json compare tool",
  ],
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
  seo: {
    title: "JSON Diff & JSON Compare Online | Find JSON Differences | ToolVerse",
    description:
      "Compare two JSON objects online and find added, removed, and changed values. Detect differences in nested JSON objects and arrays directly in your browser.",
  },
};

export const DEFAULT_JSON_A = `{
  "name": "John",
  "age": 28,
  "role": "Developer",
  "address": {
    "city": "Delhi",
    "country": "India"
  },
  "skills": [
    "JavaScript",
    "React"
  ]
}`;

export const DEFAULT_JSON_B = `{
  "name": "John",
  "age": 29,
  "role": "Senior Developer",
  "active": true,
  "address": {
    "city": "Mumbai",
    "country": "India"
  },
  "skills": [
    "JavaScript",
    "React",
    "Next.js"
  ]
}`;

export default config;