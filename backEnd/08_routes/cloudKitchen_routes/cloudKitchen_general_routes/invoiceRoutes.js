import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_invoice_create_vld,
  cK_gen_invoice_getAll_vld,
  cK_gen_invoice_getOne_vld,
  cK_gen_invoice_delete_vld,
  cK_gen_invoice_updateAll_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_invoice_create_cntrl,
  cK_gen_invoice_getAll_cntrl,
  cK_gen_invoice_getOne_cntrl,
  cK_gen_invoice_delete_cntrl,
  cK_gen_invoice_updateAll_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_invoice_create_vld),
  cK_gen_invoice_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_invoice_getAll_vld),
  cK_gen_invoice_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_invoice_getOne_vld),
  cK_gen_invoice_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_invoice_delete_vld),
  cK_gen_invoice_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_invoice_updateAll_vld),
  cK_gen_invoice_updateAll_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
