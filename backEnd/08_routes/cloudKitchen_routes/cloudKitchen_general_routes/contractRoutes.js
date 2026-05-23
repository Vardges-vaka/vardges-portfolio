import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_contract_create_vld,
  cK_gen_contract_getAll_vld,
  cK_gen_contract_getOne_vld,
  cK_gen_contract_delete_vld,
  cK_gen_contract_updateAll_vld,
  // Fields
  cK_gen_contract_update_title_vld,
  cK_gen_contract_update_description_vld,
  cK_gen_contract_update_kind_vld,
  cK_gen_contract_update_ownerType_vld,
  cK_gen_contract_update_ownerId_vld,
  cK_gen_contract_update_counterparty_vld,
  cK_gen_contract_update_file_vld,
  cK_gen_contract_update_effectiveFrom_vld,
  cK_gen_contract_update_effectiveTo_vld,
  cK_gen_contract_update_autoRenew_vld,
  cK_gen_contract_update_terminationNoticeDays_vld,
  cK_gen_contract_update_status_vld,
  cK_gen_contract_update_commissionPct_vld,
  cK_gen_contract_update_additionalCharges_vld,
  cK_gen_contract_update_commitments_vld,
  cK_gen_contract_update_payment_vld,
  cK_gen_contract_update_history_vld,
  cK_gen_contract_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_contract_create_cntrl,
  cK_gen_contract_getAll_cntrl,
  cK_gen_contract_getOne_cntrl,
  cK_gen_contract_delete_cntrl,
  cK_gen_contract_updateAll_cntrl,
  // Fields
  cK_gen_contract_update_title_cntrl,
  cK_gen_contract_update_description_cntrl,
  cK_gen_contract_update_kind_cntrl,
  cK_gen_contract_update_ownerType_cntrl,
  cK_gen_contract_update_ownerId_cntrl,
  cK_gen_contract_update_counterparty_cntrl,
  cK_gen_contract_update_file_cntrl,
  cK_gen_contract_update_effectiveFrom_cntrl,
  cK_gen_contract_update_effectiveTo_cntrl,
  cK_gen_contract_update_autoRenew_cntrl,
  cK_gen_contract_update_terminationNoticeDays_cntrl,
  cK_gen_contract_update_status_cntrl,
  cK_gen_contract_update_commissionPct_cntrl,
  cK_gen_contract_update_additionalCharges_cntrl,
  cK_gen_contract_update_commitments_cntrl,
  cK_gen_contract_update_payment_cntrl,
  cK_gen_contract_update_history_cntrl,
  cK_gen_contract_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_contract_create_vld),
  cK_gen_contract_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_contract_getAll_vld),
  cK_gen_contract_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_contract_getOne_vld),
  cK_gen_contract_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_contract_delete_vld),
  cK_gen_contract_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_contract_updateAll_vld),
  cK_gen_contract_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/title/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_title_vld),
  cK_gen_contract_update_title_cntrl,
);

router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_description_vld),
  cK_gen_contract_update_description_cntrl,
);

router.put(
  "/update/kind/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_kind_vld),
  cK_gen_contract_update_kind_cntrl,
);

router.put(
  "/update/ownerType/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_ownerType_vld),
  cK_gen_contract_update_ownerType_cntrl,
);

router.put(
  "/update/ownerId/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_ownerId_vld),
  cK_gen_contract_update_ownerId_cntrl,
);

router.put(
  "/update/counterparty/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_counterparty_vld),
  cK_gen_contract_update_counterparty_cntrl,
);

router.put(
  "/update/file/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_file_vld),
  cK_gen_contract_update_file_cntrl,
);

router.put(
  "/update/effectiveFrom/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_effectiveFrom_vld),
  cK_gen_contract_update_effectiveFrom_cntrl,
);

router.put(
  "/update/effectiveTo/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_effectiveTo_vld),
  cK_gen_contract_update_effectiveTo_cntrl,
);

router.put(
  "/update/autoRenew/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_autoRenew_vld),
  cK_gen_contract_update_autoRenew_cntrl,
);

router.put(
  "/update/terminationNoticeDays/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_terminationNoticeDays_vld),
  cK_gen_contract_update_terminationNoticeDays_cntrl,
);

router.put(
  "/update/status/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_status_vld),
  cK_gen_contract_update_status_cntrl,
);

router.put(
  "/update/commissionPct/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_commissionPct_vld),
  cK_gen_contract_update_commissionPct_cntrl,
);

router.put(
  "/update/additionalCharges/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_additionalCharges_vld),
  cK_gen_contract_update_additionalCharges_cntrl,
);

router.put(
  "/update/commitments/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_commitments_vld),
  cK_gen_contract_update_commitments_cntrl,
);

router.put(
  "/update/payment/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_payment_vld),
  cK_gen_contract_update_payment_cntrl,
);

router.put(
  "/update/history/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_history_vld),
  cK_gen_contract_update_history_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_contract_update_notes_vld),
  cK_gen_contract_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
