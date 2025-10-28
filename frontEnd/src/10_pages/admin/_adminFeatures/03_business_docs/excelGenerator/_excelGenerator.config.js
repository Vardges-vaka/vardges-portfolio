const IS_DEBUG_ExcelGenerator = import.meta.env.VITE_IS_DEBUG_ExcelGenerator;

const isDebug = IS_DEBUG_ExcelGenerator === "true";

const ExcelGenerator_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default ExcelGenerator_isDebug;
