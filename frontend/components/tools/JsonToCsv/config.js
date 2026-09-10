const config = {
  slug: "json-to-csv",
  title: "JSON to CSV Converter",
  category: "Developer",
  description:
    "Convert JSON data to CSV format online with a fast, browser-based JSON to CSV converter.",
  keywords: [
    "json to csv",
    "json to csv converter",
    "convert json to csv",
    "json converter",
    "json csv converter",
    "json to csv online",
    "convert json file to csv",
    "json array to csv",
    "json data to csv",
    "online json to csv converter",
  ],
  supports: {
    copy: true,
    download: true,
    share: true,
    reset: true,
  },
  seo: {
    title: "JSON to CSV Converter Online | Convert JSON to CSV",
    description:
      "Convert JSON to CSV online. Transform JSON arrays and objects into properly formatted CSV data directly in your browser.",
  },
};

export const DEFAULT_JSON = `[
  {
    "name": "John",
    "age": 25,
    "city": "Delhi"
  },
  {
    "name": "Sarah",
    "age": 30,
    "city": "Mumbai"
  },
  {
    "name": "Mike",
    "age": 28,
    "city": "Bangalore"
  }
]`;

export default config;