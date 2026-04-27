import {
  Menu_add,
  Menu_getAll,
  Menu_getOne,
  Menu_update,
  Menu_delete,
  Brand_getAll,
  Branch_getAll,
} from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js";

const safeGetAll = (fn) => async () => {
  try {
    return await fn();
  } catch {
    return { success: false, data: [] };
  }
};

let MenuCategory_getAll_fn = null;
try {
  const mod = await import(
    "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js"
  );
  MenuCategory_getAll_fn = mod.MenuCategory_getAll ?? null;
} catch {
  MenuCategory_getAll_fn = null;
}

export const useMenus_apiHelpers = () => ({
  apiHelpers: {
    Menu_add,
    Menu_getAll,
    Menu_getOne,
    Menu_update,
    Menu_delete,
    MenuCategory_getAll: MenuCategory_getAll_fn
      ? safeGetAll(MenuCategory_getAll_fn)
      : safeGetAll(() => Promise.resolve({ success: true, data: [] })),
    Branch_getAll: safeGetAll(Branch_getAll),
    Brand_getAll: safeGetAll(Brand_getAll),
  },
});
