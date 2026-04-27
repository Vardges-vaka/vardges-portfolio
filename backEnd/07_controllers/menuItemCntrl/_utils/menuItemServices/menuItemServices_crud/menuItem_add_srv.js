import { MenuItem } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuItem_add_srv.js | ";

export const menuItem_add_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newMenuItem = new MenuItem(sanitizedData);
    await newMenuItem.save();

    isDebug && console.log(`✅${displayName}MenuItem created: ${newMenuItem._id}`);

    return {
      success: true,
      message: "Menu item created successfully",
      data: newMenuItem,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
