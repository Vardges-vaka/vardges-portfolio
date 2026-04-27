import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | brand_getOne_srv.js | ";

export const brand_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const brand = await Brand.findById(id);
    if (!brand) {
      return { success: false, message: "Brand not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Brand found: ${brand._id}`);

    return {
      success: true,
      message: "Brand fetched successfully",
      data: brand,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
