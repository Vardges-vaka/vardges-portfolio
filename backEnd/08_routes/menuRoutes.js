import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  menu_add_cntrl,
  menu_getAll_cntrl,
  menu_getOne_cntrl,
  menu_update_cntrl,
  menu_delete_cntrl,
} from "../07_controllers/menuCntrl/_menuCntrl.index.js";
import {
  menu_add_vld,
  menu_getOne_vld,
  menu_update_vld,
  menu_delete_vld,
} from "../07_controllers/menuCntrl/_utils/menuCntrl_utils.index.js";

const router = express.Router();

router.post("/", auth_mddlwre, vld_sntzr_mddlwre(menu_add_vld), menu_add_cntrl);
router.get("/", auth_mddlwre, menu_getAll_cntrl);
router.get("/:id", auth_mddlwre, vld_sntzr_mddlwre(menu_getOne_vld), menu_getOne_cntrl);
router.put("/:id", auth_mddlwre, vld_sntzr_mddlwre(menu_update_vld), menu_update_cntrl);
router.delete("/:id", auth_mddlwre, vld_sntzr_mddlwre(menu_delete_vld), menu_delete_cntrl);

export default router;
