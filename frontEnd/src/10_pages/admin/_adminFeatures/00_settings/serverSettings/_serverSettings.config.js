const IS_DEBUG_XXX = import.meta.env.VITE_IS_DEBUG_XXX;

const isDebug = IS_DEBUG_XXX === "true";

const XXX_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default XXX_isDebug;
