import { Brand } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_brnd_brand_updateAll_srv.js | ";

// Drop "" / null / empty so optional enum fields aren't set to "". Cycle-safe.
const pruneEmptyDeep = (val, seen = new WeakSet()) => {
  if (Array.isArray(val)) {
    if (seen.has(val)) return undefined;
    seen.add(val);
    const arr = val
      .map((v) => pruneEmptyDeep(v, seen))
      .filter((v) => v !== undefined);
    return arr.length ? arr : undefined;
  }
  if (val && typeof val === "object") {
    if (seen.has(val)) return undefined;
    seen.add(val);
    const obj = {};
    for (const [k, v] of Object.entries(val)) {
      const pruned = pruneEmptyDeep(v, seen);
      if (pruned !== undefined) obj[k] = pruned;
    }
    return Object.keys(obj).length ? obj : undefined;
  }
  if (val === "" || val === null) return undefined;
  return val;
};

export const cK_brnd_brand_updateAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id } = req.params;
    const clean = pruneEmptyDeep(req.body.sanitizedData) || {};

    const updated = await Brand.findByIdAndUpdate(id, clean, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return { success: false, message: "Brand not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Brand updated: ${updated._id}`);

    return {
      success: true,
      message: "Brand updated successfully",
      data: updated,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
