const IS_DEBUG_Vault = import.meta.env.VITE_IS_DEBUG_Vault;

const isDebug = IS_DEBUG_Vault === "true";

const Vault_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default Vault_isDebug;
