import express from "express";
import { User } from "../models/user.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

async function loginUser(req, res) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return errorResponse(res, 400, validationErrors.array());
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return errorResponse(res, 400, "Invalid credentials");
    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) return errorResponse(res, 400, "Invalid credentials");
    return successResponse(res, jwtToken);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Something went wrong");
  }
}

const router = express.Router();
router.post("/login", validations, loginUser);
export default router;
