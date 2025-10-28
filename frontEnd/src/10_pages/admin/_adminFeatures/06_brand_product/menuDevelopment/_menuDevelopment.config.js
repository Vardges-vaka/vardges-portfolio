const IS_DEBUG_MenuDevelopment = import.meta.env.VITE_IS_DEBUG_MenuDevelopment;

const isDebug = IS_DEBUG_MenuDevelopment === "true";

const MenuDevelopment_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default MenuDevelopment_isDebug;
