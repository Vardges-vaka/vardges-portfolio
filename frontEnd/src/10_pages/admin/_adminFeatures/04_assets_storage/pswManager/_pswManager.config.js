const IS_DEBUG_PswManager = import.meta.env.VITE_IS_DEBUG_PswManager;

const isDebug = IS_DEBUG_PswManager === "true";

const PswManager_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default PswManager_isDebug;
