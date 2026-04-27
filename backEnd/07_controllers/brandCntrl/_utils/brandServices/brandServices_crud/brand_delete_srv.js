import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | brand_delete_srv.js | ";

export const brand_delete_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return { success: false, message: "Brand not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Brand deleted: ${id}`);

    return {
      success: true,
      message: "Brand deleted successfully",
      data: { _id: id },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
