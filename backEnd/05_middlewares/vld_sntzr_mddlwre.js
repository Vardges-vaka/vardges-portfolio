const isDebug = true;
const displayName = " | vld_sntzr_mddlwre.js | ";

export const vld_sntzr_mddlwre = (fn) => async (req, res, next) => {
  isDebug && console.log(`💡📢❔${displayName}|<MIDDLEWARE>| [TRIGGERED]`);

  try {
    const { isValid, message, sanitizedData } = await fn(req);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: message,
        payload: sanitizedData ? sanitizedData : null,
      });
    } else {
      if (sanitizedData) {
        if (!req.body) req.body = {};
        req.body.sanitizedData = sanitizedData;
      }
      next();
    }
  } catch (error) {
    isDebug &&
      console.error(`⚠️☠️🚨${displayName}|<MIDDLEWARE>| catch(ERROR) |`, error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      payload: null,
    });
  }
};
