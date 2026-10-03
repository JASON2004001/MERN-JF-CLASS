import express  from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middleware/verifyJWT.js";

const router = express.Router();


router.route("/register-user").post(registerUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").get(verifyJwt,logoutUser);

export default router;