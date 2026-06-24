import express from "express";
import {
  vld_sntzr_mddlwre,
  upload_multi_mddlwre,
} from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_brnd_brand_create_vld,
  cK_brnd_brand_getAll_vld,
  cK_brnd_brand_getOne_vld,
  cK_brnd_brand_delete_vld,
  cK_brnd_brand_updateAll_vld,
  // Fields
  cK_brnd_brand_update_name_vld,
  cK_brnd_brand_update_tagline_vld,
  cK_brnd_brand_update_files_vld,
  cK_brnd_brand_get_fileReadUrl_vld,
  cK_brnd_brand_update_socials_vld,
  cK_brnd_brand_update_registeredIn_vld,
  cK_brnd_brand_update_description_vld,
  cK_brnd_brand_update_priceRange_vld,
  cK_brnd_brand_update_cuisineTags_vld,
  cK_brnd_brand_update_website_vld,
  cK_brnd_brand_update_contracts_vld,
  cK_brnd_brand_update_integrations_vld,
  cK_brnd_brand_update_siblings_vld,
  cK_brnd_brand_update_employees_vld,
  cK_brnd_brand_update_equipments_vld,
  cK_brnd_brand_update_branches_vld,
  cK_brnd_brand_update_menus_vld,
  cK_brnd_brand_update_competitors_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_brnd_brand_create_cntrl,
  cK_brnd_brand_getAll_cntrl,
  cK_brnd_brand_getOne_cntrl,
  cK_brnd_brand_delete_cntrl,
  cK_brnd_brand_updateAll_cntrl,
  // Fields
  cK_brnd_brand_update_name_cntrl,
  cK_brnd_brand_update_tagline_cntrl,
  cK_brnd_brand_update_files_cntrl,
  cK_brnd_brand_get_fileReadUrl_cntrl,
  cK_brnd_brand_update_socials_cntrl,
  cK_brnd_brand_update_registeredIn_cntrl,
  cK_brnd_brand_update_description_cntrl,
  cK_brnd_brand_update_priceRange_cntrl,
  cK_brnd_brand_update_cuisineTags_cntrl,
  cK_brnd_brand_update_website_cntrl,
  cK_brnd_brand_update_contracts_cntrl,
  cK_brnd_brand_update_integrations_cntrl,
  cK_brnd_brand_update_siblings_cntrl,
  cK_brnd_brand_update_employees_cntrl,
  cK_brnd_brand_update_equipments_cntrl,
  cK_brnd_brand_update_branches_cntrl,
  cK_brnd_brand_update_menus_cntrl,
  cK_brnd_brand_update_competitors_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_brnd_brand_create_vld),
  cK_brnd_brand_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_brnd_brand_getAll_vld),
  cK_brnd_brand_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_getOne_vld),
  cK_brnd_brand_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_delete_vld),
  cK_brnd_brand_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_updateAll_vld),
  cK_brnd_brand_updateAll_cntrl,
);

// ! Fields Routes

router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_name_vld),
  cK_brnd_brand_update_name_cntrl,
);
router.put(
  "/update/tagline/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_tagline_vld),
  cK_brnd_brand_update_tagline_cntrl,
);
router.put(
  "/update/files/:id",
  upload_multi_mddlwre,
  vld_sntzr_mddlwre(cK_brnd_brand_update_files_vld),
  cK_brnd_brand_update_files_cntrl,
);
router.get(
  "/getFileReadUrl/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_get_fileReadUrl_vld),
  cK_brnd_brand_get_fileReadUrl_cntrl,
);
router.put(
  "/update/socials/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_socials_vld),
  cK_brnd_brand_update_socials_cntrl,
);
router.put(
  "/update/registeredIn/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_registeredIn_vld),
  cK_brnd_brand_update_registeredIn_cntrl,
);
router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_description_vld),
  cK_brnd_brand_update_description_cntrl,
);
router.put(
  "/update/priceRange/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_priceRange_vld),
  cK_brnd_brand_update_priceRange_cntrl,
);
router.put(
  "/update/cuisineTags/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_cuisineTags_vld),
  cK_brnd_brand_update_cuisineTags_cntrl,
);
router.put(
  "/update/website/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_website_vld),
  cK_brnd_brand_update_website_cntrl,
);
router.put(
  "/update/contracts/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_contracts_vld),
  cK_brnd_brand_update_contracts_cntrl,
);
router.put(
  "/update/integrations/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_integrations_vld),
  cK_brnd_brand_update_integrations_cntrl,
);
router.put(
  "/update/siblings/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_siblings_vld),
  cK_brnd_brand_update_siblings_cntrl,
);
router.put(
  "/update/employees/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_employees_vld),
  cK_brnd_brand_update_employees_cntrl,
);
router.put(
  "/update/equipments/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_equipments_vld),
  cK_brnd_brand_update_equipments_cntrl,
);
router.put(
  "/update/branches/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_branches_vld),
  cK_brnd_brand_update_branches_cntrl,
);
router.put(
  "/update/menus/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_menus_vld),
  cK_brnd_brand_update_menus_cntrl,
);
router.put(
  "/update/competitors/:id",
  vld_sntzr_mddlwre(cK_brnd_brand_update_competitors_vld),
  cK_brnd_brand_update_competitors_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
