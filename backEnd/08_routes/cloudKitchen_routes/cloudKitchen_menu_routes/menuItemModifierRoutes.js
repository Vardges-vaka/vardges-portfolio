import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";
// ! VALIDATORS
import {
  // ! Crud Validators
  cK_Mn_it_Modifier_create_vld,
  cK_Mn_it_Modifier_getAll_vld,
  cK_Mn_it_Modifier_getOne_vld,
  cK_Mn_it_Modifier_updateAll_vld,
  cK_Mn_it_Modifier_delete_vld,
  // ! Fields Validators
  cK_Mn_it_Modifier_update_ownerType_vld,
  cK_Mn_it_Modifier_update_ownerId_vld,
  cK_Mn_it_Modifier_update_title_vld,
  cK_Mn_it_Modifier_update_description_vld,
  cK_Mn_it_Modifier_update_isOptional_vld,
  cK_Mn_it_Modifier_update_selectionMode_vld,
  cK_Mn_it_Modifier_update_isFree_vld,
  cK_Mn_it_Modifier_update_isActive_vld,
  cK_Mn_it_Modifier_update_activeTimings_vld,
  // ! Relations Validators
  cK_Mn_it_Modifier_addOptions_vld,
  cK_Mn_it_Modifier_removeOptions_vld,
  cK_Mn_it_Modifier_reorderOptions_vld,
} from "../../../07_controllers/_controllers.index.js";
// ! CONTROLLERS
import {
  // ! Crud Controllers
  cK_Mn_it_Modifier_create_cntrl,
  cK_Mn_it_Modifier_getAll_cntrl,
  cK_Mn_it_Modifier_getOne_cntrl,
  cK_Mn_it_Modifier_updateAll_cntrl,
  cK_Mn_it_Modifier_delete_cntrl,
  // ! Fields Controllers
  cK_Mn_it_Modifier_update_ownerType_cntrl,
  cK_Mn_it_Modifier_update_ownerId_cntrl,
  cK_Mn_it_Modifier_update_title_cntrl,
  cK_Mn_it_Modifier_update_description_cntrl,
  cK_Mn_it_Modifier_update_isOptional_cntrl,
  cK_Mn_it_Modifier_update_selectionMode_cntrl,
  cK_Mn_it_Modifier_update_isFree_cntrl,
  cK_Mn_it_Modifier_update_isActive_cntrl,
  cK_Mn_it_Modifier_update_activeTimings_cntrl,
  // ! Relations COntrollers
  cK_Mn_it_Modifier_addOptions_cntrl,
  cK_Mn_it_Modifier_removeOptions_cntrl,
  cK_Mn_it_Modifier_reorderOptions_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// Crud Routes
router.post(
  "/create",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_create_vld),
  cK_Mn_it_Modifier_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_getAll_vld),
  cK_Mn_it_Modifier_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_getOne_vld),
  cK_Mn_it_Modifier_getOne_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_updateAll_vld),
  cK_Mn_it_Modifier_updateAll_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_delete_vld),
  cK_Mn_it_Modifier_delete_cntrl,
);

// ! Fields Routes
router.put(
  "/update/ownerType/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_ownerType_vld),
  cK_Mn_it_Modifier_update_ownerType_cntrl,
);
router.put(
  "/update/ownerId/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_ownerId_vld),
  cK_Mn_it_Modifier_update_ownerId_cntrl,
);
router.put(
  "/update/title/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_title_vld),
  cK_Mn_it_Modifier_update_title_cntrl,
);
router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_description_vld),
  cK_Mn_it_Modifier_update_description_cntrl,
);
router.put(
  "/update/isOptional/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_isOptional_vld),
  cK_Mn_it_Modifier_update_isOptional_cntrl,
);
router.put(
  "/update/selectionMode/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_selectionMode_vld),
  cK_Mn_it_Modifier_update_selectionMode_cntrl,
);
router.put(
  "/update/isFree/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_isFree_vld),
  cK_Mn_it_Modifier_update_isFree_cntrl,
);
router.put(
  "/update/isActive/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_isActive_vld),
  cK_Mn_it_Modifier_update_isActive_cntrl,
);
router.put(
  "/update/activeTimings/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_update_activeTimings_vld),
  cK_Mn_it_Modifier_update_activeTimings_cntrl,
);
// ! Relations routes
router.post(
  "/options/add/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_addOptions_vld),
  cK_Mn_it_Modifier_addOptions_cntrl,
);
router.delete(
  "/options/remove/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_removeOptions_vld),
  cK_Mn_it_Modifier_removeOptions_cntrl,
);
router.put(
  "/options/reorder/:id",
  vld_sntzr_mddlwre(cK_Mn_it_Modifier_reorderOptions_vld),
  cK_Mn_it_Modifier_reorderOptions_cntrl,
);

export default router;
