import { MenuCategory } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuCategory_getAll_srv.js | ";

export const menuCategory_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const menuCategories = await MenuCategory.find()
      .populate("menuItems", "name sellingPrice isActive")
      .sort({ createdAt: -1 });

    isDebug && console.log(`✅${displayName}Found ${menuCategories.length} menu categories`);

    return {
      success: true,
      message: "Menu categories fetched successfully",
      data: menuCategories,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
