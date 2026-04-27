import { MenuCategory } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuCategory_update_srv.js | ";

export const menuCategory_update_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, ...updateFields } = req.body.sanitizedData;

    const updatedMenuCategory = await MenuCategory.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).populate("menuItems", "name sellingPrice isActive");

    if (!updatedMenuCategory) {
      return { success: false, message: "Menu category not found", data: null };
    }

    isDebug && console.log(`✅${displayName}MenuCategory updated: ${updatedMenuCategory._id}`);

    return {
      success: true,
      message: "Menu category updated successfully",
      data: updatedMenuCategory,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
