"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ToolLayout from "@/components/tools/shared/ToolLayout";
import ToolActions from "@/components/tools/shared/ToolActions";

import { copyText } from "@/lib/clipboard";
import { downloadFile } from "@/lib/download";
import {
  handleShare as shareTool,
} from "@/lib/toolActions";

import config from "./config";
import faq from "./faq";

import {
  contrastRatio,
  createCopyText,
  createDownloadContent,
  createPalette,
  createShades,
  createTints,
  getBestTextColor,
  getColorData,
  getContrastLevel,
  hsvToRgb,
  parseColorInput,
  rgbToHsv,
  searchColorNames,
} from "./logic";

/* =========================================================
   CONSTANTS
========================================================= */

const DEFAULT_RGBA = {
  r: 59,
  g: 130,
  b: 246,
  a: 1,
};

const RECENT_KEY =
  "toolverse-color-recent";

const FAVORITES_KEY =
  "toolverse-color-favorites";

/* =========================================================
   HELPERS
========================================================= */

const clamp = (
  value,
  min,
  max
) =>
  Math.min(
    max,
    Math.max(
      min,
      Number(value) || 0
    )
  );

/* =========================================================
   COPY ROW
========================================================= */

function CopyRow({
  label,
  value,
  onCopy,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </div>

      <code className="min-w-0 flex-1 break-all text-sm text-gray-900 dark:text-gray-100">
        {value}
      </code>

      <button
        type="button"
        onClick={() =>
          onCopy(value)
        }
        className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-700"
      >
        Copy
      </button>
    </div>
  );
}

/* =========================================================
   COLOR SWATCH
========================================================= */

function ColorSwatch({
  rgba,
  onSelect,
}) {
  const data =
    getColorData(rgba);

  return (
    <button
      type="button"
      onClick={() =>
        onSelect(rgba)
      }
      className="overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
    >
      <div
        className="h-16 w-full"
        style={{
          backgroundColor:
            data.rgbaString,
        }}
      />

      <div className="p-2">
        <div className="font-mono text-xs font-semibold">
          {data.hex}
        </div>

        <div className="mt-1 truncate text-[11px] text-gray-500">
          {data.colorName}
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   CHECKERBOARD
========================================================= */

function Checkerboard({
  children,
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundColor:
          "#ffffff",
        backgroundImage: `
          linear-gradient(
            45deg,
            #e5e7eb 25%,
            transparent 25%
          ),
          linear-gradient(
            -45deg,
            #e5e7eb 25%,
            transparent 25%
          ),
          linear-gradient(
            45deg,
            transparent 75%,
            #e5e7eb 75%
          ),
          linear-gradient(
            -45deg,
            transparent 75%,
            #e5e7eb 75%
          )
        `,
        backgroundSize:
          "20px 20px",
        backgroundPosition:
          "0 0, 0 10px, 10px -10px, -10px 0",
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   VISUAL COLOR PICKER
========================================================= */

function VisualPicker({
  rgba,
  onChange,
}) {
  const pickerRef =
    useRef(null);

  const hueRef =
    useRef(null);

  const alphaRef =
    useRef(null);

  const hsv =
    rgbToHsv(rgba);

  /* -------------------------------------------------------
     SATURATION / VALUE
  ------------------------------------------------------- */

  const updateSV = (
    clientX,
    clientY
  ) => {
    const element =
      pickerRef.current;

    if (!element) {
      return;
    }

    const rect =
      element.getBoundingClientRect();

    const saturation =
      clamp(
        ((clientX -
          rect.left) /
          rect.width) *
          100,
        0,
        100
      );

    const value =
      clamp(
        100 -
          ((clientY -
            rect.top) /
            rect.height) *
            100,
        0,
        100
      );

    const rgb =
      hsvToRgb({
        h: hsv.h,
        s: saturation,
        v: value,
      });

    onChange({
      ...rgb,
      a: rgba.a,
    });
  };

  /* -------------------------------------------------------
     HUE
  ------------------------------------------------------- */

  const updateHue = (
    clientX
  ) => {
    const element =
      hueRef.current;

    if (!element) {
      return;
    }

    const rect =
      element.getBoundingClientRect();

    const hue =
      clamp(
        ((clientX -
          rect.left) /
          rect.width) *
          360,
        0,
        360
      );

    const rgb =
      hsvToRgb({
        h: hue,
        s: hsv.s,
        v: hsv.v,
      });

    onChange({
      ...rgb,
      a: rgba.a,
    });
  };

  /* -------------------------------------------------------
     ALPHA
  ------------------------------------------------------- */

  const updateAlpha = (
    clientX
  ) => {
    const element =
      alphaRef.current;

    if (!element) {
      return;
    }

    const rect =
      element.getBoundingClientRect();

    const alpha =
      clamp(
        (clientX -
          rect.left) /
          rect.width,
        0,
        1
      );

    onChange({
      ...rgba,
      a: alpha,
    });
  };

  /* -------------------------------------------------------
     POINTER DRAG
  ------------------------------------------------------- */

  const beginDrag = (
    event,
    callback
  ) => {
    event.preventDefault();

    callback(
      event.clientX,
      event.clientY
    );

    const move =
      (moveEvent) => {
        callback(
          moveEvent.clientX,
          moveEvent.clientY
        );
      };

    const stop = () => {
      window.removeEventListener(
        "pointermove",
        move
      );

      window.removeEventListener(
        "pointerup",
        stop
      );
    };

    window.addEventListener(
      "pointermove",
      move
    );

    window.addEventListener(
      "pointerup",
      stop
    );
  };

  const hueGradient = `
    linear-gradient(
      to right,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    )
  `;

  return (
    <div className="space-y-6">

      {/* SATURATION / BRIGHTNESS */}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            Saturation / Brightness
          </h3>

          <span className="text-xs text-gray-500">
            {Math.round(
              hsv.s
            )}
            % /{" "}
            {Math.round(
              hsv.v
            )}
            %
          </span>
        </div>

        <div
          ref={pickerRef}
          onPointerDown={(event) =>
            beginDrag(
              event,
              updateSV
            )
          }
          className="relative h-72 w-full cursor-crosshair touch-none overflow-hidden rounded-2xl border border-gray-300"
          style={{
            backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
            backgroundImage: `
              linear-gradient(
                to bottom,
                transparent,
                #000
              ),
              linear-gradient(
                to right,
                #fff,
                transparent
              )
            `,
          }}
        >
          <div
            className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.8)]"
            style={{
              left: `${hsv.s}%`,
              top: `${
                100 - hsv.v
              }%`,
            }}
          />
        </div>
      </div>

      {/* HUE */}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            Hue
          </h3>

          <span className="text-xs text-gray-500">
            {Math.round(
              hsv.h
            )}
            °
          </span>
        </div>

        <div
          ref={hueRef}
          onPointerDown={(event) =>
            beginDrag(
              event,
              updateHue
            )
          }
          className="relative h-6 cursor-pointer touch-none rounded-full border border-gray-300"
          style={{
            background:
              hueGradient,
          }}
        >
          <div
            className="pointer-events-none absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.8)]"
            style={{
              left: `${
                (hsv.h /
                  360) *
                100
              }%`,
              backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
            }}
          />
        </div>
      </div>

      {/* ALPHA */}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            Alpha
          </h3>

          <span className="text-xs text-gray-500">
            {Math.round(
              rgba.a * 100
            )}
            %
          </span>
        </div>

        <div
          ref={alphaRef}
          onPointerDown={(event) =>
            beginDrag(
              event,
              updateAlpha
            )
          }
          className="relative h-6 cursor-pointer touch-none overflow-visible rounded-full border border-gray-300"
          style={{
            backgroundColor:
              "#fff",

            backgroundImage: `
              linear-gradient(
                45deg,
                #d1d5db 25%,
                transparent 25%
              ),
              linear-gradient(
                -45deg,
                #d1d5db 25%,
                transparent 25%
              ),
              linear-gradient(
                45deg,
                transparent 75%,
                #d1d5db 75%
              ),
              linear-gradient(
                -45deg,
                transparent 75%,
                #d1d5db 75%
              ),
              linear-gradient(
                to right,
                rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0),
                rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1)
              )
            `,

            backgroundSize:
              "12px 12px,12px 12px,12px 12px,12px 12px,100% 100%",

            backgroundPosition:
              "0 0,0 6px,6px -6px,-6px 0,0 0",
          }}
        >
          <div
            className="pointer-events-none absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.8)]"
            style={{
              left: `${
                rgba.a * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CONTRAST CHECKER
========================================================= */

function ContrastChecker() {
  const [
    foreground,
    setForeground,
  ] = useState("#000000");

  const [
    background,
    setBackground,
  ] = useState("#FFFFFF");

  const result =
    useMemo(() => {
      try {
        const fg =
          parseColorInput(
            foreground
          );

        const bg =
          parseColorInput(
            background
          );

        const ratio =
          contrastRatio(
            fg,
            bg
          );

        return {
          ratio,
          level:
            getContrastLevel(
              ratio
            ),
          textColor:
            getBestTextColor(
              bg
            ),
        };
      } catch {
        return null;
      }
    }, [
      foreground,
      background,
    ]);

  return (
    <section className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          WCAG Contrast Checker
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Check the contrast ratio between
          foreground and background colors.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Foreground
          </label>

          <input
            value={
              foreground
            }
            onChange={(event) =>
              setForeground(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-mono text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Background
          </label>

          <input
            value={
              background
            }
            onChange={(event) =>
              setBackground(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-mono text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900"
          />
        </div>
      </div>

      {result ? (
        <>
          <div
            className="mt-5 rounded-2xl p-8 text-center"
            style={{
              backgroundColor:
                background,
              color:
                result.textColor,
            }}
          >
            <div className="text-2xl font-bold">
              Sample Text
            </div>

            <div className="mt-2 text-sm">
              Contrast ratio{" "}
              {result.ratio.toFixed(
                2
              )}
              :1
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl border p-4 text-center">
              <div className="text-xs text-gray-500">
                Contrast
              </div>

              <div className="mt-1 text-lg font-semibold">
                {result.ratio.toFixed(
                  2
                )}
                :1
              </div>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <div className="text-xs text-gray-500">
                WCAG
              </div>

              <div className="mt-1 text-lg font-semibold">
                {result.level}
              </div>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <div className="text-xs text-gray-500">
                Best Text
              </div>

              <div className="mt-1 font-mono font-semibold">
                {result.textColor}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">

            <div className="rounded-lg border p-3">
              <strong>
                AA Normal
              </strong>

              <div className="mt-1">
                {result.ratio >=
                4.5
                  ? "✓ Pass"
                  : "✕ Fail"}
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <strong>
                AA Large
              </strong>

              <div className="mt-1">
                {result.ratio >=
                3
                  ? "✓ Pass"
                  : "✕ Fail"}
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <strong>
                AAA Normal
              </strong>

              <div className="mt-1">
                {result.ratio >=
                7
                  ? "✓ Pass"
                  : "✕ Fail"}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Enter valid foreground and
          background colors.
        </div>
      )}
    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ColorConverter({
  tool = config,
}) {
  const [
    rgba,
    setRgba,
  ] = useState(
    DEFAULT_RGBA
  );

  /*
   * IMPORTANT:
   *
   * `input` is the raw text currently being typed.
   *
   * We DO NOT automatically replace it whenever it
   * temporarily becomes a valid color.
   *
   * This fixes:
   *
   * #ff0000
   *
   * becoming:
   *
   * #ffff0000
   *
   * while typing.
   */
  const [
    input,
    setInput,
  ] = useState(
    "#3B82F6"
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    toast,
    setToast,
  ] = useState("");

  const [
    recent,
    setRecent,
  ] = useState([]);

  const [
    favorites,
    setFavorites,
  ] = useState([]);

  const [
    nameSearch,
    setNameSearch,
  ] = useState("");

  const data =
    useMemo(
      () =>
        getColorData(
          rgba
        ),
      [rgba]
    );

  const shades =
    useMemo(
      () =>
        createShades(
          rgba
        ),
      [rgba]
    );

  const tints =
    useMemo(
      () =>
        createTints(
          rgba
        ),
      [rgba]
    );

  const palette =
    useMemo(
      () =>
        createPalette(
          rgba
        ),
      [rgba]
    );

  const colorNames =
    useMemo(
      () =>
        searchColorNames(
          nameSearch
        ),
      [nameSearch]
    );

  /* =======================================================
     LOAD LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    try {
      const storedRecent =
        JSON.parse(
          localStorage.getItem(
            RECENT_KEY
          ) || "[]"
        );

      const storedFavorites =
        JSON.parse(
          localStorage.getItem(
            FAVORITES_KEY
          ) || "[]"
        );

      if (
        Array.isArray(
          storedRecent
        )
      ) {
        setRecent(
          storedRecent
        );
      }

      if (
        Array.isArray(
          storedFavorites
        )
      ) {
        setFavorites(
          storedFavorites
        );
      }
    } catch {
      setRecent([]);
      setFavorites([]);
    }
  }, []);

  /* =======================================================
     TOAST
  ======================================================= */

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer =
      setTimeout(() => {
        setToast("");
      }, 2200);

    return () =>
      clearTimeout(
        timer
      );
  }, [toast]);

  /* =======================================================
     READ SHARED COLOR URL
  ======================================================= */

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const color =
      params.get("color");

    const alpha =
      params.get("alpha");

    if (!color) {
      return;
    }

    try {
      const parsed =
        parseColorInput(
          color.startsWith("#")
            ? color
            : `#${color}`
        );

      if (
        alpha !== null
      ) {
        parsed.a =
          clamp(
            Number(alpha) /
              100,
            0,
            1
          );
      }

      setRgba(parsed);

      const parsedData =
        getColorData(
          parsed
        );

      setInput(
        parsed.a < 1
          ? parsedData.hexAlpha
          : parsedData.hex
      );
    } catch {
      // Invalid share URL.
    }
  }, []);

  /* =======================================================
     RECENT COLORS
  ======================================================= */

  const addRecent = (
    color
  ) => {
    const value =
      getColorData(
        color
      ).hexAlpha;

    setRecent(
      (previous) => {
        const updated =
          [
            value,
            ...previous.filter(
              (item) =>
                item !== value
            ),
          ].slice(
            0,
            12
          );

        try {
          localStorage.setItem(
            RECENT_KEY,
            JSON.stringify(
              updated
            )
          );
        } catch {}

        return updated;
      }
    );
  };

  /* =======================================================
     APPLY COLOR
  ======================================================= */

  const applyColor = (
    color,
    saveRecent = true,
    updateInput = true
  ) => {
    const normalized = {
      r: clamp(
        Math.round(
          color.r
        ),
        0,
        255
      ),

      g: clamp(
        Math.round(
          color.g
        ),
        0,
        255
      ),

      b: clamp(
        Math.round(
          color.b
        ),
        0,
        255
      ),

      a: clamp(
        color.a ?? 1,
        0,
        1
      ),
    };

    setRgba(
      normalized
    );

    /*
     * Only update the text field when the color was
     * intentionally selected/applied.
     *
     * During normal typing this function is NOT called.
     */
    if (updateInput) {
      const next =
        getColorData(
          normalized
        );

      setInput(
        normalized.a < 1
          ? next.hexAlpha
          : next.hex
      );
    }

    setError("");

    if (saveRecent) {
      addRecent(
        normalized
      );
    }
  };

  /* =======================================================
     PARSE INPUT
  ======================================================= */

  const commitInput = (
    value = input
  ) => {
    const trimmed =
      String(value).trim();

    /*
     * Allow the user to completely clear the input.
     */
    if (!trimmed) {
      setInput("");
      setError("");
      return;
    }

    try {
      const parsed =
        parseColorInput(
          trimmed
        );

      /*
       * Apply the color, but normalize the input only AFTER
       * the user has finished editing it.
       */
      applyColor(
        parsed,
        true,
        true
      );
    } catch {
      setError(
        "Invalid color. Use HEX, RGB, HSL, HSV, HWB, CMYK, or a CSS color name."
      );
    }
  };

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleInputChange = (
    event
  ) => {
    /*
     * CRITICAL FIX:
     *
     * Never parse or update the selected color here.
     *
     * This lets the user type:
     *
     * #ff0000
     *
     * naturally without React rewriting the input.
     */
    setInput(
      event.target.value
    );

    setError("");
  };

  /* =======================================================
     INPUT KEYBOARD
  ======================================================= */

  const handleInputKeyDown = (
    event
  ) => {
    if (
      event.key ===
      "Enter"
    ) {
      event.preventDefault();

      commitInput();
    }

    /*
     * Escape restores the currently selected color.
     */
    if (
      event.key ===
      "Escape"
    ) {
      event.preventDefault();

      const current =
        getColorData(
          rgba
        );

      setInput(
        rgba.a < 1
          ? current.hexAlpha
          : current.hex
      );

      setError("");
    }
  };

  /* =======================================================
     INPUT BLUR
  ======================================================= */

  const handleInputBlur =
    () => {
      /*
       * Only validate when the user has finished editing.
       */
      if (
        input.trim()
      ) {
        commitInput();
      }
    };

  /* =======================================================
     COPY
  ======================================================= */

  const handleCopy = async (
    value
  ) => {
    try {
      await copyText(
        value
      );

      setToast(
        "Copied to clipboard."
      );
    } catch {
      setToast(
        "Unable to copy."
      );
    }
  };

  const handleCopyAll =
    () => {
      handleCopy(
        createCopyText(
          rgba
        )
      );
    };

  /* =======================================================
     DOWNLOAD
  ======================================================= */

  const handleDownload =
    () => {
      downloadFile(
        createDownloadContent(
          rgba
        ),
        "color-values.txt",
        "text/plain"
      );

      setToast(
        "Color values downloaded."
      );
    };

  /* =======================================================
     SHARE
  ======================================================= */

  const handleShare =
    async () => {
      const params =
        new URLSearchParams({
          color:
            data.hex.replace(
              "#",
              ""
            ),

          alpha: String(
            Math.round(
              rgba.a * 100
            )
          ),
        });

      const url =
        `${window.location.origin}${window.location.pathname}?${params.toString()}`;

      try {
        await shareTool({
          title:
            "ToolVerse Color Converter",

          text:
            `Color ${data.hex}`,

          url,
        });

        setToast(
          "Color link shared."
        );
      } catch {
        try {
          await copyText(
            url
          );

          setToast(
            "Share link copied."
          );
        } catch {
          setToast(
            "Unable to share color."
          );
        }
      }
    };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset =
    () => {
      setRgba(
        DEFAULT_RGBA
      );

      setInput(
        "#3B82F6"
      );

      setError("");
      setToast(
        "Color reset."
      );
    };

  /* =======================================================
     FAVORITES
  ======================================================= */

  const isFavorite =
    favorites.includes(
      data.hexAlpha
    );

  const toggleFavorite =
    () => {
      const value =
        data.hexAlpha;

      setFavorites(
        (previous) => {
          const exists =
            previous.includes(
              value
            );

          const updated =
            exists
              ? previous.filter(
                  (item) =>
                    item !== value
                )
              : [
                  value,
                  ...previous,
                ].slice(
                  0,
                  20
                );

          try {
            localStorage.setItem(
              FAVORITES_KEY,
              JSON.stringify(
                updated
              )
            );
          } catch {}

          setToast(
            exists
              ? "Removed from favorites."
              : "Added to favorites."
          );

          return updated;
        }
      );
    };

  /* =======================================================
     SELECT COLOR
  ======================================================= */

  const selectColor = (
    color
  ) => {
    /*
     * Picker / palette selections SHOULD immediately
     * update the input because the user is not typing.
     */
    applyColor(
      color,
      true,
      true
    );
  };

  return (
    <ToolLayout
      tool={tool}
      faq={faq}
    >
      <div className="space-y-10">

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {/* =================================================
            PICKER + CONVERTER
        ================================================= */}

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* VISUAL PICKER */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Visual Color Picker
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pick saturation, brightness,
                hue, and transparency.
              </p>
            </div>

            <VisualPicker
              rgba={rgba}
              onChange={(
                color
              ) =>
                selectColor(
                  color
                )
              }
            />
          </div>

          {/* CONVERTER */}

          <div className="space-y-6">

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

              <h2 className="text-xl font-semibold">
                Color Code Converter
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter any supported color format.
              </p>

              {/* =================================================
                  FIXED INPUT
              ================================================= */}

              <input
                value={input}
                onChange={
                  handleInputChange
                }
                onKeyDown={
                  handleInputKeyDown
                }
                onBlur={
                  handleInputBlur
                }
                spellCheck={false}
                autoComplete="off"
                placeholder="#3B82F6"
                className="mt-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-950"
              />

              <div className="mt-2 text-xs text-gray-500">
                Press Enter to apply the color.
              </div>

              {/* EXAMPLES */}

              <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Examples
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "#FF5733",
                  "rgb(255, 87, 51)",
                  "hsl(11, 100%, 60%)",
                  "hsv(11, 80%, 100%)",
                  "hwb(11 0% 0%)",
                  "cmyk(0%, 66%, 80%, 0%)",
                  "royalblue",
                ].map(
                  (
                    example
                  ) => (
                    <button
                      key={
                        example
                      }
                      type="button"
                      onClick={() =>
                        commitInput(
                          example
                        )
                      }
                      className="rounded-full border border-gray-300 px-3 py-1.5 font-mono text-[11px] transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                    >
                      {example}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* PREVIEW */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">

              <Checkerboard>
                <div
                  className="relative flex h-52 items-end p-6"
                  style={{
                    backgroundColor:
                      data.rgbaString,
                  }}
                >
                  <div
                    style={{
                      color:
                        getBestTextColor(
                          rgba
                        ),
                    }}
                  >
                    <div className="text-3xl font-bold">
                      {data.hex}
                    </div>

                    <div className="mt-1 text-sm">
                      {
                        data.colorName
                      }
                    </div>
                  </div>
                </div>
              </Checkerboard>

              <div className="flex items-center justify-between bg-white p-4 dark:bg-gray-900">

                <div>
                  <div className="text-xs text-gray-500">
                    Alpha
                  </div>

                  <div className="font-semibold">
                    {Math.round(
                      rgba.a *
                        100
                    )}
                    %
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    toggleFavorite
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                >
                  {isFavorite
                    ? "★ Favorited"
                    : "☆ Favorite"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            COLOR VALUES
        ================================================= */}

        <section>

          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">

            <div>
              <h2 className="text-xl font-semibold">
                Color Values
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                All supported formats for the selected color.
              </p>
            </div>

            <button
              type="button"
              onClick={
                handleCopyAll
              }
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Copy All
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">

            <CopyRow
              label="HEX"
              value={
                data.hex
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="HEX + Alpha"
              value={
                data.hexAlpha
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="RGB"
              value={
                data.rgb
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="RGBA"
              value={
                data.rgbaString
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="HSL"
              value={
                data.hsl
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="HSLA"
              value={
                data.hsla
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="HSV"
              value={
                data.hsv
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="HWB"
              value={
                data.hwb
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="CMYK"
              value={
                data.cmyk
              }
              onCopy={
                handleCopy
              }
            />

            <CopyRow
              label="CSS"
              value={
                data.css
              }
              onCopy={
                handleCopy
              }
            />
          </div>
        </section>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <ToolActions
          supports={
            tool?.supports
          }
          onCopy={
            handleCopyAll
          }
          onDownload={
            handleDownload
          }
          onShare={
            handleShare
          }
          onReset={
            handleReset
          }
        />

        {/* =================================================
            SHADES
        ================================================= */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Color Shades
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Darker variations of the selected color.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {shades.map(
              (
                color,
                index
              ) => (
                <ColorSwatch
                  key={
                    index
                  }
                  rgba={
                    color
                  }
                  onSelect={
                    selectColor
                  }
                />
              )
            )}
          </div>
        </section>

        {/* =================================================
            TINTS
        ================================================= */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Color Tints
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Lighter variations of the selected color.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {tints.map(
              (
                color,
                index
              ) => (
                <ColorSwatch
                  key={
                    index
                  }
                  rgba={
                    color
                  }
                  onSelect={
                    selectColor
                  }
                />
              )
            )}
          </div>
        </section>

        {/* =================================================
            PALETTES
        ================================================= */}

        <section>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Color Palettes
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Generate complementary, analogous,
              triadic, and monochromatic colors.
            </p>
          </div>

          <div className="space-y-8">

            {/* COMPLEMENTARY */}

            <div>
              <h3 className="mb-3 font-medium">
                Complementary
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {palette.complementary.map(
                  (
                    color,
                    index
                  ) => (
                    <ColorSwatch
                      key={
                        index
                      }
                      rgba={
                        color
                      }
                      onSelect={
                        selectColor
                      }
                    />
                  )
                )}
              </div>
            </div>

            {/* ANALOGOUS */}

            <div>
              <h3 className="mb-3 font-medium">
                Analogous
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {palette.analogous.map(
                  (
                    color,
                    index
                  ) => (
                    <ColorSwatch
                      key={
                        index
                      }
                      rgba={
                        color
                      }
                      onSelect={
                        selectColor
                      }
                    />
                  )
                )}
              </div>
            </div>

            {/* TRIADIC */}

            <div>
              <h3 className="mb-3 font-medium">
                Triadic
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {palette.triadic.map(
                  (
                    color,
                    index
                  ) => (
                    <ColorSwatch
                      key={
                        index
                      }
                      rgba={
                        color
                      }
                      onSelect={
                        selectColor
                      }
                    />
                  )
                )}
              </div>
            </div>

            {/* MONOCHROMATIC */}

            <div>
              <h3 className="mb-3 font-medium">
                Monochromatic
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {palette.monochromatic.map(
                  (
                    color,
                    index
                  ) => (
                    <ColorSwatch
                      key={
                        index
                      }
                      rgba={
                        color
                      }
                      onSelect={
                        selectColor
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            WCAG
        ================================================= */}

        <ContrastChecker />

        {/* =================================================
            CSS COLOR NAMES
        ================================================= */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              CSS Color Names
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search and select from standard CSS color names.
            </p>
          </div>

          <input
            value={
              nameSearch
            }
            onChange={(
              event
            ) =>
              setNameSearch(
                event.target
                  .value
              )
            }
            placeholder="Search CSS color names..."
            className="mb-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

            {colorNames.map(
              (color) => (
                <button
                  key={
                    color.name
                  }
                  type="button"
                  onClick={() =>
                    selectColor(
                      color.rgba
                    )
                  }
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <span
                    className="h-8 w-8 shrink-0 rounded-full border border-black/10"
                    style={{
                      backgroundColor:
                        color.hex,
                    }}
                  />

                  <span className="min-w-0">

                    <span className="block truncate text-sm font-medium">
                      {
                        color.name
                      }
                    </span>

                    <span className="block font-mono text-[10px] text-gray-500">
                      {
                        color.hex
                      }
                    </span>

                  </span>
                </button>
              )
            )}

          </div>
        </section>

        {/* =================================================
            RECENT
        ================================================= */}

        {recent.length >
          0 && (
          <section>

            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Recent Colors
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Colors you recently selected.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">

              {recent.map(
                (
                  value
                ) => {
                  try {
                    const color =
                      parseColorInput(
                        value
                      );

                    return (
                      <ColorSwatch
                        key={
                          value
                        }
                        rgba={
                          color
                        }
                        onSelect={
                          selectColor
                        }
                      />
                    );
                  } catch {
                    return null;
                  }
                }
              )}

            </div>
          </section>
        )}

        {/* =================================================
            FAVORITES
        ================================================= */}

        {favorites.length >
          0 && (
          <section>

            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Favorite Colors
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your saved favorite colors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">

              {favorites.map(
                (
                  value
                ) => {
                  try {
                    const color =
                      parseColorInput(
                        value
                      );

                    return (
                      <ColorSwatch
                        key={
                          value
                        }
                        rgba={
                          color
                        }
                        onSelect={
                          selectColor
                        }
                      />
                    );
                  } catch {
                    return null;
                  }
                }
              )}

            </div>
          </section>
        )}

        {/* =================================================
            TOAST
        ================================================= */}

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-gray-900">
            {toast}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}