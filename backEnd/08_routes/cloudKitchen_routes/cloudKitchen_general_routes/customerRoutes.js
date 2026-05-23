import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_customer_create_vld,
  cK_gen_customer_getAll_vld,
  cK_gen_customer_getOne_vld,
  cK_gen_customer_delete_vld,
  cK_gen_customer_updateAll_vld,
  // Fields
  cK_gen_customer_update_name_vld,
  cK_gen_customer_update_aliases_vld,
  cK_gen_customer_update_contact_vld,
  cK_gen_customer_update_addresses_vld,
  cK_gen_customer_update_encounteredOn_vld,
  cK_gen_customer_update_orderStats_vld,
  cK_gen_customer_update_complaints_vld,
  cK_gen_customer_update_source_vld,
  cK_gen_customer_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_customer_create_cntrl,
  cK_gen_customer_getAll_cntrl,
  cK_gen_customer_getOne_cntrl,
  cK_gen_customer_delete_cntrl,
  cK_gen_customer_updateAll_cntrl,
  // Fields
  cK_gen_customer_update_name_cntrl,
  cK_gen_customer_update_aliases_cntrl,
  cK_gen_customer_update_contact_cntrl,
  cK_gen_customer_update_addresses_cntrl,
  cK_gen_customer_update_encounteredOn_cntrl,
  cK_gen_customer_update_orderStats_cntrl,
  cK_gen_customer_update_complaints_cntrl,
  cK_gen_customer_update_source_cntrl,
  cK_gen_customer_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post(
  "/create",
  vld_sntzr_mddlwre(cK_gen_customer_create_vld),
  cK_gen_customer_create_cntrl,
);
router.get(
  "/getAll",
  vld_sntzr_mddlwre(cK_gen_customer_getAll_vld),
  cK_gen_customer_getAll_cntrl,
);
router.get(
  "/getOne/:id",
  vld_sntzr_mddlwre(cK_gen_customer_getOne_vld),
  cK_gen_customer_getOne_cntrl,
);
router.delete(
  "/delete/:id",
  vld_sntzr_mddlwre(cK_gen_customer_delete_vld),
  cK_gen_customer_delete_cntrl,
);
router.put(
  "/updateAll/:id",
  vld_sntzr_mddlwre(cK_gen_customer_updateAll_vld),
  cK_gen_customer_updateAll_cntrl,
);

// ! Fields Routes

router.put(
  "/update/name/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_name_vld),
  cK_gen_customer_update_name_cntrl,
);

router.put(
  "/update/aliases/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_aliases_vld),
  cK_gen_customer_update_aliases_cntrl,
);

router.put(
  "/update/contact/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_contact_vld),
  cK_gen_customer_update_contact_cntrl,
);

router.put(
  "/update/addresses/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_addresses_vld),
  cK_gen_customer_update_addresses_cntrl,
);

router.put(
  "/update/encounteredOn/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_encounteredOn_vld),
  cK_gen_customer_update_encounteredOn_cntrl,
);

router.put(
  "/update/orderStats/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_orderStats_vld),
  cK_gen_customer_update_orderStats_cntrl,
);

router.put(
  "/update/complaints/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_complaints_vld),
  cK_gen_customer_update_complaints_cntrl,
);

router.put(
  "/update/source/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_source_vld),
  cK_gen_customer_update_source_cntrl,
);

router.put(
  "/update/notes/:id",
  vld_sntzr_mddlwre(cK_gen_customer_update_notes_vld),
  cK_gen_customer_update_notes_cntrl,
);

// ! Relations routes

// ! Grouped routes

export default router;
