import express from "express";

// !===== Middleware =====
import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
// !===== Controllers =====
import {
  project_getAll_cntrl,
  project_add_cntrl,
} from "../07_controllers/projectCntrl/_projectCntrl.index.js";

// !===== validators =====
import { project_add_vld } from "../07_controllers/projectCntrl/_projectCntrl_utils/_projectCntrl_utils.index.js";

const router = express.Router();

router.get("/getAll", auth_mddlwre, project_getAll_cntrl);

router.post(
  "/add",
  auth_mddlwre,
  vld_sntzr_mddlwre(project_add_vld),
  project_add_cntrl
);

// router.post(
//   "/getOne",
//   auth_mddlwre,
//   vld_sntzr_mddlwre(project_add_vld),
//   project_add_cntrl
// );

// router.post(
//   "/update",
//   auth_mddlwre,
//   vld_sntzr_mddlwre(project_add_vld),
//   project_add_cntrl
// );

// router.post(
//   "/update_images",
//   auth_mddlwre,
//   vld_sntzr_mddlwre(project_add_vld),
//   project_add_cntrl
// );
// router.post(
//   "/update_files",
//   auth_mddlwre,
//   vld_sntzr_mddlwre(project_add_vld),
//   project_add_cntrl
// );

export default router;
