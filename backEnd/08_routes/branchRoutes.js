import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  branch_add_cntrl,
  branch_getAll_cntrl,
  branch_getOne_cntrl,
  branch_update_cntrl,
  branch_delete_cntrl,
} from "../07_controllers/branchCntrl/_branchCntrl.index.js";
import {
  branch_add_vld,
  branch_getOne_vld,
  branch_update_vld,
  branch_delete_vld,
} from "../07_controllers/branchCntrl/_utils/branchCntrl_utils.index.js";

const router = express.Router();

router.post("/", auth_mddlwre, vld_sntzr_mddlwre(branch_add_vld), branch_add_cntrl);
router.get("/", auth_mddlwre, branch_getAll_cntrl);
router.get("/:id", auth_mddlwre, vld_sntzr_mddlwre(branch_getOne_vld), branch_getOne_cntrl);
router.put("/:id", auth_mddlwre, vld_sntzr_mddlwre(branch_update_vld), branch_update_cntrl);
router.delete("/:id", auth_mddlwre, vld_sntzr_mddlwre(branch_delete_vld), branch_delete_cntrl);

export default router;
