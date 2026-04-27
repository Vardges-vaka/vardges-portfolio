import { Menu } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menu_getAll_srv.js | ";

export const menu_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const menus = await Menu.find()
      .populate("categories", "name isActive")
      .populate("branches", "name")
      .populate("brands", "name logo")
      .sort({ createdAt: -1 });

    isDebug && console.log(`✅${displayName}Found ${menus.length} menus`);

    return {
      success: true,
      message: "Menus fetched successfully",
      data: menus,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
