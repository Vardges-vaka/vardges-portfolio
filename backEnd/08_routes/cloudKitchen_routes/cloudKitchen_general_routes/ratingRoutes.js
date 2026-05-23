import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_rating_create_vld,
  cK_gen_rating_getAll_vld,
  cK_gen_rating_getOne_vld,
  cK_gen_rating_delete_vld,
  cK_gen_rating_updateAll_vld,
  // Fields
  cK_gen_rating_update_salesChannel_vld,
  cK_gen_rating_update_order_vld,
  cK_gen_rating_update_platformOrderId_vld,
  cK_gen_rating_update_customer_vld,
  cK_gen_rating_update_stars_vld,
  cK_gen_rating_update_comment_vld,
  cK_gen_rating_update_receivedAt_vld,
  cK_gen_rating_update_customerNameSnapshot_vld,
  cK_gen_rating_update_customerLoyaltyTier_vld,
  cK_gen_rating_update_sentimentTag_vld,
  cK_gen_rating_update_itemFeedback_vld,
  cK_gen_rating_update_attachments_vld,
  cK_gen_rating_update_reply_vld,
  cK_gen_rating_update_source_vld,
  cK_gen_rating_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_rating_create_cntrl,
  cK_gen_rating_getAll_cntrl,
  cK_gen_rating_getOne_cntrl,
  cK_gen_rating_delete_cntrl,
  cK_gen_rating_updateAll_cntrl,
  // Fields
  cK_gen_rating_update_salesChannel_cntrl,
  cK_gen_rating_update_order_cntrl,
  cK_gen_rating_update_platformOrderId_cntrl,
  cK_gen_rating_update_customer_cntrl,
  cK_gen_rating_update_stars_cntrl,
  cK_gen_rating_update_comment_cntrl,
  cK_gen_rating_update_receivedAt_cntrl,
  cK_gen_rating_update_customerNameSnapshot_cntrl,
  cK_gen_rating_update_customerLoyaltyTier_cntrl,
  cK_gen_rating_update_sentimentTag_cntrl,
  cK_gen_rating_update_itemFeedback_cntrl,
  cK_gen_rating_update_attachments_cntrl,
  cK_gen_rating_update_reply_cntrl,
  cK_gen_rating_update_source_cntrl,
  cK_gen_rating_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_rating_create_vld),
  cK_gen_rating_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_rating_getAll_vld),
  cK_gen_rating_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_rating_getOne_vld),
  cK_gen_rating_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_rating_delete_vld),
  cK_gen_rating_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_rating_updateAll_vld),
  cK_gen_rating_updateAll_cntrl,
);


// ! Fields Routes

router.put(
  "/update/salesChannel/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_salesChannel_vld),
  cK_gen_rating_update_salesChannel_cntrl,
);

router.put(
  "/update/order/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_order_vld),
  cK_gen_rating_update_order_cntrl,
);

router.put(
  "/update/platformOrderId/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_platformOrderId_vld),
  cK_gen_rating_update_platformOrderId_cntrl,
);

router.put(
  "/update/customer/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_customer_vld),
  cK_gen_rating_update_customer_cntrl,
);

router.put(
  "/update/stars/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_stars_vld),
  cK_gen_rating_update_stars_cntrl,
);

router.put(
  "/update/comment/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_comment_vld),
  cK_gen_rating_update_comment_cntrl,
);

router.put(
  "/update/receivedAt/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_receivedAt_vld),
  cK_gen_rating_update_receivedAt_cntrl,
);

router.put(
  "/update/customerNameSnapshot/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_customerNameSnapshot_vld),
  cK_gen_rating_update_customerNameSnapshot_cntrl,
);

router.put(
  "/update/customerLoyaltyTier/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_customerLoyaltyTier_vld),
  cK_gen_rating_update_customerLoyaltyTier_cntrl,
);

router.put(
  "/update/sentimentTag/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_sentimentTag_vld),
  cK_gen_rating_update_sentimentTag_cntrl,
);

router.put(
  "/update/itemFeedback/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_itemFeedback_vld),
  cK_gen_rating_update_itemFeedback_cntrl,
);

router.put(
  "/update/attachments/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_attachments_vld),
  cK_gen_rating_update_attachments_cntrl,
);

router.put(
  "/update/reply/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_reply_vld),
  cK_gen_rating_update_reply_cntrl,
);

router.put(
  "/update/source/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_source_vld),
  cK_gen_rating_update_source_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_rating_update_notes_vld),
  cK_gen_rating_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
