import { Modifier } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | modifier_getAll_srv.js | ";

export const modifier_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const modifiers = await Modifier.find().sort({ createdAt: -1 });

    isDebug && console.log(`✅${displayName}Found ${modifiers.length} modifiers`);

    return {
      success: true,
      message: "Modifiers fetched successfully",
      data: modifiers,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
