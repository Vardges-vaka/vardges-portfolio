import { MenuItem } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuItem_getAll_srv.js | ";

export const menuItem_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const menuItems = await MenuItem.find()
      .populate("modifiers", "name type selectionQty isActive")
      .populate("ingredients", "name")
      .sort({ createdAt: -1 });

    isDebug && console.log(`✅${displayName}Found ${menuItems.length} menu items`);

    return {
      success: true,
      message: "Menu items fetched successfully",
      data: menuItems,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
