import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  menuCategory_add_cntrl,
  menuCategory_getAll_cntrl,
  menuCategory_getOne_cntrl,
  menuCategory_update_cntrl,
  menuCategory_delete_cntrl,
} from "../07_controllers/menuCategoryCntrl/_menuCategoryCntrl.index.js";
import {
  menuCategory_add_vld,
  menuCategory_getOne_vld,
  menuCategory_update_vld,
  menuCategory_delete_vld,
} from "../07_controllers/menuCategoryCntrl/_utils/menuCategoryCntrl_utils.index.js";

const router = express.Router();

router.post("/", auth_mddlwre, vld_sntzr_mddlwre(menuCategory_add_vld), menuCategory_add_cntrl);
router.get("/", auth_mddlwre, menuCategory_getAll_cntrl);
router.get("/:id", auth_mddlwre, vld_sntzr_mddlwre(menuCategory_getOne_vld), menuCategory_getOne_cntrl);
router.put("/:id", auth_mddlwre, vld_sntzr_mddlwre(menuCategory_update_vld), menuCategory_update_cntrl);
router.delete("/:id", auth_mddlwre, vld_sntzr_mddlwre(menuCategory_delete_vld), menuCategory_delete_cntrl);

export default router;
