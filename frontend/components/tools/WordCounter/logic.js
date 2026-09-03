/* =========================================================
   WORD COUNTER LOGIC
   ========================================================= */


/* =========================================================
   NORMALIZE TEXT
   ========================================================= */

export function normalizeText(value) {
  return String(value ?? "").trim();
}


/* =========================================================
   GET WORDS
   ========================================================= */

export function getWords(value) {
  const text = normalizeText(value);

  if (!text) {
    return [];
  }

  return text.match(
    /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu
  ) || [];
}


/* =========================================================
   WORD COUNT
   ========================================================= */

export function getWordCount(value) {
  return getWords(value).length;
}


/* =========================================================
   CHARACTER COUNT
   ========================================================= */

export function getCharacterCount(value) {
  return String(value ?? "").length;
}


/* =========================================================
   CHARACTER COUNT WITHOUT SPACES
   ========================================================= */

export function getCharacterCountWithoutSpaces(value) {
  return String(value ?? "")
    .replace(/\s/g, "")
    .length;
}


/* =========================================================
   SENTENCE COUNT
   ========================================================= */

export function getSentenceCount(value) {
  const text = normalizeText(value);

  if (!text) {
    return 0;
  }

  const sentences = text.match(
    /[^.!?]+(?:[.!?]+|$)/g
  );

  return sentences
    ? sentences.filter(
        (sentence) => sentence.trim()
      ).length
    : 0;
}


/* =========================================================
   PARAGRAPH COUNT
   ========================================================= */

export function getParagraphCount(value) {
  const text = String(value ?? "").trim();

  if (!text) {
    return 0;
  }

  return text
    .split(/\n\s*\n/)
    .filter(
      (paragraph) =>
        paragraph.trim()
    )
    .length;
}


/* =========================================================
   LINE COUNT
   ========================================================= */

export function getLineCount(value) {
  const text = String(value ?? "");

  if (!text) {
    return 0;
  }

  return text.split(/\r?\n/).length;
}


/* =========================================================
   UNIQUE WORD COUNT
   ========================================================= */

export function getUniqueWordCount(value) {
  const words = getWords(value);

  const unique = new Set(
    words.map((word) =>
      word.toLocaleLowerCase()
    )
  );

  return unique.size;
}


/* =========================================================
   AVERAGE WORD LENGTH
   ========================================================= */

export function getAverageWordLength(value) {
  const words = getWords(value);

  if (!words.length) {
    return 0;
  }

  const totalLength = words.reduce(
    (total, word) =>
      total + word.length,
    0
  );

  return Number(
    (
      totalLength /
      words.length
    ).toFixed(2)
  );
}


/* =========================================================
   LONGEST WORD
   ========================================================= */

export function getLongestWord(value) {
  const words = getWords(value);

  if (!words.length) {
    return "";
  }

  return words.reduce(
    (longest, word) =>
      word.length >
      longest.length
        ? word
        : longest,
    ""
  );
}


/* =========================================================
   SHORTEST WORD
   ========================================================= */

export function getShortestWord(value) {
  const words = getWords(value);

  if (!words.length) {
    return "";
  }

  return words.reduce(
    (shortest, word) =>
      word.length <
      shortest.length
        ? word
        : shortest,
    words[0]
  );
}


/* =========================================================
   READING TIME
   ========================================================= */

export function getReadingTime(
  wordCount,
  wordsPerMinute = 200
) {
  if (!wordCount) {
    return 0;
  }

  return Math.max(
    1,
    Math.ceil(
      wordCount /
        wordsPerMinute
    )
  );
}


/* =========================================================
   SPEAKING TIME
   ========================================================= */

export function getSpeakingTime(
  wordCount,
  wordsPerMinute = 130
) {
  if (!wordCount) {
    return 0;
  }

  return Math.max(
    1,
    Math.ceil(
      wordCount /
        wordsPerMinute
    )
  );
}


/* =========================================================
   WORD FREQUENCY
   ========================================================= */

export function getWordFrequency(
  value
) {
  const words = getWords(value);

  const frequency = {};

  words.forEach((word) => {
    const normalized =
      word.toLocaleLowerCase();

    frequency[normalized] =
      (frequency[normalized] || 0) +
      1;
  });

  return frequency;
}


/* =========================================================
   TOP WORDS
   ========================================================= */

export function getTopWords(
  value,
  limit = 10
) {
  const frequency =
    getWordFrequency(value);

  return Object.entries(
    frequency
  )
    .sort(
      ([, countA], [, countB]) =>
        countB - countA
    )
    .slice(0, limit)
    .map(
      ([word, count]) => ({
        word,
        count,
      })
    );
}


/* =========================================================
   COMPLETE TEXT ANALYSIS
   ========================================================= */

export function analyzeText(value) {
  const text = String(value ?? "");

  const wordCount =
    getWordCount(text);

  const characterCount =
    getCharacterCount(text);

  const charactersWithoutSpaces =
    getCharacterCountWithoutSpaces(
      text
    );

  const sentenceCount =
    getSentenceCount(text);

  const paragraphCount =
    getParagraphCount(text);

  const lineCount =
    getLineCount(text);

  const uniqueWordCount =
    getUniqueWordCount(text);

  const averageWordLength =
    getAverageWordLength(text);

  const longestWord =
    getLongestWord(text);

  const shortestWord =
    getShortestWord(text);

  const readingTime =
    getReadingTime(wordCount);

  const speakingTime =
    getSpeakingTime(wordCount);

  const topWords =
    getTopWords(text, 10);

  return {
    wordCount,

    characterCount,

    charactersWithoutSpaces,

    sentenceCount,

    paragraphCount,

    lineCount,

    uniqueWordCount,

    averageWordLength,

    longestWord,

    shortestWord,

    readingTime,

    speakingTime,

    topWords,
  };
}


/* =========================================================
   DOWNLOAD CONTENT
   ========================================================= */

export function createDownloadText(
  input,
  analysis
) {
  return [
    "ToolVerse Word Counter",
    "======================",
    "",
    "Statistics",
    "----------",
    `Words: ${analysis.wordCount}`,
    `Characters: ${analysis.characterCount}`,
    `Characters without spaces: ${analysis.charactersWithoutSpaces}`,
    `Sentences: ${analysis.sentenceCount}`,
    `Paragraphs: ${analysis.paragraphCount}`,
    `Lines: ${analysis.lineCount}`,
    `Unique words: ${analysis.uniqueWordCount}`,
    `Average word length: ${analysis.averageWordLength}`,
    `Reading time: ${analysis.readingTime} minute(s)`,
    `Speaking time: ${analysis.speakingTime} minute(s)`,
    "",
    "Top Words",
    "---------",
    ...analysis.topWords.map(
      ({ word, count }) =>
        `${word}: ${count}`
    ),
    "",
    "Text",
    "----",
    input,
  ].join("\n");
}