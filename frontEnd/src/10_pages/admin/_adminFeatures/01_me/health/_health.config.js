const IS_DEBUG_Health = import.meta.env.VITE_IS_DEBUG_Health;

const isDebug = IS_DEBUG_Health === "true";

const Health_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default Health_isDebug;
