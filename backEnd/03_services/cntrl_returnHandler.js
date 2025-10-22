export const catch_errorHandler_cntrl = (res, name, isDebug, error) => {
  const displayName = name ? `⚠️ ☠️ 🚨${name}` : "UnSpecified Controller Field";

  isDebug && console.error(`${displayName}|<=>| [catch (ERROR)]`, error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    payload: null,
  });
};

export const validRespond = (res, debug, name, success, message, data) => {
  debug && console.log(`⛟📦🚚${name}[SUCCESS] ${success} |<=>| [DATA]`, data);
  return res
    .status(success ? 200 : 400)
    .json({ success, message, payload: data });
};
