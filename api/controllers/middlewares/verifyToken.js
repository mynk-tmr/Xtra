import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers/validator.js";

export const verifyToken = (req, res, next) => {
  console.log("verifying ...");
  try {
    let token = req.cookies["auth_token"];
    if (!token) throw "BAD";
    let { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY); //the userId set by jwtHandler.js
    req.userId = userId; //make secure cookied userId visible in request to client
    next(); //call next handler
  } catch (err) {
    return errorResponse(res, 401, "unauthorized access");
  }
};
