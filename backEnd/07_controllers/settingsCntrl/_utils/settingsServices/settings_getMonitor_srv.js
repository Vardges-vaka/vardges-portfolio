import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";
import { getCloudOps } from "../settingshelpers/cloudStorageDispatch.js";

const displayName = " | settings_getMonitor_srv.js | ";

export const settings_getMonitor_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const provider = req.params?.provider;
    const useCache = req.query?.refresh !== "1";
    console.log("provider_________________________", provider);
    const { monitor } = getCloudOps(provider);
    const result = await monitor({ useCache }, isDebug);
    console.log("result____________________________", result);
    return result;
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
