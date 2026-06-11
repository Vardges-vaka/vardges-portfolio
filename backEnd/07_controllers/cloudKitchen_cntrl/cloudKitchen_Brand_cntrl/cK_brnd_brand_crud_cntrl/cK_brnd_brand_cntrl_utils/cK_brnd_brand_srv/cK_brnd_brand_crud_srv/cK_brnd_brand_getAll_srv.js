import { Brand } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_brnd_brand_getAll_srv.js | ";

// For now we return EVERYTHING — all brands, fully populated. Once the
// frontend settles on what it actually renders, trim the populate list and
// project only the needed fields.
export const cK_brnd_brand_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const brands = await Brand.find()
      .populate("cuisineTags")
      .populate("website")
      .populate("contracts")
      .populate("integrations")
      .populate("siblings")
      .populate("employees")
      .populate("equipments")
      .populate("branches")
      .populate("menus")
      .populate("competitors")
      .lean();

    isDebug && console.log(`✅${displayName}Fetched ${brands.length} brand(s)`);

    return {
      success: true,
      message: `Fetched ${brands.length} brand(s)`,
      data: brands,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
