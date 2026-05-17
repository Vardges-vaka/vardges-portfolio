import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";
// ! VALIDATORS
import {
  // ! Crud Validators
  cK_Mn_It_Md_Option_create_vld,
  cK_Mn_It_Md_Option_getAll_vld,
  cK_Mn_It_Md_Option_getOne_vld,
  cK_Mn_It_Md_Option_updateAll_vld,
  cK_Mn_It_Md_Option_delete_vld,
  // ! Fields Validvld
  cK_Mn_It_Md_Option_update_ownerType_cntrl,
  cK_Mn_It_Md_Option_update_ownerId_vld,
  cK_Mn_It_Md_Option_update_name_vld,
  cK_Mn_It_Md_Option_update_description_vld,
  cK_Mn_It_Md_Option_update_images_vld,
  cK_Mn_It_Md_Option_update_recipeFile_vld,
  cK_Mn_It_Md_Option_update_techCardFile_vld,
  cK_Mn_It_Md_Option_update_cost_vld,
  cK_Mn_It_Md_Option_update_sellingPrice_vld,
  cK_Mn_It_Md_Option_update_nutrition_vld,
  cK_Mn_It_Md_Option_update_cloudStorage_vld,
} from "../../../07_controllers/_controllers.index.js";
// ! CONTROLLERS
import {
  // ! Crud Controllers
  cK_Mn_It_Md_Option_create_cntrl,
  cK_Mn_It_Md_Option_getAll_cntrl,
  cK_Mn_It_Md_Option_getOne_cntrl,
  cK_Mn_It_Md_Option_updateAll_cntrl,
  cK_Mn_It_Md_Option_delete_cntrl,
  // ! Fields Controllers
  cK_Mn_It_Md_Option_update_ownerType_cntrl,
  cK_Mn_It_Md_Option_update_ownerId_cntrl,
  cK_Mn_It_Md_Option_update_name_cntrl,
  cK_Mn_It_Md_Option_update_description_cntrl,
  cK_Mn_It_Md_Option_update_images_cntrl,
  cK_Mn_It_Md_Option_update_recipeFile_cntrl,
  cK_Mn_It_Md_Option_update_techCardFile_cntrl,
  cK_Mn_It_Md_Option_update_cost_cntrl,
  cK_Mn_It_Md_Option_update_sellingPrice_cntrl,
  cK_Mn_It_Md_Option_update_nutrition_cntrl,
  cK_Mn_It_Md_Option_update_cloudStorage_cntrl,
  cK_Mn_It_Md_Option_update_ownerType_vld,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud routes
router.post(
  "/create",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_create_vld),
  cK_Mn_It_Md_Option_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_getAll_vld),
  cK_Mn_It_Md_Option_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_getOne_vld),
  cK_Mn_It_Md_Option_getOne_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_updateAll_vld),
  cK_Mn_It_Md_Option_updateAll_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_delete_vld),
  cK_Mn_It_Md_Option_delete_cntrl,
);

// ! Fields Routes
router.put(
  "/update/ownerType/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_ownerType_vld),
  cK_Mn_It_Md_Option_update_ownerType_cntrl,
);
router.put(
  "/update/ownerId/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_ownerId_vld),
  cK_Mn_It_Md_Option_update_ownerId_cntrl,
);
router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_name_vld),
  cK_Mn_It_Md_Option_update_name_cntrl,
);
router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_description_vld),
  cK_Mn_It_Md_Option_update_description_cntrl,
);
router.put(
  "/update/images/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_images_vld),
  cK_Mn_It_Md_Option_update_images_cntrl,
);
router.put(
  "/update/recipeFile/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_recipeFile_vld),
  cK_Mn_It_Md_Option_update_recipeFile_cntrl,
);
router.put(
  "/update/techCardFile/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_techCardFile_vld),
  cK_Mn_It_Md_Option_update_techCardFile_cntrl,
);
router.put(
  "/update/cost/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_cost_vld),
  cK_Mn_It_Md_Option_update_cost_cntrl,
);
router.put(
  "/update/sellingPrice/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_sellingPrice_vld),
  cK_Mn_It_Md_Option_update_sellingPrice_cntrl,
);
router.put(
  "/update/nutrition/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_nutrition_vld),
  cK_Mn_It_Md_Option_update_nutrition_cntrl,
);
router.put(
  "/update/cloudStorage/:id",
  vld_sntzr_mddlwre(cK_Mn_It_Md_Option_update_cloudStorage_vld),
  cK_Mn_It_Md_Option_update_cloudStorage_cntrl,
);

export default router;
