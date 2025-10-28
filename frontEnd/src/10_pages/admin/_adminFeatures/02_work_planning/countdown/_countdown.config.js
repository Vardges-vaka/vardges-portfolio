const IS_DEBUG_countdown = import.meta.env.VITE_IS_DEBUG_countdown;

const isDebug = IS_DEBUG_countdown === "true";

const countdown_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default countdown_isDebug;
