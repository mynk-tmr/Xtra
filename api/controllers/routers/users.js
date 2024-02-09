import express from "express";
import { createUser, getUserByEmail } from "#models/user";
import { setJWTCookieInResponse } from "../helpers/jwtHandler.js";
import {
  errorResponse,
  getValidationErrors,
  validationsAtRegister,
} from "../helpers/validator.js";

async function registerUser(req, res) {
  const errors = getValidationErrors(req);
  if (errors) return errorResponse(res, 400, errors);

  try {
    let user = await getUserByEmail(req.body.email);
    if (user) return errorResponse(res, 400, "Email already taken");
    user = createUser(req.body);
    await user.save(); //save to collection
    setJWTCookieInResponse(res, user._id);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Something went wrong");
  }
}

const router = express.Router(); //middleware to handle specific routes
router.post("/register", validationsAtRegister, registerUser);
export default router;
