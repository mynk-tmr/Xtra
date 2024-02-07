import express from "express";
import bcrypt from "bcryptjs";
import {
  getValidationErrors,
  errorResponse,
  validationsAtLogin,
} from "../helpers/validator.js";
import { setJWTCookieInResponse } from "../helpers/jwtHandler.js";
import { getUserByEmail } from "#models/user";

async function loginUser(req, res) {
  const errors = getValidationErrors(req);
  if (errors) return errorResponse(res, 400, errors);
  const { email, password } = req.body;
  try {
    let user = await getUserByEmail(email);
    if (!user) return errorResponse(res, 400, "Invalid credentials");
    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) return errorResponse(res, 400, "Invalid credentials");
    setJWTCookieInResponse(res, user._id);
    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Something went wrong");
  }
}

const router = express.Router();
router.post("/login", validationsAtLogin, loginUser);
export default router;
