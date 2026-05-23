import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_salesChannelMetrics_create_vld,
  cK_gen_salesChannelMetrics_getAll_vld,
  cK_gen_salesChannelMetrics_getOne_vld,
  cK_gen_salesChannelMetrics_delete_vld,
  cK_gen_salesChannelMetrics_updateAll_vld,
  // Fields
  cK_gen_salesChannelMetrics_update_salesChannel_vld,
  cK_gen_salesChannelMetrics_update_granularity_vld,
  cK_gen_salesChannelMetrics_update_period_vld,
  cK_gen_salesChannelMetrics_update_source_vld,
  cK_gen_salesChannelMetrics_update_fileRef_vld,
  cK_gen_salesChannelMetrics_update_segments_vld,
  cK_gen_salesChannelMetrics_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_salesChannelMetrics_create_cntrl,
  cK_gen_salesChannelMetrics_getAll_cntrl,
  cK_gen_salesChannelMetrics_getOne_cntrl,
  cK_gen_salesChannelMetrics_delete_cntrl,
  cK_gen_salesChannelMetrics_updateAll_cntrl,
  // Fields
  cK_gen_salesChannelMetrics_update_salesChannel_cntrl,
  cK_gen_salesChannelMetrics_update_granularity_cntrl,
  cK_gen_salesChannelMetrics_update_period_cntrl,
  cK_gen_salesChannelMetrics_update_source_cntrl,
  cK_gen_salesChannelMetrics_update_fileRef_cntrl,
  cK_gen_salesChannelMetrics_update_segments_cntrl,
  cK_gen_salesChannelMetrics_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_create_vld),
  cK_gen_salesChannelMetrics_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_getAll_vld),
  cK_gen_salesChannelMetrics_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_getOne_vld),
  cK_gen_salesChannelMetrics_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_delete_vld),
  cK_gen_salesChannelMetrics_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_updateAll_vld),
  cK_gen_salesChannelMetrics_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/salesChannel/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_salesChannel_vld),
  cK_gen_salesChannelMetrics_update_salesChannel_cntrl,
);

router.put(
  "/update/granularity/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_granularity_vld),
  cK_gen_salesChannelMetrics_update_granularity_cntrl,
);

router.put(
  "/update/period/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_period_vld),
  cK_gen_salesChannelMetrics_update_period_cntrl,
);

router.put(
  "/update/source/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_source_vld),
  cK_gen_salesChannelMetrics_update_source_cntrl,
);

router.put(
  "/update/fileRef/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_fileRef_vld),
  cK_gen_salesChannelMetrics_update_fileRef_cntrl,
);

router.put(
  "/update/segments/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_segments_vld),
  cK_gen_salesChannelMetrics_update_segments_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_notes_vld),
  cK_gen_salesChannelMetrics_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
