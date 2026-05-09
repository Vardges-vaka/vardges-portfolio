import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_setMenu = (id, menuId) => {
  const config = ADMIN_endpoints.BRAND.SET_MENU;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, menuId),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to set brand menu",
  });
};

export default Brand_setMenu;
