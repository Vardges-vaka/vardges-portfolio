const IS_DEBUG_ADMIN_DASHBOARD = import.meta.env.VITE_IS_DEBUG_ADMIN_DASHBOARD;

const isDebug = IS_DEBUG_ADMIN_DASHBOARD === "true";

const ADMIN_DASHBOARD_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default ADMIN_DASHBOARD_isDebug;
