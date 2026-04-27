import { MenuCategory } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuCategory_getOne_srv.js | ";

export const menuCategory_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const menuCategory = await MenuCategory.findById(id)
      .populate("menuItems", "name sellingPrice isActive");

    if (!menuCategory) {
      return { success: false, message: "Menu category not found", data: null };
    }

    isDebug && console.log(`✅${displayName}MenuCategory found: ${menuCategory._id}`);

    return {
      success: true,
      message: "Menu category fetched successfully",
      data: menuCategory,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
