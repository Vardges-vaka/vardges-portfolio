import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";

// Drop "" / null / empty nested values so optional enum fields aren't set to "".
export const pruneEmptyDeep = (val, seen = new WeakSet()) => {
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

export const cK_gen_makeCreateSrv =
  ({ Model, entityLabel, displayName }) =>
  async (req, isDebug) => {
    isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
    isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

    try {
      const clean = pruneEmptyDeep(req.body.sanitizedData) || {};
      const newRecord = new Model(clean);
      await newRecord.save();

      isDebug && console.log(`✅${displayName}Created: ${newRecord._id}`);

      return {
        success: true,
        message: `${entityLabel} created successfully`,
        data: newRecord,
      };
    } catch (error) {
      return catch_errorHandler_service(displayName, isDebug, error);
    } finally {
      isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
    }
  };

export const cK_gen_makeGetAllSrv =
  ({ Model, entityLabel, displayName, populate = [] }) =>
  async (req, isDebug) => {
    isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

    try {
      let query = Model.find();
      populate.forEach((path) => {
        query = query.populate(path);
      });
      const records = await query.lean();

      isDebug &&
        console.log(`✅${displayName}Fetched ${records.length} record(s)`);

      return {
        success: true,
        message: `Fetched ${records.length} ${entityLabel}(s)`,
        data: records,
      };
    } catch (error) {
      return catch_errorHandler_service(displayName, isDebug, error);
    } finally {
      isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
    }
  };

export const cK_gen_makeGetOneSrv =
  ({ Model, entityLabel, displayName, populate = [] }) =>
  async (req, isDebug) => {
    isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

    try {
      const { id } = req.params;
      let query = Model.findById(id);
      populate.forEach((path) => {
        query = query.populate(path);
      });
      const record = await query.lean();

      if (!record) {
        return { success: false, message: `${entityLabel} not found`, data: null };
      }

      isDebug && console.log(`✅${displayName}Fetched: ${id}`);

      return {
        success: true,
        message: `${entityLabel} fetched successfully`,
        data: record,
      };
    } catch (error) {
      return catch_errorHandler_service(displayName, isDebug, error);
    } finally {
      isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
    }
  };

export const cK_gen_makeDeleteSrv =
  ({ Model, entityLabel, displayName }) =>
  async (req, isDebug) => {
    isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

    try {
      const { id } = req.params;
      const deleted = await Model.findByIdAndDelete(id);

      if (!deleted) {
        return { success: false, message: `${entityLabel} not found`, data: null };
      }

      isDebug && console.log(`✅${displayName}Deleted: ${id}`);

      return {
        success: true,
        message: `${entityLabel} deleted successfully`,
        data: deleted,
      };
    } catch (error) {
      return catch_errorHandler_service(displayName, isDebug, error);
    } finally {
      isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
    }
  };

export const cK_gen_makeUpdateSrv =
  ({ Model, entityLabel, displayName }) =>
  async (req, isDebug) => {
    isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
    isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

    try {
      const { id } = req.params;
      const clean = pruneEmptyDeep(req.body.sanitizedData) || {};

      const updated = await Model.findByIdAndUpdate(id, clean, {
        new: true,
        runValidators: true,
      });

      if (!updated) {
        return { success: false, message: `${entityLabel} not found`, data: null };
      }

      isDebug && console.log(`✅${displayName}Updated: ${updated._id}`);

      return {
        success: true,
        message: `${entityLabel} updated successfully`,
        data: updated,
      };
    } catch (error) {
      return catch_errorHandler_service(displayName, isDebug, error);
    } finally {
      isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
    }
  };
