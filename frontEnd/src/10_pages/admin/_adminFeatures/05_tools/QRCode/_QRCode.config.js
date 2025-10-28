const IS_DEBUG_QRCode = import.meta.env.VITE_IS_DEBUG_QRCode;

const isDebug = IS_DEBUG_QRCode === "true";

const QRCode_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default QRCode_isDebug;
