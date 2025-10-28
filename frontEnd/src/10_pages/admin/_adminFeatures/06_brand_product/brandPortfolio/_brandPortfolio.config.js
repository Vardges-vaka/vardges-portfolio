const IS_DEBUG_BrandPortfolio = import.meta.env.VITE_IS_DEBUG_BrandPortfolio;

const isDebug = IS_DEBUG_BrandPortfolio === "true";

const BrandPortfolio_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default BrandPortfolio_isDebug;
