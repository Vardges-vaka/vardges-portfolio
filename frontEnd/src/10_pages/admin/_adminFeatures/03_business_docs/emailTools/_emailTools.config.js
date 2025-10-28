const IS_DEBUG_EmailTools = import.meta.env.VITE_IS_DEBUG_EmailTools;

const isDebug = IS_DEBUG_EmailTools === "true";

const EmailTools_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default EmailTools_isDebug;
