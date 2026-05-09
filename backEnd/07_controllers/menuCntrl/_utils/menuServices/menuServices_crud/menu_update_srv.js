import { Menu } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { syncMenuBrandRefs } from "../../../../brandCntrl/_utils/brandServices/brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | menu_update_srv.js | ";

export const menu_update_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, ...updateFields } = req.body.sanitizedData;
    const previousMenu = await Menu.findById(id).select("brands");
    if (!previousMenu) {
      return { success: false, message: "Menu not found", data: null };
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return { success: false, message: "Menu not found", data: null };
    }

    if (Object.prototype.hasOwnProperty.call(updateFields, "brands")) {
      await syncMenuBrandRefs(id, previousMenu.brands, updatedMenu.brands);
    }

    isDebug && console.log(`✅${displayName}Menu updated: ${updatedMenu._id}`);

    return {
      success: true,
      message: "Menu updated successfully",
      data: updatedMenu,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
