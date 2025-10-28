const IS_DEBUG_To_do_list = import.meta.env.VITE_IS_DEBUG_To_do_list;

const isDebug = IS_DEBUG_To_do_list === "true";

const To_do_list_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default To_do_list_isDebug;
