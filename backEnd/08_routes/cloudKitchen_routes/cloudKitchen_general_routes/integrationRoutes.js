import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_integration_create_vld,
  cK_gen_integration_getAll_vld,
  cK_gen_integration_getOne_vld,
  cK_gen_integration_delete_vld,
  cK_gen_integration_updateAll_vld,
  // Fields
  cK_gen_integration_update_provider_vld,
  cK_gen_integration_update_kind_vld,
  cK_gen_integration_update_accountLabel_vld,
  cK_gen_integration_update_description_vld,
  cK_gen_integration_update_status_vld,
  cK_gen_integration_update_lifecycle_vld,
  cK_gen_integration_update_links_vld,
  cK_gen_integration_update_payment_vld,
  cK_gen_integration_update_loginCredentials_vld,
  cK_gen_integration_update_kam_vld,
  cK_gen_integration_update_support_vld,
  cK_gen_integration_update_scheduledMaintenances_vld,
  cK_gen_integration_update_brands_vld,
  cK_gen_integration_update_branches_vld,
  cK_gen_integration_update_contract_vld,
  cK_gen_integration_update_files_vld,
  cK_gen_integration_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_integration_create_cntrl,
  cK_gen_integration_getAll_cntrl,
  cK_gen_integration_getOne_cntrl,
  cK_gen_integration_delete_cntrl,
  cK_gen_integration_updateAll_cntrl,
  // Fields
  cK_gen_integration_update_provider_cntrl,
  cK_gen_integration_update_kind_cntrl,
  cK_gen_integration_update_accountLabel_cntrl,
  cK_gen_integration_update_description_cntrl,
  cK_gen_integration_update_status_cntrl,
  cK_gen_integration_update_lifecycle_cntrl,
  cK_gen_integration_update_links_cntrl,
  cK_gen_integration_update_payment_cntrl,
  cK_gen_integration_update_loginCredentials_cntrl,
  cK_gen_integration_update_kam_cntrl,
  cK_gen_integration_update_support_cntrl,
  cK_gen_integration_update_scheduledMaintenances_cntrl,
  cK_gen_integration_update_brands_cntrl,
  cK_gen_integration_update_branches_cntrl,
  cK_gen_integration_update_contract_cntrl,
  cK_gen_integration_update_files_cntrl,
  cK_gen_integration_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_integration_create_vld),
  cK_gen_integration_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_integration_getAll_vld),
  cK_gen_integration_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_integration_getOne_vld),
  cK_gen_integration_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_integration_delete_vld),
  cK_gen_integration_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_integration_updateAll_vld),
  cK_gen_integration_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/provider/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_provider_vld),
  cK_gen_integration_update_provider_cntrl,
);

router.put(
  "/update/kind/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_kind_vld),
  cK_gen_integration_update_kind_cntrl,
);

router.put(
  "/update/accountLabel/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_accountLabel_vld),
  cK_gen_integration_update_accountLabel_cntrl,
);

router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_description_vld),
  cK_gen_integration_update_description_cntrl,
);

router.put(
  "/update/status/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_status_vld),
  cK_gen_integration_update_status_cntrl,
);

router.put(
  "/update/lifecycle/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_lifecycle_vld),
  cK_gen_integration_update_lifecycle_cntrl,
);

router.put(
  "/update/links/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_links_vld),
  cK_gen_integration_update_links_cntrl,
);

router.put(
  "/update/payment/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_payment_vld),
  cK_gen_integration_update_payment_cntrl,
);

router.put(
  "/update/loginCredentials/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_loginCredentials_vld),
  cK_gen_integration_update_loginCredentials_cntrl,
);

router.put(
  "/update/kam/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_kam_vld),
  cK_gen_integration_update_kam_cntrl,
);

router.put(
  "/update/support/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_support_vld),
  cK_gen_integration_update_support_cntrl,
);

router.put(
  "/update/scheduledMaintenances/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_scheduledMaintenances_vld),
  cK_gen_integration_update_scheduledMaintenances_cntrl,
);

router.put(
  "/update/brands/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_brands_vld),
  cK_gen_integration_update_brands_cntrl,
);

router.put(
  "/update/branches/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_branches_vld),
  cK_gen_integration_update_branches_cntrl,
);

router.put(
  "/update/contract/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_contract_vld),
  cK_gen_integration_update_contract_cntrl,
);

router.put(
  "/update/files/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_files_vld),
  cK_gen_integration_update_files_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_integration_update_notes_vld),
  cK_gen_integration_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
