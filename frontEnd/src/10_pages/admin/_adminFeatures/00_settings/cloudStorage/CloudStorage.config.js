const IS_DEBUG_CloudStorage = import.meta.env.VITE_IS_DEBUG_CloudStorage;

const isDebug = IS_DEBUG_CloudStorage === "true";

const cloudStorage_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default cloudStorage_isDebug;
