import { Brand, Menu } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import {
  populateBrandById,
  syncBrandMenu,
} from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_setMenu_srv.js | ";

export const brand_setMenu_srv = async (req, isDebug) => {
  try {
    const { id, menuId } = req.body.sanitizedData;
    const [brand, menu] = await Promise.all([Brand.findById(id), Menu.findById(menuId)]);
    if (!brand) return { success: false, message: "Brand not found", data: null };
    if (!menu) return { success: false, message: "Menu not found", data: null };

    await Brand.findByIdAndUpdate(id, { $set: { menu: menuId } });
    await syncBrandMenu(id, brand.menu, menuId);

    const populated = await populateBrandById(id);
    return { success: true, message: "Menu set successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
