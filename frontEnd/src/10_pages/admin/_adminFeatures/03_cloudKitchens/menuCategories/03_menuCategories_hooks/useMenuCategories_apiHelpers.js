import {
  MenuCategory_add,
  MenuCategory_getAll,
  MenuCategory_getOne,
  MenuCategory_update,
  MenuCategory_delete,
  MenuItem_getAll,
} from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js";

const safeMenuItemGetAll = async () => {
  try {
    return await MenuItem_getAll();
  } catch {
    return { success: false, message: "Failed to load menu items", data: [] };
  }
};

export const useMenuCategories_apiHelpers = () => ({
  apiHelpers: {
    MenuCategory_add,
    MenuCategory_getAll,
    MenuCategory_getOne,
    MenuCategory_update,
    MenuCategory_delete,
    MenuItem_getAll: safeMenuItemGetAll,
  },
});
