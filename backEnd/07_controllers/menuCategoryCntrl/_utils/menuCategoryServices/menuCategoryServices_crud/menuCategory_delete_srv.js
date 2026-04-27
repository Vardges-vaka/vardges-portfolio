import { MenuCategory } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuCategory_delete_srv.js | ";

export const menuCategory_delete_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const deletedMenuCategory = await MenuCategory.findByIdAndDelete(id);
    if (!deletedMenuCategory) {
      return { success: false, message: "Menu category not found", data: null };
    }

    isDebug && console.log(`✅${displayName}MenuCategory deleted: ${id}`);

    return {
      success: true,
      message: "Menu category deleted successfully",
      data: { _id: id },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
