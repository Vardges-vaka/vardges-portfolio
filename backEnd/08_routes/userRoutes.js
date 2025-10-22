import express from "express";

// !===== Middleware =====
import { vld_sntzr_mddlwre } from "../05_middlewares/_mddlwre.index.js";
// !===== Controllers =====
import {
  user_signUp_cntrl,
  user_signIn_cntrl,
  user_signOut_cntrl,
} from "../07_controllers/userCntrl/_userCntrl.index.js";

// !===== validators =====
import {
  user_signUp_vld,
  user_signIn_vld,
  user_signOut_vld,
} from "../07_controllers/userCntrl/_utils/userCntrl_utils.index.js";

const router = express.Router();

router.post(
  "/auth/signup",
  vld_sntzr_mddlwre(user_signUp_vld),
  user_signUp_cntrl
);
router.post(
  "/auth/signin",
  vld_sntzr_mddlwre(user_signIn_vld),
  user_signIn_cntrl
);
router.post(
  "/auth/signout",
  vld_sntzr_mddlwre(user_signOut_vld),
  user_signOut_cntrl
);

export default router;
