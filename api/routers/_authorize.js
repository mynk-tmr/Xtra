import bcrypt from "bcryptjs";
import express from "express";
import { setJWTCookieInResponse } from "../helpers/_jwtHandler.js";
import {
  getValidationErrors,
  validationsAtLogin,
} from "../middlewares/_validator.js";
import { handleInternalError, jsonResponse } from "../helpers/_formatters.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import { User, getUserByEmail } from "../models/_user.js";

async function loginUser(req, res) {
  const errors = getValidationErrors(req);
  if (errors) return jsonResponse(res, 400, errors);
  try {
    const { email, password } = req.body;
    let user = await getUserByEmail(email);
    if (!user) throw "INVALID_CRED";
    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) throw "INVALID_CRED";
    setJWTCookieInResponse(res, user._id);
    return jsonResponse(res, 200, { userId: user._id }); //userId is sent so script can read
  } catch (error) {
    if (error == "INVALID_CRED")
      return jsonResponse(res, 400, "Invalid credentials");
    else handleInternalError(res, error);
  }
}

const router = express.Router();
router.post("/login", validationsAtLogin, loginUser);

router.get("/validate-token", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  return jsonResponse(res, 200, user);
});

router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0), //clear client's cookie
  });
  res.send();
});

export default router;
