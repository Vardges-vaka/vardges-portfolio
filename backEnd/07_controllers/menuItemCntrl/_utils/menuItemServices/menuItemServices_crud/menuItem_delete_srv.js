import { MenuItem } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuItem_delete_srv.js | ";

export const menuItem_delete_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return { success: false, message: "Menu item not found", data: null };
    }

    isDebug && console.log(`✅${displayName}MenuItem deleted: ${id}`);

    return {
      success: true,
      message: "Menu item deleted successfully",
      data: { _id: id },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
