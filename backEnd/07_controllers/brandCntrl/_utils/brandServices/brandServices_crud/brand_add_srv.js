import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import {
  populateBrandById,
  syncBrandBranches,
  syncBrandEmployees,
  syncBrandMenu,
} from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_add_srv.js | ";

export const brand_add_srv = async (req, isDebug) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  isDebug && console.log(`${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;
    const newBrand = new Brand(sanitizedData);
    await newBrand.save();

    await Promise.all([
      syncBrandBranches(newBrand._id, [], newBrand.branches),
      syncBrandEmployees(newBrand._id, [], newBrand.employees),
      syncBrandMenu(newBrand._id, null, newBrand.menu),
    ]);

    const populated = await populateBrandById(newBrand._id);

    return {
      success: true,
      message: "Brand created successfully",
      data: populated,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`${displayName}[COMPLETED]`);
  }
};
