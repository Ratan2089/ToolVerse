/*
 * UUID Generator Logic
 *
 * Uses the browser Web Crypto API.
 * UUID v4 is randomly generated using crypto.randomUUID().
 */


/* =========================================================
   GENERATE UUID
   ========================================================= */

export function generateUuid() {
  if (
    typeof crypto === "undefined" ||
    typeof crypto.randomUUID !== "function"
  ) {
    throw new Error(
      "Secure UUID generation is not supported by this browser."
    );
  }

  return crypto.randomUUID();
}


/* =========================================================
   GENERATE MULTIPLE UUIDs
   ========================================================= */

export function generateUuids(count = 1) {
  const quantity = Number(count);

  if (
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    throw new Error(
      "UUID quantity must be at least 1."
    );
  }

  if (quantity > 1000) {
    throw new Error(
      "You can generate a maximum of 1000 UUIDs at once."
    );
  }

  return Array.from(
    { length: quantity },
    () => generateUuid()
  );
}


/* =========================================================
   FORMAT UUID
   ========================================================= */

export function formatUuid(
  uuid,
  {
    uppercase = false,
    removeHyphens = false,
  } = {}
) {
  if (!uuid) {
    return "";
  }

  let formatted = uuid;

  if (removeHyphens) {
    formatted = formatted.replace(
      /-/g,
      ""
    );
  }

  if (uppercase) {
    formatted =
      formatted.toUpperCase();
  } else {
    formatted =
      formatted.toLowerCase();
  }

  return formatted;
}


/* =========================================================
   FORMAT UUID LIST
   ========================================================= */

export function formatUuidList(
  uuids,
  options = {}
) {
  if (!Array.isArray(uuids)) {
    return [];
  }

  return uuids.map((uuid) =>
    formatUuid(uuid, options)
  );
}


/* =========================================================
   UUID VALIDATION
   ========================================================= */

export function isValidUuid(value) {
  if (
    typeof value !== "string"
  ) {
    return false;
  }

  const uuid = value.trim();

  /*
   * Standard UUID format:
   *
   * xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
   *
   * M = UUID version
   * N = UUID variant
   */

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidRegex.test(uuid);
}


/* =========================================================
   UUID VERSION
   ========================================================= */

export function getUuidVersion(value) {
  if (
    !isValidUuid(value)
  ) {
    return null;
  }

  return parseInt(
    value.charAt(14),
    16
  );
}


/* =========================================================
   UUID VARIANT
   ========================================================= */

export function getUuidVariant(value) {
  if (
    !isValidUuid(value)
  ) {
    return null;
  }

  const variant =
    parseInt(
      value.charAt(19),
      16
    );

  if (
    (variant & 0x8) === 0
  ) {
    return "NCS";
  }

  if (
    (variant & 0xc) === 0x8
  ) {
    return "RFC 4122";
  }

  if (
    (variant & 0xe) === 0xc
  ) {
    return "Microsoft";
  }

  return "Reserved";
}


/* =========================================================
   UUID v4 CHECK
   ========================================================= */

export function isUuidV4(value) {
  if (
    !isValidUuid(value)
  ) {
    return false;
  }

  return (
    value.charAt(14)
      .toLowerCase() === "4"
  );
}


/* =========================================================
   DOWNLOAD CONTENT
   ========================================================= */

export function createUuidText(
  uuids
) {
  if (!Array.isArray(uuids)) {
    return "";
  }

  return uuids.join("\n");
}