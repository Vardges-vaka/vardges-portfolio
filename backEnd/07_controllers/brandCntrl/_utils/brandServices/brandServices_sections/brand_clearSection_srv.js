import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById, syncBrandRelations } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_clearSection_srv.js | ";

export const brand_clearSection_srv = async (req, isDebug) => {
  try {
    const { id, sectionKey, mongoPath, value } = req.body.sanitizedData;
    const previousBrand = await Brand.findById(id).select("branches employees menu");
    if (!previousBrand) return { success: false, message: "Brand not found", data: null };

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { $set: { [mongoPath]: value } },
      { new: true, runValidators: true },
    );
    if (!updatedBrand) return { success: false, message: "Brand not found", data: null };

    await syncBrandRelations({
      brandId: id,
      previousBrand,
      nextBrand: updatedBrand,
      fields: { [sectionKey]: value },
    });

    const populated = await populateBrandById(id);
    return { success: true, message: "Brand section cleared successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
