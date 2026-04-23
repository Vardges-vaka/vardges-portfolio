const IS_DEBUG_Ai = import.meta.env.VITE_IS_DEBUG_Ai;

const isDebug = IS_DEBUG_Ai === "true";

const Ai_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default Ai_isDebug;
