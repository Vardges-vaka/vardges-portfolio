import mongoose from "mongoose";
import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { validateBranchFields } from "../../../../branchCntrl/_utils/branchValidators/branch_fields_vld.js";

const isDebug = true;

const isValidId = (id) => id && mongoose.Types.ObjectId.isValid(id);

const cleanBody = (req) => {
  const data = req.body.body_Data || req.body || {};
  const { _id, __v, createdAt, updatedAt, brands, ...safeData } = data;
  return safeData;
};

export const validateBrandBaseId = async (req, displayName) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return request_failed("Invalid brand ID", { id }, displayName, isDebug);
  }
  return request_success(displayName, isDebug, { id });
};

export const validateBrandTargetId = async (req, { displayName, paramName }) => {
  const base = await validateBrandBaseId(req, displayName);
  if (!base.isValid) return base;

  const targetId = req.params[paramName];
  if (!isValidId(targetId)) {
    return request_failed(
      `Invalid ${paramName}`,
      { [paramName]: targetId },
      displayName,
      isDebug,
    );
  }

  return request_success(displayName, isDebug, {
    ...base.sanitizedData,
    [paramName]: targetId,
  });
};

export const validateBrandCreateBranch = async (req, displayName) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return request_failed("Invalid brand ID", { id }, displayName, isDebug);
  }

  const result = validateBranchFields(cleanBody(req), { isUpdate: false });
  if (!result.ok) {
    return request_failed(
      result.message,
      { field: result.field },
      displayName,
      isDebug,
    );
  }

  return request_success(displayName, isDebug, {
    id,
    branchData: result.sanitized,
  });
};
