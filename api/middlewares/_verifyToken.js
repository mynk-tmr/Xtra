import jwt from "jsonwebtoken";
import { errorResponse } from "./_validator.js";

/* this checks auth_token in each request, unhash it & append to
  request body so client/server can access it if needed be...
*/
export const verifyToken = (req, res, next) => {
  try {
    let token = req.cookies["auth_token"];
    if (!token) throw "EMPTY TOKEN";
    let { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    return errorResponse(res, 401, "unauthorized access");
  }
};
