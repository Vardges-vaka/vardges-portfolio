import express from "express";

// !===== Middleware =====
import {
  vld_sntzr_mddlwre,
  auth_mddlwre,
} from "../05_middlewares/_mddlwre.index.js";
// !===== Controllers =====
import {
  user_signUp_cntrl,
  user_signIn_cntrl,
  user_signOut_cntrl,
  user_forgotPassword_cntrl,
  user_resetPassword_cntrl,
  user_authCheck_cntrl,
  user_typedErrorExample_cntrl,
} from "../07_controllers/userCntrl/_userCntrl.index.js";

// !===== validators =====
import {
  user_signUp_vld,
  user_signIn_vld,
  user_signOut_vld,
  user_forgotPassword_vld,
  user_resetPassword_vld,
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
router.get("/auth/check", user_authCheck_cntrl);
router.post(
  "/auth/signout",
  auth_mddlwre,
  vld_sntzr_mddlwre(user_signOut_vld),
  user_signOut_cntrl
);
router.post(
  "/auth/forgot-password",
  vld_sntzr_mddlwre(user_forgotPassword_vld),
  user_forgotPassword_cntrl
);
router.post(
  "/auth/reset-password",
  vld_sntzr_mddlwre(user_resetPassword_vld),
  user_resetPassword_cntrl
);
router.post("/auth/typed-error-example", user_typedErrorExample_cntrl);

export default router;
