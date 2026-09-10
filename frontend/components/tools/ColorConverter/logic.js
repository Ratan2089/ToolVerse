/* =========================================================
   COLOR CONVERTER
   ToolVerse
========================================================= */

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, Number(value) || 0));

const round = (value, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

const normalizeHue = (value) => {
  let hue = Number(value) || 0;

  hue %= 360;

  if (hue < 0) {
    hue += 360;
  }

  return hue;
};

/* =========================================================
   CSS COLOR NAMES
========================================================= */

export const CSS_COLOR_NAMES = {
  aliceblue: "#F0F8FF",
  antiquewhite: "#FAEBD7",
  aqua: "#00FFFF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000000",
  blanchedalmond: "#FFEBCD",
  blue: "#0000FF",
  blueviolet: "#8A2BE2",
  brown: "#A52A2A",
  burlywood: "#DEB887",
  cadetblue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerblue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#00FFFF",
  darkblue: "#00008B",
  darkcyan: "#008B8B",
  darkgoldenrod: "#B8860B",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  darkgreen: "#006400",
  darkkhaki: "#BDB76B",
  darkmagenta: "#8B008B",
  darkolivegreen: "#556B2F",
  darkorange: "#FF8C00",
  darkorchid: "#9932CC",
  darkred: "#8B0000",
  darksalmon: "#E9967A",
  darkseagreen: "#8FBC8F",
  darkslateblue: "#483D8B",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  darkturquoise: "#00CED1",
  darkviolet: "#9400D3",
  deeppink: "#FF1493",
  deepskyblue: "#00BFFF",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1E90FF",
  firebrick: "#B22222",
  floralwhite: "#FFFAF0",
  forestgreen: "#228B22",
  fuchsia: "#FF00FF",
  gainsboro: "#DCDCDC",
  ghostwhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#ADFF2F",
  honeydew: "#F0FFF0",
  hotpink: "#FF69B4",
  indianred: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lavenderblush: "#FFF0F5",
  lawngreen: "#7CFC00",
  lemonchiffon: "#FFFACD",
  lightblue: "#ADD8E6",
  lightcoral: "#F08080",
  lightcyan: "#E0FFFF",
  lightgoldenrodyellow: "#FAFAD2",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  lightgreen: "#90EE90",
  lightpink: "#FFB6C1",
  lightsalmon: "#FFA07A",
  lightseagreen: "#20B2AA",
  lightskyblue: "#87CEFA",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#B0C4DE",
  lightyellow: "#FFFFE0",
  lime: "#00FF00",
  limegreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#FF00FF",
  maroon: "#800000",
  mediumaquamarine: "#66CDAA",
  mediumblue: "#0000CD",
  mediumorchid: "#BA55D3",
  mediumpurple: "#9370DB",
  mediumseagreen: "#3CB371",
  mediumslateblue: "#7B68EE",
  mediumspringgreen: "#00FA9A",
  mediumturquoise: "#48D1CC",
  mediumvioletred: "#C71585",
  midnightblue: "#191970",
  mintcream: "#F5FFFA",
  mistyrose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  navy: "#000080",
  oldlace: "#FDF5E6",
  olive: "#808000",
  olivedrab: "#6B8E23",
  orange: "#FFA500",
  orangered: "#FF4500",
  orchid: "#DA70D6",
  palegoldenrod: "#EEE8AA",
  palegreen: "#98FB98",
  paleturquoise: "#AFEEEE",
  palevioletred: "#DB7093",
  papayawhip: "#FFEFD5",
  peachpuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderblue: "#B0E0E6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#FF0000",
  rosybrown: "#BC8F8F",
  royalblue: "#4169E1",
  saddlebrown: "#8B4513",
  salmon: "#FA8072",
  sandybrown: "#F4A460",
  seagreen: "#2E8B57",
  seashell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyblue: "#87CEEB",
  slateblue: "#6A5ACD",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#FFFAFA",
  springgreen: "#00FF7F",
  steelblue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFFFFF",
  whitesmoke: "#F5F5F5",
  yellow: "#FFFF00",
  yellowgreen: "#9ACD32",
};

/* =========================================================
   HEX
========================================================= */

export function hexToRgba(input) {
  if (!input) {
    throw new Error("Invalid HEX color.");
  }

  let hex = String(input)
    .trim()
    .replace(/^#/, "");

  if (![3, 4, 6, 8].includes(hex.length)) {
    throw new Error(
      "HEX must contain 3, 4, 6, or 8 characters."
    );
  }

  if (!/^[0-9a-f]+$/i.test(hex)) {
    throw new Error("Invalid HEX characters.");
  }

  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a:
      hex.length === 8
        ? parseInt(hex.slice(6, 8), 16) / 255
        : 1,
  };
}

export function rgbaToHex6({ r, g, b }) {
  return `#${[r, g, b]
    .map((value) =>
      clamp(Math.round(value), 0, 255)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase()
    )
    .join("")}`;
}

export function rgbaToHex({ r, g, b, a = 1 }) {
  return `${rgbaToHex6({ r, g, b })}${Math.round(
    clamp(a, 0, 1) * 255
  )
    .toString(16)
    .padStart(2, "0")
    .toUpperCase()}`;
}

/* =========================================================
   RGB
========================================================= */

export function rgbToString({ r, g, b }) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(
    b
  )})`;
}

export function rgbaToString({
  r,
  g,
  b,
  a = 1,
}) {
  return `rgba(${Math.round(r)}, ${Math.round(
    g
  )}, ${Math.round(b)}, ${round(a, 3)})`;
}

/* =========================================================
   RGB → HSL
========================================================= */

export function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const delta = max - min;

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (delta !== 0) {
    s =
      delta /
      (1 - Math.abs(2 * l - 1));

    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h *= 60;

    if (h < 0) {
      h += 360;
    }
  }

  return {
    h: normalizeHue(h),
    s: s * 100,
    l: l * 100,
  };
}

/* =========================================================
   HSL → RGB
========================================================= */

export function hslToRgb({ h, s, l }) {
  h = normalizeHue(h);
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;

  const c =
    (1 - Math.abs(2 * l - 1)) * s;

  const x =
    c *
    (1 -
      Math.abs(((h / 60) % 2) - 1));

  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/* =========================================================
   RGB → HSV
========================================================= */

export function rgbToHsv({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h =
        60 *
        (((g - b) / delta) % 6);
    } else if (max === g) {
      h =
        60 *
        ((b - r) / delta + 2);
    } else {
      h =
        60 *
        ((r - g) / delta + 4);
    }
  }

  return {
    h: normalizeHue(h),
    s:
      max === 0
        ? 0
        : (delta / max) * 100,
    v: max * 100,
  };
}

/* =========================================================
   HSV → RGB
========================================================= */

export function hsvToRgb({ h, s, v }) {
  h = normalizeHue(h);
  s = clamp(s, 0, 100) / 100;
  v = clamp(v, 0, 100) / 100;

  const c = v * s;

  const x =
    c *
    (1 -
      Math.abs(((h / 60) % 2) - 1));

  const m = v - c;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/* =========================================================
   RGB → HWB
========================================================= */

export function rgbToHwb({ r, g, b }) {
  const hsv = rgbToHsv({
    r,
    g,
    b,
  });

  return {
    h: hsv.h,
    w:
      (Math.min(r, g, b) / 255) *
      100,
    b:
      (1 -
        Math.max(r, g, b) / 255) *
      100,
  };
}

/* =========================================================
   HWB → RGB
========================================================= */

export function hwbToRgb({
  h,
  w,
  b,
}) {
  h = normalizeHue(h);

  w = clamp(w, 0, 100) / 100;
  b = clamp(b, 0, 100) / 100;

  if (w + b >= 1) {
    const gray =
      w / (w + b);

    return {
      r: Math.round(gray * 255),
      g: Math.round(gray * 255),
      b: Math.round(gray * 255),
    };
  }

  const pure = hsvToRgb({
    h,
    s: 100,
    v: 100,
  });

  const factor =
    1 - w - b;

  return {
    r: Math.round(
      pure.r * factor + w * 255
    ),
    g: Math.round(
      pure.g * factor + w * 255
    ),
    b: Math.round(
      pure.b * factor + w * 255
    ),
  };
}

/* =========================================================
   RGB → CMYK
========================================================= */

export function rgbToCmyk({
  r,
  g,
  b,
}) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const k =
    1 -
    Math.max(
      red,
      green,
      blue
    );

  if (k >= 1) {
    return {
      c: 0,
      m: 0,
      y: 0,
      k: 100,
    };
  }

  return {
    c:
      ((1 - red - k) /
        (1 - k)) *
      100,

    m:
      ((1 - green - k) /
        (1 - k)) *
      100,

    y:
      ((1 - blue - k) /
        (1 - k)) *
      100,

    k: k * 100,
  };
}

/* =========================================================
   CMYK → RGB
========================================================= */

export function cmykToRgb({
  c,
  m,
  y,
  k,
}) {
  c = clamp(c, 0, 100) / 100;
  m = clamp(m, 0, 100) / 100;
  y = clamp(y, 0, 100) / 100;
  k = clamp(k, 0, 100) / 100;

  return {
    r: Math.round(
      255 *
        (1 - c) *
        (1 - k)
    ),

    g: Math.round(
      255 *
        (1 - m) *
        (1 - k)
    ),

    b: Math.round(
      255 *
        (1 - y) *
        (1 - k)
    ),
  };
}

/* =========================================================
   PARSING HELPERS
========================================================= */

function parseAlpha(value) {
  const text = String(value).trim();

  if (text.endsWith("%")) {
    const percentage =
      Number.parseFloat(
        text.slice(0, -1)
      );

    if (!Number.isFinite(percentage)) {
      throw new Error(
        "Invalid alpha value."
      );
    }

    return clamp(
      percentage,
      0,
      100
    ) / 100;
  }

  const alpha =
    Number.parseFloat(text);

  if (!Number.isFinite(alpha)) {
    throw new Error(
      "Invalid alpha value."
    );
  }

  return clamp(alpha, 0, 1);
}

function parseRgbChannel(value) {
  const text = String(value).trim();

  if (text.endsWith("%")) {
    const percentage =
      Number.parseFloat(
        text.slice(0, -1)
      );

    if (!Number.isFinite(percentage)) {
      throw new Error(
        "Invalid RGB value."
      );
    }

    return clamp(
      percentage,
      0,
      100
    ) * 2.55;
  }

  const channel =
    Number.parseFloat(text);

  if (!Number.isFinite(channel)) {
    throw new Error(
      "Invalid RGB value."
    );
  }

  return clamp(
    channel,
    0,
    255
  );
}

function parsePercentage(value) {
  const text = String(value)
    .trim()
    .replace("%", "");

  const number =
    Number.parseFloat(text);

  if (!Number.isFinite(number)) {
    throw new Error(
      "Invalid percentage value."
    );
  }

  return clamp(
    number,
    0,
    100
  );
}

function parseHue(value) {
  const text = String(value)
    .trim()
    .replace(/deg$/i, "");

  const hue =
    Number.parseFloat(text);

  if (!Number.isFinite(hue)) {
    throw new Error(
      "Invalid hue value."
    );
  }

  return normalizeHue(hue);
}

function splitColorArguments(value) {
  return value
    .replace(/\//g, " ")
    .replace(/,/g, " ")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/* =========================================================
   RGB PARSER
========================================================= */

function parseRgb(input) {
  const match = input.match(
    /^rgba?\((.*)\)$/i
  );

  if (!match) {
    return null;
  }

  const values =
    splitColorArguments(
      match[1]
    );

  if (
    values.length < 3 ||
    values.length > 4
  ) {
    throw new Error(
      "RGB requires 3 channels and optional alpha."
    );
  }

  return {
    r: parseRgbChannel(
      values[0]
    ),
    g: parseRgbChannel(
      values[1]
    ),
    b: parseRgbChannel(
      values[2]
    ),
    a:
      values.length === 4
        ? parseAlpha(values[3])
        : 1,
  };
}

/* =========================================================
   HSL PARSER
========================================================= */

function parseHsl(input) {
  const match = input.match(
    /^hsla?\((.*)\)$/i
  );

  if (!match) {
    return null;
  }

  const values =
    splitColorArguments(
      match[1]
    );

  if (
    values.length < 3 ||
    values.length > 4
  ) {
    throw new Error(
      "HSL requires hue, saturation, and lightness."
    );
  }

  const rgb = hslToRgb({
    h: parseHue(values[0]),
    s: parsePercentage(
      values[1]
    ),
    l: parsePercentage(
      values[2]
    ),
  });

  return {
    ...rgb,

    a:
      values.length === 4
        ? parseAlpha(values[3])
        : 1,
  };
}

/* =========================================================
   HSV PARSER
========================================================= */

function parseHsv(input) {
  const match = input.match(
    /^hsva?\((.*)\)$/i
  );

  if (!match) {
    return null;
  }

  const values =
    splitColorArguments(
      match[1]
    );

  if (
    values.length < 3 ||
    values.length > 4
  ) {
    throw new Error(
      "HSV requires hue, saturation, and value."
    );
  }

  const rgb = hsvToRgb({
    h: parseHue(values[0]),
    s: parsePercentage(
      values[1]
    ),
    v: parsePercentage(
      values[2]
    ),
  });

  return {
    ...rgb,

    a:
      values.length === 4
        ? parseAlpha(values[3])
        : 1,
  };
}

/* =========================================================
   HWB PARSER
========================================================= */

function parseHwb(input) {
  const match = input.match(
    /^hwb\((.*)\)$/i
  );

  if (!match) {
    return null;
  }

  const values =
    splitColorArguments(
      match[1]
    );

  if (
    values.length < 3 ||
    values.length > 4
  ) {
    throw new Error(
      "HWB requires hue, whiteness, and blackness."
    );
  }

  const rgb = hwbToRgb({
    h: parseHue(values[0]),
    w: parsePercentage(
      values[1]
    ),
    b: parsePercentage(
      values[2]
    ),
  });

  return {
    ...rgb,

    a:
      values.length === 4
        ? parseAlpha(values[3])
        : 1,
  };
}

/* =========================================================
   CMYK PARSER
========================================================= */

function parseCmyk(input) {
  const match = input.match(
    /^cmyk\((.*)\)$/i
  );

  if (!match) {
    return null;
  }

  const values =
    splitColorArguments(
      match[1]
    );

  if (
    values.length < 4 ||
    values.length > 5
  ) {
    throw new Error(
      "CMYK requires cyan, magenta, yellow, and black."
    );
  }

  const rgb = cmykToRgb({
    c: parsePercentage(
      values[0]
    ),
    m: parsePercentage(
      values[1]
    ),
    y: parsePercentage(
      values[2]
    ),
    k: parsePercentage(
      values[3]
    ),
  });

  return {
    ...rgb,

    a:
      values.length === 5
        ? parseAlpha(values[4])
        : 1,
  };
}

/* =========================================================
   MAIN COLOR PARSER
========================================================= */

export function parseColorInput(input) {
  if (
    input === null ||
    input === undefined ||
    !String(input).trim()
  ) {
    throw new Error(
      "Enter a color value."
    );
  }

  const value =
    String(input).trim();

  const lower =
    value.toLowerCase();

  /* HEX */
  if (value.startsWith("#")) {
    return hexToRgba(value);
  }

  /* CSS COLOR NAME */
  if (
    Object.prototype.hasOwnProperty.call(
      CSS_COLOR_NAMES,
      lower
    )
  ) {
    return hexToRgba(
      CSS_COLOR_NAMES[lower]
    );
  }

  /* RGB */
  if (/^rgba?\(/i.test(value)) {
    return parseRgb(value);
  }

  /* HSL */
  if (/^hsla?\(/i.test(value)) {
    return parseHsl(value);
  }

  /* HSV */
  if (/^hsva?\(/i.test(value)) {
    return parseHsv(value);
  }

  /* HWB */
  if (/^hwb\(/i.test(value)) {
    return parseHwb(value);
  }

  /* CMYK */
  if (/^cmyk\(/i.test(value)) {
    return parseCmyk(value);
  }

  throw new Error(
    "Unsupported color format."
  );
}

/* =========================================================
   COLOR NAME
========================================================= */

export function getColorName(rgba) {
  const target =
    rgbaToHex6(rgba).toUpperCase();

  for (const [
    name,
    hex,
  ] of Object.entries(
    CSS_COLOR_NAMES
  )) {
    if (
      hex.toUpperCase() === target
    ) {
      return name;
    }
  }

  return "Custom color";
}

/* =========================================================
   SEARCH COLOR NAMES
========================================================= */

export function searchColorNames(
  query = ""
) {
  const search =
    String(query)
      .trim()
      .toLowerCase();

  return Object.entries(
    CSS_COLOR_NAMES
  )
    .filter(([name]) =>
      name.includes(search)
    )
    .map(([name, hex]) => ({
      name,
      hex,
      rgba: hexToRgba(hex),
    }))
    .sort((a, b) =>
      a.name.localeCompare(
        b.name
      )
    );
}

/* =========================================================
   COLOR DATA
========================================================= */

export function getColorData(rgba) {
  const normalized = {
    r: clamp(
      Math.round(rgba.r),
      0,
      255
    ),
    g: clamp(
      Math.round(rgba.g),
      0,
      255
    ),
    b: clamp(
      Math.round(rgba.b),
      0,
      255
    ),
    a: clamp(
      rgba.a ?? 1,
      0,
      1
    ),
  };

  const hsl =
    rgbToHsl(normalized);

  const hsv =
    rgbToHsv(normalized);

  const hwb =
    rgbToHwb(normalized);

  const cmyk =
    rgbToCmyk(normalized);

  return {
    rgba: normalized,

    hex: rgbaToHex6(
      normalized
    ),

    hexAlpha: rgbaToHex(
      normalized
    ),

    rgb: rgbToString(
      normalized
    ),

    rgbaString:
      rgbaToString(
        normalized
      ),

    hsl: `hsl(${round(
      hsl.h
    )}, ${round(
      hsl.s
    )}%, ${round(
      hsl.l
    )}%)`,

    hsla: `hsla(${round(
      hsl.h
    )}, ${round(
      hsl.s
    )}%, ${round(
      hsl.l
    )}%, ${round(
      normalized.a,
      3
    )})`,

    hsv: `hsv(${round(
      hsv.h
    )}, ${round(
      hsv.s
    )}%, ${round(
      hsv.v
    )}%)`,

    hwb: `hwb(${round(
      hwb.h
    )} ${round(
      hwb.w
    )}% ${round(
      hwb.b
    )}%)`,

    cmyk: `cmyk(${round(
      cmyk.c
    )}%, ${round(
      cmyk.m
    )}%, ${round(
      cmyk.y
    )}%, ${round(
      cmyk.k
    )}%)`,

    css:
      normalized.a < 1
        ? rgbaToString(
            normalized
          )
        : rgbaToHex6(
            normalized
          ),

    colorName:
      getColorName(
        normalized
      ),

    hslObject: hsl,
    hsvObject: hsv,
    hwbObject: hwb,
    cmykObject: cmyk,
  };
}

/* =========================================================
   SHADE
========================================================= */

function mixWith(
  rgba,
  target,
  amount
) {
  const factor =
    clamp(amount, 0, 100) / 100;

  return {
    r: Math.round(
      rgba.r +
        (target.r - rgba.r) *
          factor
    ),

    g: Math.round(
      rgba.g +
        (target.g - rgba.g) *
          factor
    ),

    b: Math.round(
      rgba.b +
        (target.b - rgba.b) *
          factor
    ),

    a: rgba.a,
  };
}

export function createShades(
  rgba,
  count = 8
) {
  return Array.from(
    { length: count },
    (_, index) =>
      mixWith(
        rgba,
        {
          r: 0,
          g: 0,
          b: 0,
        },
        ((index + 1) /
          (count + 1)) *
          100
      )
  );
}

/* =========================================================
   TINTS
========================================================= */

export function createTints(
  rgba,
  count = 8
) {
  return Array.from(
    { length: count },
    (_, index) =>
      mixWith(
        rgba,
        {
          r: 255,
          g: 255,
          b: 255,
        },
        ((index + 1) /
          (count + 1)) *
          100
      )
  );
}

/* =========================================================
   HUE ROTATION
========================================================= */

function rotateHue(
  rgba,
  degrees
) {
  const hsv =
    rgbToHsv(rgba);

  return {
    ...hsvToRgb({
      h:
        hsv.h +
        degrees,
      s: hsv.s,
      v: hsv.v,
    }),

    a: rgba.a,
  };
}

/* =========================================================
   PALETTES
========================================================= */

export function createPalette(
  rgba
) {
  return {
    complementary: [
      rgba,
      rotateHue(rgba, 180),
    ],

    analogous: [
      rotateHue(rgba, -30),
      rgba,
      rotateHue(rgba, 30),
    ],

    triadic: [
      rgba,
      rotateHue(rgba, 120),
      rotateHue(rgba, 240),
    ],

    monochromatic:
      createMonochromatic(
        rgba
      ),
  };
}

/* =========================================================
   MONOCHROMATIC
========================================================= */

export function createMonochromatic(
  rgba
) {
  const hsv =
    rgbToHsv(rgba);

  const values = [
    100,
    85,
    70,
    55,
    40,
  ];

  return values.map(
    (value) => ({
      ...hsvToRgb({
        h: hsv.h,
        s: hsv.s,
        v: value,
      }),
      a: rgba.a,
    })
  );
}

/* =========================================================
   RELATIVE LUMINANCE
========================================================= */

export function relativeLuminance(
  rgba
) {
  const channels = [
    rgba.r,
    rgba.g,
    rgba.b,
  ].map((channel) => {
    const value =
      channel / 255;

    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) /
          1.055) **
          2.4;
  });

  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  );
}

/* =========================================================
   CONTRAST RATIO
========================================================= */

export function contrastRatio(
  foreground,
  background
) {
  const foregroundLum =
    relativeLuminance(
      foreground
    );

  const backgroundLum =
    relativeLuminance(
      background
    );

  const lighter =
    Math.max(
      foregroundLum,
      backgroundLum
    );

  const darker =
    Math.min(
      foregroundLum,
      backgroundLum
    );

  return (
    (lighter + 0.05) /
    (darker + 0.05)
  );
}

/* =========================================================
   WCAG LEVEL
========================================================= */

export function getContrastLevel(
  ratio
) {
  if (ratio >= 7) {
    return "AAA";
  }

  if (ratio >= 4.5) {
    return "AA";
  }

  if (ratio >= 3) {
    return "AA Large";
  }

  return "Fail";
}

/* =========================================================
   BEST TEXT COLOR
========================================================= */

export function getBestTextColor(
  background
) {
  const white = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  };

  const black = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  };

  const whiteRatio =
    contrastRatio(
      white,
      background
    );

  const blackRatio =
    contrastRatio(
      black,
      background
    );

  return whiteRatio >
    blackRatio
    ? "#FFFFFF"
    : "#000000";
}

/* =========================================================
   COPY ALL
========================================================= */

export function createCopyText(
  rgba
) {
  const data =
    getColorData(rgba);

  return [
    `HEX: ${data.hex}`,
    `HEX + Alpha: ${data.hexAlpha}`,
    `RGB: ${data.rgb}`,
    `RGBA: ${data.rgbaString}`,
    `HSL: ${data.hsl}`,
    `HSLA: ${data.hsla}`,
    `HSV: ${data.hsv}`,
    `HWB: ${data.hwb}`,
    `CMYK: ${data.cmyk}`,
    `CSS: ${data.css}`,
    `Color Name: ${data.colorName}`,
  ].join("\n");
}

/* =========================================================
   DOWNLOAD
========================================================= */

export function createDownloadContent(
  rgba
) {
  const data =
    getColorData(rgba);

  return [
    "ToolVerse Color Converter",
    "=========================",
    "",
    `HEX: ${data.hex}`,
    `HEX + Alpha: ${data.hexAlpha}`,
    `RGB: ${data.rgb}`,
    `RGBA: ${data.rgbaString}`,
    `HSL: ${data.hsl}`,
    `HSLA: ${data.hsla}`,
    `HSV: ${data.hsv}`,
    `HWB: ${data.hwb}`,
    `CMYK: ${data.cmyk}`,
    `CSS: ${data.css}`,
    `Color Name: ${data.colorName}`,
  ].join("\n");
}

/* =========================================================
   COLOR KEY
========================================================= */

export function colorToStorageKey(
  rgba
) {
  return rgbaToHex(rgba);
}