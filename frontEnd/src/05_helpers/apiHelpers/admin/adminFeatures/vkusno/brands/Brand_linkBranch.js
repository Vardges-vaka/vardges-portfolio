import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_linkBranch = (id, branchId) => {
  const config = ADMIN_endpoints.BRAND.LINK_BRANCH;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, branchId),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to link brand branch",
  });
};

export default Brand_linkBranch;
