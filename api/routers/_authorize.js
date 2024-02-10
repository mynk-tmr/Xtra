import bcrypt from "bcryptjs";
import express from "express";
import { setJWTCookieInResponse } from "../helpers/_jwtHandler.js";
import {
  errorResponse,
  getValidationErrors,
  validationsAtLogin,
} from "../middlewares/_validator.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import { getUserByEmail } from "../models/_user.js";

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

router.get("/validate-token", verifyToken, (req, res) => {
  //transferring req.userId into body
  return res.status(200).json({ userId: req.userId });
});

router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0), //clear client's cookie
  });
  res.send();
});

export default router;
