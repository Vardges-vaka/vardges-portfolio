import path from "path";
import { randomUUID } from "crypto";
import { getCloudOps } from "../../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";
import {
  deleteBrandFileObjects,
  isCloudStorageObjectKey,
  parseJsonField,
  resolveBrandStorageProvider,
  validateUploadedFile,
} from "../../../../cloudKitchen_Brand_cntrl/cK_brnd_brand_crud_cntrl/cK_brnd_brand_cntrl_utils/cK_brnd_brand_hlprs/cK_brnd_brand_files_hlprs.js";

export {
  isValidObjectId,
  isCloudStorageObjectKey,
  parseJsonField,
  validateUploadedFile,
} from "../../../../cloudKitchen_Brand_cntrl/cK_brnd_brand_crud_cntrl/cK_brnd_brand_cntrl_utils/cK_brnd_brand_hlprs/cK_brnd_brand_files_hlprs.js";

export const buildSalesPlatformLogoObjectKey = (platformId, file) => {
  const slug =
    String(file?.originalname || "logo")
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "logo";

  const ext = path.extname(file?.originalname || "") || ".png";
  return `cloudKitchen/salesPlatforms/${platformId}/logo/${slug}-${randomUUID()}${ext}`;
};

export const sanitizeLinksLogoUrl = (logoUrl = "") => {
  const raw = typeof logoUrl === "string" ? logoUrl.trim() : "";
  if (!raw) return "";
  if (
    raw.startsWith("blob:") ||
    raw.startsWith("data:") ||
    /^https?:\/\//i.test(raw)
  ) {
    return "";
  }
  return raw;
};

export const normalizeLinksPayload = (links = {}) => ({
  logoUrl: sanitizeLinksLogoUrl(links.logoUrl),
  websiteUrl: typeof links.websiteUrl === "string" ? links.websiteUrl.trim() : "",
  partnerPortalUrl:
    typeof links.partnerPortalUrl === "string" ? links.partnerPortalUrl.trim() : "",
  other: Array.isArray(links.other) ? links.other : [],
});

export const resolveNextLinksLogoUrl = ({
  currentLogoUrl = "",
  incomingLogoUrl = "",
  uploadedObjectKey = "",
}) => {
  if (uploadedObjectKey) return uploadedObjectKey;

  const sanitizedIncoming = sanitizeLinksLogoUrl(incomingLogoUrl);
  if (sanitizedIncoming) return sanitizedIncoming;

  if (incomingLogoUrl === "") return "";

  return sanitizeLinksLogoUrl(currentLogoUrl);
};

export const uploadSalesPlatformLogo = async ({
  platformId,
  file,
  provider,
  isDebug,
}) => {
  const objectKey = buildSalesPlatformLogoObjectKey(platformId, file);
  const { put } = getCloudOps(provider);

  const putResult = await put(
    {
      objectKey,
      file: Buffer.isBuffer(file.buffer) ? file.buffer : file.path,
      size: file.size,
      contentType: file.mimetype || "application/octet-stream",
    },
    isDebug,
  );

  if (!putResult.success) {
    return {
      ok: false,
      message: putResult.message || "Logo upload failed",
      objectKey: "",
    };
  }

  return {
    ok: true,
    message: "Logo uploaded",
    objectKey: putResult.data?.objectKey || objectKey,
  };
};

export const deleteSalesPlatformLogoObject = async ({
  objectKey,
  provider,
  isDebug,
}) => {
  if (!isCloudStorageObjectKey(objectKey)) {
    return { ok: true };
  }

  return deleteBrandFileObjects({
    objectKeys: [objectKey],
    provider,
    isDebug,
  });
};

export const resolveSalesPlatformStorageProvider = () =>
  resolveBrandStorageProvider({});
