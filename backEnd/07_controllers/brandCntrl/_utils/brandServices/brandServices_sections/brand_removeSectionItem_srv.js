import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_removeSectionItem_srv.js | ";

export const brand_removeSectionItem_srv = async (req, isDebug) => {
  try {
    const { id, mongoPath, itemId } = req.body.sanitizedData;
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { $pull: { [mongoPath]: { _id: itemId } } },
      { new: true, runValidators: true },
    );
    if (!updatedBrand) return { success: false, message: "Brand not found", data: null };
    const populated = await populateBrandById(id);
    return { success: true, message: "Brand section item removed successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
