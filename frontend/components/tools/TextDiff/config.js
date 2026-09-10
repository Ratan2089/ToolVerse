const config = {
  slug: "text-diff",
  title: "Text Diff & Compare",
  category: "Developer",
  description:
    "Compare two text files or code snippets online and find added, removed, and changed content. Supports line, word, and character comparison with side-by-side and unified diff views.",
  keywords: [
    "text diff",
    "text diff tool",
    "text compare",
    "text comparison",
    "compare text",
    "compare text online",
    "diff checker",
    "diff tool",
    "online diff tool",
    "text difference checker",
    "text comparison tool",
    "compare two files",
    "file diff",
    "code diff",
    "code compare",
    "code comparison",
    "compare code online",
    "line diff",
    "word diff",
    "character diff",
    "text diff online",
    "online text comparison",
    "diff checker online",
  ],
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
  seo: {
    title:
      "Text Diff & Compare Online | Compare Text & Code | ToolVerse",
    description:
      "Compare two text files or code snippets online and find added, removed, and changed content with line, word, and character diff modes.",
  },
};

export const DEFAULT_ORIGINAL = `const user = {
  name: "John",
  age: 25,
  role: "Developer"
};

console.log(user);`;

export const DEFAULT_MODIFIED = `const user = {
  name: "Ratan",
  age: 26,
  role: "Senior Developer",
  city: "Delhi"
};

console.log(user);`;

export default config;