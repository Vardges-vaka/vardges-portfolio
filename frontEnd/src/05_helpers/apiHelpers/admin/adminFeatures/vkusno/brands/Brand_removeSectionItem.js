import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_removeSectionItem = (id, sectionKey, itemId) => {
  const config = ADMIN_endpoints.BRAND.SECTION_ITEM_DELETE;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, sectionKey, itemId),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to remove brand section item",
  });
};

export default Brand_removeSectionItem;
