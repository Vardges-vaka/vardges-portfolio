const IS_DEBUG_BrandDevelopment = import.meta.env.VITE_IS_DEBUG_BrandDevelopment;

const isDebug = IS_DEBUG_BrandDevelopment === "true";

const BrandDevelopment_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default BrandDevelopment_isDebug;
