import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_branch_create_vld,
  cK_gen_branch_getAll_vld,
  cK_gen_branch_getOne_vld,
  cK_gen_branch_delete_vld,
  cK_gen_branch_updateAll_vld,
  // Fields
  cK_gen_branch_update_name_vld,
  cK_gen_branch_update_location_vld,
  cK_gen_branch_update_contact_vld,
  cK_gen_branch_update_files_vld,
  cK_gen_branch_update_operations_vld,
  cK_gen_branch_update_expenses_vld,
  cK_gen_branch_update_contracts_vld,
  cK_gen_branch_update_employees_vld,
  cK_gen_branch_update_equipments_vld,
  cK_gen_branch_update_brands_vld,
  cK_gen_branch_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_branch_create_cntrl,
  cK_gen_branch_getAll_cntrl,
  cK_gen_branch_getOne_cntrl,
  cK_gen_branch_delete_cntrl,
  cK_gen_branch_updateAll_cntrl,
  // Fields
  cK_gen_branch_update_name_cntrl,
  cK_gen_branch_update_location_cntrl,
  cK_gen_branch_update_contact_cntrl,
  cK_gen_branch_update_files_cntrl,
  cK_gen_branch_update_operations_cntrl,
  cK_gen_branch_update_expenses_cntrl,
  cK_gen_branch_update_contracts_cntrl,
  cK_gen_branch_update_employees_cntrl,
  cK_gen_branch_update_equipments_cntrl,
  cK_gen_branch_update_brands_cntrl,
  cK_gen_branch_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_branch_create_vld),
  cK_gen_branch_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_branch_getAll_vld),
  cK_gen_branch_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_branch_getOne_vld),
  cK_gen_branch_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_branch_delete_vld),
  cK_gen_branch_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_branch_updateAll_vld),
  cK_gen_branch_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_name_vld),
  cK_gen_branch_update_name_cntrl,
);

router.put(
  "/update/location/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_location_vld),
  cK_gen_branch_update_location_cntrl,
);

router.put(
  "/update/contact/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_contact_vld),
  cK_gen_branch_update_contact_cntrl,
);

router.put(
  "/update/files/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_files_vld),
  cK_gen_branch_update_files_cntrl,
);

router.put(
  "/update/operations/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_operations_vld),
  cK_gen_branch_update_operations_cntrl,
);

router.put(
  "/update/expenses/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_expenses_vld),
  cK_gen_branch_update_expenses_cntrl,
);

router.put(
  "/update/contracts/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_contracts_vld),
  cK_gen_branch_update_contracts_cntrl,
);

router.put(
  "/update/employees/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_employees_vld),
  cK_gen_branch_update_employees_cntrl,
);

router.put(
  "/update/equipments/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_equipments_vld),
  cK_gen_branch_update_equipments_cntrl,
);

router.put(
  "/update/brands/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_brands_vld),
  cK_gen_branch_update_brands_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_branch_update_notes_vld),
  cK_gen_branch_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
