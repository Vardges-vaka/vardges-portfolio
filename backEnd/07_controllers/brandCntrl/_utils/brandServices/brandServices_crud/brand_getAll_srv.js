import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { brandPopulate } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_getAll_srv.js | ";

export const brand_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`${displayName}[STARTED]`);

  try {
    const brands = await brandPopulate(Brand.find());

    return {
      success: true,
      message: "Brands fetched successfully",
      data: brands,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`${displayName}[COMPLETED]`);
  }
};
