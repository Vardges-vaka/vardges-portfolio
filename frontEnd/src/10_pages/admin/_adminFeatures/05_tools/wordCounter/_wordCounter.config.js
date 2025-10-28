const IS_DEBUG_WordCounter = import.meta.env.VITE_IS_DEBUG_WordCounter;

const isDebug = IS_DEBUG_WordCounter === "true";

const WordCounter_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default WordCounter_isDebug;
