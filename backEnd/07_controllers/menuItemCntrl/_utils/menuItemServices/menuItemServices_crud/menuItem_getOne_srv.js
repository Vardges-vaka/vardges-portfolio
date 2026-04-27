import { MenuItem } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuItem_getOne_srv.js | ";

export const menuItem_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const menuItem = await MenuItem.findById(id)
      .populate("modifiers", "name type selectionQty isActive")
      .populate("ingredients", "name");

    if (!menuItem) {
      return { success: false, message: "Menu item not found", data: null };
    }

    isDebug && console.log(`✅${displayName}MenuItem found: ${menuItem._id}`);

    return {
      success: true,
      message: "Menu item fetched successfully",
      data: menuItem,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
