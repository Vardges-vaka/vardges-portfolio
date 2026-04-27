import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  menuItem_add_cntrl,
  menuItem_getAll_cntrl,
  menuItem_getOne_cntrl,
  menuItem_update_cntrl,
  menuItem_delete_cntrl,
} from "../07_controllers/menuItemCntrl/_menuItemCntrl.index.js";
import {
  menuItem_add_vld,
  menuItem_getOne_vld,
  menuItem_update_vld,
  menuItem_delete_vld,
} from "../07_controllers/menuItemCntrl/_utils/menuItemCntrl_utils.index.js";

const router = express.Router();

router.post("/", auth_mddlwre, vld_sntzr_mddlwre(menuItem_add_vld), menuItem_add_cntrl);
router.get("/", auth_mddlwre, menuItem_getAll_cntrl);
router.get("/:id", auth_mddlwre, vld_sntzr_mddlwre(menuItem_getOne_vld), menuItem_getOne_cntrl);
router.put("/:id", auth_mddlwre, vld_sntzr_mddlwre(menuItem_update_vld), menuItem_update_cntrl);
router.delete("/:id", auth_mddlwre, vld_sntzr_mddlwre(menuItem_delete_vld), menuItem_delete_cntrl);

export default router;
