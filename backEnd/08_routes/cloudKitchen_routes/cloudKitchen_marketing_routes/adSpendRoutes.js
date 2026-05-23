import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_mkt_adSpend_create_vld,
  cK_mkt_adSpend_getAll_vld,
  cK_mkt_adSpend_getOne_vld,
  cK_mkt_adSpend_delete_vld,
  cK_mkt_adSpend_updateAll_vld,
  // Fields
  cK_mkt_adSpend_update_salesChannel_vld,
  cK_mkt_adSpend_update_kind_vld,
  cK_mkt_adSpend_update_period_vld,
  cK_mkt_adSpend_update_amount_vld,
  cK_mkt_adSpend_update_basis_vld,
  cK_mkt_adSpend_update_isContractual_vld,
  cK_mkt_adSpend_update_contract_vld,
  cK_mkt_adSpend_update_metrics_vld,
  cK_mkt_adSpend_update_netSalesForPeriod_vld,
  cK_mkt_adSpend_update_source_vld,
  cK_mkt_adSpend_update_files_vld,
  cK_mkt_adSpend_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_mkt_adSpend_create_cntrl,
  cK_mkt_adSpend_getAll_cntrl,
  cK_mkt_adSpend_getOne_cntrl,
  cK_mkt_adSpend_delete_cntrl,
  cK_mkt_adSpend_updateAll_cntrl,
  // Fields
  cK_mkt_adSpend_update_salesChannel_cntrl,
  cK_mkt_adSpend_update_kind_cntrl,
  cK_mkt_adSpend_update_period_cntrl,
  cK_mkt_adSpend_update_amount_cntrl,
  cK_mkt_adSpend_update_basis_cntrl,
  cK_mkt_adSpend_update_isContractual_cntrl,
  cK_mkt_adSpend_update_contract_cntrl,
  cK_mkt_adSpend_update_metrics_cntrl,
  cK_mkt_adSpend_update_netSalesForPeriod_cntrl,
  cK_mkt_adSpend_update_source_cntrl,
  cK_mkt_adSpend_update_files_cntrl,
  cK_mkt_adSpend_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_mkt_adSpend_create_vld), cK_mkt_adSpend_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_mkt_adSpend_getAll_vld), cK_mkt_adSpend_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_getOne_vld), cK_mkt_adSpend_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_delete_vld), cK_mkt_adSpend_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_updateAll_vld), cK_mkt_adSpend_updateAll_cntrl);

// ! Fields Routes

router.put("/update/salesChannel/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_salesChannel_vld), cK_mkt_adSpend_update_salesChannel_cntrl);
router.put("/update/kind/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_kind_vld), cK_mkt_adSpend_update_kind_cntrl);
router.put("/update/period/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_period_vld), cK_mkt_adSpend_update_period_cntrl);
router.put("/update/amount/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_amount_vld), cK_mkt_adSpend_update_amount_cntrl);
router.put("/update/basis/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_basis_vld), cK_mkt_adSpend_update_basis_cntrl);
router.put("/update/isContractual/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_isContractual_vld), cK_mkt_adSpend_update_isContractual_cntrl);
router.put("/update/contract/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_contract_vld), cK_mkt_adSpend_update_contract_cntrl);
router.put("/update/metrics/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_metrics_vld), cK_mkt_adSpend_update_metrics_cntrl);
router.put("/update/netSalesForPeriod/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_netSalesForPeriod_vld), cK_mkt_adSpend_update_netSalesForPeriod_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_source_vld), cK_mkt_adSpend_update_source_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_files_vld), cK_mkt_adSpend_update_files_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_notes_vld), cK_mkt_adSpend_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;