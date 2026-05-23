import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_mkt_campaign_create_vld,
  cK_mkt_campaign_getAll_vld,
  cK_mkt_campaign_getOne_vld,
  cK_mkt_campaign_delete_vld,
  cK_mkt_campaign_updateAll_vld,
  // Fields
  cK_mkt_campaign_update_name_vld,
  cK_mkt_campaign_update_description_vld,
  cK_mkt_campaign_update_kind_vld,
  cK_mkt_campaign_update_source_vld,
  cK_mkt_campaign_update_platformPromoId_vld,
  cK_mkt_campaign_update_status_vld,
  cK_mkt_campaign_update_lifecycle_vld,
  cK_mkt_campaign_update_validity_vld,
  cK_mkt_campaign_update_valueType_vld,
  cK_mkt_campaign_update_value_vld,
  cK_mkt_campaign_update_cap_vld,
  cK_mkt_campaign_update_currency_vld,
  cK_mkt_campaign_update_funding_vld,
  cK_mkt_campaign_update_conditions_vld,
  cK_mkt_campaign_update_salesChannels_vld,
  cK_mkt_campaign_update_files_vld,
  cK_mkt_campaign_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_mkt_campaign_create_cntrl,
  cK_mkt_campaign_getAll_cntrl,
  cK_mkt_campaign_getOne_cntrl,
  cK_mkt_campaign_delete_cntrl,
  cK_mkt_campaign_updateAll_cntrl,
  // Fields
  cK_mkt_campaign_update_name_cntrl,
  cK_mkt_campaign_update_description_cntrl,
  cK_mkt_campaign_update_kind_cntrl,
  cK_mkt_campaign_update_source_cntrl,
  cK_mkt_campaign_update_platformPromoId_cntrl,
  cK_mkt_campaign_update_status_cntrl,
  cK_mkt_campaign_update_lifecycle_cntrl,
  cK_mkt_campaign_update_validity_cntrl,
  cK_mkt_campaign_update_valueType_cntrl,
  cK_mkt_campaign_update_value_cntrl,
  cK_mkt_campaign_update_cap_cntrl,
  cK_mkt_campaign_update_currency_cntrl,
  cK_mkt_campaign_update_funding_cntrl,
  cK_mkt_campaign_update_conditions_cntrl,
  cK_mkt_campaign_update_salesChannels_cntrl,
  cK_mkt_campaign_update_files_cntrl,
  cK_mkt_campaign_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_mkt_campaign_create_vld), cK_mkt_campaign_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_mkt_campaign_getAll_vld), cK_mkt_campaign_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_mkt_campaign_getOne_vld), cK_mkt_campaign_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_mkt_campaign_delete_vld), cK_mkt_campaign_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_mkt_campaign_updateAll_vld), cK_mkt_campaign_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_name_vld), cK_mkt_campaign_update_name_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_description_vld), cK_mkt_campaign_update_description_cntrl);
router.put("/update/kind/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_kind_vld), cK_mkt_campaign_update_kind_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_source_vld), cK_mkt_campaign_update_source_cntrl);
router.put("/update/platformPromoId/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_platformPromoId_vld), cK_mkt_campaign_update_platformPromoId_cntrl);
router.put("/update/status/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_status_vld), cK_mkt_campaign_update_status_cntrl);
router.put("/update/lifecycle/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_lifecycle_vld), cK_mkt_campaign_update_lifecycle_cntrl);
router.put("/update/validity/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_validity_vld), cK_mkt_campaign_update_validity_cntrl);
router.put("/update/valueType/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_valueType_vld), cK_mkt_campaign_update_valueType_cntrl);
router.put("/update/value/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_value_vld), cK_mkt_campaign_update_value_cntrl);
router.put("/update/cap/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_cap_vld), cK_mkt_campaign_update_cap_cntrl);
router.put("/update/currency/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_currency_vld), cK_mkt_campaign_update_currency_cntrl);
router.put("/update/funding/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_funding_vld), cK_mkt_campaign_update_funding_cntrl);
router.put("/update/conditions/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_conditions_vld), cK_mkt_campaign_update_conditions_cntrl);
router.put("/update/salesChannels/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_salesChannels_vld), cK_mkt_campaign_update_salesChannels_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_files_vld), cK_mkt_campaign_update_files_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_notes_vld), cK_mkt_campaign_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;