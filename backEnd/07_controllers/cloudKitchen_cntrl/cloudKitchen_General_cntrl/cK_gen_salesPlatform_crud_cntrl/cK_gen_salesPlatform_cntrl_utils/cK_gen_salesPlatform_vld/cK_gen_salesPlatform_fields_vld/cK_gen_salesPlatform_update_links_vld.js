import {
  request_failed,
  request_success,
} from "../../../../../../../03_services/_services.index.js";
import {
  isValidObjectId,
  normalizeLinksPayload,
  parseJsonField,
  validateUploadedFile,
} from "../../cK_gen_salesPlatform_hlpr/cK_gen_salesPlatform_links_hlprs.js";

const displayName = " | cK_gen_salesPlatform_update_links_vld.js | ";
const isDebug = true;

const readLinksInput = (req) => {
  if (typeof req.body?.linksMeta === "string") {
    return parseJsonField(req.body.linksMeta, "linksMeta");
  }

  if (req.body?.links && typeof req.body.links === "object") {
    return { ok: true, value: req.body.links };
  }

  const bodyData = req.body?.body_Data;
  if (bodyData?.links && typeof bodyData.links === "object") {
    return { ok: true, value: bodyData.links };
  }

  return { ok: false, message: "links payload is required" };
};

export const cK_gen_salesPlatform_update_links_vld = async (req) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return request_failed("Invalid sales platform id", displayName, isDebug);
  }

  const linksParsed = readLinksInput(req);
  if (!linksParsed.ok) {
    return request_failed(linksParsed.message, displayName, isDebug);
  }

  const logoUpload = req.file ?? null;
  if (logoUpload) {
    const fileCheck = validateUploadedFile(logoUpload, "logo");
    if (!fileCheck.ok) {
      return request_failed(fileCheck.message, displayName, isDebug);
    }
  }

  return request_success(displayName, isDebug, {
    id,
    links: normalizeLinksPayload(linksParsed.value),
    logoUpload,
  });
};
