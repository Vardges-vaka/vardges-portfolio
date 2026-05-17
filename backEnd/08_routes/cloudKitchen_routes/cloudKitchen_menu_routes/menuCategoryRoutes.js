import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";
// ! VALIDATORS
import {
  // Crud Validators
  ck_Mn_Category_create_vld,
  ck_Mn_Category_getAll_vld,
  ck_Mn_Category_getOne_vld,
  ck_Mn_Category_updateAll_vld,
  ck_Mn_Category_getMenuItemsPopulated_vld,
  ck_Mn_Category_getAllByOwnerType_vld,
  ck_Mn_Category_delete_vld,
  // ! Fields Validators
  ck_Mn_Category_update_name_vld,
  ck_Mn_Category_update_description_vld,
  ck_Mn_Category_update_menu_vld,
  ck_Mn_Category_update_ownerType_vld,
  ck_Mn_Category_update_ownerId_vld,
  ck_Mn_Category_update_isActive_vld,
  ck_Mn_Category_update_activeTimings_vld,
  ck_Mn_Category_update_displayOrder_vld,
  // ! Relations Validators
  ck_Mn_Category_addMenuItems_vld,
  ck_Mn_Category_removeMenuItems_vld,
  ck_Mn_Category_reorderMenuItems_vld,
} from "../../../07_controllers/_controllers.index.js";
// ! CONTROLLERS
import {
  // ! Crud Controllers
  ck_Mn_Category_create_cntrl,
  ck_Mn_Category_getAll_cntrl,
  ck_Mn_Category_getOne_cntrl,
  ck_Mn_Category_updateAll_cntrl,
  ck_Mn_Category_getMenuItemsPopulated_cntrl,
  ck_Mn_Category_getAllByOwnerType_cntrl,
  ck_Mn_Category_delete_cntrl,
  // ! Fields Controllers
  ck_Mn_Category_update_name_cntrl,
  ck_Mn_Category_update_description_cntrl,
  ck_Mn_Category_update_menu_cntrl,
  ck_Mn_Category_update_ownerType_cntrl,
  ck_Mn_Category_update_ownerId_cntrl,
  ck_Mn_Category_update_isActive_cntrl,
  ck_Mn_Category_update_activeTimings_cntrl,
  ck_Mn_Category_update_displayOrder_cntrl,
  // ! Relations Controllers
  ck_Mn_Category_addMenuItems_cntrl,
  ck_Mn_Category_removeMenuItems_cntrl,
  ck_Mn_Category_reorderMenuItems_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud routes
router.post(
  "/create",
  vld_sntzr_mddlwre(ck_Mn_Category_create_vld),
  ck_Mn_Category_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(ck_Mn_Category_getAll_vld),
  ck_Mn_Category_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_getOne_vld),
  ck_Mn_Category_getOne_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_updateAll_vld),
  ck_Mn_Category_updateAll_cntrl,
);
router.get(
  "/getMenuItemsPopulated/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_getMenuItemsPopulated_vld),
  ck_Mn_Category_getMenuItemsPopulated_cntrl,
);
router.get(
  "/getAllByOwnerType/:ownerType",
  vld_sntzr_mddlwre(ck_Mn_Category_getAllByOwnerType_vld),
  ck_Mn_Category_getAllByOwnerType_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_delete_vld),
  ck_Mn_Category_delete_cntrl,
);

// ! Fields Routes
router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_name_vld),
  ck_Mn_Category_update_name_cntrl,
);
router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_description_vld),
  ck_Mn_Category_update_description_cntrl,
);
router.put(
  "/update/menu/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_menu_vld),
  ck_Mn_Category_update_menu_cntrl,
);
router.put(
  "/update/ownerType/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_ownerType_vld),
  ck_Mn_Category_update_ownerType_cntrl,
);
router.put(
  "/update/ownerId/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_ownerId_vld),
  ck_Mn_Category_update_ownerId_cntrl,
);
router.put(
  "/update/isActive/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_isActive_vld),
  ck_Mn_Category_update_isActive_cntrl,
);
router.put(
  "/update/activeTimings/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_activeTimings_vld),
  ck_Mn_Category_update_activeTimings_cntrl,
);
router.put(
  "/update/displayOrder/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_update_displayOrder_vld),
  ck_Mn_Category_update_displayOrder_cntrl,
);

// ! Relations Routes
router.post(
  "/menuItems/add/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_addMenuItems_vld),
  ck_Mn_Category_addMenuItems_cntrl,
);
router.delete(
  "/menuItems/remove/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_removeMenuItems_vld),
  ck_Mn_Category_removeMenuItems_cntrl,
);
router.put(
  "/menuItems/reorder/:id",
  vld_sntzr_mddlwre(ck_Mn_Category_reorderMenuItems_vld),
  ck_Mn_Category_reorderMenuItems_cntrl,
);

export default router;
