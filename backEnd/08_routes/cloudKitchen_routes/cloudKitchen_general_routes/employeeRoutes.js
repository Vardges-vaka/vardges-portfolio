import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_employee_create_vld,
  cK_gen_employee_getAll_vld,
  cK_gen_employee_getOne_vld,
  cK_gen_employee_delete_vld,
  cK_gen_employee_updateAll_vld,
  // Fields
  cK_gen_employee_update_name_vld,
  cK_gen_employee_update_personalDetails_vld,
  cK_gen_employee_update_address_vld,
  cK_gen_employee_update_files_vld,
  cK_gen_employee_update_uniform_vld,
  cK_gen_employee_update_certifications_vld,
  cK_gen_employee_update_employmentInfo_vld,
  cK_gen_employee_update_legalDocs_vld,
  cK_gen_employee_update_salary_vld,
  cK_gen_employee_update_attendanceInfo_vld,
  cK_gen_employee_update_relatedTo_vld,
  cK_gen_employee_update_branch_vld,
  cK_gen_employee_update_contracts_vld,
  cK_gen_employee_update_associatedBrands_vld,
  cK_gen_employee_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_employee_create_cntrl,
  cK_gen_employee_getAll_cntrl,
  cK_gen_employee_getOne_cntrl,
  cK_gen_employee_delete_cntrl,
  cK_gen_employee_updateAll_cntrl,
  // Fields
  cK_gen_employee_update_name_cntrl,
  cK_gen_employee_update_personalDetails_cntrl,
  cK_gen_employee_update_address_cntrl,
  cK_gen_employee_update_files_cntrl,
  cK_gen_employee_update_uniform_cntrl,
  cK_gen_employee_update_certifications_cntrl,
  cK_gen_employee_update_employmentInfo_cntrl,
  cK_gen_employee_update_legalDocs_cntrl,
  cK_gen_employee_update_salary_cntrl,
  cK_gen_employee_update_attendanceInfo_cntrl,
  cK_gen_employee_update_relatedTo_cntrl,
  cK_gen_employee_update_branch_cntrl,
  cK_gen_employee_update_contracts_cntrl,
  cK_gen_employee_update_associatedBrands_cntrl,
  cK_gen_employee_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_employee_create_vld),
  cK_gen_employee_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_employee_getAll_vld),
  cK_gen_employee_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_employee_getOne_vld),
  cK_gen_employee_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_employee_delete_vld),
  cK_gen_employee_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_employee_updateAll_vld),
  cK_gen_employee_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_name_vld),
  cK_gen_employee_update_name_cntrl,
);

router.put(
  "/update/personalDetails/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_personalDetails_vld),
  cK_gen_employee_update_personalDetails_cntrl,
);

router.put(
  "/update/address/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_address_vld),
  cK_gen_employee_update_address_cntrl,
);

router.put(
  "/update/files/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_files_vld),
  cK_gen_employee_update_files_cntrl,
);

router.put(
  "/update/uniform/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_uniform_vld),
  cK_gen_employee_update_uniform_cntrl,
);

router.put(
  "/update/certifications/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_certifications_vld),
  cK_gen_employee_update_certifications_cntrl,
);

router.put(
  "/update/employmentInfo/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_employmentInfo_vld),
  cK_gen_employee_update_employmentInfo_cntrl,
);

router.put(
  "/update/legalDocs/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_legalDocs_vld),
  cK_gen_employee_update_legalDocs_cntrl,
);

router.put(
  "/update/salary/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_salary_vld),
  cK_gen_employee_update_salary_cntrl,
);

router.put(
  "/update/attendanceInfo/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_attendanceInfo_vld),
  cK_gen_employee_update_attendanceInfo_cntrl,
);

router.put(
  "/update/relatedTo/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_relatedTo_vld),
  cK_gen_employee_update_relatedTo_cntrl,
);

router.put(
  "/update/branch/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_branch_vld),
  cK_gen_employee_update_branch_cntrl,
);

router.put(
  "/update/contracts/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_contracts_vld),
  cK_gen_employee_update_contracts_cntrl,
);

router.put(
  "/update/associatedBrands/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_associatedBrands_vld),
  cK_gen_employee_update_associatedBrands_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_employee_update_notes_vld),
  cK_gen_employee_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
