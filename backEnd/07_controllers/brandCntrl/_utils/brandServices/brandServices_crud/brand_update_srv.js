import { Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import {
  populateBrandById,
  syncBrandRelations,
} from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_update_srv.js | ";

const WHOLE_SECTION_KEYS = new Set([
  "name",
  "tagline",
  "files",
  "inventoryIntegrations",
  "salesIntegration",
  "legal",
]);

const buildBrandSetFields = (updateFields) => {
  const setFields = {};

  for (const [key, value] of Object.entries(updateFields ?? {})) {
    if (key === "socials" && value && typeof value === "object" && !Array.isArray(value)) {
      for (const [socialKey, socialValue] of Object.entries(value)) {
        setFields[`socials.${socialKey}`] = socialValue;
      }
      continue;
    }

    if (WHOLE_SECTION_KEYS.has(key)) {
      setFields[key] = value;
      continue;
    }

    setFields[key] = value;
  }

  return setFields;
};

export const brand_update_srv = async (req, isDebug) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  isDebug && console.log(`${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, ...updateFields } = req.body.sanitizedData;
    const previousBrand = await Brand.findById(id).select("branches employees menu");
    if (!previousBrand) {
      return { success: false, message: "Brand not found", data: null };
    }

    const setFields = buildBrandSetFields(updateFields);
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { $set: setFields },
      { new: true, runValidators: true },
    );

    if (!updatedBrand) {
      return { success: false, message: "Brand not found", data: null };
    }

    await syncBrandRelations({
      brandId: id,
      previousBrand,
      nextBrand: updatedBrand,
      fields: updateFields,
    });

    const populated = await populateBrandById(id);

    return {
      success: true,
      message: "Brand updated successfully",
      data: populated,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`${displayName}[COMPLETED]`);
  }
};
