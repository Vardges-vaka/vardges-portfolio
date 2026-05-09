import { Branch, Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_createBranch_srv.js | ";

export const brand_createBranch_srv = async (req, isDebug) => {
  try {
    const { id, branchData } = req.body.sanitizedData;
    const brand = await Brand.findById(id);
    if (!brand) return { success: false, message: "Brand not found", data: null };

    const newBranch = new Branch({
      ...branchData,
      brands: [id],
    });
    await newBranch.save();

    await Brand.findByIdAndUpdate(id, {
      $addToSet: { branches: newBranch._id },
    });

    const populated = await populateBrandById(id);
    return {
      success: true,
      message: "Branch created and linked successfully",
      data: populated,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
