/*
 * Password Generator Logic
 *
 * Uses the browser Web Crypto API.
 * Passwords are generated locally in the browser.
 */


/* =========================================================
   CONSTANTS
   ========================================================= */

export const CHARACTER_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",

  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  numbers: "0123456789",

  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/",
};

export const AMBIGUOUS_CHARACTERS =
  "Il1O0o";


/* =========================================================
   SECURE RANDOM INTEGER
   ========================================================= */

function secureRandomInt(max) {
  if (
    !Number.isInteger(max) ||
    max <= 0
  ) {
    throw new Error(
      "Invalid random range."
    );
  }

  const cryptoObject =
    globalThis.crypto;

  if (
    !cryptoObject ||
    !cryptoObject.getRandomValues
  ) {
    throw new Error(
      "Secure random number generation is not supported by this browser."
    );
  }

  /*
   * Rejection sampling prevents modulo bias.
   */

  const maxUint32 =
    0x100000000;

  const limit =
    maxUint32 -
    (maxUint32 % max);

  const array =
    new Uint32Array(1);

  let randomValue;

  do {
    cryptoObject.getRandomValues(
      array
    );

    randomValue =
      array[0];
  } while (
    randomValue >= limit
  );

  return randomValue % max;
}


/* =========================================================
   RANDOM CHARACTER
   ========================================================= */

function getRandomCharacter(
  characters
) {
  if (!characters) {
    throw new Error(
      "Character set cannot be empty."
    );
  }

  const index =
    secureRandomInt(
      characters.length
    );

  return characters[index];
}


/* =========================================================
   SHUFFLE
   ========================================================= */

function secureShuffle(array) {
  const result = [...array];

  for (
    let i = result.length - 1;
    i > 0;
    i--
  ) {
    const j =
      secureRandomInt(i + 1);

    [
      result[i],
      result[j],
    ] = [
      result[j],
      result[i],
    ];
  }

  return result;
}


/* =========================================================
   REMOVE AMBIGUOUS CHARACTERS
   ========================================================= */

function removeAmbiguous(
  characters
) {
  return characters
    .split("")
    .filter(
      (character) =>
        !AMBIGUOUS_CHARACTERS.includes(
          character
        )
    )
    .join("");
}


/* =========================================================
   BUILD CHARACTER SET
   ========================================================= */

export function buildCharacterSets({
  lowercase = true,
  uppercase = true,
  numbers = true,
  symbols = true,
  excludeAmbiguous = false,
  customCharacters = "",
} = {}) {
  const selectedSets = [];

  if (lowercase) {
    selectedSets.push(
      CHARACTER_SETS.lowercase
    );
  }

  if (uppercase) {
    selectedSets.push(
      CHARACTER_SETS.uppercase
    );
  }

  if (numbers) {
    selectedSets.push(
      CHARACTER_SETS.numbers
    );
  }

  if (symbols) {
    selectedSets.push(
      CHARACTER_SETS.symbols
    );
  }

  if (customCharacters.trim()) {
    selectedSets.push(
      customCharacters
    );
  }

  let allCharacters =
    [
      ...new Set(
        selectedSets
          .join("")
          .split("")
      ),
    ].join("");

  if (excludeAmbiguous) {
    allCharacters =
      removeAmbiguous(
        allCharacters
      );
  }

  return {
    allCharacters,

    selectedSets,
  };
}


/* =========================================================
   GENERATE PASSWORD
   ========================================================= */

export function generatePassword({
  length = 16,

  lowercase = true,

  uppercase = true,

  numbers = true,

  symbols = true,

  excludeAmbiguous = false,

  customCharacters = "",
} = {}) {
  const passwordLength =
    Number(length);

  if (
    !Number.isInteger(
      passwordLength
    )
  ) {
    throw new Error(
      "Password length must be a whole number."
    );
  }

  if (
    passwordLength < 4 ||
    passwordLength > 128
  ) {
    throw new Error(
      "Password length must be between 4 and 128 characters."
    );
  }

  const {
    allCharacters,
    selectedSets,
  } =
    buildCharacterSets({
      lowercase,
      uppercase,
      numbers,
      symbols,
      excludeAmbiguous,
      customCharacters,
    });

  if (!allCharacters) {
    throw new Error(
      "Select at least one character type."
    );
  }

  /*
   * Ensure the password contains at least one
   * character from every selected character set.
   */

  if (
    passwordLength <
    selectedSets.length
  ) {
    throw new Error(
      `Password length must be at least ${selectedSets.length} characters for the selected character types.`
    );
  }

  const passwordCharacters = [];

  /*
   * Guarantee one character from each selected set.
   */

  for (
    const characterSet
    of selectedSets
  ) {
    let usableSet =
      characterSet;

    if (excludeAmbiguous) {
      usableSet =
        removeAmbiguous(
          usableSet
        );
    }

    if (!usableSet) {
      continue;
    }

    passwordCharacters.push(
      getRandomCharacter(
        usableSet
      )
    );
  }

  /*
   * Fill remaining positions.
   */

  while (
    passwordCharacters.length <
    passwordLength
  ) {
    passwordCharacters.push(
      getRandomCharacter(
        allCharacters
      )
    );
  }

  /*
   * Shuffle so guaranteed characters aren't
   * always at predictable positions.
   */

  return secureShuffle(
    passwordCharacters
  ).join("");
}


/* =========================================================
   GENERATE MULTIPLE PASSWORDS
   ========================================================= */

export function generatePasswords({
  count = 1,

  length = 16,

  lowercase = true,

  uppercase = true,

  numbers = true,

  symbols = true,

  excludeAmbiguous = false,

  customCharacters = "",
} = {}) {
  const quantity =
    Number(count);

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 100
  ) {
    throw new Error(
      "You can generate between 1 and 100 passwords at once."
    );
  }

  return Array.from(
    { length: quantity },
    () =>
      generatePassword({
        length,
        lowercase,
        uppercase,
        numbers,
        symbols,
        excludeAmbiguous,
        customCharacters,
      })
  );
}


/* =========================================================
   PASSWORD ENTROPY
   ========================================================= */

export function calculateEntropy(
  password,
  characterPoolSize
) {
  if (
    !password ||
    !characterPoolSize
  ) {
    return 0;
  }

  return (
    password.length *
    Math.log2(
      characterPoolSize
    )
  );
}


/* =========================================================
   STRENGTH
   ========================================================= */

export function getPasswordStrength(
  password,
  characterPoolSize
) {
  const entropy =
    calculateEntropy(
      password,
      characterPoolSize
    );

  if (entropy < 40) {
    return {
      label: "Very Weak",
      score: 1,
      entropy,
    };
  }

  if (entropy < 60) {
    return {
      label: "Weak",
      score: 2,
      entropy,
    };
  }

  if (entropy < 80) {
    return {
      label: "Good",
      score: 3,
      entropy,
    };
  }

  if (entropy < 100) {
    return {
      label: "Strong",
      score: 4,
      entropy,
    };
  }

  return {
    label: "Very Strong",
    score: 5,
    entropy,
  };
}


/* =========================================================
   CHARACTER POOL SIZE
   ========================================================= */

export function getCharacterPoolSize({
  lowercase = true,

  uppercase = true,

  numbers = true,

  symbols = true,

  excludeAmbiguous = false,

  customCharacters = "",
} = {}) {
  const {
    allCharacters,
  } =
    buildCharacterSets({
      lowercase,
      uppercase,
      numbers,
      symbols,
      excludeAmbiguous,
      customCharacters,
    });

  return allCharacters.length;
}


/* =========================================================
   PASSWORD VALIDATION
   ========================================================= */

export function validatePasswordOptions({
  lowercase = true,

  uppercase = true,

  numbers = true,

  symbols = true,

  customCharacters = "",
} = {}) {
  if (
    !lowercase &&
    !uppercase &&
    !numbers &&
    !symbols &&
    !customCharacters.trim()
  ) {
    return {
      valid: false,

      message:
        "Select at least one character type.",
    };
  }

  return {
    valid: true,

    message: "",
  };
}


/* =========================================================
   TEXT EXPORT
   ========================================================= */

export function passwordsToText(
  passwords
) {
  if (!Array.isArray(passwords)) {
    return "";
  }

  return passwords.join("\n");
}