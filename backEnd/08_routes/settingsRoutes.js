import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  settings_get_cntrl,
  settings_patchStorage_cntrl,
} from "../07_controllers/settingsCntrl/_settingsCntrl.index.js";
import {
  settings_patchStorage_vld,
} from "../07_controllers/settingsCntrl/_utils/settingsCntrl_utils.index.js";

const router = express.Router();

router.get("/", auth_mddlwre, settings_get_cntrl);
router.patch(
  "/storage",
  auth_mddlwre,
  vld_sntzr_mddlwre(settings_patchStorage_vld),
  settings_patchStorage_cntrl,
);

export default router;
