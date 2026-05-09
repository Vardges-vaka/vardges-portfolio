import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_putSection = (id, sectionKey, payload) => {
  const config = ADMIN_endpoints.BRAND.SECTION_PUT;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, sectionKey),
    properties: config.PROPERTIES(payload),
    fallbackMessage: "Failed to update brand section",
  });
};

export default Brand_putSection;
