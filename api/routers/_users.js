import express from "express";
import { setJWTCookieInResponse } from "../helpers/_jwtHandler.js";
import {
  getValidationErrors,
  validationsAtRegister,
} from "../middlewares/_validator.js";
import { createUser, getUserByEmail } from "../models/_user.js";
import { jsonResponse } from "../helpers/_formatters.js";

async function registerUser(req, res) {
  const errors = getValidationErrors(req);
  if (errors) return jsonResponse(res, 400, errors);

  try {
    let user = await getUserByEmail(req.body.email);
    if (user) return jsonResponse(res, 400, "Email already taken");
    user = createUser(req.body);
    await user.save(); //save to collection
    setJWTCookieInResponse(res, user._id);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return jsonResponse(res, 500, "Something went wrong");
  }
}

const router = express.Router(); //middleware to handle specific routes
router.post("/register", validationsAtRegister, registerUser);
export default router;
