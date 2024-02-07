//REST filename convention: use plural of model
import express from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { check } from "express-validator";

function errorResponse(res, code, message) {
  return res.status(code).json({
    message,
  });
}

function successResponse(res, jwtToken) {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  res.cookie("auth_token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
  });
  return res.sendStatus(200);
}

const router = express.Router(); //middleware to handle specific routes

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email, //check if email's already registered
    });

    if (user) return errorResponse(res, 400, "Email already taken");
    user = new User(req.body); //construct user doc and save
    await user.save();

    //create unique jwt for user
    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return successResponse(res, jwtToken);

    //send jwt in cookie
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong");
  }
});

export default router;
