import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_brnd_competitor_create_vld,
  cK_brnd_competitor_getAll_vld,
  cK_brnd_competitor_getOne_vld,
  cK_brnd_competitor_delete_vld,
  cK_brnd_competitor_updateAll_vld,
  // Fields
  cK_brnd_competitor_update_name_vld,
  cK_brnd_competitor_update_description_vld,
  cK_brnd_competitor_update_menus_vld,
  cK_brnd_competitor_update_priceRange_vld,
  cK_brnd_competitor_update_cuisineTags_vld,
  cK_brnd_competitor_update_files_vld,
  cK_brnd_competitor_update_contact_vld,
  cK_brnd_competitor_update_socialMedia_vld,
  cK_brnd_competitor_update_globalObservations_vld,
  cK_brnd_competitor_update_branches_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_brnd_competitor_create_cntrl,
  cK_brnd_competitor_getAll_cntrl,
  cK_brnd_competitor_getOne_cntrl,
  cK_brnd_competitor_delete_cntrl,
  cK_brnd_competitor_updateAll_cntrl,
  // Fields
  cK_brnd_competitor_update_name_cntrl,
  cK_brnd_competitor_update_description_cntrl,
  cK_brnd_competitor_update_menus_cntrl,
  cK_brnd_competitor_update_priceRange_cntrl,
  cK_brnd_competitor_update_cuisineTags_cntrl,
  cK_brnd_competitor_update_files_cntrl,
  cK_brnd_competitor_update_contact_cntrl,
  cK_brnd_competitor_update_socialMedia_cntrl,
  cK_brnd_competitor_update_globalObservations_cntrl,
  cK_brnd_competitor_update_branches_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_brnd_competitor_create_vld), cK_brnd_competitor_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_brnd_competitor_getAll_vld), cK_brnd_competitor_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_brnd_competitor_getOne_vld), cK_brnd_competitor_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_brnd_competitor_delete_vld), cK_brnd_competitor_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_brnd_competitor_updateAll_vld), cK_brnd_competitor_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_name_vld), cK_brnd_competitor_update_name_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_description_vld), cK_brnd_competitor_update_description_cntrl);
router.put("/update/menus/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_menus_vld), cK_brnd_competitor_update_menus_cntrl);
router.put("/update/priceRange/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_priceRange_vld), cK_brnd_competitor_update_priceRange_cntrl);
router.put("/update/cuisineTags/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_cuisineTags_vld), cK_brnd_competitor_update_cuisineTags_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_files_vld), cK_brnd_competitor_update_files_cntrl);
router.put("/update/contact/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_contact_vld), cK_brnd_competitor_update_contact_cntrl);
router.put("/update/socialMedia/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_socialMedia_vld), cK_brnd_competitor_update_socialMedia_cntrl);
router.put("/update/globalObservations/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_globalObservations_vld), cK_brnd_competitor_update_globalObservations_cntrl);
router.put("/update/branches/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_branches_vld), cK_brnd_competitor_update_branches_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
