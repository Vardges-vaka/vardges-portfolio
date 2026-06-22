import { CuisineTag } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_gen_cuisineTag_getAll_srv.js | ";

export const cK_gen_cuisineTag_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const cuisineTags = await CuisineTag.find()
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .populate("deletedBy", "name email")
      .lean();

    isDebug &&
      console.log(`✅${displayName}Fetched ${cuisineTags.length} tag(s)`);

    return {
      success: true,
      message: `Fetched ${cuisineTags.length} cuisine tag(s)`,
      data: cuisineTags,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
