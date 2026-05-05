import Settings_get from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_get.js";
import Settings_putProvider from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_putProvider.js";
import Settings_uploadLogo from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_uploadLogo.js";
import Settings_getLogo from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_getLogo.js";
import Settings_deleteLogo from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_deleteLogo.js";
import Settings_getMonitor from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_getMonitor.js";

export const useCloudStorage_apiHelpers = () => ({
  apiHelpers: {
    Settings_get,
    Settings_putProvider,
    Settings_uploadLogo,
    Settings_getLogo,
    Settings_deleteLogo,
    Settings_getMonitor,
  },
});
