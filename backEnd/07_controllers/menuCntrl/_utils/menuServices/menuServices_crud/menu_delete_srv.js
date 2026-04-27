import { Menu } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menu_delete_srv.js | ";

export const menu_delete_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const deletedMenu = await Menu.findByIdAndDelete(id);
    if (!deletedMenu) {
      return { success: false, message: "Menu not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Menu deleted: ${id}`);

    return {
      success: true,
      message: "Menu deleted successfully",
      data: { _id: id },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
