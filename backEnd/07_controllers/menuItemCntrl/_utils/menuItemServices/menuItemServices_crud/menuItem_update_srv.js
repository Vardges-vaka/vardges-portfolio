import { MenuItem } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuItem_update_srv.js | ";

export const menuItem_update_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, ...updateFields } = req.body.sanitizedData;

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!updatedMenuItem) {
      return { success: false, message: "Menu item not found", data: null };
    }

    isDebug && console.log(`✅${displayName}MenuItem updated: ${updatedMenuItem._id}`);

    return {
      success: true,
      message: "Menu item updated successfully",
      data: updatedMenuItem,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
