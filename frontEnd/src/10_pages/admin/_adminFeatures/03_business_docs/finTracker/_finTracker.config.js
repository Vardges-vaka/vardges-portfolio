const IS_DEBUG_FinTracker = import.meta.env.VITE_IS_DEBUG_FinTracker;

const isDebug = IS_DEBUG_FinTracker === "true";

const FinTracker_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default FinTracker_isDebug;
