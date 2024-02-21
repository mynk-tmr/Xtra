import bcrypt from "bcryptjs";
import express from "express";
import { setJWTCookieInResponse } from "../helpers/_jwtHandler.js";
import {
  getValidationErrors,
  validationsAtLogin,
} from "../middlewares/_validator.js";
import { jsonResponse } from "../helpers/_formatters.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import { User, getUserByEmail } from "../models/_user.js";

async function loginUser(req, res) {
  const errors = getValidationErrors(req);
  if (errors) return jsonResponse(res, 400, errors);
  const { email, password } = req.body;
  try {
    let user = await getUserByEmail(email);
    if (!user) return jsonResponse(res, 400, "Invalid credentials");
    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) return jsonResponse(res, 400, "Invalid credentials");
    setJWTCookieInResponse(res, user._id);
    return jsonResponse(res, 200, { userId: user._id }); //userId is sent so script can read
  } catch (error) {
    console.log(error);
    return jsonResponse(res, 500, "Something went wrong");
  }
}

const router = express.Router();
router.post("/login", validationsAtLogin, loginUser);

router.get("/validate-token", verifyToken, async (req, res) => {
  const { email, firstName, lastName } = await User.findById(req.userId);
  return jsonResponse(res, 200, {
    userId: req.userId,
    email,
    firstName,
    lastName,
  });
});

router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0), //clear client's cookie
  });
  res.send();
});

export default router;
