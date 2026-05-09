import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_getLogo = (id, logoType) => {
  const config = ADMIN_endpoints.BRAND.LOGO_GET;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, logoType),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to get brand logo URL",
  });
};

export default Brand_getLogo;
