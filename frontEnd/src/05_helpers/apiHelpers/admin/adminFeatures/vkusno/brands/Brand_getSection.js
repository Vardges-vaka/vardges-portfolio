import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_getSection = (id, sectionKey) => {
  const config = ADMIN_endpoints.BRAND.SECTION_GET;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, sectionKey),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to fetch brand section",
  });
};

export default Brand_getSection;
