import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_clearMenu = (id) => {
  const config = ADMIN_endpoints.BRAND.CLEAR_MENU;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to clear brand menu",
  });
};

export default Brand_clearMenu;
