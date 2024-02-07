import { check, validationResult } from "express-validator";

export function errorResponse(res, code, message) {
  return res.status(code).json({
    message,
  });
}

export function getValidationErrors(req) {
  const errors = validationResult(req);
  return errors.isEmpty() ? null : errors.array(); //of error objects
}

export const validationsAtRegister = [
  check("email", "missing email").isEmail(),
  check("password", "Password atleast of 6 length").isLength({ min: 6 }),
  check("firstName", "missing firstName").isString(),
  check("lastName", "missing lastName").isString(),
];

export const validationsAtLogin = [
  validationsAtRegister[0],
  validationsAtRegister[1],
];
