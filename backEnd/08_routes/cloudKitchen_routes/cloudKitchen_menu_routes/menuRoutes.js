import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";
// ! VALIDATORS
import {
  ck_menu_create_vld,
  ck_menu_getAll_vld,
  ck_menu_getOne_vld,
  ck_menu_updateAll_vld,
  ck_menu_update_label_vld,
  ck_menu_update_isActive_vld,
  ck_menu_update_description_vld,
  ck_menu_addCategories_vld,
  ck_menu_removeCategories_vld,
  ck_menu_reorderCategories_vld,
  ck_menu_update_owner_vld,
  ck_menu_getCategoriesPopulated_vld,
  ck_menu_getAllByOwnerType_vld,
  ck_menu_delete_vld,
} from "../../../07_controllers/_controllers.index.js";
// ! CONTROLLERS
import {
  ck_menu_create_cntrl,
  ck_menu_getAll_cntrl,
  ck_menu_getOne_cntrl,
  ck_menu_updateAll_cntrl,
  ck_menu_delete_cntrl,
  ck_menu_update_label_cntrl,
  ck_menu_update_isActive_cntrl,
  ck_menu_update_description_cntrl,
  ck_menu_addCategories_cntrl,
  ck_menu_removeCategories_cntrl,
  ck_menu_reorderCategories_cntrl,
  ck_menu_update_owner_cntrl,
  ck_menu_getCategoriesPopulated_cntrl,
  ck_menu_getAllByOwnerType_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud routes
router.post(
  "/create",
  vld_sntzr_mddlwre(ck_menu_create_vld),
  ck_menu_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(ck_menu_getAll_vld),
  ck_menu_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(ck_menu_getOne_vld),
  ck_menu_getOne_cntrl,
);
router.get(
  "/getCategoriesPopulated/:id",
  vld_sntzr_mddlwre(ck_menu_getCategoriesPopulated_vld),
  ck_menu_getCategoriesPopulated_cntrl,
);
router.get(
  "/getAllByOwnerType/:ownerType",
  vld_sntzr_mddlwre(ck_menu_getAllByOwnerType_vld),
  ck_menu_getAllByOwnerType_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(ck_menu_delete_vld),
  ck_menu_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(ck_menu_updateAll_vld),
  ck_menu_updateAll_cntrl,
);

// ! Fields routes
router.put(
  "/update/label/:id",
  vld_sntzr_mddlwre(ck_menu_update_label_vld),
  ck_menu_update_label_cntrl,
);
router.put(
  "/update/isActive/:id",
  vld_sntzr_mddlwre(ck_menu_update_isActive_vld),
  ck_menu_update_isActive_cntrl,
);
router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(ck_menu_update_description_vld),
  ck_menu_update_description_cntrl,
);
router.put(
  "/update/owner/:id",
  vld_sntzr_mddlwre(ck_menu_update_owner_vld),
  ck_menu_update_owner_cntrl,
);
// ! Relations routes
router.post(
  "/categories/add/:id",
  vld_sntzr_mddlwre(ck_menu_addCategories_vld),
  ck_menu_addCategories_cntrl,
);
router.delete(
  "/categories/remove/:id",
  vld_sntzr_mddlwre(ck_menu_removeCategories_vld),
  ck_menu_removeCategories_cntrl,
);
router.put(
  "/categories/reorder/:id",
  vld_sntzr_mddlwre(ck_menu_reorderCategories_vld),
  ck_menu_reorderCategories_cntrl,
);

export default router;
/*


*/
