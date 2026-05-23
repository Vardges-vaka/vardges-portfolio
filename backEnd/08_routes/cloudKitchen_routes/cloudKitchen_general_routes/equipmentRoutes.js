import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_equipment_create_vld,
  cK_gen_equipment_getAll_vld,
  cK_gen_equipment_getOne_vld,
  cK_gen_equipment_delete_vld,
  cK_gen_equipment_updateAll_vld,
  // Fields
  cK_gen_equipment_update_name_vld,
  cK_gen_equipment_update_category_vld,
  cK_gen_equipment_update_assetTag_vld,
  cK_gen_equipment_update_description_vld,
  cK_gen_equipment_update_storedIn_vld,
  cK_gen_equipment_update_branch_vld,
  cK_gen_equipment_update_status_vld,
  cK_gen_equipment_update_purchase_vld,
  cK_gen_equipment_update_warranty_vld,
  cK_gen_equipment_update_decommissionedAt_vld,
  cK_gen_equipment_update_decommissionReason_vld,
  cK_gen_equipment_update_maintenance_vld,
  cK_gen_equipment_update_contracts_vld,
  cK_gen_equipment_update_files_vld,
  cK_gen_equipment_update_depreciation_vld,
  cK_gen_equipment_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_equipment_create_cntrl,
  cK_gen_equipment_getAll_cntrl,
  cK_gen_equipment_getOne_cntrl,
  cK_gen_equipment_delete_cntrl,
  cK_gen_equipment_updateAll_cntrl,
  // Fields
  cK_gen_equipment_update_name_cntrl,
  cK_gen_equipment_update_category_cntrl,
  cK_gen_equipment_update_assetTag_cntrl,
  cK_gen_equipment_update_description_cntrl,
  cK_gen_equipment_update_storedIn_cntrl,
  cK_gen_equipment_update_branch_cntrl,
  cK_gen_equipment_update_status_cntrl,
  cK_gen_equipment_update_purchase_cntrl,
  cK_gen_equipment_update_warranty_cntrl,
  cK_gen_equipment_update_decommissionedAt_cntrl,
  cK_gen_equipment_update_decommissionReason_cntrl,
  cK_gen_equipment_update_maintenance_cntrl,
  cK_gen_equipment_update_contracts_cntrl,
  cK_gen_equipment_update_files_cntrl,
  cK_gen_equipment_update_depreciation_cntrl,
  cK_gen_equipment_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_equipment_create_vld),
  cK_gen_equipment_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_equipment_getAll_vld),
  cK_gen_equipment_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_getOne_vld),
  cK_gen_equipment_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_delete_vld),
  cK_gen_equipment_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_updateAll_vld),
  cK_gen_equipment_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_name_vld),
  cK_gen_equipment_update_name_cntrl,
);

router.put(
  "/update/category/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_category_vld),
  cK_gen_equipment_update_category_cntrl,
);

router.put(
  "/update/assetTag/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_assetTag_vld),
  cK_gen_equipment_update_assetTag_cntrl,
);

router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_description_vld),
  cK_gen_equipment_update_description_cntrl,
);

router.put(
  "/update/storedIn/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_storedIn_vld),
  cK_gen_equipment_update_storedIn_cntrl,
);

router.put(
  "/update/branch/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_branch_vld),
  cK_gen_equipment_update_branch_cntrl,
);

router.put(
  "/update/status/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_status_vld),
  cK_gen_equipment_update_status_cntrl,
);

router.put(
  "/update/purchase/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_purchase_vld),
  cK_gen_equipment_update_purchase_cntrl,
);

router.put(
  "/update/warranty/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_warranty_vld),
  cK_gen_equipment_update_warranty_cntrl,
);

router.put(
  "/update/decommissionedAt/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_decommissionedAt_vld),
  cK_gen_equipment_update_decommissionedAt_cntrl,
);

router.put(
  "/update/decommissionReason/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_decommissionReason_vld),
  cK_gen_equipment_update_decommissionReason_cntrl,
);

router.put(
  "/update/maintenance/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_maintenance_vld),
  cK_gen_equipment_update_maintenance_cntrl,
);

router.put(
  "/update/contracts/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_contracts_vld),
  cK_gen_equipment_update_contracts_cntrl,
);

router.put(
  "/update/files/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_files_vld),
  cK_gen_equipment_update_files_cntrl,
);

router.put(
  "/update/depreciation/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_depreciation_vld),
  cK_gen_equipment_update_depreciation_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_equipment_update_notes_vld),
  cK_gen_equipment_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
