const IS_DEBUG_CocktailDevelopment = import.meta.env.VITE_IS_DEBUG_CocktailDevelopment;

const isDebug = IS_DEBUG_CocktailDevelopment === "true";

const CocktailDevelopment_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default CocktailDevelopment_isDebug;
