const IS_DEBUG_PDF_image_Formatting = import.meta.env.VITE_IS_DEBUG_PDF_image_Formatting;

const isDebug = IS_DEBUG_PDF_image_Formatting === "true";

const PDF_image_Formatting_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default PDF_image_Formatting_isDebug;
