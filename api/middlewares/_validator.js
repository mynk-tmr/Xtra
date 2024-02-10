import { validationResult, body } from "express-validator";

/* Express Validator keeps validation separate from models, so
  - models are more maintable
  - reusable validations that can scale to any complexity or database type
  - fewer database calls */

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
  //body creates a middleware to test a field in req.body
  body("email", "missing email").isEmail(),
  body("password", "Password atleast of 6 length").isLength({ min: 6 }),
  body("firstName", "missing firstName").notEmpty(),
  body("lastName", "missing lastName").notEmpty(),
];

export const validationsAtLogin = [
  validationsAtRegister[0],
  validationsAtRegister[1],
];

export const validationsAtCreateListing = [
  //body creates a middleware to test a field in req.body
  body("state", "missing state").notEmpty(),
  body("city", "missing city").notEmpty(),
  body("pincode", "invalid pincode").isInt({ min: 100000, max: 999999 }),
  body("locality", "missing locality").notEmpty(),
  body("type", "missing type").notEmpty(),
  body("description", "invalid description").isLength({ min: 20 }),
  body("facilities", "missing facilities").isArray(),
  body("pricePerDay", "missing pricePerDay").isInt({ min: 1 }),
  body("discount", "missing discount").isInt({ min: 0 }),
  body("entraceDimensions", "missing entraceDimensions").isArray(),
  body("storageSpace", "missing storageSpace").isFloat({ min: 0 }),
];
