import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  modifier_add_cntrl,
  modifier_getAll_cntrl,
  modifier_getOne_cntrl,
  modifier_update_cntrl,
  modifier_delete_cntrl,
} from "../07_controllers/modifierCntrl/_modifierCntrl.index.js";
import {
  modifier_add_vld,
  modifier_getOne_vld,
  modifier_update_vld,
  modifier_delete_vld,
} from "../07_controllers/modifierCntrl/_utils/modifierCntrl_utils.index.js";

const router = express.Router();

router.post("/", auth_mddlwre, vld_sntzr_mddlwre(modifier_add_vld), modifier_add_cntrl);
router.get("/", auth_mddlwre, modifier_getAll_cntrl);
router.get("/:id", auth_mddlwre, vld_sntzr_mddlwre(modifier_getOne_vld), modifier_getOne_cntrl);
router.put("/:id", auth_mddlwre, vld_sntzr_mddlwre(modifier_update_vld), modifier_update_cntrl);
router.delete("/:id", auth_mddlwre, vld_sntzr_mddlwre(modifier_delete_vld), modifier_delete_cntrl);

export default router;
