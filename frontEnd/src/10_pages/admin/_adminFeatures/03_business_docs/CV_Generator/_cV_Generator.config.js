const IS_DEBUG_CV_Generator = import.meta.env.VITE_IS_DEBUG_CV_Generator;

const isDebug = IS_DEBUG_CV_Generator === "true";

const CV_Generator_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default CV_Generator_isDebug;
