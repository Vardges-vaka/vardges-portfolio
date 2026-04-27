import { Modifier } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | modifier_add_srv.js | ";

export const modifier_add_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newModifier = new Modifier(sanitizedData);
    await newModifier.save();

    isDebug && console.log(`✅${displayName}Modifier created: ${newModifier._id}`);

    return {
      success: true,
      message: "Modifier created successfully",
      data: newModifier,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
