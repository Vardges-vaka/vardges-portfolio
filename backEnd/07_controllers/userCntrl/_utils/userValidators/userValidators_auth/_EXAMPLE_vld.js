import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";

const displayName = " | EXAMPLE_vld.js | ";
const isDebug = true;

export const EXAMPLE_vld = (req) => {
  let sanitizedData = {};
  const { body_Data } = req.body;
  const { params_Data } = req.params;
  const { query_Data } = req.query;

  //   return request_failed("Massege", req.body, displayName, isDebug);

  return request_success(displayName, isDebug, sanitizedData);
};
