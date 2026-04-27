import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  brand_add_cntrl,
  brand_getAll_cntrl,
  brand_getOne_cntrl,
  brand_update_cntrl,
  brand_delete_cntrl,
} from "../07_controllers/brandCntrl/_brandCntrl.index.js";
import {
  brand_add_vld,
  brand_getOne_vld,
  brand_update_vld,
  brand_delete_vld,
} from "../07_controllers/brandCntrl/_utils/brandCntrl_utils.index.js";

const router = express.Router();

router.post("/", auth_mddlwre, vld_sntzr_mddlwre(brand_add_vld), brand_add_cntrl);
router.get("/", auth_mddlwre, brand_getAll_cntrl);
router.get("/:id", auth_mddlwre, vld_sntzr_mddlwre(brand_getOne_vld), brand_getOne_cntrl);
router.put("/:id", auth_mddlwre, vld_sntzr_mddlwre(brand_update_vld), brand_update_cntrl);
router.delete("/:id", auth_mddlwre, vld_sntzr_mddlwre(brand_delete_vld), brand_delete_cntrl);

export default router;
