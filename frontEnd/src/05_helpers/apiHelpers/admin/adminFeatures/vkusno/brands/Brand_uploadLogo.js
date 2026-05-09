import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_uploadLogo = (id, logoType, provider, file) => {
  const config = ADMIN_endpoints.BRAND.LOGO_UPLOAD;
  const formData = new FormData();
  formData.append("file", file);
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, logoType, provider),
    properties: config.PROPERTIES(formData),
    fallbackMessage: "Failed to upload brand logo",
  });
};

export default Brand_uploadLogo;
