import { Modifier } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | modifier_update_srv.js | ";

export const modifier_update_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, ...updateFields } = req.body.sanitizedData;

    const updatedModifier = await Modifier.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedModifier) {
      return { success: false, message: "Modifier not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Modifier updated: ${updatedModifier._id}`);

    return {
      success: true,
      message: "Modifier updated successfully",
      data: updatedModifier,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
