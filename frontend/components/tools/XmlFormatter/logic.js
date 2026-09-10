const MAX_XML_LENGTH = 500000;

/**
 * Validate XML input size.
 */
function validateInput(input) {
  if (!input || !input.trim()) {
    throw new Error("Please enter XML to format.");
  }

  if (input.length > MAX_XML_LENGTH) {
    throw new Error(
      `XML input is too large. Maximum length is ${MAX_XML_LENGTH} characters.`
    );
  }
}

/**
 * Parse XML using the browser's native DOMParser.
 */
function parseXml(input) {
  const parser = new DOMParser();

  const document = parser.parseFromString(
    input,
    "application/xml"
  );

  const parserError = document.querySelector(
    "parsererror"
  );

  if (parserError) {
    const message =
      parserError.textContent?.trim() ||
      "Invalid XML syntax.";

    throw new Error(
      `Invalid XML: ${message}`
    );
  }

  return document;
}

/**
 * Escape XML text content.
 */
function escapeXmlText(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Escape XML attribute values.
 */
function escapeXmlAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Serialize an XML node with indentation.
 */
function serializeNode(node, level = 0) {
  const indent = "  ".repeat(level);

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = node.nodeName;

    let result = `${indent}<${tagName}`;

    for (const attribute of Array.from(
      node.attributes || []
    )) {
      result += ` ${attribute.name}="${escapeXmlAttribute(
        attribute.value
      )}"`;
    }

    const children = Array.from(node.childNodes);

    if (children.length === 0) {
      return `${result}/>`;
    }

    result += ">";

    const hasElementChildren = children.some(
      (child) =>
        child.nodeType === Node.ELEMENT_NODE ||
        child.nodeType === Node.COMMENT_NODE ||
        child.nodeType === Node.CDATA_SECTION_NODE
    );

    if (!hasElementChildren) {
      const text = children
        .map((child) => child.nodeValue || "")
        .join("");

      return `${result}${escapeXmlText(text)}</${tagName}>`;
    }

    const childOutput = children
      .map((child) => {
        return serializeNode(child, level + 1);
      })
      .filter(Boolean)
      .join("\n");

    return `${result}\n${childOutput}\n${indent}</${tagName}>`;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const value = node.nodeValue || "";

    if (!value.trim()) {
      return "";
    }

    return `${indent}${escapeXmlText(value.trim())}`;
  }

  if (node.nodeType === Node.CDATA_SECTION_NODE) {
    return `${indent}<![CDATA[${node.nodeValue || ""}]]>`;
  }

  if (node.nodeType === Node.COMMENT_NODE) {
    return `${indent}<!--${node.nodeValue || ""}-->`;
  }

  if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
    return `${indent}<?${node.target} ${node.data}?>`;
  }

  return "";
}

/**
 * Format XML with readable indentation.
 */
export function formatXml(input) {
  validateInput(input);

  const document = parseXml(input);

  const lines = [];

  for (const child of Array.from(document.childNodes)) {
    if (
      child.nodeType === Node.PROCESSING_INSTRUCTION_NODE
    ) {
      lines.push(
        `<?${child.target}${
          child.data ? ` ${child.data}` : ""
        }?>`
      );
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      lines.push(serializeNode(child, 0));
    } else if (child.nodeType === Node.COMMENT_NODE) {
      lines.push(`<!--${child.nodeValue || ""}-->`);
    }
  }

  if (lines.length === 0) {
    throw new Error("No XML document content found.");
  }

  return lines.join("\n");
}

/**
 * Minify XML by removing unnecessary whitespace
 * between XML elements while preserving text content.
 */
export function minifyXml(input) {
  validateInput(input);

  const document = parseXml(input);

  const formatted = formatXml(input);

  return formatted
    .replace(/>\s+</g, "><")
    .trim();
}

/**
 * Validate XML without formatting it.
 */
export function validateXml(input) {
  try {
    validateInput(input);

    parseXml(input);

    return {
      valid: true,
      error: "",
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error?.message ||
        "Invalid XML.",
    };
  }
}

/**
 * Create downloadable XML content.
 */
export function createDownloadText(output) {
  return output;
}