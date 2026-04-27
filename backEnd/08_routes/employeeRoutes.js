import express from "express";

import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
import {
  employee_add_cntrl,
  employee_getAll_cntrl,
  employee_getOne_cntrl,
  employee_update_cntrl,
  employee_delete_cntrl,
} from "../07_controllers/employeeCntrl/_employeeCntrl.index.js";
import {
  employee_add_vld,
  employee_getOne_vld,
  employee_update_vld,
  employee_delete_vld,
} from "../07_controllers/employeeCntrl/_utils/employeeCntrl_utils.index.js";

const router = express.Router();

router.post("/", auth_mddlwre, vld_sntzr_mddlwre(employee_add_vld), employee_add_cntrl);
router.get("/", auth_mddlwre, employee_getAll_cntrl);
router.get("/:id", auth_mddlwre, vld_sntzr_mddlwre(employee_getOne_vld), employee_getOne_cntrl);
router.put("/:id", auth_mddlwre, vld_sntzr_mddlwre(employee_update_vld), employee_update_cntrl);
router.delete("/:id", auth_mddlwre, vld_sntzr_mddlwre(employee_delete_vld), employee_delete_cntrl);

export default router;
