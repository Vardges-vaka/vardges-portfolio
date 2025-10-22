import express from "express";

// !===== Middleware =====
import { vld_sntzr_mddlwre } from "../05_middlewares/_mddlwre.index.js";
// !===== Controllers =====
import {
  access_addCodes_cntrl,
  access_getCodes_cntrl,
} from "../07_controllers/accessCntrl/_accessCntrl.index.js";

// !===== validators =====
import {
  access_addCodes_vld,
  access_getCodes_vld,
} from "../07_controllers/accessCntrl/_accessCntrl_utils/accessCntrl_utils.index.js";

const router = express.Router();

router.post(
  "/addCodes",
  vld_sntzr_mddlwre(access_addCodes_vld),
  access_addCodes_cntrl
);
router.post(
  "/getCodes",
  vld_sntzr_mddlwre(access_getCodes_vld),
  access_getCodes_cntrl
);

export default router;
