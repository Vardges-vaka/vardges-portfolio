import {
  request_failed,
  request_success,
} from "../../../../03_services/_services.index.js";
import {
  text_vld,
  projectType_vld,
  projectInfo_vld,
  projectConfig_vld,
} from "../../../../09_validators/_validators.index.js";

const displayName = " | project_add_vld.js | ";
const isDebug = true;

export const project_add_vld = async (req) => {
  let sanitizedData = {};

  const { type } = req.quiry;

  if (!projectType_vld(type).isValid) {
    return request_failed(
      projectType_vld(type).message,
      req.body,
      displayName,
      isDebug
    );
  }

  // Accept data from either body_Data or directly from body
  const { title, description, projectInfo, config } = req.body;

  if (!text_vld(title, "Title").isValid) {
    return request_failed(
      text_vld(title, "Title").message,
      req.body,
      displayName,
      isDebug
    );
  }

  const { brief, detailed } = description;

  if (!text_vld(brief, "Brief Description").isValid) {
    return request_failed(
      text_vld(brief, "Brief Description").message,
      req.body,
      displayName,
      isDebug
    );
  }

  if (!text_vld(detailed, "Detailed Description").isValid) {
    return request_failed(
      text_vld(detailed, "Detailed Description").message,
      req.body,
      displayName,
      isDebug
    );
  }

  if (!projectInfo_vld(type, projectInfo).isValid) {
    return request_failed(
      projectInfo_vld(type, projectInfo).message,
      req.body,
      displayName,
      isDebug
    );
  }

  if (!projectConfig_vld(config).isValid) {
    return request_failed(
      projectConfig_vld(config).message,
      req.body,
      displayName,
      isDebug
    );
  }

  sanitizedData = { type: type, ...req.body };

  return request_success(displayName, isDebug, sanitizedData);
};
