import jwt from "jsonwebtoken";

export function setJWTCookieInResponse(res, user) {
  const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  const ONE_DAY = 24 * 60 * 60 * 1000;
  res.cookie("auth_token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
  });
  return res;
}
