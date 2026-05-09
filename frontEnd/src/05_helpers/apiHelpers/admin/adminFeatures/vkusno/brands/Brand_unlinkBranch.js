import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_unlinkBranch = (id, branchId) => {
  const config = ADMIN_endpoints.BRAND.UNLINK_BRANCH;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, branchId),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to unlink brand branch",
  });
};

export default Brand_unlinkBranch;
