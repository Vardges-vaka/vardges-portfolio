import express from "express";
import {
  user_signUp_cntrl,
  user_signIn_cntrl,
  user_signOut_cntrl,
} from "../07_controllers/userCntrl/_userCntrl.index.js";

const router = express.Router();

router.post("/auth/signup", user_signUp_cntrl);
router.post("/auth/signin", user_signIn_cntrl);
router.post("/auth/signout", user_signOut_cntrl);

export default router;
