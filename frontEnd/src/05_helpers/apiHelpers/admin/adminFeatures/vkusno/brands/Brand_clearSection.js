import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_clearSection = (id, sectionKey) => {
  const config = ADMIN_endpoints.BRAND.SECTION_CLEAR;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, sectionKey),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to clear brand section",
  });
};

export default Brand_clearSection;
