import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_getOne_srv.js | ";

export const brand_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;
    const brand = await populateBrandById(id);
    if (!brand) return { success: false, message: "Brand not found", data: null };

    return {
      success: true,
      message: "Brand fetched successfully",
      data: brand,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`${displayName}[COMPLETED]`);
  }
};
