import {
  MenuItem_add,
  MenuItem_getAll,
  MenuItem_getOne,
  MenuItem_update,
  MenuItem_delete,
} from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js";

// Safe wrapper — Modifier_getAll may not exist yet; silently return []
const safeModifierGetAll = async () => {
  try {
    const mod = await import(
      "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js"
    );
    if (typeof mod.Modifier_getAll === "function") {
      const res = await mod.Modifier_getAll();
      return res?.data ?? [];
    }
  } catch {
    /* Modifier feature not implemented yet */
  }
  return [];
};

export const useMenuItems_apiHelpers = () => ({
  apiHelpers: {
    MenuItem_add,
    MenuItem_getAll,
    MenuItem_getOne,
    MenuItem_update,
    MenuItem_delete,
    Modifier_getAll: safeModifierGetAll,
  },
});
