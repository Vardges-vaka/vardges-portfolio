const VALID_LOGO_TYPES = ["highRes", "svg", "png", "jpg", "pdf", "ico"];
const displayName = " | brand_getLogo_vld.js | ";

export const brand_getLogo_vld = async (req) => {
  const id = req.params?.id;
  const logoType = req.params?.logoType;

  if (!id) {
    return { isValid: false, message: `${displayName}brand id is required`, sanitizedData: null };
  }
  if (!VALID_LOGO_TYPES.includes(logoType)) {
    return {
      isValid: false,
      message: `${displayName}invalid logoType "${logoType}"`,
      sanitizedData: null,
    };
  }
  return { isValid: true, message: "OK", sanitizedData: { id, logoType } };
};
