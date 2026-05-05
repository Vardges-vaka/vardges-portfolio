import express from "express";

import {
  vld_sntzr_mddlwre,
  upload_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  settings_get_cntrl,
  settings_putProvider_cntrl,
  settings_uploadLogo_cntrl,
  settings_getLogo_cntrl,
  settings_deleteLogo_cntrl,
  settings_getMonitor_cntrl,
} from "../07_controllers/settingsCntrl/_settingsCntrl.index.js";
import {
  settings_putProvider_vld,
  settings_uploadLogo_vld,
} from "../07_controllers/settingsCntrl/_utils/settingsCntrl_utils.index.js";

const router = express.Router();

router.get("/", settings_get_cntrl);

router.put(
  "/storage/:provider",
  vld_sntzr_mddlwre(settings_putProvider_vld),
  settings_putProvider_cntrl,
);

router.post(
  "/storage/:provider/logo",
  upload_mddlwre,
  vld_sntzr_mddlwre(settings_uploadLogo_vld),
  settings_uploadLogo_cntrl,
);

// TODO: Add a validator for the get logo endpoint
router.get("/storage/:provider/logo", settings_getLogo_cntrl);

// TODO: Add a validator for the delete logo endpoint
router.delete("/storage/:provider/logo", settings_deleteLogo_cntrl);

// TODO: Add a validator for the monitor endpoint
router.get("/storage/:provider/monitor", settings_getMonitor_cntrl);

export default router;
