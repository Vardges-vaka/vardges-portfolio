import { MenuCategory } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | menuCategory_add_srv.js | ";

export const menuCategory_add_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newMenuCategory = new MenuCategory(sanitizedData);
    await newMenuCategory.save();

    isDebug && console.log(`✅${displayName}MenuCategory created: ${newMenuCategory._id}`);

    return {
      success: true,
      message: "Menu category created successfully",
      data: newMenuCategory,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
