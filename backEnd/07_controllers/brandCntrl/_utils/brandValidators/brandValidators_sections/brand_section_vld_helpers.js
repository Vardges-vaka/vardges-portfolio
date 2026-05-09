import mongoose from "mongoose";
import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import {
  getBrandSectionConfig,
  clearValueForSection,
} from "../../brandSectionConfig.js";
import {
  validateBrandSectionItemValue,
  validateBrandSectionValue,
} from "../brand_fields_vld.js";

const isDebug = true;

const cleanBody = (req) => {
  const data = req.body.body_Data || req.body || {};
  const { _id, __v, createdAt, updatedAt, ...safeData } = data;
  return safeData;
};

export const validateSectionRoute = async (
  req,
  { displayName, mode },
) => {
  const { id, sectionKey, itemId } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return request_failed("Invalid brand ID", { id }, displayName, isDebug);
  }

  const config = getBrandSectionConfig(sectionKey);
  if (!config) {
    return request_failed(
      "Unknown brand section",
      { sectionKey },
      displayName,
      isDebug,
    );
  }

  if (mode === "clear" && !config.clearable) {
    return request_failed(
      `${sectionKey} cannot be cleared`,
      { sectionKey },
      displayName,
      isDebug,
    );
  }

  if (["addItem", "updateItem", "removeItem"].includes(mode)) {
    if (!config.itemRoutes) {
      return request_failed(
        `${sectionKey} does not support item routes`,
        { sectionKey },
        displayName,
        isDebug,
      );
    }
    if (["updateItem", "removeItem"].includes(mode)) {
      if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
        return request_failed("Invalid item ID", { itemId }, displayName, isDebug);
      }
    }
  }

  const sanitized = {
    id,
    sectionKey,
    mongoPath: config.path,
    sectionType: config.type,
  };

  if (mode === "put") {
    const result = validateBrandSectionValue(sectionKey, cleanBody(req));
    if (!result.ok) {
      return request_failed(
        result.message,
        { field: result.field },
        displayName,
        isDebug,
      );
    }
    sanitized.value = result.value;
  }

  if (mode === "clear") {
    sanitized.value = clearValueForSection(config);
  }

  if (["addItem", "updateItem"].includes(mode)) {
    const result = validateBrandSectionItemValue(sectionKey, cleanBody(req));
    if (!result.ok) {
      return request_failed(
        result.message,
        { field: result.field },
        displayName,
        isDebug,
      );
    }
    sanitized.item = result.value;
  }

  if (itemId) sanitized.itemId = itemId;

  return request_success(displayName, isDebug, sanitized);
};
