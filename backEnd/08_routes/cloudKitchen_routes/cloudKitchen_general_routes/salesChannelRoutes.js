import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_salesChannel_create_vld,
  cK_gen_salesChannel_getAll_vld,
  cK_gen_salesChannel_getOne_vld,
  cK_gen_salesChannel_delete_vld,
  cK_gen_salesChannel_updateAll_vld,
  // Fields
  cK_gen_salesChannel_update_branch_vld,
  cK_gen_salesChannel_update_brand_vld,
  cK_gen_salesChannel_update_platform_vld,
  cK_gen_salesChannel_update_storeUrl_vld,
  cK_gen_salesChannel_update_storeIds_vld,
  cK_gen_salesChannel_update_status_vld,
  cK_gen_salesChannel_update_commissionPct_vld,
  cK_gen_salesChannel_update_ratings_vld,
  cK_gen_salesChannel_update_excludedMenuItems_vld,
  cK_gen_salesChannel_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_salesChannel_create_cntrl,
  cK_gen_salesChannel_getAll_cntrl,
  cK_gen_salesChannel_getOne_cntrl,
  cK_gen_salesChannel_delete_cntrl,
  cK_gen_salesChannel_updateAll_cntrl,
  // Fields
  cK_gen_salesChannel_update_branch_cntrl,
  cK_gen_salesChannel_update_brand_cntrl,
  cK_gen_salesChannel_update_platform_cntrl,
  cK_gen_salesChannel_update_storeUrl_cntrl,
  cK_gen_salesChannel_update_storeIds_cntrl,
  cK_gen_salesChannel_update_status_cntrl,
  cK_gen_salesChannel_update_commissionPct_cntrl,
  cK_gen_salesChannel_update_ratings_cntrl,
  cK_gen_salesChannel_update_excludedMenuItems_cntrl,
  cK_gen_salesChannel_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_salesChannel_create_vld),
  cK_gen_salesChannel_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_salesChannel_getAll_vld),
  cK_gen_salesChannel_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_getOne_vld),
  cK_gen_salesChannel_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_delete_vld),
  cK_gen_salesChannel_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_updateAll_vld),
  cK_gen_salesChannel_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/branch/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_branch_vld),
  cK_gen_salesChannel_update_branch_cntrl,
);

router.put(
  "/update/brand/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_brand_vld),
  cK_gen_salesChannel_update_brand_cntrl,
);

router.put(
  "/update/platform/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_platform_vld),
  cK_gen_salesChannel_update_platform_cntrl,
);

router.put(
  "/update/storeUrl/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_storeUrl_vld),
  cK_gen_salesChannel_update_storeUrl_cntrl,
);

router.put(
  "/update/storeIds/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_storeIds_vld),
  cK_gen_salesChannel_update_storeIds_cntrl,
);

router.put(
  "/update/status/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_status_vld),
  cK_gen_salesChannel_update_status_cntrl,
);

router.put(
  "/update/commissionPct/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_commissionPct_vld),
  cK_gen_salesChannel_update_commissionPct_cntrl,
);

router.put(
  "/update/ratings/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_ratings_vld),
  cK_gen_salesChannel_update_ratings_cntrl,
);

router.put(
  "/update/excludedMenuItems/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_excludedMenuItems_vld),
  cK_gen_salesChannel_update_excludedMenuItems_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannel_update_notes_vld),
  cK_gen_salesChannel_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
