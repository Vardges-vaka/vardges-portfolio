const IS_DEBUG_AdminAccount = import.meta.env.VITE_IS_DEBUG_AdminAccount;

const isDebug = IS_DEBUG_AdminAccount === "true";

const adminAccount_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default adminAccount_isDebug;
