import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_cuisineTag_create_vld,
  cK_gen_cuisineTag_getAll_vld,
  cK_gen_cuisineTag_getOne_vld,
  cK_gen_cuisineTag_delete_vld,
  cK_gen_cuisineTag_updateAll_vld,
  // Fields
  cK_gen_cuisineTag_update_value_vld,
  cK_gen_cuisineTag_update_label_vld,
  cK_gen_cuisineTag_update_description_vld,
  cK_gen_cuisineTag_update_platforms_vld,
  cK_gen_cuisineTag_update_kind_vld,
  cK_gen_cuisineTag_update_source_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_cuisineTag_create_cntrl,
  cK_gen_cuisineTag_getAll_cntrl,
  cK_gen_cuisineTag_getOne_cntrl,
  cK_gen_cuisineTag_delete_cntrl,
  cK_gen_cuisineTag_updateAll_cntrl,
  // Fields
  cK_gen_cuisineTag_update_value_cntrl,
  cK_gen_cuisineTag_update_label_cntrl,
  cK_gen_cuisineTag_update_description_cntrl,
  cK_gen_cuisineTag_update_platforms_cntrl,
  cK_gen_cuisineTag_update_kind_cntrl,
  cK_gen_cuisineTag_update_source_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_create_vld),
  cK_gen_cuisineTag_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_getAll_vld),
  cK_gen_cuisineTag_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_getOne_vld),
  cK_gen_cuisineTag_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_delete_vld),
  cK_gen_cuisineTag_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_updateAll_vld),
  cK_gen_cuisineTag_updateAll_cntrl,
);

// ! Fields Routes

router.put(
  "/update/value/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_update_value_vld),
  cK_gen_cuisineTag_update_value_cntrl,
);
router.put(
  "/update/label/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_update_label_vld),
  cK_gen_cuisineTag_update_label_cntrl,
);
router.put(
  "/update/description/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_update_description_vld),
  cK_gen_cuisineTag_update_description_cntrl,
);
router.put(
  "/update/platforms/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_update_platforms_vld),
  cK_gen_cuisineTag_update_platforms_cntrl,
);
router.put(
  "/update/kind/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_update_kind_vld),
  cK_gen_cuisineTag_update_kind_cntrl,
);
router.put(
  "/update/source/:id",
  vld_sntzr_mddlwre(cK_gen_cuisineTag_update_source_vld),
  cK_gen_cuisineTag_update_source_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
