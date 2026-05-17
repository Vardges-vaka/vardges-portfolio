import { Menu } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | ck_Mn_Category_create_srv_srv.js | ";

export const ck_Mn_Category_create_srv = async (req, isDebug) => {
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
