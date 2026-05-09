import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { getByPath } from "../../brandSectionConfig.js";

const displayName = " | brand_getSection_srv.js | ";

export const brand_getSection_srv = async (req, isDebug) => {
  try {
    const { id, mongoPath } = req.body.sanitizedData;
    const brand = await Brand.findById(id);
    if (!brand) return { success: false, message: "Brand not found", data: null };
    const data = getByPath(brand.toObject(), mongoPath);
    return { success: true, message: "Brand section fetched successfully", data };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
