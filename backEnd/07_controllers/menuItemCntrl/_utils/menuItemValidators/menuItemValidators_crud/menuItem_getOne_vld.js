import mongoose from "mongoose";
import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";

const displayName = " | menuItem_getOne_vld.js | ";
const isDebug = true;

export const menuItem_getOne_vld = async (req) => {
  const id = req.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return request_failed("Invalid menu item ID", { id }, displayName, isDebug);
  }

  return request_success(displayName, isDebug, { id });
};
