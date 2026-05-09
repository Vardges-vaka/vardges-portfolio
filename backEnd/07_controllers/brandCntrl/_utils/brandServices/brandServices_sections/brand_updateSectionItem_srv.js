import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_updateSectionItem_srv.js | ";

export const brand_updateSectionItem_srv = async (req, isDebug) => {
  try {
    const { id, mongoPath, itemId, item } = req.body.sanitizedData;
    const replacement = { ...item, _id: itemId };
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { $set: { [`${mongoPath}.$[item]`]: replacement } },
      {
        new: true,
        runValidators: true,
        arrayFilters: [{ "item._id": itemId }],
      },
    );
    if (!updatedBrand) return { success: false, message: "Brand not found", data: null };
    const populated = await populateBrandById(id);
    return { success: true, message: "Brand section item updated successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
