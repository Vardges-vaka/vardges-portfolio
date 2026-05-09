import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_updateSectionItem = (id, sectionKey, itemId, payload) => {
  const config = ADMIN_endpoints.BRAND.SECTION_ITEM_UPDATE;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, sectionKey, itemId),
    properties: config.PROPERTIES(payload),
    fallbackMessage: "Failed to update brand section item",
  });
};

export default Brand_updateSectionItem;
