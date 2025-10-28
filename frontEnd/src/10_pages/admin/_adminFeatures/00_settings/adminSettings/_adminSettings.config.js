const IS_DEBUG_AdminSettings = import.meta.env.VITE_IS_DEBUG_AdminSettings;

const isDebug = IS_DEBUG_AdminSettings === "true";

const AdminSettings_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default AdminSettings_isDebug;
