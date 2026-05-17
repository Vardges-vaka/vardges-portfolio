import { Menu } from "../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../03_services/_services.index.js";

const displayName = " | XXX_srv.js | ";

export const XXX_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newMenu = new Menu(sanitizedData);
    await newMenu.save();

    isDebug && console.log(`✅${displayName}Menu created: ${newMenu._id}`);

    return {
      success: true,
      message: "Menu created successfully", // needs to be edited properly, to be added a proper internationalizated message.
      data: newBranch,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
//  !done 
// cloudKitchen_menu_create
// cloudKitchen_menu_getAll
// cloudKitchen_menu_getOne
// cloudKitchen_menu_updateAll
// cloudKitchen_menu_getCategoriesPopulated
// cloudKitchen_menu_getAllByOwnerType
// cloudKitchen_menu_delete

// cloudKitchen_menu_update_label
// cloudKitchen_menu_update_isActive
// cloudKitchen_menu_update_description
// cloudKitchen_menu_update_owner

// cloudKitchen_menu_update_label_srv
// cloudKitchen_menu_update_isActive_srv
// cloudKitchen_menu_update_description_srv
// cloudKitchen_menu_update_owner_srv