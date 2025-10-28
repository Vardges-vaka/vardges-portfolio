const IS_DEBUG_SiteManagment = import.meta.env.VITE_IS_DEBUG_SiteManagment;

const isDebug = IS_DEBUG_SiteManagment === "true";

const SiteManagment_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default SiteManagment_isDebug;
