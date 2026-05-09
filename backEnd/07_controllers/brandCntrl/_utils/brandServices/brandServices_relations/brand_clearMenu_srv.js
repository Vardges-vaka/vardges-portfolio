import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import {
  populateBrandById,
  syncBrandMenu,
} from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_clearMenu_srv.js | ";

export const brand_clearMenu_srv = async (req, isDebug) => {
  try {
    const { id } = req.body.sanitizedData;
    const brand = await Brand.findById(id);
    if (!brand) return { success: false, message: "Brand not found", data: null };

    await Brand.findByIdAndUpdate(id, { $set: { menu: null } });
    await syncBrandMenu(id, brand.menu, null);

    const populated = await populateBrandById(id);
    return { success: true, message: "Menu cleared successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
