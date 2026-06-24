import { CK_SALES_PLATFORM_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_SALES_PLATFORM_CONFIG.FIELDS.UPDATE_LINKS;
const isDebug = true;

const stripPreviewLogoUrl = (logoUrl = "") => {
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

export const buildSalesPlatformLinksFormData = (linksDraft = {}) => {
  const pendingLogoFile = linksDraft?._pendingLogoFile ?? null;
  const linksMeta = {
    logoUrl: stripPreviewLogoUrl(linksDraft.logoUrl),
    websiteUrl: linksDraft.websiteUrl ?? "",
    partnerPortalUrl: linksDraft.partnerPortalUrl ?? "",
    other: Array.isArray(linksDraft.other) ? linksDraft.other : [],
  };

  if (pendingLogoFile instanceof File) {
    const formData = new FormData();
    formData.append("linksMeta", JSON.stringify(linksMeta));
    formData.append("file", pendingLogoFile);
    return { useFormData: true, formData, linksMeta };
  }

  return {
    useFormData: false,
    body: { links: linksMeta },
    linksMeta,
  };
};

const CK_gen_salesPlatform_update_links = async (payload) => {
  const { id, links } = payload;
  const url = ENDPOINT(id);
  const submitPayload = buildSalesPlatformLinksFormData(links);
  const requestBody = submitPayload.useFormData
    ? submitPayload.formData
    : submitPayload.body;

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${url}]`);
  isDebug &&
    console.log(`${DISPLAY_NAME} [PAYLOAD]`, {
      id,
      useFormData: submitPayload.useFormData,
      linksMeta: submitPayload.linksMeta,
      uploadCount: submitPayload.useFormData ? 1 : 0,
    });

  try {
    const response = await fetch(url, PROPERTIES(requestBody));
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to update sales platform links",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to update sales platform links",
      data: null,
    };
  }
};

export default CK_gen_salesPlatform_update_links;
