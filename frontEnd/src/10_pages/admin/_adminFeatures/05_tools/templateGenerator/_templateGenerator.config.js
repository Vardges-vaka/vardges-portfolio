const IS_DEBUG_TemplateGenerator = import.meta.env.VITE_IS_DEBUG_TemplateGenerator;

const isDebug = IS_DEBUG_TemplateGenerator === "true";

const TemplateGenerator_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default TemplateGenerator_isDebug;
