import { Menu } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menu_getOne_srv.js | ";

export const menu_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const menu = await Menu.findById(id)
      .populate("categories", "name isActive")
      .populate("branches", "name")
      .populate("brands", "name files.logos isActive");

    if (!menu) {
      return { success: false, message: "Menu not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Menu found: ${menu._id}`);

    return {
      success: true,
      message: "Menu fetched successfully",
      data: menu,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
