import { Modifier } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | modifier_delete_srv.js | ";

export const modifier_delete_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const deletedModifier = await Modifier.findByIdAndDelete(id);
    if (!deletedModifier) {
      return { success: false, message: "Modifier not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Modifier deleted: ${id}`);

    return {
      success: true,
      message: "Modifier deleted successfully",
      data: { _id: id },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
