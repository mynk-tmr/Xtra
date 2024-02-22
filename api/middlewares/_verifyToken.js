import jwt from "jsonwebtoken";
/* this checks auth_token in each request, unhash it & append to
  request body so client/server can access it if needed be...
*/
export const verifyToken = (req, res, next) => {
  try {
    let token = req.cookies["auth_token"];
    if (!token) throw null;
    let { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = userId;
  } catch (err) {
    req.userId = null;
  } finally {
    next();
  }
};
