import { Modifier } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | modifier_getOne_srv.js | ";

export const modifier_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const modifier = await Modifier.findById(id);
    if (!modifier) {
      return { success: false, message: "Modifier not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Modifier found: ${modifier._id}`);

    return {
      success: true,
      message: "Modifier fetched successfully",
      data: modifier,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
