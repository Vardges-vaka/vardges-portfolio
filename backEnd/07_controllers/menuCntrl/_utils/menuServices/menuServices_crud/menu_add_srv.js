import { Menu } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { syncMenuBrandRefs } from "../../../../brandCntrl/_utils/brandServices/brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | menu_add_srv.js | ";

export const menu_add_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newMenu = new Menu(sanitizedData);
    await newMenu.save();
    await syncMenuBrandRefs(newMenu._id, [], newMenu.brands);

    isDebug && console.log(`✅${displayName}Menu created: ${newMenu._id}`);

    return {
      success: true,
      message: "Menu created successfully",
      data: newMenu,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
