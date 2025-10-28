const IS_DEBUG_BrandBook = import.meta.env.VITE_IS_DEBUG_BrandBook;

const isDebug = IS_DEBUG_BrandBook === "true";

const BrandBook_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default BrandBook_isDebug;
