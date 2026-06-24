import express from "express";
import {
  vld_sntzr_mddlwre,
  upload_logo_optional_mddlwre,
} from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_salesPlatform_create_vld,
  cK_gen_salesPlatform_getAll_vld,
  cK_gen_salesPlatform_getOne_vld,
  cK_gen_salesPlatform_delete_vld,
  cK_gen_salesPlatform_updateAll_vld,
  // Fields
  cK_gen_salesPlatform_update_name_vld,
  cK_gen_salesPlatform_update_notes_vld,
  cK_gen_salesPlatform_update_links_vld,
  cK_gen_salesPlatform_update_kam_vld,
  cK_gen_salesPlatform_update_loginCredentials_vld,
  cK_gen_salesPlatform_update_support_vld,
  cK_gen_salesPlatform_get_fileReadUrl_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_salesPlatform_create_cntrl,
  cK_gen_salesPlatform_getAll_cntrl,
  cK_gen_salesPlatform_getOne_cntrl,
  cK_gen_salesPlatform_delete_cntrl,
  cK_gen_salesPlatform_updateAll_cntrl,
  // Fields
  cK_gen_salesPlatform_update_name_cntrl,
  cK_gen_salesPlatform_update_notes_cntrl,
  cK_gen_salesPlatform_update_links_cntrl,
  cK_gen_salesPlatform_update_kam_cntrl,
  cK_gen_salesPlatform_update_loginCredentials_cntrl,
  cK_gen_salesPlatform_update_support_cntrl,
  cK_gen_salesPlatform_get_fileReadUrl_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_create_vld),
  cK_gen_salesPlatform_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_getAll_vld),
  cK_gen_salesPlatform_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_getOne_vld),
  cK_gen_salesPlatform_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_delete_vld),
  cK_gen_salesPlatform_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_updateAll_vld),
  cK_gen_salesPlatform_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_update_name_vld),
  cK_gen_salesPlatform_update_name_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_update_notes_vld),
  cK_gen_salesPlatform_update_notes_cntrl,
);

router.put(
  "/update/links/:id",
  upload_logo_optional_mddlwre,
  vld_sntzr_mddlwre(cK_gen_salesPlatform_update_links_vld),
  cK_gen_salesPlatform_update_links_cntrl,
);

router.put(
  "/update/kam/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_update_kam_vld),
  cK_gen_salesPlatform_update_kam_cntrl,
);

router.put(
  "/update/loginCredentials/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_update_loginCredentials_vld),
  cK_gen_salesPlatform_update_loginCredentials_cntrl,
);

router.put(
  "/update/support/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_update_support_vld),
  cK_gen_salesPlatform_update_support_cntrl,
);

router.get(
  "/getFileReadUrl/:id",
  vld_sntzr_mddlwre(cK_gen_salesPlatform_get_fileReadUrl_vld),
  cK_gen_salesPlatform_get_fileReadUrl_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
